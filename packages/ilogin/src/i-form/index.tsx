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
import Color from "color";
import 'omi-form'
import { getBasicLoginForm } from "./forms/basic";


export type iBackgroundProps = {
	fullScreen: boolean;
	primaryColor: string;
	lines: number;
	waves: {
		count: number; // 波浪的数量
	};
};

@tag("i-login-form")
export default class extends Component {
	static css = [css];
	static props = {};
	state = {
		active: "tab1",
	};
	el = createRef<HTMLElement>();
	handleBasicClick(name: string) {}
	render(props: iBackgroundProps) {
		const { primaryColor } = props;
		return (
			<div ref={this.el} className="i-login-form">
				<div className="i-login-form-wrapper">
					<div className="i-login-form-header">
						<span className="i-login-form-title">欢迎登录</span>
					</div>
					<div className="i-login-form-body">
          <o-checkbox
    label="Default checkbox"
    name="example"
    value="example"
    required
  ></o-checkbox>
						{/* <o-button >帐号登录</o-button>
          <o-button >微信登录</o-button>
          <o-button >手机验证码登录</o-button> */}
            <o-form config={getBasicLoginForm()} />
          
					</div>
					<div className="i-login-form-footer">社交媒体</div>
				</div>
			</div>
		);
	}
}
