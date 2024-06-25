/**
 *  
 * 在容器低部添加一个波浪效果
 * 
 */

import { h, tag,Component } from 'omi' 
import css from "./index.css?raw"  

export type iHeaderProps = {
  color  : string
  logo   : string
  title  : string  
  url    : string
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
 
  render(props:iHeaderProps){
    return  <div className='i-login-header'>
      <div className="i-login-header-wrapper"> 
        <div className="i-login-header-logo">
          { props.url ? 
            <a href={props.url} target='_blank'><img src={props.logo}/> </a>
            : <img src={props.logo}/>  
        }          
        </div>
        <div className="i-login-header-title">
          <span className="i-login-header-title-text"> Voerka</span>
          <span className="i-login-header-title-subtitle">智慧能物联网开发平台服务器</span>
        </div>
        <div className="i-login-header-actions">actions</div>
      </div>        
    </div>
  }
}

