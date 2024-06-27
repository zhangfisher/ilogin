export function getBasicLoginForm() {
    return {
      components: [ 
        {          
            type: 'input',
            label:"用户名",
            name: 'first',
            placeholder: '用户名',
            span: 12,
            sm: 6,
        },
        {
            type: 'input',
            name: 'last',
            label:"密码",
            placeholder: '密码',
            span: 12,
            sm: 6,
        }, 
        {
          type: 'checkbox',
          name: 'terms',
          text: '记住密码',
        }, 
        {
          type: 'divider',
        },
      ],
      submitButton: true,
      resetButton: true,
      labelStyle: {
        width: 125,
        align: 'right', // left, right, top
      },
    }
  }
  