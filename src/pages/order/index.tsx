import BackgroundTitle from "@/components/BackgroundTitle";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { cancelOrder, getListOrder } from "src/app/slice/cartSlice";
import {
    FcInTransit,
    FcCustomerSupport,
    FcPaid,
    FcHighPriority,
    FcDisapprove,
} from "react-icons/fc";
import moment from "moment";
import "moment/locale/vi";
import { Button, Modal, Skeleton } from "antd";
import { Order } from "src/interface";
import { SyncOutlined } from "@ant-design/icons";
const status = [
    {
        id: 0,
        title: "Chờ xác nhận.",
        icon: <FcCustomerSupport className="text-2xl" />,
    },
    {
        id: 1,
        title: "Đang chuẩn bị món.",
        icon: <FcCustomerSupport className="text-2xl" />,
    },
    {
        id: 2,
        title: "Đang giao hàng.",
        icon: <FcInTransit className="text-2xl" />,
    },
    {
        id: 3,
        title: "Giao hàng thành công.",
        icon: <FcPaid className="text-2xl" />,
    },
    {
        id: 4,
        title: "Đơn hàng bị hủy.",
        icon: <FcHighPriority className="text-2xl" />,
    },
    {
        id: 5,
        title: "Giao hàng thất bại.",
        icon: <FcDisapprove className="text-2xl" />,
    },
];
const Order = () => {
    const { loadingPageOrder, listOder, loadingCancelOrder } = useAppSelector(
        (state) => state.card
    );
    const disspatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [orderShow, setOrderShow] = useState<Order>();
    useEffect(() => {
        disspatch(getListOrder());
    }, []);
    const reLoad = () => {
        disspatch(getListOrder());
    };
    const handleOpenModalDetail = (order: Order) => {
        setOrderShow(order);
        setOpen(true);
        console.log(order);
    };
    const handleCancelOrder = (id: number) => {
        disspatch(cancelOrder(id)).then(() => {
            setOpen(false);
        });
    };
    return (
        <div className="w-full">
            <BackgroundTitle title={"Đơn hàng của bạn."} des={""} />

            <Modal
                title="Chi tiết đơn hàng."
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        danger
                        type="primary"
                        loading={loadingCancelOrder}
                        onClick={() => handleCancelOrder(orderShow.id)}
                        disabled={orderShow?.status !== 0}
                    >
                        Hủy đơn hàng
                    </Button>,
                ]}
                width={600}
            >
                {orderShow && (
                    <div
                        onClick={() => handleOpenModalDetail(orderShow)}
                        className="w-full"
                    >
                        <div className="w-full p-[5px] flex items-center">
                            <span className="text-2xl">
                                {status[orderShow.status].icon}
                            </span>
                            <span className="font-semibold ">
                                {status[orderShow.status].title}
                            </span>
                        </div>
                        <div className="w-full">
                            {orderShow.order_items.map((item) => (
                                <div
                                    key={item.id}
                                    className="w-full p-[5px] flex items-center relative border-b-[1px] border-[#d1d1d1]	"
                                >
                                    <img
                                        className="h-[30px] w-[30px] laptop:w-[60px] laptop:h-[60px] object-cover"
                                        src={
                                            process.env.BASE_API +
                                            item.products.thumb
                                        }
                                    />
                                    <div className="pl-[10px]">
                                        <div className="flex items-center">
                                            <h1 className="text-xs laptop:text-base pr-[10px] font-semibold uppercase">
                                                {item.products.name}
                                            </h1>
                                            <span className="pr-[10px] text-sm">
                                                ---
                                            </span>
                                            <span className="font-semibold text-sm laptop:text-base text-[#b11c1c]">
                                                {item.product_options.op}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-sm laptop:text-base text-[#b11c1c]">
                                                {item.quantity}
                                            </span>
                                            <span className="px-[5px] text-sm">
                                                x
                                            </span>
                                            <span className="font-semibold text-sm laptop:text-base text-[#b11c1c]">
                                                {item.product_options.price}
                                            </span>
                                            <span className="px-[2px] text-sm">
                                                đ
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full flex items-center p-[5px]">
                            <span className="text-[#ca1d1d] uppercase text-xs laptop:text-sm border-r-[1px] border-[#ca1d1dbd] pr-[10px]">
                                Mã đơn hàng:{" "}
                                <span className="font-semibold text-base">
                                    {orderShow.id}
                                </span>
                            </span>
                            <span className="text-[#ca1d1d] uppercase text-xs laptop:text-sm  border-r-[1px] border-[#ca1d1dbd] pr-[10px] ml-[10px]">
                                Thời gian:{" "}
                                <span className="font-semibold text-base">
                                    {moment(orderShow.created_at)
                                        .locale("vi")
                                        .format("L,h:mm a")}
                                </span>
                            </span>
                            <span className="text-[#ca1d1d] uppercase text-xs laptop:text-sm  ml-[10px] ">
                                Tổng tiền:
                                <span className="font-semibold text-base">
                                    {orderShow.totalprice}.đ
                                </span>
                            </span>
                        </div>
                    </div>
                )}
            </Modal>
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
                    {loadingPageOrder && listOder.length === 0 && (
                        <div className="w-full flex justify-center items-center">
                            <img src="/loading.svg" alt="loading" />
                        </div>
                    )}
                </div>
                <ul className="w-full">
                    {listOder.length > 0 ? (
                        <>
                            {listOder.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => handleOpenModalDetail(item)}
                                    className="w-full bg-slate-200 mt-[10px] p-[10px] rounded-lg cursor-pointer"
                                >
                                    {loadingPageOrder ? (
                                        <Skeleton
                                            active
                                            className=" w-full h-[50px]"
                                        />
                                    ) : (
                                        <>
                                            <div className="w-full flex items-center p-[5px]">
                                                <span className="text-[#ca1d1d] uppercase text-xs laptop:text-sm border-r-[1px] border-[#ca1d1dbd] pr-[10px]">
                                                    Mã đơn hàng:{" "}
                                                    <span className="font-semibold text-base">
                                                        {item.id}
                                                    </span>
                                                </span>
                                                <span className="text-[#ca1d1d] uppercase text-xs laptop:text-sm  border-r-[1px] border-[#ca1d1dbd] pr-[10px] ml-[10px]">
                                                    Thời gian:{" "}
                                                    <span className="font-semibold text-base">
                                                        {moment(item.created_at)
                                                            .locale("vi")
                                                            .format("L,h:mm a")}
                                                    </span>
                                                </span>
                                                <span className="text-[#ca1d1d] uppercase text-xs laptop:text-sm  ml-[10px] ">
                                                    Tổng tiền:
                                                    <span className="font-semibold text-base">
                                                        {item.totalprice}.đ
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="w-full p-[5px] flex items-center">
                                                {status[item.status].icon}
                                                <span className="font-semibold ">
                                                    {status[item.status].title}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </>
                    ) : (
                        <div className="w-full flex justify-center items-center p-[20px] text-center">
                            <h1 className="font-semibold">
                                Bạn chưa có đơn hàng nào !!!
                            </h1>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Order;
