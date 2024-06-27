/**
 *  
 * 在容器低部添加一个波浪效果
 * 
 */

import { h, tag,Component } from 'omi' 
import css from "./index.css?raw"  

export type iImageProps = {
  src:string
}

@tag('i-image')
export default class extends Component {
  static css = [ css]
  static props = {
    src:{
      type: String
    } 
  }    
 
  render(props:iImageProps){
    return  <img className='i-image mask star' {...props}/>
  }
}

