/**
 *
 * 
 */

import { h, tag, Component, signal } from "omi";
import css from "./index.css?raw";
import "../i-header";
import "../i-footer";
 

export type iTabsProps = {
	label?: string;
};

const activeTab = signal(0)

@tag("i-tabs")
export default class extends Component {
	static css = [css];
	static props = { 
	}; 

	onClickTab(e){
		const target = e.target
		const tabs = target.parentNode.children
		const index = Array.from(tabs).indexOf(target)
		activeTab.value = index
	
	}
	render(props: iTabsProps) {
		
		return (
			<div className="i-tabs" > 
				<div className="switcher">
					<button id="tab1" o-ripple onClick={this.onClickTab} 
						className={activeTab.value == 0 ? 'active' : ''}>帐号登录</button>
					<button id="tab2" o-ripple onClick={this.onClickTab} 
						className={activeTab.value == 1 ? 'active' : ''}>验证码登录</button>
					<button id="tab3" o-ripple onClick={this.onClickTab} 
						className={activeTab.value == 2 ? 'active' : ''}>邮件登录</button>
				</div>				
				<div className="tab" slot="tab1" style={{
					display: activeTab.value == 0 ? 'block' : 'none'
				}}>tab1</div>
				<div className="tab" slot="tab2" style={{
					display: activeTab.value == 1 ? 'block' : 'none'
				}}>tab2</div>
				<div className="tab" slot="tab3" style={{
					display: activeTab.value == 2 ? 'block' : 'none'
				}}>tab3</div>
			</div> 
			)
	}
}
