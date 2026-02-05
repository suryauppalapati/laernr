import {
  ThemeProvider as NextThemeProvider,
  type ThemeProviderProps,
} from "next-themes";
import React from "react";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
};

export default ThemeProvider;
