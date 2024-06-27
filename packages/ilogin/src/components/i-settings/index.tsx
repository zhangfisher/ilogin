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
import { primaryColors,bgColors } from "../../presets/colors"; 
import { backgroundColorized, primaryColor } from "../../context";

export type iLoginSettingsProps = {
	show: boolean;
};

@tag("i-settings")
export default class extends Component {
	static css = [css,layout];
	static props = {};
	active = signal(true);

	onUpdatePrimary(e:any){		 
		primaryColor.value = e.target.value
		e.stopPropagation()
	}
	renderAppearance(){
		return (
			<div className="i-form-layout" label-width='5'>
				<div className="field">
					<div className="label">主题色</div>
					<div className="input">
						{ primaryColors.map(color=>(
							<i-color-picker selected={color===primaryColor.value} onClick={this.onUpdatePrimary} size='small' value={color} readonly/>
						)) }
					</div>
				</div>
				<div className="field">
					<div className="label">背景色</div>
					<div className="input">{ bgColors.map(color=>(
							<i-color-picker size='small' value={color} readonly/>
						)) }</div>
				</div>
				<div className="field">
					<div className="label">彩色背景</div>
					<div className="input">
						<i-checkbox label="启用" onChange={(e:any)=>backgroundColorized.value=e.target.value}/>
					</div>
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
					onClick={e=>e.stopPropagation()}
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
						{this.renderAppearance()}
						</div>
						<div slot="login">登录</div>
						<div slot="other">其他</div>
					</i-tabs> 
				</div>
			</i-popover>
		);
	}
}
