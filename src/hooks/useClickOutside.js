import { useEffect } from 'react';

function useClickOutside(selectors, action, isActive = true) {
  useEffect(() => {
    if (!isActive) return;
    function handleClickOutside(event) {
      const isOutside = selectors.every(
        (selector) => !event.target.closest(selector),
      );

      if (isOutside) {
        action();
      }
    }

    window.addEventListener('click', handleClickOutside);

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [selectors, action, isActive]);
}

export default useClickOutside;
