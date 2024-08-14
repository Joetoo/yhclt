export const hideElement = (element: HTMLElement, removeFromFlow = false) => {
  // eslint-disable-next-line ts/no-unused-expressions
  removeFromFlow ? (element.style.display = 'none') : (element.style.visibility = 'hidden')
}
