/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";
import { Button, Col, Row, Space, Table } from "antd";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../../features/books/api";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Products() {
  const { data: productsData, isFetching } = useGetAllProductsQuery(undefined);
  // console.log(productsData);
  const [deleteProduct] = useDeleteProductMutation();

  // Function to handle user deletion
  const handleDeleteProduct = async (id: string) => {
    const toastId = toast.loading("Deleting product...");

    try {
      await deleteProduct(id).unwrap();
      toast.success("Product has been successfully deleted.", { id: toastId });
    } catch (err: any) {
      toast.error(
        err?.data?.message || "There was an issue while deleting the product.",
        { id: toastId }
      );
    }
  };

  const tableData = productsData?.data.map(
    ({ title, category, author, price, image, _id, language, quantity }) => ({
      key: _id,
      title,
      category,
      author,
      price,
      image,
      language,
      quantity,
    })
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageLink) => (
        <img src={imageLink} alt="Product" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/products/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/update/products/${item.key}`}>
              <Button>Update</Button>
            </Link>
            <Button onClick={() => handleDeleteProduct(item.key)}>
              Delete
            </Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  return (
    <Fragment>
      <div style={{ width: "100%", margin: "0 auto", padding: "20px" }}>
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div
              style={{
                minHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                scroll={{ x: "max-content" }}
                loading={isFetching}
                style={{ height: "100%" }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}
