import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import store from "../app/store";
import Head from "next/head";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Head>
                <title>SGM Music</title>
                <meta name="description" content="Our music" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </Provider>
    );
}

export default appWithTranslation(MyApp);
