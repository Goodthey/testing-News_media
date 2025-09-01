import React from "react";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./store";
import { antdTheme } from "@/shared/config/antd-theme";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
    </Provider>
  );
};
