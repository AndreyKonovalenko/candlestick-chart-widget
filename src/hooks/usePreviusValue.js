import { useRef, useEffect } from 'react';
const usePreviusValue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePreviusValue;
