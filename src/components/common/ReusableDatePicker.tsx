import { DatePicker, Form } from "antd";
import moment, { Moment } from "moment";
import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: ReactNode;
  defaultValue?: string;
};

export default function ReusableDatePicker({
  name,
  label,
  defaultValue,
}: TDatePickerProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Item label={label} validateStatus={errors[name] ? "error" : ""}>
          <DatePicker
            {...field}
            id={name}
            size="middle"
            style={{ width: "100%" }}
            defaultValue={defaultValue ? moment(defaultValue) : null}
            value={field.value ? moment(field.value) : null}
            onChange={(date: Moment | null) => {
              field.onChange(date ? date.toISOString() : null);
            }}
          />
        </Form.Item>
      )}
    />
  );
}
