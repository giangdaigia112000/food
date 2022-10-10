// <---- import lb ---->
import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button, DatePicker } from "antd";
import classNames from "classnames/bind";
// <---- import file ---->
import styles from "./Menu.module.scss";
import MainLayout from "../../layouts/MainLayout";
const cx = classNames.bind(styles);

const Menu: NextPage = () => {
    return (
        <MainLayout>
            <h1>menu</h1>
        </MainLayout>
    );
};

export default Menu;
