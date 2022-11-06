import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import store from "../app/store";
import Head from "next/head";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useAppDispatch } from "src/app/hooks";
import { checkMe } from "src/app/slice/loginSlice";
import MainLayout from "src/layouts/MainLayout";
import ScrollBtn from "src/layouts/components/ScrollBtn";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Head>
                <title>Juwan Food</title>
                <meta name="description" content="Juwan Food" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
            <ScrollBtn />
        </Provider>
    );
}

export default appWithTranslation(MyApp);
