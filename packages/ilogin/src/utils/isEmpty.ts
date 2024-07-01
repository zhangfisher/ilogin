export function isEmpty(v:any){
    return v===undefined || v===null || typeof(v)=='string' && v.trim()==='';
}