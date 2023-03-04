import { debounce } from 'lodash';
import { useLayoutEffect, useState } from 'react';

const useIsScreenLessThan = (width: number): boolean => {
  const [isScreenLessThan, setIsScreenLessThan] = useState(false);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsScreenLessThan(window.innerWidth < width);
    };
    window.addEventListener('resize', debounce(updateSize, 250));
    updateSize();

    return (): void => window.removeEventListener('resize', updateSize);
  }, []);

  return isScreenLessThan;
};

export default useIsScreenLessThan;
