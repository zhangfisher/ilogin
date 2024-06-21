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

export type iBackgroundProps= {
  fullScreen: boolean,
  color     : string,
  lines     : number
}


@tag('i-background')
export default class extends Component {
  static css = [ css]
  static props = {
    fullScreen: {
      type: Boolean,
      default: false
    },
    color:{
      type: String,
      default: "#054e79"
    },
    lines:{
      type:Number,
      default: 5 
    }

  }   
  el = createRef<HTMLElement>()
  renderHeader(){

  }
  renderFooter(){

  }

  renderForm(){

  }
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
   * 渲染一些装饰线条
   */
  renderLines(props:iBackgroundProps){
    const { lines,color } = props
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
        backgroundColor: color,
        opacity        : 0.6,
        background     : getGradientBackground({color,direction:'radial'})         
      }}/>)
    })
  }
  render(props:iBackgroundProps) {
    const { color } = props
    return (   
      <div ref={this.el} className='i-background' style={{
          backgroundColor:color,
          background:getGradientBackground({color}), 
        }}>
        ibackground
        {this.renderLines(props)}
      </div>

    )
  }
}

