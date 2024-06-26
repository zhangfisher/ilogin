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

import { h, tag, Component, signal } from "omi";
import css from "./index.css?raw";  
import layout from "../i-layout/index.css?raw"

export type iLoginSettingsProps = {
	show: boolean;
};

@tag("i-settings")
export default class extends Component {
	static css = [css,layout];
	static props = {};
	active = signal(true);
	renderAppearance(props){
		return (
			<div className="i-form-layout">
				<div className="field">
					<div className="label">主题色</div>
					<div className="input">
						<o-button>dsd</o-button>
					</div>
				</div>
				<div className="field">
					<div className="label">主题色</div>
					<div className="input">主题色</div>
				</div>
			</div>
		)	
	}
	render(props: iLoginSettingsProps) {
		return (
			<i-popover className="i-login-settings">				
				<i-icon name="settings"/>
				<div
					className="content"
					slot="content"
					style={{
						display: this.active.value ? "block" : "none",
					}} 
				> 
					<i-tabs
						tabs={[
							{ id: "appearance", title: "外观" },
							{ id: "login", title: "登录" },
							{ id: "other", title: "其他" },
						]}
					>
						<div slot="appearance">
						{this.renderAppearance(props)}
						</div>
						<div slot="login">登录</div>
						<div slot="other">其他</div>
					</i-tabs> 
				</div>
			</i-popover>
		);
	}
}
