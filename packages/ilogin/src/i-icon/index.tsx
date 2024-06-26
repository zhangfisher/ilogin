/**
 *  
 * 在容器低部添加一个波浪效果
 * 
 */

import { h, tag,Component } from 'omi' 
import css from "./index.css?raw"  

export type iIconProps = {
  name:string
}

@tag('i-icon')
export default class extends Component {
  static css = [ css]
  static props = {
    name:{
      type: String
    } 
  }    
 
  render(props:iIconProps){
    return  <span className={`icon ${props.name}`}></span>
  }
}

