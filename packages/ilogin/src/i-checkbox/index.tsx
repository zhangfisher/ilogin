/**
 *
 * 
 */

import { h, tag, Component } from "omi";
import css from "./index.css?raw";
import "../i-header";
import "../i-footer";
 

export type iCheckboxProps = {
	label?: string;
};

@tag("i-checkbox")
export default class extends Component {
	static css = [css];
	static props = { 
	}; 
	render(props: iCheckboxProps) {
		
		return (
			<div className="i-checkbox" >
				<input id="a"  checked={true} type="checkbox"/> 
				<label for="a">{props.label}</label>
				<a href="#">
					忘记密码?	
				</a>
			</div> 
			)
	}
}
