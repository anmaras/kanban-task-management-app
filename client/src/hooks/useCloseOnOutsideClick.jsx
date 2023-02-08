import { useEffect } from 'react';

function useCloseOnOutsideClick(modalRef, setModalOpen) {
  /* condition turns to true if user clicks on dot icon 
  or everywhere else except the edit dropdown options
  and that works because the modal ref is set on main container
  that includes the edit dropdown too */

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });
}

export default useCloseOnOutsideClick;
