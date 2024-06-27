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

import { h, tag,  Component } from 'omi' 
import css from "./index.css?raw" 
import layout from "./components/i-layout/index.css?raw"
import "./components/i-background"
import "./components/i-waves"
import "./components/i-form"
import "./components/i-image"
import "./components/i-input"
import "./components/i-checkbox"
import "./components/i-tabs"
import "./components/i-settings"
import "./components/i-popover"
import "./components/i-icon"
import "./components/i-color-picker"
import "@omiu/button"

import { getPropGroup } from './utils/getPropGroup'
import { backgroundColor, backgroundColorized, options, primaryColor } from './context'
import { getGradientBackground } from './components/i-background/gradient'

    
export type iLoginProps = {
  title: string
  logo: string
  primaryColor: string
  copyright: string
} 
@tag('i-login')
export default class extends Component {
  static css = [ css,layout ]
  static props = {
    title: {
      type: String,
      default: "Voerka"
    },
    logo:{
      type: String,
      default: "https://omi.cdn-go.cn/s/latest/omi.svg"
    },
    primaryColor:{
      type: String,
      default: "#054e79"
    },
    copyright:{
      type: String,
      default: "#054e79"
    }    
  }  

  provide = {  
    options: options
  } 
  
  install(){ 

  }

  installed(): void { 

  }

  removeCssVars(){

  }

  renderHeader(){

  }
  renderFooter(){
    this.props
  }

  renderForm(){

  } 

  render(props:iLoginProps) {

    return (<>
      <div className="i-login"
        style={{
          background: backgroundColor.value  
        }}
      >     
        <i-login-header />  
        <div className='workspace'>
        <i-login-form />
        </div>
        <i-waves {...getPropGroup("waves",props,{})}/>     
        <i-login-footer />
      </div></>

    )
  }
}

