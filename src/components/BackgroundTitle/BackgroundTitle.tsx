import { Button } from "antd";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
// <---- import file ---->
import styles from "./BackgroundTitle.module.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);

interface Prop {
    title: string;
    des: string;
}
const BackgroundTitle = (prop: Prop) => {
    const { back } = useRouter();
    return (
        <div className="w-full relative">
            <div className="absolute top-0 left-0 z-[1] text-sm tablet:text-xl">
                <Button
                    className="flex items-center"
                    danger
                    onClick={() => {
                        back();
                    }}
                    type="text"
                    size="middle"
                >
                    <ArrowLeftOutlined /> Back
                </Button>
            </div>
            <div
                className={`full h-[200px] relative flex justify-center items-center flex-col ${cx(
                    "Change-title"
                )}`}
            >
                <span className="font-[fz] text-[#fffc00] text-base tablet:text-2xl ">
                    {prop.title}
                </span>
                <span className=" text-sm tablet:text-base text-[#fff] font-medium text-center p-2">
                    {prop.des}
                </span>
            </div>
        </div>
    );
};

export default BackgroundTitle;
