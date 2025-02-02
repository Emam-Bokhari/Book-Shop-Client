/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row, Typography } from "antd";
import { Fragment } from "react/jsx-runtime";
import ReusableForm from "../../../components/common/ReusableForm";
import ReusableInput from "../../../components/common/ReusableInput";
import ReusableSelect from "../../../components/common/ReusableSelect";
import ReusableDatePicker from "../../../components/common/ReusableDatePicker";
import ReusableTextArea from "../../../components/common/ReusableTextArea";
import { useAddProductMutation } from "../../../features/books/api";
import { toast } from "sonner";
import { TProduct } from "../../../types";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const categoryOptions = [
  "fiction",
  "nonFiction",
  "academic",
  "philosophy",
  "children",
  "science",
  "religion",
  "history",
].map((item) => ({
  label: item.charAt(0).toUpperCase() + item.slice(1),
  value: item,
}));

const languageOptions = [
  "bengali",
  "english",
  "arabic",
  "hindi",
  "spanish",
  "french",
  "german",
].map((item) => ({
  label: item.charAt(0).toUpperCase() + item.slice(1),
  value: item,
}));

const formatOptions = ["hardcover", "paperback", "eBook", "audioBook"].map(
  (item) => ({
    label: item?.charAt(0)?.toUpperCase() + item?.slice(1),
    value: item,
  })
);

export default function CreateProduct() {
  const navigate = useNavigate();

  const [addProduct] = useAddProductMutation(undefined);

  const onSubmit = async (data: TProduct) => {
    const toastId = toast.loading("Product creating...");

    const formattedData = {
      ...data,
      price: Number(data?.price),
      pages: Number(data?.pages),
      rating: Number(data?.rating),
      quantity: Number(data?.quantity),
    };

    try {
      await addProduct(formattedData).unwrap();
      toast.success("Product added successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate("/products");
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "Failed to add product. Please try again later.";

      toast.error(errorMessage, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Fragment>
      <Title level={3} style={{ textAlign: "center" }}>
        Create Product
      </Title>
      <Row justify="center">
        <Col xs={24} sm={18} md={14} lg={12} xl={10}>
          <ReusableForm onSubmit={onSubmit}>
            <Row gutter={[20, 20]}>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  name="title"
                  label={
                    <span>
                      Title <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  placeholder="Enter Book Title Name"
                  rules={[
                    { required: true, message: "Please enter book title name" },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableTextArea
                  label={
                    <span>
                      Description <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="description"
                  placeholder="Enter Book Description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter book description",
                    },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableSelect
                  label={
                    <span>
                      Category <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="category"
                  options={categoryOptions}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  label={
                    <span>
                      Author <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="author"
                  placeholder="Enter Book Author Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter book author name",
                    },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  label={
                    <span>
                      Price <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="price"
                  placeholder="Enter Book Price"
                  rules={[
                    { required: true, message: "Please enter book price" },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  name="image"
                  label={
                    <span>
                      Image Url <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  placeholder="Enter Book Image Url Link"
                  rules={[
                    {
                      required: true,
                      message: "Please enter book image url link",
                    },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  label={
                    <span>
                      Publisher <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="publisher"
                  placeholder="Enter Book Publisher"
                  rules={[
                    { required: true, message: "Please enter book publisher" },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableDatePicker
                  name="publishedDate"
                  label={
                    <span>
                      Published Date <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  label="Edition"
                  name="edition"
                  placeholder="Enter Book Edition"
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableSelect
                  label={
                    <span>
                      Language <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="language"
                  options={languageOptions}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  label="Pages"
                  name="pages"
                  placeholder="Enter Pages"
                  rules={[{ required: true, message: "Please enter pages" }]}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  label={
                    <span>
                      Rating <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="rating"
                  placeholder="Enter Rating"
                  rules={[{ required: true, message: "Please enter rating" }]}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableSelect
                  label={
                    <span>
                      Format <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="format"
                  options={formatOptions}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  label={
                    <span>
                      Quantity <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="quantity"
                  placeholder="Enter Quantity"
                  rules={[{ required: true, message: "Please enter quantity" }]}
                />
              </Col>
              <Col xs={24}>
                <Button type="primary" htmlType="submit" block>
                  Add Product
                </Button>
              </Col>
            </Row>
          </ReusableForm>
        </Col>
      </Row>
    </Fragment>
  );
}
