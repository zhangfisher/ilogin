/**
 *
 * 提交按钮
 * 
 */

import { h, tag, Component, bind, OmiProps } from "omi";
import css from "./index.css?raw";
import "../i-header";
import "../i-footer";
import { fireEvent } from "../../utils/fireEvent";
 

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
		fireEvent.call(this,"submit", {
			detail:e.detail,
			bubbles: true,
			composed: true
		}); 
	} 

	render(props: iSubmitProps) {
		return ( 	
			<button className="submit"
				 onClick={this.onClick} 
				 o-ripple>
				登录			
			</button> 
		)
	}
}
