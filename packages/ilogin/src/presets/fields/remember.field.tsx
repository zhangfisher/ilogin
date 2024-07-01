/**
 * 显示一个记住我的复选框
 */

import { h,tag,Component, bind,css, signal} from "omi"

export type RememberFieldProps={
    label:string    
}


@tag("i-remember-field")
export default class extends Component<RememberFieldProps> {
    static props ={
        label:{
            type:String,
            default:"记住登录"
        }
    }
    render(props: any) {
        return <i-checkbox></i-checkbox>
    }
}