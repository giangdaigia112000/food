import Link from "next/link";
import {
    CloseOutlined,
    GoogleCircleFilled,
    LoginOutlined,
    LogoutOutlined,
    MenuOutlined,
    PhoneOutlined,
    ProfileOutlined,
    RightOutlined,
    ShoppingCartOutlined,
    SyncOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Checkbox, Form, Input, Modal } from "antd";
import classNames from "classnames/bind";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import styles from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
    loginSocial,
    logOut,
    userLogin,
    userRegister,
} from "src/app/slice/loginSlice";

import { openCart } from "src/app/slice/cartSlice";
import ModalCart from "../ModalCart";

const cx = classNames.bind(styles);

const Header = () => {
    const { route, push } = useRouter();

    const dispatch = useAppDispatch();
    const { isLogin, loadingLogin, user, isLoginSocial } = useAppSelector(
        (state) => state.login
    );
    const { listProductCart } = useAppSelector((state) => state.card);
    const [navMobileAct, setNavMobileAct] = useState<boolean>(false);
    const [isModalLogin, setIsModalLogin] = useState(false);

    const [isRegister, setIsRegister] = useState(false);

    const showModalLogin = () => {
        setIsModalLogin(true);
    };
    const showModalCart = () => {
        dispatch(openCart(true));
    };
    const hideModalCart = () => {
        dispatch(openCart(false));
    };
    const handleCancel = () => {
        setIsModalLogin(false);
    };

    const handleLogin = async (values: any) => {
        const { email, password } = values;
        dispatch(userLogin({ email, password }));
    };
    const handleLoginSocial = () => {
        dispatch(loginSocial());
    };
    const handleRegister = (values: any) => {
        const { email, password, name } = values;
        dispatch(userRegister({ email, password, name }));
    };
    const handleLogout = () => {
        dispatch(logOut());
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const handleCountProductCart = useMemo(() => {
        const count = listProductCart.length | 0;
        const price = listProductCart.length
            ? listProductCart.reduce((result, current) => {
                  const handle =
                      result +
                      current.quantity *
                          current.products?.options?.size[
                              current.product_options as number
                          ].price;
                  return handle;
              }, 0)
            : 0;

        return {
            count,
            price,
        };
    }, [listProductCart]);
    return (
        <div className={cx("wrapper")}>
            <div className="w-full h-[60px] bg-[#a9001b] flex">
                <div className="w-full max-w-[1250px] m-auto h-full flex justify-center">
                    <div className="h-full flex items-center laptop:pr-[30px]">
                        <PhoneOutlined className="text-xl laptop:text-2xl text-[#fff600] translate-y-[-2px] pr-[5px]" />
                        <span className="text-base laptop:text-xl text-[#fff600] font-semibold">
                            0989.139.565
                        </span>
                    </div>
                    <div className="h-full  items-center hidden laptop:flex">
                        <span className="text-sm laptop:text-base laptop:font-semibold italic text-[#fff]">
                            Đồ ăn Nhanh - Ngon - Giá rẻ - Vận chuyển tận nhà
                        </span>
                    </div>
                </div>
            </div>
            <div className={`w-full h-[60px] flex  bg-white justify-center `}>
                {isModalLogin && !isLogin && (
                    <div className="fixed w-full h-screen bg-[#1114] top-0 left-0 z-50 flex justify-center items-center">
                        <div
                            className="max-w-[800px] w-[90%]  bg-[#fff] p-[10px]"
                            style={{
                                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                borderRadius: "10px",
                            }}
                        >
                            <div className="w-full flex justify-end">
                                <span
                                    className="block w-[30px] h-[30px]  rounded-full bg-[#e70000] flex justify-center items-center text-[#fff] font-semibold cursor-pointer"
                                    onClick={handleCancel}
                                >
                                    x
                                </span>
                            </div>
                            {!isRegister ? (
                                <>
                                    <div className="w-full flex justify-center text-center flex-col">
                                        <span className="text-[#A80000] font-semibold text-base tablet:text-xl pb-2">
                                            🍕🍕 WELCOME BACK!
                                        </span>
                                        <p className="text-xs tablet:text-sm">
                                            BẠN ĐÃ LÀ THÀNH VIÊN JUWAN FOOD !
                                            ĐĂNG NHẬP TRƯỚC KHI TẠO ĐƠN HÀNG !!!
                                        </p>
                                    </div>
                                    <div className="w-full flex justify-center pt-[20px] flex-col items-center">
                                        <Form
                                            name="basic"
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 24 }}
                                            initialValues={{ remember: true }}
                                            onFinish={handleLogin}
                                            onFinishFailed={onFinishFailed}
                                            autoComplete="off"
                                            layout="vertical"
                                            style={{
                                                width: "100%",
                                                maxWidth: "600px",
                                            }}
                                        >
                                            <Form.Item
                                                label="Email"
                                                name="email"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Please input your email!",
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                label="Mật khẩu"
                                                name="password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Please input your password!",
                                                    },
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>

                                            <Form.Item
                                                name="remember"
                                                valuePropName="checked"
                                                wrapperCol={{
                                                    offset: 0,
                                                    span: 24,
                                                }}
                                            >
                                                <Checkbox>
                                                    Nhớ mật khẩu
                                                </Checkbox>
                                            </Form.Item>

                                            <Form.Item
                                                wrapperCol={{
                                                    offset: 0,
                                                    span: 24,
                                                }}
                                            >
                                                <Button
                                                    className="w-[200px] bg-[#2feb00] text-[#fff]"
                                                    htmlType="submit"
                                                    loading={loadingLogin}
                                                >
                                                    Đăng nhập
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                        <div className="w-full h-[50px] flex justify-center items-center">
                                            <div
                                                onClick={handleLoginSocial}
                                                className="w-fit cursor-pointer h-[40px] p-1 rounded-[10px] border-[2px] text-[#ff0000] border-[#ff0000] flex items-center gap-[3px] justify-center hover:text-[#ffffff] hover:bg-[#ff0000]"
                                            >
                                                <GoogleCircleFilled className="w-[30px] h-[30px] block text-xl" />
                                                <span className="text-xs tablet:text-sm font-semibold">
                                                    Đăng nhập bằng Google
                                                </span>
                                            </div>
                                        </div>
                                        <span
                                            className="text-xs tablet:text-sm text-[#3f72ff] cursor-pointer pt-2"
                                            onClick={() => setIsRegister(true)}
                                        >
                                            Đăng ký tài khoản
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-full flex justify-center text-center flex-col">
                                        <span className="text-[#A80000] font-semibold text-base tablet:text-xl pb-2">
                                            🍕🍕 ĐĂNG KÝ THÀNH VIÊN!
                                        </span>
                                        <p className="text-xs tablet:text-sm">
                                            ĐĂNG KÝ ĐỂ TRỞ THÀNH THÀNH VIÊN
                                            JUWAN FOOD ! TRƯỚC KHI TẠO ĐƠN HÀNG
                                            !!!
                                        </p>
                                    </div>
                                    <div className="w-full flex justify-center pt-[20px] flex-col items-center">
                                        <Form
                                            name="basic"
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 24 }}
                                            initialValues={{ remember: true }}
                                            onFinish={handleRegister}
                                            onFinishFailed={onFinishFailed}
                                            autoComplete="off"
                                            layout="vertical"
                                            style={{
                                                width: "100%",
                                                maxWidth: "600px",
                                            }}
                                        >
                                            <Form.Item
                                                label="Email"
                                                name="email"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Please input your username!",
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label="Họ tên"
                                                name="name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Please input your name!",
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label="Mật khẩu"
                                                name="password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Please input your password!",
                                                    },
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>

                                            <Form.Item
                                                wrapperCol={{
                                                    offset: 0,
                                                    span: 24,
                                                }}
                                            >
                                                <Button
                                                    className="w-[200px] bg-[#2feb00] text-[#fff]"
                                                    htmlType="submit"
                                                    loading={loadingLogin}
                                                >
                                                    Tạo tài khoản mới !!!
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                        <span
                                            className="text-xs tablet:text-sm text-[#3f72ff] cursor-pointer pt-2"
                                            onClick={() => setIsRegister(false)}
                                        >
                                            Đăng nhập
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <ModalCart />

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
                        className={`absolute top-0  transition-all duration-500 ${
                            navMobileAct === true
                                ? "left-0 opacity-100"
                                : "left-full opacity-0 "
                        } laptop:left-1/2 w-full laptop:opacity-100 laptop:w-fit laptop:h-full laptop:translate-x-[-50%] bg-[#b90c0c] laptop:bg-transparent translate-y-[60px] laptop:translate-y-[0px] `}
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
                        {isLogin === true ? (
                            <div
                                className={`h-full flex items-center rounded-xl p-2 cursor-pointer ${cx(
                                    "my-profile"
                                )}`}
                            >
                                <div
                                    className={`${cx(
                                        "my-profile__main"
                                    )} fixed w-[95%] top-[60px] left-[5px] tablet:absolute tablet:top-[unset] tablet:left-[unset] tablet:bottom-[5px] tablet:right-[5px] tablet:translate-y-[100%] tablet:w-[400px] z-20`}
                                >
                                    <div className="flex justify-start">
                                        <img
                                            className="w-[60px] h-[60px] "
                                            src="/Member.png"
                                            alt="member"
                                        />
                                        <div className="pl-[10px] ">
                                            <span className="font-semibold pr-1">
                                                Xin chào
                                            </span>
                                            <span className="font-semibold">
                                                {user.name.toString()}
                                            </span>
                                            <div className="text-xs text-[#20982c]">
                                                Email:{" "}
                                                <span className="text-[#111] font-semibold">
                                                    {user.email.toString()}
                                                </span>
                                            </div>
                                            <div className="text-xs text-[#20982c]">
                                                ID:{" "}
                                                <span className="text-[#111] font-semibold">
                                                    {user.id}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="pt-[20px]">
                                        {!isLoginSocial && (
                                            <li
                                                onClick={() => {
                                                    push("/changepass");
                                                }}
                                                className="font-semibold text-sm flex justify-between items-center border-t-[1px] border-[#1111113f] pt-[5px] h-[40px] w-full cursor-pointer hover:bg-slate-200"
                                            >
                                                <div className="flex items-center h-full">
                                                    <SyncOutlined className="text-[#20982c] text-xl h-full flex items-center" />
                                                    <span className="pl-[5px]">
                                                        Đổi mật khẩu
                                                    </span>
                                                </div>
                                                <RightOutlined className="text-[#20982c] text-sm  h-full flex items-center" />
                                            </li>
                                        )}
                                        <li
                                            onClick={() => {
                                                push("/order");
                                            }}
                                            className="font-semibold text-sm flex justify-between items-center border-t-[1px] border-b-[1px] border-[#1111113f] pt-[5px] h-[40px] w-full cursor-pointer hover:bg-slate-200"
                                        >
                                            <div className="flex items-center h-full">
                                                <ProfileOutlined className="text-[#20982c] text-xl  h-full flex items-center" />
                                                <span className="pl-[5px]">
                                                    Đơn hàng của bạn
                                                </span>
                                            </div>
                                            <RightOutlined className="text-[#20982c] text-sm  h-full flex items-center" />
                                        </li>
                                        <li
                                            onClick={handleLogout}
                                            className="font-semibold text-sm flex justify-between items-center border-t-[1px] border-b-[1px] border-[#1111113f] pt-[5px] h-[40px] w-full cursor-pointer hover:bg-slate-200"
                                        >
                                            <div className="flex items-center h-full">
                                                <LogoutOutlined className="text-[#20982c] text-xl  h-full flex items-center" />
                                                <span className="pl-[5px]">
                                                    Đăng xuất
                                                </span>
                                            </div>
                                            <RightOutlined className="text-[#20982c] text-sm  h-full flex items-center" />
                                        </li>
                                    </ul>
                                </div>
                                <Avatar
                                    style={{
                                        backgroundColor: "#f23939",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        zIndex: 1,
                                    }}
                                    icon={<UserOutlined />}
                                />
                                <span className="pl-1 font-semibold hidden laptop:block text-sm">
                                    {user.name.toString()}
                                </span>
                            </div>
                        ) : (
                            <>
                                <Button
                                    danger
                                    className="hidden laptop:block mr-2"
                                    onClick={showModalLogin}
                                >
                                    Đăng nhập
                                </Button>
                                <LoginOutlined
                                    className="font-semibold text-2xl text-[#f23939] pr-2 laptop:hidden"
                                    onClick={showModalLogin}
                                />
                            </>
                        )}
                    </div>
                    {isLogin && (
                        <div
                            className="h-full flex items-center gap-[10px] rounded-xl  p-2 cursor-pointer mr-5 laptop:mr-0"
                            onClick={showModalCart}
                        >
                            <ShoppingCartOutlined className="font-semibold text-2xl text-[#f23939] pr-1" />
                            <div className="h-full flex flex-col justify-center pr-1 hidden laptop:block">
                                <span className="font-semibold text-sm text-[#f03232]">
                                    Giỏ hàng
                                </span>
                                <div className="flex font-semibold text-sm">
                                    <span className="pr-1 border-r-[1px] border-[#9c9c9cad]">
                                        {handleCountProductCart.count}
                                    </span>
                                    <span className="pl-1 text-sm">
                                        {handleCountProductCart.price}
                                    </span>
                                    <span className="pl-1 underline decoration-solid text-sm">
                                        đ
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

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
        </div>
    );
};

export default Header;
