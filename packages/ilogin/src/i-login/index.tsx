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

import { h, tag,  Component, signal } from 'omi' 
import css from "./index.css?raw" 
import layout from "../i-layout/index.css?raw"
import "../i-background"
import "../i-waves"
import "../i-form"
import "../i-image"
import "../i-input"
import "../i-checkbox"
import "../i-tabs"
import "../i-settings"
import "../i-popover"
import "../i-icon"
import "../i-color-picker"
import "@omiu/button"

import { getPropGroup } from '../utils/getPropGroup'
import { getLoginOptions,context } from './options'
import { iLoginOptions } from '../types' 


    
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
  
  options = signal<iLoginOptions>(getLoginOptions()).value

  provide = { 
    options: this.options,
    ilogin: signal<iLoginOptions>(getLoginOptions()) 
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
      <div className="i-login">
        <i-login-header />
        <div className='workspace'>           
        <div className="i-form-layout">
          <div className='field'>
            <div className='label'>R2</div>
            <div className='input'>
						  <o-button>dsd</o-button>
            </div> 
          </div>
          <div className='field'>
            <div className='label'>R2</div>
            <div className='input'>
						  <o-button>dsd</o-button>
            </div> 
          </div>
          </div>
          <i-color-picker></i-color-picker>
            <i-login-form style={{width:"30%"}}></i-login-form>
        </div>
        <i-waves {...getPropGroup("waves",props,{color:props.primaryColor})}/>     
        <i-login-footer />
      </div></>

    )
  }
}

