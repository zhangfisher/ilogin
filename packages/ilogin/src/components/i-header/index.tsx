/**
 *  
 * 在容器低部添加一个波浪效果
 * 
 */

import { h, tag,Component } from 'omi' 
import css from "./index.css?raw"  
import { isEmpty } from '../../utils/isEmpty'

export type iHeaderProps = {
  color  : string
  logo   : string
  title  : string  
  homepage    : string

}

@tag('i-login-header')
export default class extends Component {
  static css = [ css]
  static props = {
    color:{
      type: String,
      default: "#054e79"
    },
    logo:{
      type: String,
      default: "logo.png"
    },
    title:{
      type: String,
      default: "Voerka"
    },
    url:{
      type: String
    }
  }    
  inject = ["loginOptions"]
  get options(){
    // @ts-ignore
    return this.injection.loginOptions
  }
  getHeaderProps(){
    return {
      title:this.options.title,
      logo:this.options.logo,
      homepage:this.options.homepage
    }
  }
  render(){ 
    const {logo,homepage,title,subTitle} = this.options
    return  <div className='i-login-header'>
      <div className="wrapper"> 
        <a href={isEmpty(homepage) ? "#" : homepage} target='_blank'>
        <div className="logo">
          <img src={logo}/> 
        </div>
        <div className='title-wrapper'>
          <span className="title"> {title}</span>
          { isEmpty(subTitle) ? null : <span className="subtitle">{subTitle}</span> }
        </div>
        </a>
        <div className="actions">
          
        <i-popover> 
            <div slot='content'>dfdfd
            </div>
          </i-popover> 
        </div>
      </div>        
    </div>
  }
}

