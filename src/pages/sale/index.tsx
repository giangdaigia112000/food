import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button, DatePicker } from "antd";
import classNames from "classnames/bind";
// <---- import file ---->
import styles from "./Sale.module.scss";
import MainLayout from "../../layouts/MainLayout";
import BackgroundTitle from "@/components/BackgroundTitle";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { getListSale } from "src/app/slice/postSlice";
const cx = classNames.bind(styles);

const Sale: NextPage = () => {
    const { listSale } = useAppSelector((state) => state.post);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getListSale());
    }, []);
    return (
        <div className="w-full">
            <BackgroundTitle
                title={"Khuyễn mãi"}
                des={"Khám phá thật nhiều ưu đãi từ chúng tôi."}
            />
            <div className="w-full max-w-[1250px] m-auto py-[20px] ">
                <div className="w-full flex  flex-col laptop:flex-row flex-wrap ">
                    {listSale.length > 0 &&
                        listSale.map((s) => (
                            <div className="p-[10px] laptop:p-[20px]  w-full laptop:w-1/2 cursor-pointer">
                                <div className="w-full pt-[70%] relative">
                                    <img
                                        className=" w-full h-full absolute top-0 left-0 object-cover rounded-lg"
                                        src={`${process.env.BASE_API}${s.thumb}`}
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Sale;
