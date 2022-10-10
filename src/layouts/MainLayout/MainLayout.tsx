import Header from "../components/Header";

const MainLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="h-[60px]"></div>
            {children}
        </div>
    );
};

export default MainLayout;
