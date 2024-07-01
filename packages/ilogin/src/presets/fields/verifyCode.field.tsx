import { h, tag, Component, bind, css, signal } from 'omi';
import { iInputAction, iInputProps } from "../../components/i-input";

const style  = css`
    i-input::part(action){
        min-width: 4em;
        justify-content: center;
    } 
    :host .tips{
        color:red;
    }

`

export type VerifyCodeFieldProps = iInputProps & {
    timeout:number          // 发送验证码的等待时间，以秒为单位
    sendUrl:string          // 发送验证码的地址
    sendTips:string         // 发送验证码后的提示信息
    validUrl:string         // 验证验证码的地址
    length:number           // 验证码的长度    
}
 
@tag("i-verify-code-field")
export default class extends Component<VerifyCodeFieldProps> {
    static css =[ style ]
    static props  ={
        timeout:{
            type:Number,
            default:5
        },        
        sendTips:{
            type:String,
            default:"验证码已发送到您的手机，请注意查收"
        },
        sendUrl:{ 
            type:String
        },
        validUrl:{ 
            type:String
        },
        length:{
            type:Number,
            default:6
        }
    }    
    tmId:any = 0
    isSend = signal(false)      // 是否已经发送了验证码
    countDown:boolean = false   // 倒计时

    @bind
    onClickSend(action:iInputAction){ 
        if(this.isSend.value) return
        if(this.props.timeout<=1) return
        let times = this.props.timeout
        this.isSend.value = true 
        action.$props.label.value = `${this.props.timeout}秒后重新发送`        
        action.update()
        this.tmId = setInterval(()=>{
            times--      
            action.$props.label.value = `${times}秒后重新发送`      
            if(times==0){
                clearInterval(this.tmId)
                action.$props.label.value = `发送验证码`
                this.isSend.value = false
                times = this.props.timeout
                action.update()
            }
        },1000) 
    }
    render(props:VerifyCodeFieldProps){
        const actions = [
            {icon:'verify-code',position:'before'},  
            {id:"send",label:"发送验证码",
                onClick:this.onClickSend
            }
        ]
        const options=  Object.assign({ 
            actions,
            placeholder:'验证码',
        },props)
        return <i-input {...options} >
            { this.isSend.value ? <span className="tips" slot="tips">{props.sendTips}</span>  : null }
        </i-input>
    }
}