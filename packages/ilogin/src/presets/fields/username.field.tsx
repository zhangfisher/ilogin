import { h,Component,tag } from "omi"
import { iInputProps } from "../../components/i-input";
@tag("i-username-field")
export default class extends Component<iInputProps> {
    render(props:iInputProps){  
        return <i-input
                {...Object.assign({
                    actions:[
                        {icon:'user',position:'before'},
                    ],
                    placeholder:'用户名',   
                    name:'username', 
                },props,{type: "text"})}
            />
    }
}

// name={props.name || 'username'}
// type="text"
// placeholder="用户名"
// actions={props.actions}
// size={props.size}
// value={props.value}
// pattern={props.pattern}
// required={props.required}
// length={props.length}
// validate={props.validate}