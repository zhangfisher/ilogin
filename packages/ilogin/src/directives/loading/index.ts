import { registerDirective } from 'omi'

registerDirective('loading', (el: HTMLElement, options: { enable: boolean,message?:string,background?:string }) => {
  
  const { enable,message,background='var(--i-background-color);' } = Object.assign({
    enable: true,
    message:'加载中...'
  }, typeof(options)=='object' ? options : {
    enable:typeof(options)=='boolean' ? options : true
  })
  if(!enable) return 

  const style = document.createElement('style')
  style.innerHTML = ` 
    .loading {
      position: absolute;
      top:0;
      left:0;
      width: 100%;
      height: 100%;     
      display: flex;
      align-items: center;
      justify-content: center; 
      flex-direction: column;
      background: ${background}
    }
    .loading > .indicate{
      position: relative;
      width: 30px;
      height: 30px;
      border: 2px solid #000;
      border-top-color: rgba(0, 0, 0, 0.2);
      border-right-color: rgba(0, 0, 0, 0.2);
      border-bottom-color: rgba(0, 0, 0, 0.2);
      border-radius: 100%;    
      animation: circle infinite 0.75s linear;
    }    
    .loading > .message {
      padding: 10px;
      font-size: 1em;
    }
    @keyframes circle {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    } 
  `
  el.appendChild(style)
  const div = document.createElement('div')
  div.innerHTML=`<div class="loading">
    <div class="indicate"></div>
    <div class="message">${message}</div>
  </div>`
  el.appendChild(div)

})