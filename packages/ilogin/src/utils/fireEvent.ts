
export function fireEvent(this:HTMLElement,name:string,data:any){
    const event = new CustomEvent(name, {
        detail: data,
        bubbles: true,
        composed: true
    });
    this.dispatchEvent(event);
}