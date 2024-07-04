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

import { h, tag,  Component,bind,createRef,signal } from "omi";
import css from "./index.css?raw";
import { options } from "../../context";
import { isEmpty } from "../../utils/isEmpty";
import classnames from 'classnames';

const { panel,thirdPartyLogin,login } = options

@tag("i-login-panel")
export default class extends Component {
	static css = [css];
	static props = {}; 
	ref = createRef<HTMLDivElement>()
	fliping = signal(false)
	fliped = signal(false)

	@bind	
	onLogin(){
		this.fliping.value = true
	}

	installed(){
		this.ref.current?.addEventListener("animationend",()=>{
			//this.fliping.value = false
			this.fliped.value = true
		})
	}

	renderHeader(){
		return <>{ isEmpty(panel.title) ? null : 
			<div className="header">
				<span className="title">{panel.title}</span>
			</div>	
		}</>
	}
	renderFooter(){
		return <>
			{
				isEmpty(thirdPartyLogin) ? null :
				<div className="footer">						
					<span>第三方登录</span>
					<span className="partys">
						<a href="#"><img src="/icons/wx.svg"/></a>
						<a href="#"><img src="/icons/weibo.svg"/></a>
						<a href="#"><img src="/icons/qq.svg"/></a>
					</span>						
				</div>
			}		
		</>
	}
	renderLoginForms(){
		const tabs = Object.entries(login).map(([id,tab])=>{
			return { id,title:tab.title || id}
		})
		return <>
			{
				isEmpty(login) ? <span>未配置登录表单</span> :
					<i-tabs tabs={tabs}>
						{ tabs.map((tab)=>{
							return <i-login-form slot={tab.id} id={tab.id} {...login[tab.id]}></i-login-form>
						}) }
					</i-tabs> 
			}
		</>
	}
	render() {
		return (
			<div ref={this.ref}  
				className="i-login-panel"				
				onlogin={this.onLogin}
			>
				{this.renderHeader()}
				<div className={classnames("wrapper")}>										
					<div className="body">	
						{this.renderLoginForms()}
					</div> 		
				</div>						
				{this.renderFooter()}				
			</div>
		);
	}
}
