import { createContext as createReactContext, useContext, type ReactNode } from "react";

type ContextType<T> = readonly [useContext: () => T, Provider: (props: { children: ReactNode }) => JSX.Element];

/**
 * Creates a typed context with a custom hook and provider.
 *
 * This function is really cool because:
 * 1. It simplifies the creation of React contexts with strong typing.
 * 2. It automatically generates a custom hook for consuming the context.
 * 3. It creates a provider component that uses the supplied `useValue` hook.
 * 4. It ensures type safety by throwing an error if the context is used outside of its provider.
 * 5. It reduces boilerplate code, making it easier to create and use contexts throughout the application.
 * 6. It follows the principle of encapsulation, keeping context-related logic in one place.
 * 7. It promotes better code organization and reusability across different parts of the application.
 *
 * @param useValue A hook that returns the value to be provided by the context
 * @returns A tuple containing a custom hook to use the context and a provider component
 */
export const createContext = <T,>(useValue: () => T): ContextType<T> => {
  const Context = createReactContext<T | null>(null);

  const Provider = ({ children }: { children: ReactNode }) => (
    <Context.Provider value={useValue()}>{children}</Context.Provider>
  );

  const useContextValue = (): T => {
    const value = useContext(Context);
    if (value === null) {
      throw new Error("useContext must be used within a Provider");
    }
    return value;
  };

  return [useContextValue, Provider] as const;
};
