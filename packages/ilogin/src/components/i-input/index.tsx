/**
 *
 * 输入框
 * 
 * 
 * <i-input prifix="user" suffix="view" actions={['登录','查看']} />
 *
 */

import { h, tag, Component, bind, createRef } from 'omi';
import css from "./index.css?raw";
import "../i-header";
import "../i-footer"; 


export type Action = {
	id?      : string;
	label    : string;		
	tips?    : string;
	icon?    : string[] | string;
	href?    : string;
	position?: 'default' | 'before' | 'after' 
};

export type iInputProps = { 
	actions : Action[]	
	error : string
	size  : 'small' | 'middle' | 'large' 
	placeholder: string
};

@tag("i-input")
export default class extends Component<iInputProps> {
	static css = [css];
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

	@bind
	onActionClick(e:any,action:any){ 
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
		const actions = this.props.actions
		if(!actions) return []
		try{
			return actions.filter((action) => {
				if(action.position==undefined) action.position = 'default'
				return action.position == pos
			})
		}catch(e){
			return []
		}
	}
	renderActions(){	
		try{
			const actions = this.getActions() as Action[]
			return actions.map((action) => { 
				if(typeof(action)=="string") action = {label:action} 
				action= Object.assign({href:"#"},action)				
				return <a className="action"
					id={action.id} href={action.href}
					title={action.tips}
					o-ripple 
					onClick={(e)=>this.onActionClick(e,action)}
					>
					{action.icon && <i-icon name={action.icon} size="small"/>}
					{action.label}
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
	renderActionIcons(pos:string='after'){
		const actions = this.getActions(pos)
		if(actions.length>0){
			return actions.map(action=>{
				const icons = Array.isArray(action.icon) ? action.icon : [action.icon]
				return <i-icon 
					name={action.icon}					 
					title={action.tips || action.label}
					onClick={(e:any)=>{
						this.onActionClick(e,action)
					}}></i-icon>
			})
		} 	
	}

	render(props: iInputProps) {		
		return <>
			<div className="i-input" ref={this.ref}>
				<span className="wrapper">
					{this.renderActionIcons("before")}
					<input
						type="text"
						onBlur={(e)=>this.onBlur(e)}
						onChange={(e)=>this.onChange(e)}
						onInput={(e)=>this.onInput(e)}
					placeholder={props.placeholder} />
					{this.renderActionIcons("after")}
				</span>
				{ this.renderActions() } 
			</div>
			{props.error && <div className="error">{props.error}</div>}
			</> 
	}
}
