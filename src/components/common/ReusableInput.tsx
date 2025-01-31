import { Form, Input } from "antd";
import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TReusableInputProps = {
  type: string;
  name: string;
  label?: string;
  icon?: ReactNode;
  placeholder?: string;
  defaultValue?: string | number;
  rules?: Array<{ required: boolean; message: string }>;
};

export default function ReusableInput({
  type,
  name,
  label,
  icon,
  placeholder,
  defaultValue,
  rules,
}: TReusableInputProps) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Form.Item label={label} rules={rules}>
          <Input
            {...field}
            type={type}
            id={name}
            prefix={icon}
            size="middle"
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        </Form.Item>
      )}
    />
  );
}
