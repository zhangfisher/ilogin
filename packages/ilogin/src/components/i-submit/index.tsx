/**
 *
 * 提交按钮
 * 
 */

import { h, tag, Component, bind } from "omi";
import css from "./index.css?raw";
import "../i-header";
import "../i-footer";
 

export type iSubmitProps = { 
	label: string; 
};

@tag("i-submit")
export default class extends Component<iSubmitProps> {
	static css = [css];
	static props = { 
		label:{
			type:String
		}
	};  
	@bind
	onClick(e:any){ 		
		const event = new CustomEvent("login", {
			detail:e.detail,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(event);
	}
	render(props: iSubmitProps) {
		return ( 			
			<button className="submit" onClick={this.onClick} o-ripple>
			登录
			</button>
		)
	}
}
