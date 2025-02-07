import { Button, Card, Rate, theme, Typography } from "antd";
import { Link } from "react-router-dom";
const { Title, Paragraph } = Typography;

const { useToken } = theme;

export type BookCardProps = {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  onAddToCart?: () => void;
};

export default function BookCard({
  title,
  image,
  price,
  rating = 4,
  id,
}: BookCardProps) {
  const { token } = useToken();

  function truncateTitle(title: string) {
    return title.length > 25 ? title.slice(0, 25) + "..." : title;
  }

  return (
    <Link to={`/books/${id}`} style={{ cursor: "pointer" }}>
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
            {truncateTitle(title)}
          </Title>
          <Paragraph style={{ color: "#62AB00", fontWeight: "bold" }}>
            $ &nbsp;{price}
          </Paragraph>
          <Rate disabled defaultValue={rating} />
          <Button
            iconPosition="end"
            type="primary"
            block
            style={{ marginTop: "10px" }}
          >
            View Details
          </Button>
        </div>
      </Card>
    </Link>
  );
}
