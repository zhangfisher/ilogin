/**
 * 
 *  <i-login
 *    logo="https://omi.cdn-go.cn/s/latest/omi.svg"
 *    title="Voerka"
 *    copyright="© 2021 Voerka. All rights reserved."
 *    background="https://cdn.voerka.com/background.jpg"
 *  />
 * 
 *  <script> 
 *    iLogin.config({
 *        logo: 'https://omi.cdn-go.cn/s/latest/omi.svg',
 *        title:"Voerka",
 *        theme:"",
 *        
 * 
 *    })
 *  </script>
 * 
 * 
 */

import { h, tag,  createRef,Component } from 'omi' 
import css from "./index.css?raw" 
import { getGradientBackground } from './gradient' 
import Color from "color"

export type iBackgroundProps= {
  fullScreen  : boolean
  primaryColor: string
  lines       : number
  waves       : {
    count     : number                // 波浪的数量

  }
}


@tag('i-background')
export default class extends Component {
  static css = [ css]
  static props = {
    fullScreen: {
      type: Boolean,
      default: false
    },
    primaryColor:{
      type: String,
      default: "#00639c"
    },
    lines:{
      type:Number,
      default: 5 
    }

  }   
  el = createRef<HTMLElement>() 
  /**
   * 获取元素的宽度和高度
   */
  getSize(){
    if(this.el.current){
      const { width,height } =  this.el.current.getBoundingClientRect()
      return [width,height ]  
    }else{
      return [window.innerWidth,window.innerHeight]
    }
  }
  /**
   * 获取一个组件的的属性组，如:
   * 
   * @example
   * 
   *  getGroupOptions("wave",props)
   *  代表获取所有以wave-开头的属性
   * 
   * 
   * 
   * @param name 
   * @param props 
   * @returns 
   */
  getGroupOptions(name:string, props:iBackgroundProps){
    let results:Record<string,any> = {}
    Object.entries(props).forEach(([key,value])=>{
      if(key.startsWith(`${name}-`)){
        results[key.substring(name.length+1)] = value
      }
    })
    return results
  }

  /**
   * 渲染一些装饰线条
   */
  renderLines(props:iBackgroundProps){
    const { lines,primaryColor } = props
    const [ width,height ]= this.getSize()
    const rate = 0.8
    return new Array(lines).fill(0).map(()=>{
      const ww = 1.5 * (width * rate + width * Math.random())
      const hh = ww
      const top = height * 0.5 +  height*Math.random()
      const left = - ww * 0.5 + ww*Math.random()
      return (<div style={{
        position       : 'absolute',
        width          : `${ww}px`,
        height         : `${ hh}px`,
        borderRadius   : `${ww}px`,
        top            : `${top}px`,        
        left           : `${left}px`,
        backgroundColor: primaryColor,
        opacity        : 0.6,
        background     : getGradientBackground({color:primaryColor,direction:'radial'})         
      }}/>)
    })
  } 
  render(props:iBackgroundProps) {
    const { primaryColor } = props 
    return (   
      <div ref={this.el} className='i-background' style={{
          // backgroundColor:primaryColor,
          // background:getGradientBackground({color:primaryColor}), 
        }}>  
      </div>

    )
  }
}

