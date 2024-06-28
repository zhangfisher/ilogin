/**
 *
 * 输入框
 * 
 * 
 * <i-input prifix="user" suffix="view" actions={['登录','查看']} />
 *
 */

import { h, tag, Component, bind, createRef, signal, SignalValue,css } from 'omi';
import style from "./index.css?raw";
import "../i-header";
import "../i-footer"; 
import { isEmpty } from '../../utils/isEmpty';
import classnames from 'classnames';


export type InputActionDefine = {
	id?      : string;
	enable?  : boolean;
	label    : string;		
	tips?    : string;
	icon?    : string[] | string;
	href?    : string;
	image?   : string										// 背景图片
	loading? : boolean
	value?   : string
	position?: 'default' | 'before' | 'after' 
	class?   : string										// 额外样式类
	onClick ?: (e:any) => void;
};


// InputAction转换为响应式
export type InputAction<T extends InputActionDefine=InputActionDefine> = Required<{
	[Key in keyof T] : Key extends 'id' | 'value' | 'onClick' ? T[Key] : (T[Key] extends string[] ? SignalValue<T[Key]>[] : SignalValue<Required<T[Key]>>)
}>


export type iInputProps = { 	
	type: 'text' | 'password'
	actions : InputActionDefine[]	
	error : string
	size  : 'small' | 'middle' | 'large' 
	placeholder: string
};


@tag("i-input")
export default class extends Component<iInputProps> {
	static css = [style];
	static props = {		
		actions:{
			type: Array,
			default: []
		},
		error:{
			type: String,
			default: ''
		},
		placeholder:{
			type: String,
			default: ''
		}
	};
    get actions(){
		return this._actions
    }
	ref= createRef()
	_actions:InputAction[] =[]
	install(): void {
		this.props.actions.forEach(action=>{			
			if(!action.position) action.position = 'default'
			if(!action.tips) action.tips=''
			if(!action.label) action.label=''
			if(!action.icon) action.icon=''
			if(!action.href) action.href='#'
			if(!action.value) action.value=''
			if(!action.enable) action.enable=true
			if(!action.image) action.image=''
			if(!action.loading) action.loading=false
			this._actions.push(this.createReactivedAction(action))
		}) 
	}

	createReactivedAction(action:InputActionDefine){
		// @ts-ignore
		const result: InputAction= {}		
		Object.entries(action).forEach(([key,value])=>{
			if(['id','value','onClick'].includes(key)){
				// @ts-ignore
				result[key] = value
			} else{
				if(Array.isArray(value)){
					// @ts-ignore
					result[key] = value.map(v=>signal(v))
				}else{
					// @ts-ignore
					result[key] = signal(value)			
				}
			}
			
		}) 
		return result
	}

	@bind
	onActionClick(e:any,action:InputAction){ 
		if(typeof(action.onClick)=="function") {
			action.onClick(action)
			this.update()
		}			
		this.fire("action",action)  
	}
	@bind
	onBlur(e:any){
		this.fire("blur",e.target.value) 
	}
	@bind
	onInput(e:any){
		this.fire("input",e.target.value) 
	}
	@bind
	onChange(e:any){
		this.fire("change",e.target.value) 
	}


	getActions(pos:string='default'){
		const actions = this._actions  //this.props.actions
		if(!actions) return []
		try{
			return actions.filter((action) => {
				// if(action.position==undefined) action.position = 'default'
				return action.position?.value == pos
			})
		}catch(e){
			return []
		}
	}
	renderActions(){	
		try{
			const actions = this.getActions() as InputAction[]
			return actions.map((action) => { 
				action= Object.assign({href:"#"},action)				
				return <a className={classnames("action",action.class?.value)}
					id={action.id} href={action.href.value}
					title={action.tips.value}
					o-ripple 
					onClick={(e)=>this.onActionClick(e,action)}
					>
					{ action.icon.value && <i-icon name={action.icon.value}/>} 
					{ action.label.value}
					{ action.loading.value ? 
						<i-icon className="loading" name="loading" size="small"/>	
						: null
					}					
					{ isEmpty(action.image.value) ? null : 
						<img src={action.image.value}/>
					}
				</a>
			})
		}catch(e){

		}
		return 	 
	}
	/**
	 * 如果有多个图标可以通过点击切换
	 * @param pos 
	 * @returns 
	 */
	renderIcons(pos:string='after'){
		const actions = this.getActions(pos)
		if(actions.length>0){
			return actions.map(action=>{
				const icons = (Array.isArray(action.icon) ? action.icon.map(i=>i.value) : [action.icon.value]).filter(v=>!isEmpty(v))
				if(!action.value) action.value = icons[0]
				if(icons.length==0) return null
				return <i-icon 
					name={action.value}					 
					title={action.tips.value || action.label.value}
					style={{
						cursor: icons.length >1 ? "pointer" : "cursor"				 
					}}
					size="small" 
					onClick={(e:any)=>{
						const i = icons.indexOf(action.value)
						action.value = icons[(i+1)%icons.length]
						this.onActionClick(e,action)
						this.update()
					}}></i-icon>
			})
		} 	
	}

	render(props: iInputProps) {		
		return <>
			<div className="i-input" ref={this.ref}>
				<span className="wrapper">
					{this.renderIcons("before")}
					<input
						type={props.type}
						onBlur={(e)=>this.onBlur(e)}
						onChange={(e)=>this.onChange(e)}
						onInput={(e)=>this.onInput(e)}
					placeholder={props.placeholder} />
					{this.renderIcons("after")}
				</span>
				{ this.renderActions() } 
			</div>
			{props.error && <div className="error">{props.error}</div>}
			</> 
	}
}
