/**
 * 
 * 调节颜色亮度
 * 
 * 当color是暗色时调亮
 * 当color是亮色时调暗
 * 
 */
import Color from 'color'

export function adjustColorSaturate(color:string,rate:number){
    const c = Color(color)
    return c.saturate(rate).hex()
}