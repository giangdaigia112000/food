import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button, DatePicker } from "antd";
import classNames from "classnames/bind";
// <---- import file ---->
import styles from "./Blog.module.scss";
import MainLayout from "../../layouts/MainLayout";
import BackgroundTitle from "@/components/BackgroundTitle";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { getListOrder } from "src/app/slice/cartSlice";
import { getListBlog } from "src/app/slice/postSlice";
import moment from "moment";
const cx = classNames.bind(styles);

const Blog: NextPage = () => {
    const content = useRef<any>();
    const { listBlog } = useAppSelector((state) => state.post);
    const [active, setActive] = useState<number>(0);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (listBlog.length === 0) return;
        content.current.innerHTML = listBlog[active].content;
    }, [listBlog, active]);
    useEffect(() => {
        dispatch(getListBlog());
    }, []);
    return (
        <div className="w-full">
            <BackgroundTitle
                title={"Blog"}
                des={"Nơi chia sẽ kiến thức về nấu ăn."}
            />
            <div className=" w-full max-w-[1250px] flex flex-col laptop:flex-row m-auto py-[20px] ">
                <div
                    ref={content}
                    className=" px-[10px] laptop:pr-[20px]   laptop:flex-1"
                ></div>
                <div className="  w-full laptop:w-[300px] ">
                    <div className="w-full px-[10px] py-[10px] bg-[#f5f5f5]">
                        <h1 className="font-semibold text-base ">BÀI VIẾT</h1>
                        {listBlog.length > 0 &&
                            listBlog.map((blog, idx) => (
                                <div
                                    onClick={() => setActive(idx)}
                                    key={blog.id}
                                    className="border-dotted border-[#a8a8a8] border-b-[1px] flex py-[5px] mb-[10px] cursor-pointer"
                                >
                                    <div className="w-[100px] h-[65px] ">
                                        <img
                                            className="w-full h-full block object-cover"
                                            src={`${process.env.BASE_API}${blog.thumb}`}
                                        />
                                    </div>

                                    <div className="pl-[10px] flex-1">
                                        <h1 className="font-semibold text-sm laptop:text-base">
                                            {blog.title}
                                        </h1>
                                        <p className="text-sm">
                                            {moment(blog.created_at).format(
                                                "L"
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
