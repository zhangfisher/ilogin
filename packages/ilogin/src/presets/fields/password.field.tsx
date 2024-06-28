import { h,Component,tag,bind } from "omi"
import { InputAction, iInputProps } from "../../components/i-input";

 
export type iPasswordFieldProps = iInputProps & {
    allowView:boolean
}

@tag("i-passowrd-field")
export default class extends Component<iPasswordFieldProps> {
    inputType = "password" 
    @bind
    onViewPassword(){ 
        if(this.inputType=="password"){
            this.inputType = "text"
        }else{
            this.inputType = "password"
        }
        this.update()
    }
    render(props:iPasswordFieldProps){
        return <i-input
        {...Object.assign({
            actions:[
                {icon:'lock',position:'before'},
                {
                    icon:props.allowView ? ['view-off','view'] : null,
                    position:'after',
                    onClick:this.onViewPassword
                },
            ],
            type:this.inputType,
            placeholder:'密码',
        },props)}
    />
    }
}