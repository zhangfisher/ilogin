export function isEmpty(v:any){
    return v===undefined || v===null 
    || typeof(v)=='string' && v.trim()===''
    || typeof(v)=='object' && Object.keys(v).length===0
}