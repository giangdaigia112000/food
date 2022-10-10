// <---- import lb ---->
import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button, DatePicker } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Lazy } from "swiper";
import classNames from "classnames/bind";
import "swiper/css";
import "swiper/css/pagination";
// <---- import file ---->
import styles from "./Home.module.scss";

import MainLayout from "../../layouts/MainLayout";
const cx = classNames.bind(styles);

const Home: NextPage = () => {
    return (
        <MainLayout>
            <div className={`w-full h-[60px] flex  bg-white justify-center`}>
                <div className={`w-full desktop:w-[1250px] `}>
                    <section className="w-full desktop:w-[1250px] mt-1">
                        <Swiper
                            pagination={true}
                            modules={[Pagination, Autoplay, Lazy]}
                            className="mySwiper"
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            lazy
                            grabCursor
                        >
                            <SwiperSlide>
                                <img
                                    data-src="https://swiperjs.com/demos/images/nature-1.jpg"
                                    className="swiper-lazy"
                                />
                                <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    data-src="https://swiperjs.com/demos/images/nature-3.jpg"
                                    className="swiper-lazy"
                                />
                                <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    data-src="https://swiperjs.com/demos/images/nature-5.jpg"
                                    className="swiper-lazy"
                                />
                                <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                            </SwiperSlide>
                        </Swiper>
                    </section>
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;
