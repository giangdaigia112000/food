import BackgroundTitle from "@/components/BackgroundTitle";
import { Button, Form, Input, Select, InputNumber } from "antd";
import Search from "antd/lib/input/Search";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
    checkCode,
    deleteProductToCart,
    orderProduct,
    setOderSuccess,
    setVoucher,
} from "src/app/slice/cartSlice";

const Pay = () => {
    const { push } = useRouter();
    const {
        listProductCart,
        listShop,
        loadingOrder,
        oderSuccess,
        loadingCheckCode,
        voucher,
    } = useAppSelector((state) => state.card);
    const dispatch = useAppDispatch();
    const handleDeleteProductCart = (id: number) => {
        dispatch(deleteProductToCart(id));
    };
    useEffect(() => {
        dispatch(setVoucher(null));
    }, []);
    const handlePriceProductCart = useMemo(() => {
        const price = listProductCart.length
            ? listProductCart.reduce((result, current) => {
                  const handle =
                      result +
                      current.quantity *
                          current.products.options.size[
                              current.product_options as number
                          ].price;
                  return handle;
              }, 0)
            : 0;
        return price;
    }, [listProductCart]);

    const onFinish = (values: any) => {
        let { message } = values;
        const code = voucher ? voucher.code : "";
        if (!message) message = "";
        dispatch(orderProduct({ ...values, code, message })).then(() => {
            if (oderSuccess) {
                console.log(oderSuccess);

                push("/order");
                dispatch(setOderSuccess(false));
            }
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className="w-full">
            <BackgroundTitle
                title={"Thanh to??n"}
                des={
                    "Nh???p ?????y ????? th??ng tin v?? ki???m tra k??? ????n h??ng tr?????c khi ???n ?????t h??ng"
                }
            />

            <div className="w-full flex flex-col laptop:flex-row my-[10px] laptop:my-[20px] gap-[12px]">
                <div className="flex-[2] min-w-[300px] ">
                    {listProductCart.map((product, idx) => (
                        <div
                            key={idx}
                            className="w-full p-[5px] flex items-center relative border-b-[1px] border-[#d1d1d1]	"
                        >
                            <img
                                className="h-[30px] w-[30px] laptop:w-[60px] laptop:h-[60px] object-cover"
                                src={
                                    process.env.BASE_API +
                                    product.products.thumb
                                }
                            />
                            <div className="pl-[10px]">
                                <div className="flex items-center">
                                    <h1 className="text-xs laptop:text-base pr-[10px] font-semibold uppercase">
                                        {product.products.name}
                                    </h1>
                                    <span className="pr-[10px] text-sm">
                                        ---
                                    </span>
                                    <span className="font-semibold text-sm laptop:text-base text-[#b11c1c]">
                                        {
                                            product.products.options.size[
                                                product.product_options as number
                                            ].op
                                        }
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold text-sm laptop:text-base text-[#b11c1c]">
                                        {product.quantity}
                                    </span>
                                    <span className="px-[5px] text-sm">x</span>
                                    <span className="font-semibold text-sm laptop:text-base text-[#b11c1c]">
                                        {
                                            product.products.options.size[
                                                product.product_options as number
                                            ].price
                                        }
                                    </span>
                                    <span className="px-[2px] text-sm">??</span>
                                </div>
                            </div>
                            <Button
                                className=" absolute top-0 right-[20px] translate-y-[50%]"
                                shape="circle"
                                size="middle"
                                danger
                                onClick={() =>
                                    handleDeleteProductCart(product.id)
                                }
                            >
                                <span className="text-xs laptop:text-sm">
                                    X??a
                                </span>
                            </Button>
                        </div>
                    ))}
                    <div className="w-full">
                        <div className="w-full max-w-[300px] pt-[20px] pl-[10px]">
                            <Search
                                placeholder="M?? khuy???n m??i"
                                allowClear
                                enterButton={
                                    <Button
                                        type="primary"
                                        danger
                                        loading={loadingCheckCode}
                                    >
                                        S??? d???ng m??
                                    </Button>
                                }
                                onSearch={(value: string) => {
                                    dispatch(checkCode(value));
                                }}
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-end items-center p-[20px] pb-[0px]">
                        <span className="px-[2px] text-sm">
                            T???ng g??a tr??? ????n h??ng:{" "}
                        </span>
                        <span
                            className={`font-semibold text-base laptop:text-xl text-[#b11c1c] ${
                                voucher && "line-through"
                            }`}
                        >
                            {handlePriceProductCart}
                        </span>
                        <span className="px-[2px] text-sm">??</span>
                    </div>
                    {voucher && (
                        <>
                            <div className="w-full flex justify-end items-center pb-[0px] pr-[20px]">
                                <span className="px-[2px] text-sm">
                                    Gi?? sau khuy???n m??i
                                </span>
                            </div>
                            <div className="w-full flex justify-end items-center pb-[0px] pr-[20px]">
                                <span
                                    className={`font-semibold text-base laptop:text-xl text-[#b11c1c] `}
                                >
                                    {voucher.type === "%"
                                        ? (handlePriceProductCart *
                                              (100 - voucher.discount)) /
                                          100
                                        : handlePriceProductCart -
                                          voucher.discount}
                                </span>
                                <span className="px-[2px] text-sm">??</span>
                            </div>
                        </>
                    )}

                    <div className="w-full flex justify-end items-center px-[20px] pb-[20px]">
                        <span className="px-[2px] text-sm">
                            (Ch??a t??nh gi?? v???n chuy???n)
                        </span>
                    </div>
                </div>
                <div className="flex-[1] bg-[#f5f5f5] p-[20px] rounded-[10px]">
                    <div className="w-full flex justify-center items-center font-semibold my-[10px]">
                        <h1 className="text-base laptop:text-xl text-[#b11c1c]">
                            Th??ng tin thanh to??n
                        </h1>
                    </div>
                    <Form
                        name="pay"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="H??? v?? t??n"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Kh??ng b??? tr???ng!!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="S??? ??i???n tho???i"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Kh??ng b??? tr???ng!!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="?????a ch???"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "Kh??ng b??? tr???ng!!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="shop_id"
                            label="C???a h??n g???n b???n"
                            rules={[
                                {
                                    required: true,
                                    message: "Kh??ng b??? tr???ng!!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Vui l??ng ch???n c???a h??ng g???n b???n."
                                allowClear
                            >
                                {listShop.length > 0 &&
                                    listShop.map((shop, idx) => (
                                        <Select.Option
                                            key={idx}
                                            value={shop.id}
                                        >
                                            {shop.address}
                                        </Select.Option>
                                    ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="message" label="Y??u c???u kh??c">
                            <Input.TextArea />
                        </Form.Item>
                        <div className="w-full flex justify-center items-center">
                            <Form.Item>
                                <Button
                                    loading={loadingOrder}
                                    type="primary"
                                    danger
                                    htmlType="submit"
                                >
                                    ?????t h??ng
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                    <div className="w-full flex justify-center items-center">
                        <span className="text-center text-sm">
                            Qu?? kh??ch vui l??ng ??i???n ?????y ????? th??ng tin ????? Juwan
                            food c?? th??? ph???c v??? qu?? kh??ch t???t nh???t.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pay;
