import { h, tag,  signal, Component, createRef } from 'omi' 
import css from "./app.css?raw"
import { tailwind } from './tailwind'
import "../../../packages/ilogin/src"  

@tag('my-app')
export default class extends Component {
  static css = [tailwind, css]
  installed(): void {
      
  }

  render() {
    console.log("redder")
    return (
      <div className='px-5'> 
         <i-login/>  
      </div>
    )
  }
}

