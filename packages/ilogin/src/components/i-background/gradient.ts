import Color from "color"

export type GradientBackgroundOptions = {  
    direction?  : 'horizontal' | 'vertical' | 'diagonalUp' | 'diagonalDown' | 'radial'     // 浙变方向
    color?      : string                        // 背景主颜色
    factor?     : number                        // 浙变色是在主色的基础上调亮系数
    reversed?   : boolean                       // 反转浙变方向
    radialPos?  : 'center' | 'top' | 'bottom'   // 当使用径向浙变时的位置
}
  
/**
* 生成浙变背景
*/

export function getGradientBackground(options:GradientBackgroundOptions){
    const { color:fromColor,direction,factor,reversed} = Object.assign({
        color    : "red",                      // 背景色
        direction: 'vertical',
        factor   : 0.8,
        reversed : false
    }, options) as Required<GradientBackgroundOptions>
 
    const toColor = Color(fromColor).lighten(factor).hex()
    
    const type= direction =="radial" ? "radial" : "linear"
    const toDirection = {
        horizontal  : reversed ? "to left": "to right",
        vertical    : reversed ? 'to top' : 'to bottom',
        diagonalUp  : reversed ? "45deg"  : "-45deg",
        diagonalDown: reversed ? "-45deg" : "45deg",
        radial      : "farthest-side ellipse at center"
    }[direction]
    return `${type}-gradient(${toDirection}, ${fromColor} 0%, ${toColor} 100%)`  
}