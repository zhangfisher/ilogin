import { h, tag,  Component } from 'omi' 
import css from "./app.css?raw"
import { tailwind } from './tailwind'
import "../../../packages/ilogin/src"  

@tag('my-app')
export default class extends Component {
  static css = [tailwind, css] 

  render() { 
    return (
      <div className='px-5'> 
         <i-login/>  
      </div>
    )
  }
}

