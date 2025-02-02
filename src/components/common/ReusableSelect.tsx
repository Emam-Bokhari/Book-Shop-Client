import { Form, Select } from "antd";
import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TPHSelectProps = {
  label: ReactNode;
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
