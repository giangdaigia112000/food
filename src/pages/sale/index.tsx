import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button, DatePicker } from "antd";
import classNames from "classnames/bind";
// <---- import file ---->
import styles from "./Sale.module.scss";
import MainLayout from "../../layouts/MainLayout";
import BackgroundTitle from "@/components/BackgroundTitle";
const cx = classNames.bind(styles);

const sale = [
    { id: 0, img: "/sale/1.jpg" },
    { id: 1, img: "/sale/2.jpg" },
    { id: 2, img: "/sale/3.png" },
    { id: 3, img: "/sale/4.png" },
];

const Sale: NextPage = () => {
    return (
        <div className="w-full">
            <BackgroundTitle
                title={"Khuyễn mãi"}
                des={"Khám phá thật nhiều ưu đãi từ chúng tôi."}
            />
            <div className="w-full max-w-[1250px] m-auto py-[20px] ">
                <div className="w-full flex  flex-col laptop:flex-row flex-wrap ">
                    {sale.map((s) => (
                        <div className="p-[10px] laptop:p-[20px]  w-full laptop:w-1/2 cursor-pointer">
                            <img
                                className=" w-full block rounded-lg"
                                src={s.img}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sale;
