import { useEffect, useRef } from "react";

type Noop = () => void;

export const useComponentWillUnmount = (callback: Noop) => {
  const mem = useRef<Noop>();
  const hasUnmounted = useRef(false); // this is used to discount the first unmount from react strictmode

  useEffect(() => {
    mem.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (hasUnmounted.current) {
        const func = mem.current as Noop;
        func();
      }
      hasUnmounted.current = true;
    };
  }, []);
};
