import { h,tag,Component, effect,bind} from "omi"
import { InputAction, iInputProps } from "../../components/i-input";


export type VerifyCodeFieldProps = iInputProps & {
    timeout:number          // 发送验证码的等待时间，以秒为单位
    sendUrl:string          // 发送验证码的地址
}
 
@tag("i-verify-code-field")
export default class extends Component<VerifyCodeFieldProps> {
    tmId:any = 0
    isSend:boolean = false      // 是否已经发送了验证码
    countDown:boolean = false   // 倒计时
    static props  ={
        timeout:{
            type:Number,
            default:60
        }
    }
    ready(): void {
        effect(()=>{

        })
    }
    @bind
    onClickSend(action:InputAction){ 
        if(this.isSend) return
        if(this.props.timeout<=1) return
        let times = this.props.timeout
        this.isSend = true
        action.label.value = `${this.props.timeout}s`
        this.tmId = setInterval(()=>{
            times--      
            action.label.value = `  ${times}s  `                  
            this.update()
            if(times==0){
                clearInterval(this.tmId)
                action.label.value = `发送验证码`
                this.isSend = false
                times = this.props.timeout
            }
        },1000) 
    }
    render(props:VerifyCodeFieldProps){
        const options=  Object.assign({ 
            actions:[
                {icon:'verify-code',position:'before'}, 
                {id:"send",label:"发送验证码",
                    onClick:this.onClickSend
                }
            ],
            placeholder:'验证码',
        },props)
        return <i-input
            {...options}
        />
    }
}