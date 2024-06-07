import { useEffect, useRef } from "react";

type Noop = () => void;

export const useComponentWillUnmount = (callback: Noop) => {
  const mem = useRef<Noop>();

  useEffect(() => {
    mem.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      const func = mem.current as Noop;
      func();
    };
  }, []);
};
