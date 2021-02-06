import { useRef } from 'react';

// https://dev.to/bytebodger/constructors-in-functional-components-with-hooks-280m
export const useConstructor = (callBack = () => {}) => {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) return;
    callBack();
    hasBeenCalled.current = true;
};