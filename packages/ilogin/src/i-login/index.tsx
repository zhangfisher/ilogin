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

// const count = signal(0)

@tag('i-login')
export default class extends Component {
  static css = [ css]
  static defaultProps = {
    title: 'iLogin'
  } 
  static propTypes = {
    title: String,
    logo: String
  }

  renderHeader(){

  }
  renderFooter(){

  }

  renderForm(){

  }
  
  render() {
    return (
      <div>
        iLogin
      </div>

    )
  }
}

