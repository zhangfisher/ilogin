/**
 * 将一个驼峰命名转换为CSS变量命名样式，如borderRadius => --border-radius
 * 
 * 如果指定了 prefix，则会被移除
 * 
 * @param camelCase 
 * @returns 
 */

export function toCssVarName(camelCase:string,prefix?:string){
    let r=  `--${camelCase.replace(/([a-z])([A-Z])/g, (_, p1, p2) => p1 + '-' + p2.toLowerCase())}`
    if(prefix && prefix.trim()!==''){
        r = r.replace("--",`--${prefix.toLowerCase()}-`)
    }
    return r
}