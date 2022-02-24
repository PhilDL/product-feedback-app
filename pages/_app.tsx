import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { UserContextProvider } from "../utils/useUser";
import { SWRConfig } from "swr";

const fetcher = async (input: RequestInfo) => {
  const res: Response = await fetch(input);
  return await res.json();
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <UserContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
