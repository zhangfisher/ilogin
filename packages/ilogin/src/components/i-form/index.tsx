/**
 *
 *  <i-login
 *    logo="https://omi.cdn-go.cn/s/latest/omi.svg"
 *    title="Voerka"
 *    copyright="© 2021 Voerka. All rights reserved."
 *    background="https://cdn.voerka.com/background.jpg"
 *  />
 *
 *  <script>
 *    iLogin.config({
 *        logo: 'https://omi.cdn-go.cn/s/latest/omi.svg',
 *        title:"Voerka",
 *        theme:"",
 *
 *
 *    })
 *  </script>
 *
 *
 */

import { h, tag, Component, bind, createRef } from "omi";
import css from "./index.css?raw";
import { LoginFormField } from "../../types";
 

export type iLoginFormProps = {
	title?:string
	url?:string
	fields: Array<LoginFormField | Array<LoginFormField>>
}

@tag("i-login-form")
export default class extends Component<iLoginFormProps> {
	static css = [css];
	static props = {		
		fields:{
			type:Array,
		 	default:[]
		}
	}; 

	el=createRef<HTMLFormElement>()

	@bind
	onInput(e:any){
		try{
			const {name,value} = Object.assign({},e.target.detail)

			
		}catch{}		
	}
	@bind
	onBlur(e:any){

	}
	@bind
	onChange(e:any){

	}
	@bind
	onAction(e:any){

	}
	@bind
	onSubmit(e:any){ 
		this.el.current!.submit()
	}
	renderField(field:LoginFormField){
		if(Array.isArray(field)){
			return this.renderFieldGroup(field)
		}else{
			switch(field.type){
				case "username":
					return <i-username-field {...field}/>	
				case "password":
					return <i-passowrd-field {...field}/>
				case "verifyCode":
					return <i-verify-code-field {...field}/>
				case "captcha":
					return <i-captcha-field {...field}/>
				case "remember":
					return <i-remember-field {...field}/>				
				case "forgetPassword":
					return <i-forget-password-field {...field}/>					
			} 
		}
	}
	renderFieldGroup(field:LoginFormField[]){
		return <div className="field-group">
			{
				field.map((f)=>{
					return this.renderField(f)
				})
			}
		</div>
	}
	render(props) {
		return (
			<form 
				ref={this.el}
				method="post"
				onaction={this.onAction} 
				onInput={this.onInput}  
				onBlur={this.onBlur}
				onChange={this.onChange}
				className="i-login-form"
				action={props.url}
			>
				{/* 字段 */}
				{				
					props.fields.map((field:any)=>{
						return this.renderField(field)
					})
				}		
				{/* 提交按钮 */}
				<i-submit onSubmit={this.onSubmit}/> 
			</form> 
		);
	}
}
