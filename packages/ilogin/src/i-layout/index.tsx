/**
 *
 * 在容器低部添加一个波浪效果
 *
 */

import { h, tag, Component } from "omi";
import css from "./index.css?raw";
import "../i-header";
import "../i-footer";

export type iLayoutProps = {
	cols: 1 | 2 | 3;
};

@tag("i-login-layout")
export default class extends Component {
	static css = [css];
	static props = {
		cols: {
			type: Number,
			default: 2,
		},
	};

	render(props: iLayoutProps) {
		return (
			<div className="i-login-layout">
				<i-login-header />
				<div className="body">
					<div className="left">
						<slot name="left"></slot>            
					</div>
					<div className="center">
						<slot></slot>
					</div>
					<div className="right">
						<slot name="right"></slot>
            
					</div>
				</div>  
				<i-login-footer />
			</div>
		);
	}
}
