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

import { h, tag,  Component } from "omi";
import css from "./index.css?raw";
import { options } from "../../context";
import { isEmpty } from "../../utils/isEmpty";

const { panel,thirdPartyLogin,login } = options

@tag("i-login-panel")
export default class extends Component {
	static css = [css];
	static props = {}; 
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
	renderLoginPanel(){
		const tabs = Object.entries(login).map(([id,tab])=>{
			return { id,title:tab.title || id}
		})
		return <>
			{
				isEmpty(login) ? <span>未配置登录表单</span> :
					<i-tabs tabs={tabs}>
						{ tabs.map((tab)=>{
							return <i-login-form slot={tab.id} {...login[tab.id]}></i-login-form>
						}) }
					</i-tabs> 
			}
		</>
	}
	render() {
		return (
			<div className="i-login-panel">
				<div className="wrapper">					
					{this.renderHeader()}
					<div className="body">	
						{this.renderLoginPanel()}
					</div>
					{this.renderFooter()}					
				</div>
			</div>
		);
	}
}
