import { h,tag,Component, bind,css, signal} from "omi"
import { iInputProps } from "../../components/i-input";
import { isEmpty } from "../../utils/isEmpty";


const style = css`
   :host .refresh{
        min-width: 128px;
        justify-content: center;
        display: flex;
        align-items: center;
   }
`

export type CaptchaFieldProps = iInputProps & { 
    fetchUrl:string              // 读取验证图片的地址
    validUrl:string              //  验证验证码的地址,插件变量为{code}
}
 
@tag("i-captcha-field")
export default class extends Component<CaptchaFieldProps> {
    static css= [ style ]
    tmId:any = 0 
    captchaImgData = signal('')
    isCaptchaFetching = signal(false)
    static props  ={        
        fetchUrl:{ 
            type:String,
            default:"captcha.png"
        },
        validUrl:{ 
            type:String,
            default:""
        }
    }
    install(): void { 
        this.isCaptchaFetching.value = true
        this.getCaptchaImage(this.props.fetchUrl).then((data:any)=>{
            this.captchaImgData.value = data 
        }).finally(()=>{
            this.isCaptchaFetching.value  = false 
            this.update()
        })        
    } 
    /**
     * 使用fetch获取验证码图片，并转换为base64格式
     */
    getCaptchaImage(url:string){
        const self = this
        return new Promise((resolve,reject)=>{
                self.isCaptchaFetching.value = true
                fetch(url).then(res=>{
                    res.blob().then(blob=>{
                        let reader = new FileReader()
                        reader.onload = (e:any)=>{
                            try{
                                // @ts-ignore 
                                const data = e.target.result   
                                resolve(data)
                            }catch{
                                console.error("验证码图片转换失败")
                            }                  
                        }
                        reader.onerror = (e:any)=>{
                            reject(e)
                        }                        
                        reader.readAsDataURL(blob)
                    }).catch(e=>reject(e))
                }).finally(()=>{                                                   
                    self.isCaptchaFetching.value = false
                })
        })
    }

    refreshCaptcha(){        
        this.isCaptchaFetching.value = true
        this.getCaptchaImage(this.props.fetchUrl).then((data:any)=>{
            this.captchaImgData.value = data 
        }).finally(()=>{
            this.isCaptchaFetching.value  = false 
            this.update()
        })   
    }

    @bind
    onRefreshCaptcha(){ 
        this.refreshCaptcha()
    }
    render(props:CaptchaFieldProps){
        const options=  Object.assign({ 
            actions:[
                {icon:'captcha',position:'before'}, 
                {
                    id     : "refresh",
                    label  : "",
                    tips   : "点击刷新验证码",
                    onClick: this.onRefreshCaptcha,
                }
            ],
            type:"text",
            placeholder:'验证码',
        },props)
        return <i-input {...options}>
            <span slot="refresh" className="refresh">
                {
                    this.isCaptchaFetching.value ?
                    <i-icon name="loading"/>
                    : (isEmpty(this.captchaImgData.value) ? null :  <img src={this.captchaImgData.value}/>) 
                }
            </span>
        </i-input>
    }
}

 