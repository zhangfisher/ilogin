/**
 *  
 * 在容器低部添加一个波浪效果
 * 
 */

import { h, tag,Component } from 'omi' 
import css from "./index.css?raw"  

export type iFooterProps = {
  color  : string
  count  : number
  opacity: number
}

@tag('i-login-footer')
export default class extends Component {
  static css = [ css]
  static props = {
    color:{
      type: String,
      default: "#054e79"
    }
  }    
 
  render(props:iFooterProps){
    return  <div className='i-login-footer'>
      <div className="i-login-footer-wrapper"> 
          福建环宇通信息科技股份公司 版权所有 ©2023-2024
      </div>        
    </div>
  }
}

