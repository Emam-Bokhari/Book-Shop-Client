import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type ReusableFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
};

export default function ReusableForm({
  children,
  onSubmit,
}: ReusableFormProps) {
  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Form onFinish={methods.handleSubmit(submit)}>{children}</Form>
    </FormProvider>
  );
}
