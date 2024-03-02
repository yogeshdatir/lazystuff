import { FormEvent, MouseEvent, useRef } from 'react';
import handleClickOutsideDialog from '../../hooks/utils/handleClickOutsideDialog';

type Props = { variant?: 'withButtonFormMethod' | 'withFormMethod' };

const DialogModal = ({ variant = 'withButtonFormMethod' }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  const handleModalOpen = () => {
    ref.current?.showModal();
  };

  const handleModalClose = () => {
    ref.current?.close();
  };

  const handleClickOutside = (event: MouseEvent<HTMLDialogElement>) => {
    handleClickOutsideDialog(event, ref);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    // construct a FormData object, which fires the formdata event
    const formData = new FormData(event.target as HTMLFormElement);
    // formdata gets modified by the formdata event
    console.log('email', formData.get('email')); // foo
    console.log('password', formData.get('password')); // bar
  };

  if (variant === 'withButtonFormMethod') {
    return (
      <>
        <button onClick={handleModalOpen}>Open</button>
        <dialog ref={ref} onClick={handleClickOutside}>
          <h3>
            HTML Dialog Modal with <code>formMethod='dialog'</code> on{' '}
            <code>button</code> element
          </h3>
          <form onSubmit={handleFormSubmit}>
            <input type="email" name="email" />
            <input type="password" name="password" />
            <div>
              <button formMethod="dialog" onClick={handleModalClose}>
                Cancel
              </button>
              <button formMethod="dialog" type="submit">
                Submit
              </button>
            </div>
          </form>
        </dialog>
      </>
    );
  } else {
    return (
      <>
        <button onClick={handleModalOpen}>Open</button>
        <dialog ref={ref} onClick={handleClickOutside}>
          <h3>
            HTML Dialog Modal with <code>method='dialog'</code> on{' '}
            <code>form</code> element
          </h3>
          <form method="dialog" onSubmit={handleFormSubmit}>
            <input type="email" name="email" />
            <input type="password" name="password" />
            <div>
              <button onClick={handleModalClose}>Cancel</button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </dialog>
      </>
    );
  }
};

export default DialogModal;
