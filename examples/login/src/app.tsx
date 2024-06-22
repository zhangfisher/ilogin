import { h, tag,  signal, Component, createRef } from 'omi' 
import css from "./app.css?raw"
import { tailwind } from './tailwind'
import "../../../packages/ilogin/src" 
import "color-dialog-box"

const primaryColor = signal("#00639c")
const openColorPicker = signal(false)

@tag('my-app')
export default class extends Component {
  static css = [tailwind, css]
  
  colorPicker = createRef()



  render() {

    return (
      <div className='px-5'> 
        <color-picker ref={this.colorPicker} hex="#00639" open={openColorPicker.value}></color-picker>
         <i-login/>  
      </div>
    )
  }
}

