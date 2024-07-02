/**
 *
 * 
 */

import { h, tag, Component } from "omi";
import css from "./index.css?raw";
import "../i-header";
import "../i-footer";
 

export type iLinkProps = {
	label: string;
	url?: string;
	target?:string
	tips?:string
};

@tag("i-link")
export default class extends Component<iLinkProps> {
	static css = [css];
	static props = { 
		url:{
			type:String
		},
		target:{
			type:String,
			target:"_blank"
		}
	};  
	render(props:iLinkProps) {
		return (
			<a href={props.url} target={props.target} title={props.tips}>
				{props.label}
			</a> 
			)
	}
}
