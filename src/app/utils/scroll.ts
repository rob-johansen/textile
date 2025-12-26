const options: ScrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}

export const scrollTo = (id: string, delay = false): void => {
  if (delay) {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView(options)
    }, 50)
  } else {
    document.getElementById(id)?.scrollIntoView(options)
  }
}
