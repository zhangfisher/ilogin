import { InputActionDefine } from "./components/i-input"


//  登录类型
export enum LoginTypes{
    Basic          = 'basic',               // 基本的帐号密码登录，包含可以个可选的图形验证码
    QrCode         = 'qrcode',              // 二维码扫码登录
    MailVerifyCode = 'mailVerifyCode',      // 邮箱验证码登录
    MpVerifyCode   = 'mpVerifyCode',        // 手机验证码登录
    verifyCode     = 'verifyCode'           // 邮箱或手机验证码登录，提供发送验证码的按钮，然后等待输入验证码
}

export type LoginFormFieldType = 
    'username' 
    | 'password'  
    | 'verifyCode'    
    | 'remember'
    | 'autoLogin'
    | 'captcha'
    | 'forgetPassword'
    | 'register'
    | 'login'
    | 'submit'
    | 'input'
    | 'checkbox'

export type LoginFormField =  {
    type        : LoginFormFieldType
    label       : string
    placeholder?: string
    // 验证失败时应触发的错误消息
    //如throw new Error("长度不足")或者直接返回错误消息字符串，将显示在输入框下方
    validate?   : RegExp | ((value:string)=>boolean | string | Promise<boolean | string>)  
    // 限定长度
    length?     : [number,number]
    pattern?    : string
    url?        : string
    tips?       : string
    icon?       : string
    actions?    : Array<InputActionDefine>    
} & Record<string,any>

export type LoginFieldLayout = {

}

export type LoginFormDefine = { 
    title: string                           // 表单标题
    url?: string                             // 表单提交地址    
    validate?:{                              // 表单验证规则
        on?:"input" | 'blur' | 'submit'      // 验证时机，input:输入时验证，blur:失去焦点时验证,submit:提交时验证        
    }   
    fields: Array<LoginFormField | Array<LoginFormField>>               // 表单字段定义    

}


export type iLoginOptions ={
    title: string                           // 应用标题
    subTitle?:string                        // 应用副标题
    logo:string                             // 应用logo图片地址    
    copyright?:string
    homepage?:string
    hero?:string                            // 指定主题图片
    layout:{
        cols: 1 | 2                         // 布局列数，取值1,2,3

    }
    // 外观配置
    appearance:{        
        primaryColor:string,                // 主色调
        secondaryColor:string,              // 次色调
        successColor:string,                // 成功色调
        warningColor:string,                // 警告色调
        infoColor:string,                   // 信息色调
        errorColor:string,                  // 错误色调
        textColor:string,                   // 文本颜色
        fontSize:string | number            // 字体大小
        // 标题配置
        title:{
            visible: boolean                // 是否显示标题
        }
        // 工作区背景配置
        background:{
            colorized:boolean               // 基于主色调生成一个背景色
            color:string                    // 背景颜色
            images:Array<string>            // 背景图片CSS样式
            // 底部启用波纹效果
            waves:{
                enable:boolean,             // 是否启用波纹效果
                count:number,               // 波纹数量
                speed:number,               // 波纹速度
            }
        }

    },        
    // 登录面板
    panel:{
        title:string                    // 表单标题,为空时不显示
        col: number                     // 指定表单面板显示在哪一个列，取值
        offsetX: number | string        // 表单水平偏移量
        offsetY: number | string        // 表单垂直偏移量
        width: number | string          // 指定表单宽度
        transparent: boolean            // 是否透明背景
        shadow: boolean                 // 是否显示阴影
        border : boolean                // 是否显示边框
    }
    // 登录配置
    login:Record<string,LoginFormDefine>
    thirdPartyLogin:Record<string,any>
    // 注册配置
    register:{
        enable:boolean                      // 是否启用注册
        url:string                          // 注册地址
        fields: Array<LoginFormField>           // 注册表单字段定义
    }
}        
        