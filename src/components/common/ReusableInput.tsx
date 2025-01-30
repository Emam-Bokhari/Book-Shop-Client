import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TReusableInputProps = {
  type: string;
  name: string;
  label: string;
};

export default function ReusableInput({
  type,
  name,
  label,
}: TReusableInputProps) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <Input {...field} type={type} id={name} />
        </Form.Item>
      )}
    />
  );
}
