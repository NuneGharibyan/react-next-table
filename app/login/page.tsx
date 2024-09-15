"use client";

import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./page.module.css";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = () => {
    localStorage.setItem("auth-token", "token");
    router.replace("/");
  };

  return (
    <div className={styles.container}>
      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className={styles.form}
        onFinish={onFinish}
        validateMessages={{
          required: "Please input your ${name}!",
        }}
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
