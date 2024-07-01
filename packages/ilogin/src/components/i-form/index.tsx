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

import { h, tag, createRef, Component } from "omi";
import css from "./index.css?raw";
 


@tag("i-login-form")
export default class extends Component {
	static css = [css];
	static props = {};
	state = {
		active: "tab1",
	};
	el = createRef<HTMLElement>();

	render(props:any) {
		return (
			<div ref={this.el} className="i-login-form">
				<div className="wrapper">
					<div className="header">
						<span className="title">欢迎登录</span>
					</div>
					<div className="body">						 
						<i-tabs>
						</i-tabs>		
						<form 
							onaction={(e:any)=>{console.log("onAction=",e.detail)}} 
						>
							<i-username-field/> 
							<i-passowrd-field />
							<i-passowrd-field allowView={true} />
							<i-passowrd-field placeholder='再输一次密码'/>							
							<i-verify-code-field/>
							<i-captcha-field/>						
							<i-checkbox label="记住登录"/>
							<o-button block type="primary">登录</o-button>
							{/* primary | success | info | warning | danger | secondary | light | dark */}
							<o-button block color="info">注册</o-button>
						</form>
					</div>
					<div className="footer">
						<span>第三方登录</span>
						<span className="partys">
							<a href="#"><img src="/icons/wx.svg"/></a>
							<a href="#"><img src="/icons/weibo.svg"/></a>
							<a href="#"><img src="/icons/qq.svg"/></a>
						</span>
						
					</div>
				</div>
			</div>
		);
	}
}
