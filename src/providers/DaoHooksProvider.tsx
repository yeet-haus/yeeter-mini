/* eslint-disable react-refresh/only-export-components */
"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type DaoHooksConfig = {
  graphKey: string;
};
export type DaoHooksProviderProps = {
  keyConfig: DaoHooksConfig;
};

interface IDaoContext {
  config: DaoHooksConfig;
  setConfig: React.Dispatch<React.SetStateAction<IDaoContext["config"]>>;
}

export const DaoHooksContext = createContext<IDaoContext | null>(null);

export const DaoHooksProvider = (
  parameters: React.PropsWithChildren<DaoHooksProviderProps>
) => {
  const { children, keyConfig } = parameters;
  const [config, setConfig] = useState<DaoHooksConfig>(keyConfig);
  const value = useMemo(() => ({ config, setConfig }), [config]);

  // Skip provider during SSR if no key is available
  if (typeof window === "undefined" && !keyConfig.graphKey) {
    return <>{children}</>;
  }

  return (
    <DaoHooksContext.Provider value={value}>
      {children}
    </DaoHooksContext.Provider>
  );
};

export const useDaoHooksConfig = () => {
  const context = useContext(DaoHooksContext);

  return {
    config: context?.config,
  };
};
