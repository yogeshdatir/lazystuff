import { useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

type Props = {};

const Modals = (props: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useClickOutside(ref, () => {
    ref.current?.close();
  });

  const handleModalOpen = () => {
    ref.current?.showModal();
  }

  const handleModalClose = () => {
    ref.current?.close();
  }

  const handleClickOutside = (e: any) => {
    const dialogDimensions = ref.current?.getBoundingClientRect()
    if (
      e.clientX < (dialogDimensions?.left || 0) ||
      e.clientX > (dialogDimensions?.right || 0) ||
      e.clientY < (dialogDimensions?.top || 0) ||
      e.clientY > (dialogDimensions?.bottom || 0)
    ) {
      ref.current?.close()
    }
  }

  return (
    <>
      <button onClick={handleModalOpen}>Open</button>
      <dialog ref={ref} onClick={handleClickOutside}>
        <span>You can see me</span>
        <button onClick={handleModalClose}>Close</button>
      </dialog>
    </>
  );
};

export default Modals;
