import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button, DatePicker } from "antd";
import classNames from "classnames/bind";
// <---- import file ---->
import styles from "./Blog.module.scss";
import MainLayout from "../../layouts/MainLayout";
import BackgroundTitle from "@/components/BackgroundTitle";
import { useAppDispatch } from "src/app/hooks";
import { getListOrder } from "src/app/slice/cartSlice";
const cx = classNames.bind(styles);

const Blog: NextPage = () => {
    return (
        <div className="w-full">
            <BackgroundTitle
                title={"Blog"}
                des={"Nơi chia sẽ kiến thức về nấu ăn."}
            />
            <div className="w-full max-w-[1250px] flex flex-col laptop:flex-row m-auto py-[20px] ">
                <div className="bg-[#298dbb] px-[10px] laptop:pr-[20px]  h-[500px] laptop:flex-1"></div>
                <div className="  w-full laptop:w-[300px] ">
                    <div className="w-full px-[10px] py-[10px] bg-[#f5f5f5]">
                        <h1 className="font-semibold text-base ">
                            BÀI VIẾT KHÁC
                        </h1>
                        <div className="border-dotted border-[#a8a8a8] border-b-[1px] flex py-[5px] mb-[10px] cursor-pointer">
                            <img
                                className="w-[100px] h-[65px] object-cover"
                                src="/blog.jpg"
                            />
                            <div className="pl-[10px]">
                                <h1 className="font-semibold text-sm laptop:text-base">
                                    Đặt bánh Pizza tiện lợi mang tới bạn mọi bữa
                                    ăn bổ dưỡng
                                </h1>
                                <p className="text-sm">20-11-2018</p>
                            </div>
                        </div>
                        <div className="border-dotted border-[#a8a8a8] border-b-[1px] flex py-[5px] mb-[10px] cursor-pointer">
                            <img
                                className="w-[100px] h-[65px] object-cover"
                                src="/blog.jpg"
                            />
                            <div className="pl-[10px]">
                                <h1 className=" font-semibold text-sm laptop:text-base">
                                    Đặt bánh Pizza tiện lợi mang tới bạn mọi bữa
                                    ăn bổ dưỡng
                                </h1>
                                <p className="text-sm">20-11-2018</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
