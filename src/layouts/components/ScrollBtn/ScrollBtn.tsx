// <---- import lb ---->
import { UpOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
// <---- import file ---->
import styles from "./ScrollBtn.module.scss";
const cx = classNames.bind(styles);

const ScrollBtn = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisible);
    }, []);

    return (
        <button
            className={cx("scroll-btn")}
            onClick={scrollToTop}
            style={{ display: visible ? "flex" : "none" }}
        >
            <UpOutlined />
        </button>
    );
};

export default ScrollBtn;
