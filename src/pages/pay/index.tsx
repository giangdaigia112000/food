import BackgroundTitle from "@/components/BackgroundTitle";
import { Button, Form, Input, Select, InputNumber } from "antd";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { deleteProductToCart, orderProduct } from "src/app/slice/cartSlice";

const Pay = () => {
    const { push } = useRouter();
    const { listProductCart, listShop, loadingOrder } = useAppSelector(
        (state) => state.card
    );
    const dispatch = useAppDispatch();
    const handleDeleteProductCart = (id: number) => {
        dispatch(deleteProductToCart(id));
    };
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
        if (!message) message = "";
        dispatch(orderProduct({ ...values, message })).then(() => {
            push("/order");
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className="w-full">
            <BackgroundTitle
                title={"Thanh toán"}
                des={
                    "Nhập đầy đủ thông tin và kiểm tra kỹ đơn hàng trước khi ấn đặt hàng"
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
                                    <span className="px-[2px] text-sm">đ</span>
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
                                    Xóa
                                </span>
                            </Button>
                        </div>
                    ))}
                    <div className="w-full flex justify-end items-center p-[20px] pb-[0px]">
                        <span className="px-[2px] text-sm">
                            Tổng gía trị đơn hàng:{" "}
                        </span>
                        <span className="font-semibold text-base laptop:text-xl text-[#b11c1c]">
                            {handlePriceProductCart}
                        </span>
                        <span className="px-[2px] text-sm">đ</span>
                    </div>
                    <div className="w-full flex justify-end items-center px-[20px] pb-[20px]">
                        <span className="px-[2px] text-sm">
                            (Chưa tính giá vận chuyển)
                        </span>
                    </div>
                </div>
                <div className="flex-[1] bg-[#f5f5f5] p-[20px] rounded-[10px]">
                    <div className="w-full flex justify-center items-center font-semibold my-[10px]">
                        <h1 className="text-base laptop:text-xl text-[#b11c1c]">
                            Thông tin thanh toán
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
                            label="Họ và tên"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Không bỏ trống!!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Không bỏ trống!!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "Không bỏ trống!!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="shop_id"
                            label="Cửa hàn gần bạn"
                            rules={[
                                {
                                    required: true,
                                    message: "Không bỏ trống!!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Vui lòng chọn cửa hàng gần bạn."
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
                        <Form.Item name="message" label="Yêu cầu khác">
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
                                    Đặt hàng
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                    <div className="w-full flex justify-center items-center">
                        <span className="text-center text-sm">
                            Quý khách vui lòng điền đầy đủ thông tin để Juwan
                            food có thể phục vụ quý khách tốt nhất.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pay;
