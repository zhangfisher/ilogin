/**
 *
 * 输入框
 * 
 * 
 * <i-input prifix="user" suffix="view" actions={['登录','查看']} />
 *
 */

import { h, tag, Component, bind, createRef, signal, SignalValue,Ref } from 'omi';
import style from "./index.css?raw";
import "../i-header";
import "../i-footer"; 
import { isEmpty } from '../../utils/isEmpty';
import classnames from 'classnames';
import { assignObject } from '../../utils/assignObject';
import { LoginFormDefine, iLoginOptions } from '../../types';

export type iInputProps = { 	
	name       : string
	type       : 'text' | 'password'
	actions    : InputActionDefine[]	
	size       : 'small' | 'middle' | 'large' 
	placeholder: string
	ref        : Ref<HTMLInputElement>	
	length?    : number
	minLength? : number
	maxLength? : number
	pattern?   : string
    validate?: (value:string)=>boolean | string | Promise<boolean | string>  
};

@tag("i-input")
export default class extends Component<iInputProps> {
	static css = [style];
	static props = {		
		name:{
			type: String,
			default: ''
		},
		length:{
			type: Number,
			default: 0
		},		
		minLength:{
			type: Number,
			default: 0
		},		
		maxLength:{
			type: Number,
			default: 0
		},
		actions:{
			type: Array,
			default: [] 
		}, 
		placeholder:{
			type: String,
			default: ''
		},
		validate:{
			type: Function
		},
		pattern:{
			type: String
		},
		ref:{
			type: Object
		},
		size:{
			type: String,
			default: 'middle'
		},
	};
	ref        = createRef<HTMLInputElement>()	
	isValid    = signal(true) 
	isValiding = signal(false) 
	invalidTips = signal('') 
	actions:any[] = []
	inject = [ "form", "login"]
	get formOptions(){
		return this.injection?.form as Required<LoginFormDefine>
	}
	get loginOptions(){
		return this.injection?.login as Required<iLoginOptions>
	}
	/**
	 * 校验输入框的值
	 */
	onValidate(){
		if(this.isValiding.value) return 
		const value = this.ref.current!.value
		const validate = this.props.validate
		let isValid = true, invalidTips:string = ''
		this.isValiding.value = true
		return new Promise<[ boolean,string ]>((resolve)=>{
			const {length=0, minLength=0, maxLength=0 } = this.props
			if(minLength>0 && value.length < minLength){
				isValid = false
				invalidTips = `长度不足，至少${minLength}个字符`
			}else if(maxLength>0 && value.length > maxLength){
				isValid = false
				invalidTips = `长度超出，最多${maxLength}个字符`
			}else if(length>0 && value.length!==length){
				isValid = false
				invalidTips = `输入限制为${length}个字符`
			}else if(validate instanceof RegExp){
				isValid = validate.test(value)
				invalidTips = `格式不正确，应该匹配${validate.toString()}`
			}
			if(isValid && typeof(validate)=="function"){
				(async ()=>validate(value))().then((result)=>{
					isValid = typeof(result)=='boolean' ? result : 
						(typeof(result)=='string' ? false : !(isValid===false))
					invalidTips = typeof(result)=='string' ? result : (isValid===false ? "校验错误" : "")
				}).catch((e)=>{
					isValid = false
					invalidTips = e.message
				}).finally(()=>{
					this.isValiding.value = false
					resolve([isValid,invalidTips])
				})				
			}else{				
				this.isValiding.value = false
				resolve([isValid,invalidTips])
			}  
		})		
	}
	@bind
	onBlur(e:any){
		if(this.formOptions.validate.on=='blur'){
			this.onValidate().then(([isValid,invalidTips])=>{				
			   this.isValid.value = isValid
			   this.invalidTips.value = invalidTips
			})
	    }

		const event = new CustomEvent('blur', {
			detail: {
				name : this.props.name,
				value:e.target.value
			},				
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(event)
		e.stopPropagation()
		

	}
	@bind
	onInput(e:any){
		if(this.isValid.value==false) this.isValid.value = true
		const event = new CustomEvent('input', {
			detail:{
				name : this.props.name,
				value: e.target.value,
				input:this
			},
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(event)
		e.stopPropagation()
	}
	@bind
	onChange(e:any){
		const event = new CustomEvent('change', {
			detail: e.target.value,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(event)		
		e.stopPropagation()
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
			<div className={classnames("i-input",{ 
				invalid: !this.isValid.value
			})}>
				<span className="wrapper">
					{this.renderIcons("before")}
					<input
						name={props.name}
						ref ={this.ref}
						type={props.type}
						onBlur={this.onBlur}
						onChange={this.onChange}
						onInput={this.onInput}
						pattern={props.pattern}
						minLength={props.minLength > 0 ? props.minLength : (props.length > 0 ? props.length : undefined) }
						maxLength={props.maxLength > 0 ? props.maxLength : (props.length > 0 ? props.length : undefined) }

						placeholder={props.placeholder} />
					{this.renderIcons("after")}
				</span>
				{ this.renderActions() } 
			</div>
			{!this.isValid.value && <div className="tips">{this.invalidTips.value}</div>}
			<slot name="tips"></slot>
			</> 
	}
}

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