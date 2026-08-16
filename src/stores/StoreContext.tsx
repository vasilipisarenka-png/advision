import React, { createContext, useContext } from 'react';
import RootStore from './RootStore';

const rootStore = new RootStore();

const StoreContext = createContext<RootStore>(rootStore);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
);

export function useStores(): RootStore {
  return useContext(StoreContext);
}
