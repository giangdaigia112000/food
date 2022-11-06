import { LoadingOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { deleteProductToCart, openCart } from "src/app/slice/cartSlice";

const ModalCart = () => {
    const { push } = useRouter();
    const { isOpenCart, listProductCart, loading, loadingAddCart } =
        useAppSelector((state) => state.card);

    const dispatch = useAppDispatch();
    const handleOk = () => {
        push("/pay");
        dispatch(openCart(false));
    };
    const handleCancel = () => {
        dispatch(openCart(false));
    };
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
    return (
        <>
            <Modal
                width={600}
                open={isOpenCart}
                title="Giỏ hàng"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Tiếp tục mua hàng
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        danger
                        loading={false}
                        onClick={handleOk}
                        disabled={listProductCart.length > 0 ? false : true}
                    >
                        Đặt hàng
                    </Button>,
                ]}
            >
                {loading || loadingAddCart ? (
                    <div className="w-full flex justify-center">
                        <LoadingOutlined />
                    </div>
                ) : (
                    <></>
                )}
                {listProductCart.length > 0 ? (
                    <div className="w-full max-h-[500px] overflow-y-auto">
                        {listProductCart.map((product, idx) => (
                            <div
                                key={idx}
                                className="w-full py-[5px] flex items-center relative border-b-[1px] border-[#d1d1d1]	"
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
                                        <span className="px-[5px] text-sm">
                                            x
                                        </span>
                                        <span className="font-semibold text-sm laptop:text-base text-[#b11c1c]">
                                            {
                                                product.products.options.size[
                                                    product.product_options as number
                                                ].price
                                            }
                                        </span>
                                        <span className="px-[2px] text-sm">
                                            đ
                                        </span>
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
                        <div className="w-full flex justify-end p-[20px] items-center">
                            <span className="px-[2px] text-sm">
                                Tổng cộng:{" "}
                            </span>
                            <span className="font-semibold text-sm laptop:text-base text-[#b11c1c]">
                                {handlePriceProductCart as number}
                            </span>
                            <span className="px-[2px] text-sm">đ</span>
                        </div>
                    </div>
                ) : (
                    <h1>Không có sản phẩm nào!!!</h1>
                )}
            </Modal>
        </>
    );
};

export default ModalCart;
