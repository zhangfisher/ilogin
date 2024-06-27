/**
 *
 * 
 */

import { h, tag, Component, bind } from "omi";
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
	@bind
	onChange(e:any){
		this.fire("change",e.target.value)
		e.stopPropagation()
	}
	render(props: iCheckboxProps) {
		
		return (
			<div className="i-checkbox" >
				<input id="a"  checked={true} type="checkbox" onChange={this.onChange}
					data-color="red"
				/> 
				<label for="a">{props.label}</label> 
			</div> 
			)
	}
}
