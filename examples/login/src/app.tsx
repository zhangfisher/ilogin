import { h, tag,  Component ,bind} from 'omi' 
import css from "./app.css?raw"
import { tailwind } from './tailwind'
import "../../../packages/ilogin/src"  

@tag('my-app')
export default class extends Component {
  static css = [tailwind, css] 
  inject=["loginOptions"]
  @bind
  validate(){
    return 1000
  }
  render() { 
    return (
      <>
         <i-login/>  
      </>
    )
  }
}

