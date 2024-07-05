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
import './directives'
import "./components"
import "./presets/fields"
import "@omiu/button"

import { getPropGroup } from './utils/getPropGroup'
import {  options } from './context'
 
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
      default: "#0873b1"
    } 
  }  

  provide = {  
    loginOptions: options
  }  

  render(props:iLoginProps) {

    return (<>
      <div className="i-login">     
        <i-login-header />   
            <div className='workspace'>
              <i-login-panel />
            </div> 
        <i-waves {...getPropGroup("waves",props,{})}/>     
        <i-login-footer />
      </div></>

    )
  }
}

