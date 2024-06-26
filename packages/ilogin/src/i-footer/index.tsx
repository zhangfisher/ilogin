/**
 *  
 * 在容器低部添加一个波浪效果
 * 
 */

import { h, tag,Component } from 'omi' 
import css from "./index.css?raw"  
import { isEmpty } from '../utils/isEmpty'

@tag('i-login-footer')
export default class extends Component {
  static css = [ css]
  inject = ["options"]
  get options(){
    // @ts-ignore
    return this.injection.options
  }
 
  render(){
    return  <div className='i-login-footer'>
      <div className="wrapper"> 
         {isEmpty(this.options.copyright) ? "iLogin copyright @2023-2024" : this.options.copyright}
      </div>        
    </div>
  }
}

