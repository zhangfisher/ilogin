import { h,Component,tag,bind, signal } from "omi"
import { InputAction, InputActionDefine, iInputProps } from "../../components/i-input";

 
export type iPasswordFieldProps = iInputProps & {
    allowView:boolean
}

@tag("i-passowrd-field")
export default class extends Component<iPasswordFieldProps> {
    inputType = signal("password")
    static props = {
        allowView:{
            type:Boolean,
            default:false
        }
    }
    @bind
    onViewPassword(){ 
        if(this.inputType.value=="password"){
            this.inputType.value = "text"
        }else{
            this.inputType.value = "password"
        } 
    }
    installed(): void {
        this.addEventListener('action', (evt) => {
            
        })
    }
    render(props:iPasswordFieldProps){ 
        const actions = [ {icon:'lock',position:'before'}] as any[]
        if(props.allowView){
            actions.push({
                icon:props.allowView ? ['view-off','view'] : null,
                position:'after',
                onClick:this.onViewPassword
            })
        }
        return <i-input
        {...Object.assign({
            actions:actions,
            type:this.inputType.value,
            placeholder:'密码',
        },props)}
    />
    }
}