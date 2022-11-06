import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);

const footer = [
    {
        id: 0,
        icon: "/footer/footer_01.png",
        title: "CHẤT LƯỢNG DẪN ĐẦU",
        content:
            "Chú trọng khâu tuyển chọn đội ngũ đầu bếp chuyên nghiệp, thực đơn của JuwanFood luôn được đổi mới, đa dạng với các món ăn nhiều hương vị, sandwich, mỳ ý và các món ăn nhanh khác.",
    },
    {
        id: 1,
        icon: "/footer/footer_02.png",
        title: "GIAO HÀNG ĐÚNG GIỜ",
        content:
            "Để tăng cường sự tin tưởng và yên tâm với khách hàng, JuwanFood cam kết luôn giao hàng đúng giờ và chi phí giao hàng rẻ nhất để đảm bảo khách hàng có thể nhận hàng trong thời gian nhanh nhất.",
    },
    {
        id: 2,
        icon: "/footer/footer_03.png",
        title: "FAST FOOD TAKE AWAY",
        content:
            "Chú trọng khâu tuyển chọn đội ngũ đầu bếp chuyên nghiệp, thực đơn của JuwanFood luôn được đổi mới, đa dạng với món ăn nhiều hương vị, sandwich, mỳ ý và các món ăn nhanh khác.",
    },
    {
        id: 3,
        icon: "/footer/footer_04.png",
        title: "PHỤC VỤ CHUYÊN NGHIỆP",
        content:
            "Chú trọng khâu tuyển chọn đội ngũ đầu bếp chuyên nghiệp, thực đơn của JuwanFood luôn được đổi mới, đa dạng với món ăn nhiều hương vị, sandwich, mỳ ý và các món ăn nhanh khác.",
    },
];
const Footer = () => {
    return (
        <>
            <div className={cx("bg-footer")}>
                <div className="w-full px-[10px] flex-col laptop:flex-row flex max-w-[1170px] m-auto">
                    {footer.map((f) => (
                        <div
                            className="flex-1 flex flex-col items-center"
                            key={f.id}
                        >
                            <img className="pb-[10px]" src={f.icon} />
                            <h1 className=" text-center text-lg laptop:text-xl font-medium text-[#c31717]">
                                {f.title}
                            </h1>
                            <p className="text-sm laptop:text-base text-center p-[20px] italic ">
                                {f.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <footer
                className={`w-full  min-h-[300px] flex justify-center flex-col items-center ${cx(
                    "footer"
                )}`}
            >
                <img
                    className="h-[80px]"
                    src="/juwanfood-logo-while.png"
                    alt="logo"
                />
                <h1 className="text-[#ffe100] font-semibold laptop:text-xl pt-2">
                    CÔNG TY TNHH JUWAN VIỆT NAM
                </h1>
                <p className="text-sm laptop:text-base font-semibold text-center text-[#fff] pt-2">
                    Để phản ánh chất lượng dịch vụ, vui lòng gọi số:
                    0989.139.565
                </p>
                <p className="text-sm laptop:text-base font-semibold text-center text-[#fff] pt-2">
                    Email: lienhejuwanfood@gmail.com
                </p>
            </footer>
        </>
    );
};

export default Footer;
