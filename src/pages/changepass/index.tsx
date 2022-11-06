// <---- import lb ---->
import type { NextPage } from "next";
import classNames from "classnames/bind";
import { Button, Form, Input } from "antd";
// <---- import file ---->
import styles from "./ChangePass.module.scss";
import BackgroundTitle from "@/components/BackgroundTitle";
import { warning } from "src/features/noti";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { changePass } from "src/app/slice/loginSlice";
const cx = classNames.bind(styles);
const ChangePass: NextPage = () => {
    const { loadingChangePass } = useAppSelector((state) => state.login);
    const disspatch = useAppDispatch();
    const onFinish = (values: any) => {
        const { currentpassword, newpassword, repassword } = values;
        if (newpassword.length < 6) {
            warning("Mật khẩu nhiều hơn 6 ký tự !!!");
            return;
        }
        if (newpassword !== repassword) {
            warning("Mật lại mật khẩu không đúng.");
            return;
        }
        disspatch(changePass(values));
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="w-full">
            <BackgroundTitle
                title={"Đổi mật Khẩu!"}
                des={"Thay đôi mật khẩu tài khoản bạn."}
            />
            <div className="w-full max-w-[1000px] p-[10px] pt-[50px] pb-[170px]">
                <Form
                    className="overflow-hidden"
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Mật khẩu hiện tại."
                        name="currentpassword"
                        rules={[
                            {
                                required: true,
                                message: "Please input your current pass!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu mới."
                        name="newpassword"
                        rules={[
                            {
                                required: true,
                                message: "Please input your new password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu."
                        name="repassword"
                        rules={[
                            {
                                required: true,
                                message: "Re enter the password",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            loading={loadingChangePass}
                            type="primary"
                            danger
                            htmlType="submit"
                        >
                            Đổi mật khẩu.
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ChangePass;
