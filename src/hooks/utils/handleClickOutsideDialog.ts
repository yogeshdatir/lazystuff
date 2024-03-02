import { MouseEvent, RefObject } from 'react'

const handleClickOutsideDialog = <T extends HTMLDialogElement>(event: MouseEvent<HTMLDialogElement>, ref: RefObject<T>) => {
  const dialogDimensions = ref.current?.getBoundingClientRect()
  if (
    event.clientX < (dialogDimensions?.left || 0) ||
    event.clientX > (dialogDimensions?.right || 0) ||
    event.clientY < (dialogDimensions?.top || 0) ||
    event.clientY > (dialogDimensions?.bottom || 0)
  ) {
    ref.current?.close()
  }
}

export default handleClickOutsideDialog