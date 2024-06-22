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
import "../i-background"
import "../i-waves"
import "../i-form"
import "../i-layout"
import "../i-image"
import "omiu"

import { getPropGroup } from '../utils/getPropGroup'
 

export type iLoginProps = {
  title: string
  logo: string
  primaryColor: string
  copyright: string
}

@tag('i-login')
export default class extends Component {
  static css = [ css]
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
    rootProps: this.props
  } 

  renderHeader(){

  }
  renderFooter(){
    this.props
  }

  renderForm(){

  }
  
  render(props:iLoginProps  ) {
    return (<>
      <div className="i-login">
        <i-login-layout>           
            <i-image slot="left" src="https://mdbcdn.b-cdn.net/img/Photos/Thumbnails/Square/1.webp"></i-image>
            <i-login-form slot="right"></i-login-form>
        </i-login-layout>
        <i-waves {...getPropGroup("waves",props,{color:props.primaryColor})}/>     
      </div></>

    )
  }
}

