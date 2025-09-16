// import dependencies
import { useState } from "react";

/**
 * useLocalStorage hook to manage local storage
 * @param key - The key to store the value in local storage
 * @param initialValue - The initial value to store in local storage
 * @returns [storedValue, setValue, removeValue]
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    // set value to local storage
    const setValue = (value: T) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    // remove value from local storage
    const removeValue = () => {
        try {
            localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue, removeValue] as const;
};
