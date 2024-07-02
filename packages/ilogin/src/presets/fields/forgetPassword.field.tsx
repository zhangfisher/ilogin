/**
 * 显示一个忘记密码的链接
 */

import { h,tag,Component} from "omi"

export type ForgetPasswordFieldProps={
    label:string    
}


@tag("i-forget-password-field")
export default class extends Component<ForgetPasswordFieldProps> { 
    render(props: ForgetPasswordFieldProps) {
        return <i-link {...Object.assign({
            label:"忘记密码?"
        },props)}></i-link>
    }
}