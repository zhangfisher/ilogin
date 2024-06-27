/**
 *  
 * 在容器低部添加一个波浪效果
 * 
 */

import { h, tag,Component,effect } from 'omi' 
import css from "./index.css?raw" 
import { iLoginOptions } from '../../types'
import { primaryColor } from '../../context'
import { adjustBrightness } from '../../utils/adjustBrightness' 

export type iWavesProps = {
  color  : string
  count  : number
  opacity: number
}

@tag('i-waves')
export default class extends Component {
  static css = [ css]
  static props = {
    color:{
      type: String,
      default: "#054e79"
    },
    count:{
      type: Number,
      default: 3
    },
    opacity:{
      type: Number,
      default: 0.2
    }
  }    
  inject = ["options","ilogin"]
  get options():iLoginOptions{
    // @ts-ignore
    return this.injection.options
  }
  color = primaryColor.value
  installed(): void {      
    effect(()=>{
      this.color =primaryColor.value
      this.update()
    })
  }
  render(props:iWavesProps){
    const { count,opacity } = props 
    let rate = 0.6, delay=3, duration = 2
    return  <svg class="i-waves" style={{opacity}} viewBox="0 24 150 24" preserveAspectRatio="none">
        <defs>
            <path id="wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g>
          {
            new Array(count).fill(0).map(()=>{
              delay+=1
              rate+=0.3
              duration+=1
              const x = 50, y = 0              
              const fillColor =adjustBrightness(this.color,rate)
              return <use class="wave" xlink:href="#wave" fill={fillColor} x={x} y={y}
                style={{
                  animationDelay:`-${delay}s`,
                  animationDuration:`${duration}s`,
                }}
              />
            })
          }
      </g>
    </svg>
  }
}

