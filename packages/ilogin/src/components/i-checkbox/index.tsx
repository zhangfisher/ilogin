/**
 *
 * 
 */

import { h, tag, Component, bind } from "omi";
import css from "./index.css?raw";
import "../i-header";
import "../i-footer";
 

export type iCheckboxProps = {
	name:string;
	label: string;
	value:boolean
};

@tag("i-checkbox")
export default class extends Component {
	static css = [css];
	static props = { 
		name:{
			type:String
		},
		label:{
			type:String
		},
		value:{
			type:Boolean,
			default:false
		}
	}; 
	@bind
	onChange(e:any){
		const event = new CustomEvent('change', {
			detail: {
				name: 'value',
				value: e.target.checked
			},
			bubbles: true,
			composed: true
		})
		this.dispatchEvent(event)
		e.stopPropagation()
	}
	@bind
	onInput(e:any){
		const event = new CustomEvent('input', {
			detail: {
				name: 'value',
				value: e.target.checked
			},
			bubbles: true,
			composed: true
		})
		this.dispatchEvent(event)
		e.stopPropagation()
	}

	render(props: iCheckboxProps) {		
		return (
			<div className="i-checkbox" >
				<input id={props.name}  name={props.name} 
					checked={props.value} type="checkbox" 
					onChange={this.onChange}					
					onInput={this.onInput}		
				/> 				
				<span className="checkbox"></span>		
				<label for={props.name}>{props.label}</label> 		
			</div> 
			)
	}
}
