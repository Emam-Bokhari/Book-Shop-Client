import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TReusableTextAreaProps = {
  name: string;
  label?: string;
  placeholder?: string;
  rules?: Array<{ required: boolean; message: string }>;
  rows?: number;
  defaultValue?: string;
};

export default function ReusableTextArea({
  name,
  label,
  placeholder,
  rules,
  rows = 4,
  defaultValue,
}: TReusableTextAreaProps) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Form.Item label={label} rules={rules}>
          <Input.TextArea
            {...field}
            id={name}
            size="middle"
            placeholder={placeholder}
            rows={rows}
            defaultValue={defaultValue}
          />
        </Form.Item>
      )}
    />
  );
}
