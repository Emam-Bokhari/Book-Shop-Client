import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row, Skeleton, Typography } from "antd";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../../features/books/api";
import { TProduct } from "../../../types";
import ReusableForm from "../../../components/common/ReusableForm";
import ReusableInput from "../../../components/common/ReusableInput";
import { Fragment } from "react/jsx-runtime";
import ReusableSelect from "../../../components/common/ReusableSelect";
import ReusableDatePicker from "../../../components/common/ReusableDatePicker";
import ReusableTextArea from "../../../components/common/ReusableTextArea";
import { toast } from "sonner";

export default function UpdateProduct() {
  const { id } = useParams<{ id: string }>();
  const { Title } = Typography;
  const navigate = useNavigate();

  const { data: productData, isLoading } = useGetProductQuery(id);

  const [updateProduct] = useUpdateProductMutation();

  // Handle form submission to update the product
  const onSubmit = async (data: TProduct) => {
    const toastId = toast.loading("Updating product...");

    try {
      const updatedProduct = await updateProduct({ id, data });
      console.log(updatedProduct);
      toast.success("Update product successfully!", {
        id: toastId,
        duration: 2000,
      });
      navigate("/product");
    } catch (err) {
      toast.error(err.message || "Product update failed. Please try again.", {
        id: toastId,
        duration: 2000,
      });
    }
  };

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
      label: item.charAt(0).toUpperCase() + item.slice(1),
      value: item,
    })
  );

  if (isLoading) {
    return (
      <div style={{ padding: "40px 0", backgroundColor: "#f7f7f7" }}>
        <Row justify="center">
          <Col xs={24} sm={18} md={14} lg={12} xl={10}>
            <Skeleton active paragraph={{ rows: 12 }} />
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <Fragment>
      <Title level={3} style={{ textAlign: "center" }}>
        Update Product
      </Title>
      <Row justify="center">
        <Col xs={24} sm={18} md={14} lg={12} xl={10}>
          <ReusableForm onSubmit={onSubmit}>
            <Row gutter={[20, 20]}>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  name="title"
                  label="Title"
                  placeholder="Enter Book Title Name"
                  rules={[
                    { required: true, message: "Please enter book title name" },
                  ]}
                  defaultValue={productData?.data?.title}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableTextArea
                  label="Description"
                  name="description"
                  placeholder="Enter Book Description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter book description",
                    },
                  ]}
                  defaultValue={productData?.data?.description}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableSelect
                  label="Category"
                  name="category"
                  options={categoryOptions}
                  defaultValue={productData?.data?.category}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  label="Author"
                  name="author"
                  placeholder="Enter Book Author Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter book author name",
                    },
                  ]}
                  defaultValue={productData?.data?.author}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  label="Price"
                  name="price"
                  placeholder="Enter Book Price"
                  rules={[
                    { required: true, message: "Please enter book price" },
                  ]}
                  defaultValue={productData?.data?.price}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  name="image"
                  label="Image Url Link"
                  placeholder="Enter Book Image Url Link"
                  rules={[
                    {
                      required: true,
                      message: "Please enter book image url link",
                    },
                  ]}
                  defaultValue={productData?.data?.image}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  label="Publisher"
                  name="publisher"
                  placeholder="Enter Book Publisher"
                  rules={[
                    { required: true, message: "Please enter book publisher" },
                  ]}
                  defaultValue={productData?.data?.publisher}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableDatePicker
                  name="publishedDate"
                  label="Published Date"
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  label="Edition"
                  name="edition"
                  placeholder="Enter Book Edition"
                  rules={[
                    { required: true, message: "Please enter book edition" },
                  ]}
                  defaultValue={productData?.data?.edition}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableSelect
                  label="Language"
                  name="language"
                  options={languageOptions}
                  defaultValue={productData?.data?.language}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  label="Pages"
                  name="pages"
                  placeholder="Enter Pages"
                  rules={[{ required: true, message: "Please enter pages" }]}
                  defaultValue={productData?.data?.pages}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  label="Rating"
                  name="rating"
                  placeholder="Enter Rating"
                  rules={[{ required: true, message: "Please enter rating" }]}
                  defaultValue={productData?.data?.rating}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableSelect
                  label="Format"
                  name="format"
                  options={formatOptions}
                  defaultValue={productData?.data?.format}
                />
              </Col>
              <Col xs={24} sm={12}>
                <ReusableInput
                  type="text"
                  label="Quantity"
                  name="quantity"
                  placeholder="Enter Quantity"
                  rules={[{ required: true, message: "Please enter quantity" }]}
                  defaultValue={productData?.data?.quantity}
                />
              </Col>
              <Col xs={24}>
                <Button type="primary" htmlType="submit" block>
                  Update Product
                </Button>
              </Col>
            </Row>
          </ReusableForm>
        </Col>
      </Row>
    </Fragment>
  );
}
