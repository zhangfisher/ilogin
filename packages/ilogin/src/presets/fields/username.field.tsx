import { h,Component,tag } from "omi"
import { iInputProps } from "../../components/i-input";

export function UserNameField(props?:Partial<iInputProps>){
    return <i-input
        {...Object.assign({
            actions:[
                {icon:'user',position:'before'},
            ],
            placeholder:'用户名',
        },props)}
    />
}
  



@tag("i-username-field")
export default class extends Component<iInputProps> {
    render(props:iInputProps){
        return <i-input
        {...Object.assign({
            actions:[
                {icon:'user',position:'before'},
            ],
            placeholder:'用户名',
        },props)}
    />
    }
}