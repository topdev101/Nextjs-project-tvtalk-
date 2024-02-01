import Footer from "../components/Footer"
import Header from "../components/Header"
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import '../styles/main.scss'
import createEmotionCache from '../util/createEmotionCache';
import theme from '../styles/theme/theme';
import { createGlobalStyle } from "styled-components";
import AppBar from '../components/AppBar';
import { AuthProvider } from '../util/AuthContext';
// import '../styles/main.scss'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Gilroy';
    src: url('/fonts/Gilroy-Light.otf') format('woff');
    font-style: normal;
    font-weight: 300; // Assuming 300 is the weight for light
    font-display: block;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url('/fonts/Gilroy-Regular.woff') format('woff');
    font-style: normal;
    font-weight: 400;
    font-display: block;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url('/fonts/Gilroy-ExtraBold.otf') format('woff');
    font-style: normal;
    font-weight: 700;
    font-display: block;
  }
`;


const clientSideEmotionCache = createEmotionCache();

function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, ctx } = props;
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <CacheProvider value={emotionCache}>
        <AuthProvider>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                minHeight: '100vh',
                flexDirection: 'column'
              }}
            >
              <AppBar context={ctx} />
              {getLayout(<Component {...pageProps} />)}
              <Footer />
            </Box>
          </ThemeProvider>
        </AuthProvider>
      </CacheProvider>
    </>
  );
}

export default App;
