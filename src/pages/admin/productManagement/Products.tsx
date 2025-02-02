/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from "react";
import { Button, Col, Pagination, Row, Space, Table } from "antd";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../../features/books/api";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { TQueryParam } from "../../../types/global";

export type ProductItem = {
  key: string;
  title: string;
  category: string;
  author: string;
  price: string;
  image: string;
  language: string;
  quantity: number;
};

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);

  const [params, setParams] = useState<TQueryParam[]>([]);

  const { data: productsData, isFetching } = useGetAllProductsQuery([
    { name: "page", value: currentPage },
    // { name: "limit", value: 5 },
    ...params,
  ]);

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

  const metaData = productsData?.meta;

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageLink: string) => (
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
      filters: [
        {
          text: "Fiction",
          value: "fiction",
        },
        {
          text: "NonFiction",
          value: "nonFiction",
        },
        {
          text: "Academic",
          value: "academic",
        },
        {
          text: "Philosophy",
          value: "philosophy",
        },
        {
          text: "Children",
          value: "children",
        },
        {
          text: "Science",
          value: "science",
        },
        {
          text: "Religion",
          value: "religion",
        },
        {
          text: "History",
          value: "history",
        },
      ],
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
      filters: [
        {
          text: "Bengali",
          value: "bengali",
        },
        {
          text: "English",
          value: "english",
        },
        {
          text: "Arabic",
          value: "arabic",
        },
        {
          text: "Hindi",
          value: "hindi",
        },
        {
          text: "Spanish",
          value: "spanish",
        },
        {
          text: "French",
          value: "french",
        },
        {
          text: "German",
          value: "german",
        },
      ],
      // onFilter: (value, record) => record.language.startsWith(value as string),
      // filterSearch: true,
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
      render: (item: ProductItem) => {
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

  const onChange = (_pagination, filters, _sorter, extra) => {
    console.log("params", filters, extra);
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.language?.forEach((item) =>
        queryParams?.push({ name: "language", value: item })
      );

      filters.category?.forEach((item) =>
        queryParams?.push({ name: "category", value: item })
      );

      setParams(queryParams);
    }
  };

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
                onChange={onChange}
                style={{ height: "100%" }}
              />
              <Pagination
                style={{ marginTop: "20px" }}
                align="end"
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
                pageSize={metaData?.limit}
                total={metaData?.total}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}
