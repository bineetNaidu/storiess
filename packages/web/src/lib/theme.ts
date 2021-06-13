import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
} as ThemeConfig;

const theme = extendTheme({ config });

export default theme;
