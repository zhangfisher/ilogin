/**
 *
 * 输入框
 * 
 * 
 * <i-input prifix="user" suffix="view" actions={['登录','查看']} />
 *
 */

import { h, tag, Component, bind, createRef, signal, SignalValue,css, Ref } from 'omi';
import style from "./index.css?raw";
import "../i-header";
import "../i-footer"; 
import { isEmpty } from '../../utils/isEmpty';
import classnames from 'classnames';
import { assignObject } from '../../utils/assignObject';


export type InputActionDefine = {
	id?      : string;
	type     : 'button' | 'icon'
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
	onClick ?: (action:Component,e:any) => void;
};

export type ReactivedInputActionDefine<T extends InputActionDefine=InputActionDefine> = Required<{
	[Key in keyof T] : Key extends 'id'  | 'onClick' ? T[Key] : (T[Key] extends string[] ? SignalValue<T[Key]>[] : SignalValue<Required<T[Key]>>)
}>
 

// InputAction转换为响应式
export type InputAction<T extends InputActionDefine=InputActionDefine> = Required<{
	[Key in keyof T] : Key extends 'id'  | 'onClick' ? T[Key] : (T[Key] extends string[] ? SignalValue<T[Key]>[] : SignalValue<Required<T[Key]>>)
}>
 
export type InputActionProps = InputActionDefine & { $props:InputAction}


@tag("i-input-action")
export class iInputAction extends Component<InputActionProps> { 
	@bind
	onActionClick(e:any){ 
		if(typeof(this.props.onClick)=="function") {
			this.props.onClick(this,e)
		}			
		const event = new CustomEvent('action', {
			detail: this.props,
			bubbles: true,
			composed: true

		});
		this.dispatchEvent(event)
	}
	// @ts-ignore
	$props:ReactivedInputActionDefine = {}

	createReactivedProps(){
		// @ts-ignore
		const result: ReactivedInputActionDefine= {}		
		const normalizedProps = assignObject({
			enable  : true,
			position: 'default',
			href    : '#',
			image   : '',
			loading : false,
			tips    : '',
			value   : '',
			icon    : '',
			label   : '' 
		},this.props) as InputActionDefine

		Object.entries(normalizedProps).forEach(([key,value])=>{
			if(['id','onClick'].includes(key)){
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
	install(): void {
		this.$props = this.createReactivedProps()
	}
	renderButton(){
		return <a part="action" className={classnames("action",this.$props.class?.value)}
			id={this.$props.id} href={this.$props.href.value}
			title={this.$props.tips.value}
			o-ripple 
			onClick={this.onActionClick}
			>
			{ this.$props.icon.value && <i-icon name={this.$props.icon.value}/>} 
			{ this.$props.label.value}
			{ this.$props.loading.value ? 
				<i-icon className="loading" name="loading" size="small"/>	
				: null
			}				 
			<slot/>
		</a>
	}
	renderIcon(){
		const icons = (Array.isArray(this.props.icon) ? this.props.icon.map(i=>i) : [this.props.icon]).filter(v=>!isEmpty(v))
		if(icons.length==0) return null
		if(!this.$props.value.value && icons.length>0)  this.$props.value.value = icons[0]		
		return <i-icon 
			name={this.$props.value.value}					 
			title={this.$props.tips.value || this.$props.label.value}
			style={{
				cursor: icons.length >1 ? "pointer" : "cursor"				 
			}}
			size="small" 
			onClick={(e:any)=>{
				const i = icons.indexOf(this.$props.value.value)
				this.$props.value.value = icons[(i+1)%icons.length]
				this.onActionClick(e)
				 this.update()
				e.stopPropagation()
			}}></i-icon> 
	}
	render(props:InputActionDefine){	
		if(props.type=='icon')	{
			return this.renderIcon()
		}else{
			return this.renderButton()
		}
	}
}

export type iInputProps = { 	
	type: 'text' | 'password'
	actions : InputActionDefine[]	
	error : string
	size  : 'small' | 'middle' | 'large' 
	placeholder: string
	ref : Ref<HTMLInputElement>
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
	ref= createRef()
	actions:any[] = []
	@bind
	onBlur(e:any){
		const event = new CustomEvent('blur', {
			detail: e.target.value,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(event)

	}
	@bind
	onInput(e:any){
		const event = new CustomEvent('input', {
			detail: e.target.value,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(event)
	}
	@bind
	onChange(e:any){
		const event = new CustomEvent('change', {
			detail: e.target.value,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(event)
	}

	getActions(pos:string='default'){
		const actions = this.props.actions  //this.props.actions
		if(!actions) return []
		try{
			return actions.filter((action) => {
				if(!action.position) action.position="default"
				return action.position == pos
			})
		}catch(e){
			return []
		}
	}
	renderActions(){	 
		try{
			const actions = this.getActions()  
			return actions.map((action) => { 
				const ref = createRef()
				this.actions.push(ref)
				action.type='button'
				return <i-input-action part="action" ref={ref} {...action}> 
					<slot name={action.id}></slot>
				</i-input-action>
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
				action.type='icon'
				return <i-input-action {...action}/> 
			})
		} 	
	}

	render(props: iInputProps) {	
		return <>
			<div className="i-input" ref={this.ref}>
				<span className="wrapper">
					{this.renderIcons("before")}
					<input
						ref ={props.ref}
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
			<slot name="tips"></slot>
			</> 
	}
}
