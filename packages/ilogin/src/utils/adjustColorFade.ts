/**
 * 
 * 调节颜色 
 * 
 */
import Color from 'color'

export function toggleFadeColor(color:string,rate:number){
    const c = Color(color)
    return c.fade(rate).hex()
}