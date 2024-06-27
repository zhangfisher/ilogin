/**
 * 
 * 调节颜色亮度
 * 
 * 当color是暗色时调亮
 * 当color是亮色时调暗
 * 
 */
import Color from 'color'

export function adjustBrightness(color:string,rate:number){
    const c = Color(color)
    if(c.luminosity()>0.5){ // c.isLight()
        return c.darken(rate).hex()
    }else{
        return c.lighten(rate).hex()
    }
}