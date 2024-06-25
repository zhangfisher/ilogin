/**
 *
 * 输入框
 * 
 * 
 * <i-input prifix="user" suffix="view" actions={['登录','查看']} />
 *
 */

import { h, tag, Component } from "omi";
import css from "./index.css?raw";
import "../i-header";
import "../i-footer";


export type Action = {
	id?   : string;
	label: string;		
	tips? : string;
	icon? : string;
	href?: string;
	location?: 'prefix' | 'suffix' | 'default'
};

export type iInputProps = {
	prifix: string;					// 前缀,提供一个图标类名或提示文字
	suffix: string;					// 前缀,提供一个图标类名或提示文字
	actions : string	
	error : string
	size  : 'small' | 'middle' | 'large'
	onFocus: (e: Event) => void;
	onChange: (e: Event) => void;
	onAction: (e: Event) => void;			// 点击按钮时触发
};

@tag("i-input")
export default class extends Component {
	static css = [css];
	static props = {
		cols: {
			type: Number,
			default: 2,
		},
		actions:{
			type: Array,
			default: []
		}
	};
	renderActions(props: iInputProps){
	
		try{
			const actions =JSON.parse(props.actions || '') as Action[]

			return actions.map((action) => { 
				if(typeof(action)=="string") action = {label:action} 
				action= Object.assign({href:"#"},action)				
				return <a className="action" id={action.id} o-ripple href={action.href}>
					{action.label}
				</a>
			})
		}catch(e){
		}
		return 		


	}

	render(props: iInputProps) {
		
		return <>
			<div className="i-input">
				<span className="wrapper">
					<span className="prefix icon user"></span>
					<input type="text" placeholder="用户名" />
					<span className="suffix icon view-off"/>
				</span>
				{ this.renderActions(props) } 
			</div>
			{props.error && <div className="error">{props.error}</div>}
			</> 
	}
}
