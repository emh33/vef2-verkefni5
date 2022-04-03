import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AppWrapper } from '../context/state';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}
