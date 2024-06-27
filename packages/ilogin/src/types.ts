

//  登录类型
export enum LoginTypes{
    Basic          = 'basic',               // 基本的帐号密码登录，包含可以个可选的图形验证码
    QrCode         = 'qrcode',              // 二维码扫码登录
    MailVerifyCode = 'mailVerifyCode',      // 邮箱验证码登录
    MpVerifyCode   = 'mpVerifyCode',        // 手机验证码登录
    verifyCode     = 'verifyCode'           // 邮箱或手机验证码登录，提供发送验证码的按钮，然后等待输入验证码
}

export type PresetInputField = 
    'username' 
    | 'password' 
    | 'passwordWithView'
    | 'verifyCode'    
    | 'rememberMe'
    | 'autoLogin'
    | 'captcha'
    | 'forgetPassword'
    | 'register'
    | 'login'


export type LoginField =  (string | Record<string,any>)[]

export type LoginFieldLayout = {

}

export type LoginFormDefine = { 
    title: string,                          // 表单标题
    url: string,                            // 表单提交地址    
    fields: Array<LoginField>               // 表单字段定义
}

        // 外观配置
export type iLoginOptions ={
    title: string                           // 应用标题
    subTitle?:string                         // 应用副标题
    logo:string                             // 应用logo图片地址    
    copyright?:string
    homepage?:string
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
        // 表单配置
        form:{
            title:string                    // 表单标题,为空时不显示
            offsetX: number | string        // 表单水平偏移量
            offsetY: number | string        // 表单垂直偏移量
            width: number | string          // 指定表单宽度
            transparent: boolean            // 是否透明背景
            shadow: boolean                 // 是否显示阴影
            border : boolean                // 是否显示边框
        }
    },
    // 登录配置
    login:Record<string,LoginFormDefine>
    thirdPartyLogin:Record<string,any>
    // 注册配置
    register:{
        enable:boolean                      // 是否启用注册
        url:string                          // 注册地址
        fields: Array<LoginField>           // 注册表单字段定义
    }
}        
        