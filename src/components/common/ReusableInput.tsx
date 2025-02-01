import { Form, Input, InputNumber } from "antd";
import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TReusableInputProps = {
  type: string;
  name: string;
  label?: string;
  icon?: ReactNode;
  placeholder?: string;
  defaultValue?: string | number;
  rules?: any;
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
      rules={rules}
      render={({ field, fieldState }) => (
        <Form.Item
          label={label}
          validateStatus={fieldState.error ? "error" : ""}
          help={fieldState.error?.message}
        >
          {type === "number" ? (
            <InputNumber
              {...field}
              id={name}
              size="middle"
              placeholder={placeholder}
              defaultValue={defaultValue}
              style={{ width: "100%" }}
            />
          ) : (
            <Input
              {...field}
              type={type}
              id={name}
              prefix={icon}
              size="middle"
              placeholder={placeholder}
              defaultValue={defaultValue}
            />
          )}
          {fieldState.error && (
            <small style={{ color: "red" }}>{fieldState.error?.message}</small>
          )}
        </Form.Item>
      )}
    />
  );
}
