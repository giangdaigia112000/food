import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button, DatePicker } from "antd";
import classNames from "classnames/bind";
// <---- import file ---->
import styles from "./Blog.module.scss";
import MainLayout from "../../layouts/MainLayout";
const cx = classNames.bind(styles);

const Blog: NextPage = () => {
    return (
        <MainLayout>
            <h1>Blog</h1>
        </MainLayout>
    );
};

export default Blog;
