/**
 *  
 * 在容器低部添加一个波浪效果
 * 
 */

import { h, tag,Component } from 'omi' 
import css from "./index.css?raw"  
import classnames from 'classnames';

export type iLayoutProps = {
  cols:1 | 2 
  ratio:[number,number]       // 当cols=2用来指定左右比例
}

@tag('i-layout')
export default class extends Component<iLayoutProps> {
  static css = [ css]
  static props = {
    cols:{
      type: Number
    },
    ratio:{
      type: Array,
      default:[1,1]
    } 
  }    
 
  render(props:iLayoutProps){
    return  <div>
     
    </div>
  }
}

