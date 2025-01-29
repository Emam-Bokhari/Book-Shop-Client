import { Button, Card, Rate, theme, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Title, Paragraph } = Typography;

const { useToken } = theme;

interface BookCardProps {
  title: string;
  image: string;
  price: number;
  rating?: number;
  id: string;
  onAddToCart?: () => void;
}

export default function BookCard({
  title,
  image,
  price,
  rating = 4,
  onAddToCart,
  id,
}: BookCardProps) {
  const { token } = useToken();
  return (
    <Link to={`/books/${id}`} style={{ textDecoration: "none" }}>
      <Card
        style={{
          width: "100%",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid #f0f0f0",
          transition: "all 0.3s ease-in-out",
        }}
        hoverable
        cover={
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />
        }
      >
        <div style={{ textAlign: "center" }}>
          <Title level={5} style={{ color: token.colorTextSecondary }}>
            {title}
          </Title>
          <Paragraph style={{ color: "#62AB00", fontWeight: "bold" }}>
            BDT &nbsp;{price}
          </Paragraph>
          <Rate disabled defaultValue={rating} />
          <Button
            onClick={onAddToCart}
            icon={<ShoppingCartOutlined style={{ fontSize: "20px" }} />}
            iconPosition="end"
            type="primary"
            block
            style={{ marginTop: "10px" }}
          >
            Add to cart
          </Button>
        </div>
      </Card>
    </Link>
  );
}
