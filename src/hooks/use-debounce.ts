import { useMemo } from 'react';

export function useDebounce(fn: (value: string) => void, delay: number) {
  return useMemo(() => {
    let timer: ReturnType<typeof setTimeout>;
    return (value: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(value), delay);
    };
  }, [fn, delay]);
}
