/**
 *  
 * 在容器低部添加一个波浪效果
 * 
 */

import { h, tag,Component } from 'omi' 
import css from "./index.css?raw"  
import classnames from 'classnames';

export type iIconProps = {
  name:string
  size: 'default' | 'small' | 'middle' | 'large'
}

@tag('i-icon')
export default class extends Component {
  static css = [ css]
  static props = {
    name:{
      type: String
    },
    size:{
      type: String,
      default:''
    } 
  }    
 
  render(props:iIconProps){
    return  <span className={classnames("icon",props.name,props.size)}></span>
  }
}

