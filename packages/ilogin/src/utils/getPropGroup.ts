  /**
   * 获取一个组件的的属性组，如:
   * 
   * @example
   * 
   *  getGroupOptions("wave",props)
   *  代表获取所有以wave-开头的属性
   * 
   * 
   * 
   * @param name 
   * @param props 
   * @returns 
   */
export function getPropGroup(name:string, props:Record<string,any>,defaultProps:Record<string,any>){
    let results:Record<string,any> = Object.assign({},defaultProps)
    Object.entries(props).forEach(([key,value])=>{
      if(key.startsWith(`${name}-`)){
        results[key.substring(name.length+1)] = value
      }
    })
    return results
  }