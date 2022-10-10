import Link from "next/link";
import {
    CloseOutlined,
    LoginOutlined,
    MenuOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button } from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

const Header = () => {
    const { route } = useRouter();
    const [navMobileAct, setNavMobileAct] = useState<boolean>(false);
    const [login, setlogin] = useState<boolean>(false);

    return (
        <div
            className={`w-full h-[60px] flex  bg-white justify-center  ${cx(
                "wrapper"
            )}`}
        >
            <div
                className={`w-full desktop:w-[1250px] h-full bg-white relative flex justify-end }`}
            >
                <Link href={"/home"}>
                    <a className="h-full inline-block absolute top-0 left-0 flex items-center">
                        <img
                            className=" h-[80%] laptop:h-full"
                            src="/juwanfood-logo.png"
                            alt="logo"
                        />
                    </a>
                </Link>
                <nav
                    className={`absolute top-0  transition-[left] duration-500 ${
                        navMobileAct === true ? "left-0" : "left-full"
                    } laptop:left-1/2 w-full laptop:w-fit laptop:h-full laptop:translate-x-[-50%] bg-[#b90c0c] laptop:bg-transparent translate-y-[60px] laptop:translate-y-[0px] `}
                >
                    <ul className="laptop:h-full list-none flex font-semibold py-3 laptop:py-0 text-[#fff] laptop:text-[#ea3838] gap-4  flex-col laptop:flex-row ">
                        <li
                            className={`h-full  flex justify-center items-center ${
                                route === "/home" ? "text-[#f0c800]" : ""
                            }`}
                        >
                            <Link href={"/home"}>
                                <a>Trang chủ</a>
                            </Link>
                        </li>
                        <li
                            className={`h-full  flex justify-center items-center  ${
                                route === "/menu" ? "text-[#f0c800]" : ""
                            }`}
                        >
                            <Link href={"/menu"}>
                                <a>Thực đơn</a>
                            </Link>
                        </li>
                        <li
                            className={`h-full  flex justify-center items-center  ${
                                route === "/sale" ? "text-[#f0c800]" : ""
                            }`}
                        >
                            <Link href={"/sale"}>
                                <a>Khuyễn mãi</a>
                            </Link>
                        </li>
                        <li
                            className={`h-full  flex justify-center items-center  ${
                                route === "/blog" ? "text-[#f0c800]" : ""
                            }`}
                        >
                            <Link href={"/blog"}>
                                <a>Blog</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="h-full  flex items-center  border-r-[1px] border-[#bababa61]">
                    {login === true ? (
                        <div className="h-full flex items-center rounded-xl p-2 cursor-pointer">
                            <Avatar
                                style={{
                                    backgroundColor: "#f23939",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                icon={<UserOutlined />}
                            />
                            <span className="pl-1 font-semibold hidden laptop:block text-sm">
                                Nguyễn Trường Giang
                            </span>
                        </div>
                    ) : (
                        <>
                            <Button danger className="hidden laptop:block mr-2">
                                Đăng nhập
                            </Button>
                            <LoginOutlined className="font-semibold text-2xl text-[#f23939] pr-2 laptop:hidden" />
                        </>
                    )}
                </div>
                <div className="h-full flex items-center gap-[10px] rounded-xl  p-2 cursor-pointer mr-5 laptop:mr-0">
                    <ShoppingCartOutlined className="font-semibold text-2xl text-[#f23939] pr-1" />
                    <div className="h-full flex flex-col justify-center pr-1 hidden laptop:block">
                        <span className="font-semibold text-sm text-[#f03232]">
                            Giỏ hàng
                        </span>
                        <div className="flex font-semibold text-sm">
                            <span className="pr-1 border-r-[1px] border-[#9c9c9cad]">
                                2
                            </span>
                            <span className="pl-1 text-sm">200.000</span>
                            <span className="underline decoration-solid text-sm">
                                đ
                            </span>
                        </div>
                    </div>
                </div>
                <div className="h-full flex items-center mr-2 laptop:hidden">
                    <div
                        className="h-[40px] w-[40px]  flex items-center justify-center bg-[#ff94945a] rounded-xl cursor-pointer"
                        onClick={() => setNavMobileAct(!navMobileAct)}
                    >
                        {navMobileAct === true ? (
                            <CloseOutlined className=" h-[30px] w-[30px] flex items-center justify-center font-semibold text-2xl text-[#f23939] " />
                        ) : (
                            <MenuOutlined className=" h-[30px] w-[30px] flex items-center justify-center font-semibold text-2xl text-[#f23939] " />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
