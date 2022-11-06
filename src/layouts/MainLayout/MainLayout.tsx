import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { getListProductToCart, getListShop } from "src/app/slice/cartSlice";
import { checkMe } from "src/app/slice/loginSlice";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";

const MainLayout = ({ children }) => {
    const dispatch = useAppDispatch();
    const { loading, isLogin } = useAppSelector((state) => state.login);
    useEffect(() => {
        dispatch(checkMe());
    }, []);
    useEffect(() => {
        if (!isLogin) return;
        dispatch(getListProductToCart());
        dispatch(getListShop());
    }, [isLogin]);
    return (
        <div>
            <Header />
            {loading && <Loading />}
            <div className={`w-full flex  bg-white justify-center pt-[120px]`}>
                <div className="w-full">{children}</div>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
