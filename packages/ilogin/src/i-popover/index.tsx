import { tag, h,Component, classNames } from 'omi'
import { createPopper } from '@popperjs/core' 
import 'omi-transition'

interface Props {
  placement?: string
  show: boolean
  hover: boolean
}

// @ts-ignore
@tag('i-popover')
export default class iPopover extends Component<Props> {
  static css = [ 
    `:host {
      display: inline-block;
    }

    .fade-leave-to,
    .fade-enter-from {
      opacity: 0;
    }

    .fade-leave-active,
    .fade-enter-active {
      transition: opacity 300ms ease-in;
    }
`,]

  static defaultProps = {
    show: false,
    hover: false,
    placement: 'bottom',
  }
  popEl:any
  refEl:any
  popper:any
  install() {
    this.state.show = this.props.show
    window.addEventListener('click', (evt:any) => {
      // @ts-ignore
      const path = evt.path || (evt.composedPath && event.composedPath())
      const isClickOutside =
        (path ? path.indexOf(this.popEl) < 0 : !this.popEl.contains(evt.target)) &&
        (path ? path.indexOf(this.refEl) < 0 : !this.refEl.contains(evt.target))
      if (!isClickOutside) {
        return
      }
      this.state.show = false
      this.update()
    })
  }
  // @ts-ignore
  showPopover = (evt:any) => {
    this.popper && this.popper.destroy()
    const tip = this.shadowRoot!.querySelector('slot')!.assignedNodes()[0]
    // @ts-ignore
    this.popper = createPopper(tip, this.shadowRoot!.querySelector('.tip'), {
      placement: this.props.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    })

    this.state.show = !this.state.show
    this.update()
    this.fire(this.state.show ? 'show' : 'hide')
  }

  showPopoverByHover = (evt:any) => {
    if (this.props.hover) {
      this.showPopover(evt)
    }
  }

  hidePopover = () => {
    if (this.props.hover) {
      this.state.show = false
      this.update()
      this.fire('hide')
    }
  }

  state = {
    show: false,
  }

  render(props:Props) {
    return (
      <>
        <slot
          ref={(e) => (this.refEl = e)}
          style="cursor:pointer"
          onClick={this.showPopover}
          onMouseenter={this.showPopoverByHover}
          onMouseleave={this.hidePopover}
        ></slot>
        <div
          show={this.state.show}
          o-transition={{ name: 'fade' }}
          style="z-index: 10000"
          class={classNames('z-100', { 
            'pointer-events-none': !this.state.show,
            fixed: true,
            tip: true,
          })}
        >
          <slot name="content"></slot>
        </div>
      </>
    )
  }
}