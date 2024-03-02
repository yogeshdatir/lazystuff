import { RefObject, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */

// Hook
type Handler = (event: MouseEvent | TouchEvent) => void;

function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler
) {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {        
        console.log(ref.current?.tagName)
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export default useClickOutside;

/**
 * Reference:
 * 1. https://usehooks.com/useOnClickOutside/
 * 2. https://usehooks-ts.com/react-hook/use-on-click-outside
 * 3. https://www.robinwieruch.de/react-hook-detect-click-outside-component/
 */
