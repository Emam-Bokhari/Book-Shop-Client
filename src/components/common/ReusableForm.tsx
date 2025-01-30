import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TReusableFormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
};

export default function ReusableForm<T extends FieldValues>({
  children,
  onSubmit,
}: TReusableFormProps<T>) {
  const methods = useForm<T>(); // Initialize before using it
  const submit: SubmitHandler<T> = (data) => {
    onSubmit(data);
    methods.reset(); // Reset after successful submission
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
}
