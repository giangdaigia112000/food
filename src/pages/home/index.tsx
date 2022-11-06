// <---- import lb ---->
import type { NextPage } from "next";
import { Col, Row } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperClass from "swiper/types/swiper-class";
import { Pagination, Autoplay, Lazy } from "swiper";
import classNames from "classnames/bind";
import "swiper/css";
import "swiper/css/pagination";
// <---- import file ---->
import styles from "./Home.module.scss";
import CardFood from "@/components/CardFood";
import { GiftFilled, ThunderboltFilled } from "@ant-design/icons";
import BackgroundTitle from "@/components/BackgroundTitle";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { getListProductHome } from "src/app/slice/productSlice";
const cx = classNames.bind(styles);

const banner = [
    {
        id: 0,
        img: "/banner1.jpg",
    },
    {
        id: 1,
        img: "/banner2.jpg",
    },
];
const Home: NextPage = () => {
    const [swiper, setSwiper] = useState<SwiperClass>(null);
    const { listCombo, listBestseller } = useAppSelector(
        (state) => state.product
    );
    const disspatch = useAppDispatch();
    useEffect(() => {
        disspatch(getListProductHome());
    }, []);
    return (
        <div className="w-full">
            <section className="w-full h-[180px] ipad:h-[250px] tablet:h-[400px] laptop:h-[600px] mt-1 ">
                <Swiper
                    // onInit={(swiper) => {
                    //     console.log(swiper);
                    //     setSwiper(swiper);
                    // }}
                    grabCursor
                    pagination={true}
                    modules={[Pagination, Autoplay, Lazy]}
                    className="mySwiper"
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    lazy
                >
                    {banner.map((b, idx) => (
                        <SwiperSlide key={b.id}>
                            <img
                                data-src={b.img}
                                className="swiper-lazy block h-full w-full object-cover "
                            />
                            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
            <section className="w-full">
                <div className="w-full flex justify-center items-center h-[50px] laptop:h-[80px] relative">
                    <hr className="bg-[#8f03036b] h-[1px] w-1/2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
                    <h1 className="font-semibold  text-[#b41111] text-base laptop:text-2xl font-semibold bg-white block px-[10px] relative">
                        <GiftFilled /> KHUYẾN MÃI <GiftFilled />
                    </h1>
                </div>
                <div className="w-full max-w-[1250px] m-auto">
                    <Row justify="start" align="middle">
                        {listCombo.length > 0 &&
                            listCombo.map((item) => (
                                <Col xs={12} md={8} xl={6} key={item.id}>
                                    <CardFood product={item} />
                                </Col>
                            ))}
                    </Row>
                </div>
                <div className="w-full flex justify-center items-center"></div>
            </section>
            <section className="w-full">
                <div className="w-full flex justify-center items-center h-[50px] laptop:h-[80px] relative">
                    <hr className="bg-[#8f03036b] h-[1px] w-1/2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
                    <h1 className=" font-semibold text-[#b41111] text-base laptop:text-2xl  bg-white block px-[10px] relative">
                        <ThunderboltFilled /> MÓN BÁN CHẠY <ThunderboltFilled />
                    </h1>
                </div>
                <div className="w-full max-w-[1250px] m-auto">
                    <Row justify="start" align="middle">
                        {listBestseller.length > 0 &&
                            listBestseller.map((item) => (
                                <Col xs={12} md={8} xl={6} key={item.id}>
                                    <CardFood product={item} />
                                </Col>
                            ))}
                    </Row>
                </div>
            </section>
        </div>
    );
};

export default Home;
