import { LoadingOutlined } from "@ant-design/icons";
import { Card, InputNumber } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
    addProductToCart,
    getListProductToCart,
    openCart,
} from "src/app/slice/cartSlice";
import { warning } from "src/features/noti";
import { Product } from "src/interface";

interface Prop {
    product: Product;
}
function CardFood({ product }: Prop) {
    const [sizeFood, setSizeFood] = useState<number>(0);
    const [amount, setAmount] = useState<number>(1);
    const { loadingAddCart } = useAppSelector((state) => state.card);
    const { isLogin } = useAppSelector((state) => state.login);

    const dispatch = useAppDispatch();

    const handleAddProductCart = () => {
        if (!isLogin) {
            warning("Bạn cần đăng nhập để mua hàng.");
            return;
        }
        dispatch(openCart(true));
        dispatch(
            addProductToCart({
                product_id: product.id,
                quantity: amount,
                product_options: sizeFood,
            })
        );
    };

    return (
        <div className="w-full p-[8px]">
            <Card
                style={{
                    width: "100%",
                    overflow: "hidden",
                    boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    borderRadius: "10px",
                }}
                cover={
                    <div className="w-full overflow-hidden">
                        <img
                            className="w-full h-[250px] object-cover hover:scale-[1.2]  transition-all duration-200"
                            alt="food"
                            src={`${process.env.BASE_API}${product.thumb}`}
                        />
                    </div>
                }
                actions={[
                    <div className="w-full h-[40px] flex justify-center items-center cursor-default">
                        {loadingAddCart ? (
                            <LoadingOutlined />
                        ) : (
                            <div
                                onClick={handleAddProductCart}
                                className="w-[120px] tablet:w-[150px] h-[35px] tablet:h-[40px] bg-[#a5a5a5c0] rounded-[20px] cursor-pointer flex justify-center items-center  transition-all duration-300 hover:bg-[#e70101]"
                            >
                                <span className=" text-xs tablet:text-sm font-semibold text-[#fff]">
                                    Thêm vào giỏ
                                </span>
                            </div>
                        )}
                    </div>,
                ]}
            >
                <div className="w-full text-center px-[10px] py-[5px]">
                    <h1 className="text-sm tablet:text-base font-semibold uppercase">
                        {product.name}
                    </h1>

                    <p className=" text-xs tablet:text-sm">
                        {product.description}
                    </p>
                    <div className="text-[#c51212]">
                        <span className="pr-1 text-base tablet:text-xl font-semibold">
                            {product?.options?.size[sizeFood as number].price}
                        </span>
                        <span className="underline decoration-solid text-sm">
                            đ
                        </span>
                    </div>
                    <div className="flex justify-center  gap-1 tablet:gap-2  items-center">
                        <span className="text-xs tablet:text-sm">Size: </span>
                        <div className="flex justify-center ">
                            {product.options.size.map((s, idx) => (
                                <span
                                    key={idx}
                                    className={`block text-xs tablet:text-sm w-[20px] h-[20px] cursor-pointer m-[3px] font-semibold text-[#525252] rounded-full uppercase flex justify-center items-center
                                    ${
                                        sizeFood === idx
                                            ? "bg-[#c51212] text-[#ffffff]"
                                            : ""
                                    }`}
                                    onClick={() => setSizeFood(idx)}
                                >
                                    {s.op}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center gap-1 tablet:gap-2 items-center">
                        <span className="text-xs tablet:text-sm">
                            số lượng:
                        </span>
                        <InputNumber
                            min={1}
                            max={100}
                            defaultValue={1}
                            onChange={(e) => {
                                setAmount(e);
                            }}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default CardFood;
