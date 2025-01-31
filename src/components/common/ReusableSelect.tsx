import { Form, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options?: { value: string; label: string; disabled?: boolean }[] | undefined;
  defaultValue?: string;
};

export default function ReusableSelect({
  label,
  name,
  options,
  defaultValue,
}: TPHSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            defaultValue={defaultValue || "None"}
            style={{ width: "100%" }}
            size="middle"
            options={options}
          />
          {error && <small style={{ color: "red" }}>{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
}
