import { makeAutoObservable } from 'mobx'

type State = {
  dragging: boolean
}

export class ResizerStore {
  state: State = {
    dragging: false,
  }

  constructor() {
    makeAutoObservable(this)
  }

  onMouseMove = (event: MouseEvent) => {
    const content = document.getElementById('content')
    const textiles = document.getElementById('textiles')
    if (!content || !textiles) return

    const rect = content.getBoundingClientRect()
    const width = ((event.clientX - rect.left) / rect.width) * 100
    const clamped = Math.max(10, Math.min(90, width));
    textiles.style.width = `${clamped}%`
  }

  onMouseUp = () => {
    this.setDragging(false)
  }

  setDragging = (value: boolean) => {
    this.state.dragging = value

    if (this.state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  }
}
