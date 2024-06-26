/**
 *  
 * 在容器低部添加一个波浪效果
 * 
 */

import { h,signal, tag,Component,effect } from 'omi' 
import css from "./index.css?raw"  
import { iLoginOptions } from '../types'
import { context } from '../i-login/options'

export type iColorPickerProps = {
  value:string
}

@tag('i-color-picker')
export default class extends Component<iColorPickerProps> {
  static css = [ css]
  static props = {
    value:{
      type: String,
      default:'#057ab1'
    } 
  }    
  value = signal(this.props.value)

  inject = ["options","ilogin"]
  get options():iLoginOptions{
    // @ts-ignore
    return this.injection.options
  }
  // 响应input type="color"的事件，提取颜色
  onColorChange(e:any){
    const color = e.target.value;
    this.value.value = color;
    this.options.appearance.primaryColor = color;
  }

  onColorInput(e:any){
    const color = e.target.value;
    this.value.value = color;
    effect(()=>{
      
    })
    context.value.appearance.primaryColor  = color;

  }
  render(props:iColorPickerProps){
    return  <span className='i-color-picker' style={{
        backgroundColor:this.value.value    
    }}>
      <input type="color" value={props.value} 
        onInput={this.onColorInput.bind(this)}        
        onChange={this.onColorChange.bind(this)}
      /> 
      </span>
  }
}

