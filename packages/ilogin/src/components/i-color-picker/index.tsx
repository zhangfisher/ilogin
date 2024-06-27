/**
 *  
 * 在容器低部添加一个波浪效果
 * 
 */

import { h,signal, tag,Component,bind } from 'omi' 
import css from "./index.css?raw"  
import { iLoginOptions } from '../../types'
import { primaryColor} from '../../context'
import classnames from "classnames"

export type iColorPickerProps = {
  value:string
  readonly:boolean
  size: 'small'|'default'|'large'
  selected:boolean
}

@tag('i-color-picker')
export default class extends Component<iColorPickerProps> {
  static css = [ css]
  static props = {
    value:{
      type: String,
      default:'#057ab1'
    },
    size:{
      type: String,
      default:'default'
    },
    readonly:{
      type: Boolean,
      default:false
    },
    selected:{
      type: Boolean,
      default:false
    } 
  }    
  value = signal(this.props.value)
  inject = ["options"]
  get options():iLoginOptions{
    // @ts-ignore
    return this.injection.options
  }
  

  @bind
  onColorChange(e:any){
    const color = e.target.value;
    this.props.value = color;
    primaryColor.value  = color;
    this.fire("change",color)
    e.stopPropagation()
  }
  @bind
  onColorInput(e:any){
    const color = e.target.value;
    this.props.value = color;
    primaryColor.value = color; 
    this.fire("input",color)
    this.update()
    e.stopPropagation()
  } 
  @bind
  onClickColor(e:any){    
    this.fire("click",this.props.value)
    e.stopPropagation()
  }

  render(props:iColorPickerProps){
     return  <span className={classnames('i-color-picker ',props.size,{
        selected:props.selected
     })} 
      onClick={this.onClickColor}      
      style={{
          backgroundColor:props.value   
      }}>
        { props.readonly ? "" :
          <input type="color" value={props.value} 
            onInput={this.onColorInput}        
            onChange={this.onColorChange}
          /> 
      }      
      </span>
  }
}

