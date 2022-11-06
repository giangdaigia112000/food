// <---- import lb ---->
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button, Col, DatePicker, Row, Skeleton } from "antd";
import classNames from "classnames/bind";
// <---- import file ---->
import styles from "./Menu.module.scss";
import BackgroundTitle from "@/components/BackgroundTitle";
import CardFood from "@/components/CardFood";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
    getCategory,
    getListProduct,
    getListProductSale,
    removeListProduct,
} from "src/app/slice/productSlice";
import { SyncOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);
const loadingSkeleton = [1, 2, 3, 4, 5];
const Menu: NextPage = () => {
    const [active, setActive] = useState<number>(1);

    const { listProductMenu, loadingMenu, listCategory, loading } =
        useAppSelector((state) => state.product);

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (listCategory && listCategory.length !== 0) return;
        dispatch(getCategory());
    }, []);

    useEffect(() => {
        if (!listCategory || listCategory.length === 0) return;
        dispatch(getListProduct(listCategory[0].id));
    }, [listCategory]);

    const handleChangCategory = (id: number) => {
        if (id === active) return;
        setActive(id);
        dispatch(getListProduct(id));
    };
    const handleListSale = (id: number) => {
        if (id === active) return;
        setActive(id);
        dispatch(getListProductSale());
    };
    const reLoad = () => {
        dispatch(getCategory());
    };
    return (
        <div className="w-full">
            <BackgroundTitle
                title={"Thực đơn"}
                des={"Lựa chọn món yêu thích của bạn."}
            />

            <div className="w-full max-w-[1250px] m-auto pt-[10px]">
                <div className="w-full flex justify-center">
                    <Button
                        className="flex items-center"
                        danger
                        type="text"
                        onClick={reLoad}
                    >
                        Tải lại <SyncOutlined />
                    </Button>
                </div>
                <ul className="w-full flex justify-center items-center laptop:gap-[5px] p-[10px]">
                    {loading ? (
                        <>
                            {loadingSkeleton.map((_, idx) => (
                                <li
                                    key={idx}
                                    className="flex flex-col items-center justify-center flex-1 cursor-pointer py-2 h-[75px]"
                                >
                                    <Skeleton.Avatar
                                        active
                                        size="large"
                                        shape="circle"
                                        className="pb-[5px]"
                                    />
                                    <Skeleton.Input active size="default" />
                                </li>
                            ))}
                        </>
                    ) : (
                        <>
                            {listCategory &&
                                listCategory.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className={`flex flex-col items-center justify-center flex-1 cursor-pointer py-2 ${
                                            active === item.id
                                                ? " bg-[#ffb9b9] rounded-md "
                                                : ""
                                        }`}
                                        onClick={() => {
                                            handleChangCategory(item.id);
                                        }}
                                    >
                                        <img src={`/icon/${item.img}`} />
                                        <h2
                                            className={`text-xs laptop:text-base font-semibold pt-1 ${
                                                active === item.id
                                                    ? "text-[#7c2222]"
                                                    : ""
                                            }`}
                                        >
                                            {item.name}
                                        </h2>
                                    </li>
                                ))}
                            <li
                                className={`flex flex-col items-center justify-center flex-1 cursor-pointer py-2 ${
                                    active === listCategory.length + 1
                                        ? " bg-[#ffb9b9] rounded-md "
                                        : ""
                                }`}
                                onClick={() => {
                                    handleListSale(listCategory.length + 1);
                                }}
                            >
                                <img src={`/icon/icon_combo_active.png`} />
                                <h2
                                    className={`text-xs laptop:text-base font-semibold pt-1 ${
                                        active === listCategory.length + 1
                                            ? "text-[#7c2222]"
                                            : ""
                                    }`}
                                >
                                    Khuyến mãi
                                </h2>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <div className="w-full min-h-[500px] max-w-[1250px] m-auto">
                {loadingMenu && (
                    <div className="w-full flex justify-center items-center">
                        <img src="/loading.svg" alt="loading" />
                    </div>
                )}
                <Row justify="start" align="middle">
                    {listProductMenu.length > 0 ? (
                        listProductMenu.map((product, idx) => (
                            <Col xs={12} md={8} xl={6} key={product.id}>
                                <CardFood product={product} />
                            </Col>
                        ))
                    ) : (
                        <>
                            {!loadingMenu && (
                                <div className="w-full py-[50px] flex justify-center items-center]">
                                    <h1 className="font-semibold text-base laptop:text-xl">
                                        Không có sản phẩm nào!!!
                                    </h1>
                                </div>
                            )}
                        </>
                    )}
                </Row>
            </div>
        </div>
    );
};

export default Menu;
