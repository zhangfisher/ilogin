/**
 * 
 * 处理登录相关的配置
 * 
 */

import deepmerge from "deepmerge"
import { toCssVarName } from "./utils/toCssVarName"
import { iLoginOptions } from "./types"
import { effect, signal } from "omi"

function generateCssVars(config:iLoginOptions){
    const cssVars:Record<string,string> ={}
    Object.keys(config.appearance).map(key=>{
        if(key.endsWith("Color")){
            // @ts-ignore
            cssVars[toCssVarName(key)]= config.appearance[key]        
        }        
    })
    // 将CSS变量插入全局变量中
    Object.keys(cssVars).forEach(key=>{
        document.documentElement.style.setProperty(key,cssVars[key])
    })
    return cssVars
}



export function getLoginOptions(){
    //@ts-ignore
    const userConfig = window.iLogin || {}
    //@ts-ignore
    if(!window.iLogin){
        console.info("Please use window.iLogin={...} to config iLogin")
    }
    const finalConfig:iLoginOptions = deepmerge({        
        title:"iLogin",
        subTitle:"高度可扩展登录页组件方案",
        logo:'/logo.svg',
        copyright:"©2021 Voerka Group",
        // homepage:"/",
        layout:{
            cols:1
        },
        appearance:{
            primaryColor   : "#0873b1",
            secondaryColor : "#f5222d",
            successColor   : "#52c41a",
            warningColor   : "#faad14",
            infoColor      : "#1890ff",
            errorColor     : "#f5222d",
            textColor      : "#333",
            fontSize       : '16px',
            title:{
                visible:true
            },
            background:{
                colorized:false,
                images:[],                
                color: "#fff",
                waves:{
                    enable:true,
                    count:3,
                    speed:1
                }
            }
        },
        panel:{ 
            title:"欢迎",
            offsetX:0,
            offsetY:0,
            width:300,
            transparent:false,
            shadow:true,
            border:true            
        },
        login:{
                            
        },
        thirdPartyLogin:{
            
        },
        register:{
            enable:true,
            url:"",
            fields:[]
        }
    },userConfig) 

    // 生成CSS变量
    generateCssVars(finalConfig)

    return finalConfig
}


export const options = getLoginOptions()
export const primaryColor = signal(options.appearance.primaryColor)
export const backgroundColor = signal(options.appearance.background.color)
export const backgroundColorized = signal(options.appearance.background.colorized)

effect(()=>{
    options.appearance.primaryColor = primaryColor.value 
})
effect(()=>{
    options.appearance.background.color = backgroundColor.value
})
effect(()=>{
    options.appearance.background.colorized = backgroundColorized.value
})



export const colors = {
    primary:primaryColor.value,
    secondary:options.appearance.secondaryColor,
    success:options.appearance.successColor,
    warning:options.appearance.warningColor,
    info:options.appearance.infoColor,
    error:options.appearance.errorColor,
    text:options.appearance.textColor
}