/**
 *
 * <i-tabs tabs={[
 * {id,title},
 * 	{id,title},
 * {id,title}
 * ]}></i-tabs>
 * 
 */

import { h, tag, Component, signal, OmiProps } from "omi";
import css from "./index.css?raw"; 
 

export type iTabsProps = {
	tabs:{
		id:string,
		title:string
	}[]
};


@tag("i-tabs")
export default class extends Component {
	static css = [css];
	static props = { 
		tabs:{
			type: Array,
			default: []
		}
	}; 
	activeTab = signal(0)

	onClickTab(e:MouseEvent){
		const target = e.target
		// @ts-ignore
		const tabs = target?.parentNode?.children
		const index = Array.from(tabs).indexOf(target)
		this.activeTab.value = index	
		e.stopPropagation()
	}
	render(props: iTabsProps) {
		const { tabs } = props
		return (
			<div className="i-tabs" > 
				{ tabs.length > 1 ? <div className="switcher">
					{ tabs.map((tab,index) => {
						return <button o-ripple  id={tab.id}
							 onClick={this.onClickTab.bind(this)} 
							className={this.activeTab.value == index ? 'active' : ''}>
							{tab.title}
						</button>
					})}					
				</div> : null }
				{ tabs.map((tab,index) => {
					return <div className="tab" style={{
						display: this.activeTab.value == index ? 'block' : 'none'
					}}>
						<slot name={tab.id}></slot>
					</div>
				})}		 
			</div> 
			)
	}
}
