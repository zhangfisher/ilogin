/**
 *
 * 在容器低部添加一个波浪效果
 *
 */

import { h, tag, Component } from "omi";
import css from "./index.css?raw";
import "../i-header";
import "../i-footer";

 
@tag("i-floating-button")
export default class extends Component {
	static css = [css];
	static props = {
		
	};
	render() {
		return (
			<div className="i-floating-button">
				  
			</div>
		);
	}
}
