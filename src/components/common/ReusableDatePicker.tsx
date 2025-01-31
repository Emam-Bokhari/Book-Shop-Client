import { DatePicker, Form } from "antd";
import moment from "moment";
import { Controller, useFormContext } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
};

export default function ReusableDatePicker({ name, label }: TDatePickerProps) {
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
            value={field.value ? moment(field.value) : null}
            onChange={(date) =>
              field.onChange(date ? date.toISOString() : null)
            }
          />
        </Form.Item>
      )}
    />
  );
}
