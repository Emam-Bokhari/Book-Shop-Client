import { Card, Row, Col, Typography, theme } from "antd";

const { Title, Paragraph } = Typography;

const testimonials = [
  {
    name: "John Doe",
    role: "Book Lover",
    content:
      "I’ve been using this bookstore for months now, and I’m honestly hooked! The selection is fantastic, and I always find something new that I love. The delivery is super quick too.",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1738476450/profile-1-min_wcb6iz.jpg",
  },
  {
    name: "Jane Smith",
    role: "Frequent Buyer",
    content:
      "I’m always able to find exactly what I’m looking for. The website is so easy to navigate, and I love the personal recommendations. Plus, the books always arrive on time.",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1735019140/samples/smile.jpg",
  },
];

const { useToken } = theme;

export default function Testimonial() {
  const { token } = useToken();
  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "12px" }}>
      <Title
        level={2}
        style={{
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        What Our Customers Say
      </Title>
      <Paragraph
        style={{
          maxWidth: "600px",
          textAlign: "center",
          lineHeight: "1.6",
          color: token.colorTextSecondary,
          margin: "0 auto 30px auto",
        }}
      >
        Explore an incredible range of books, handpicked just for you. Whether
        you’re after a gripping page-turner or a timeless classic, you’ll find
        something you’ll love right here.
      </Paragraph>
      <Row gutter={[24, 24]} justify="center">
        {testimonials.map((testimonial, index) => (
          <Col xs={24} sm={24} md={12} key={index}>
            <Card
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "12px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <div style={{ marginBottom: "12px" }}>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <Title style={{ color: "#62AB00" }} level={4}>
                {testimonial.name}
              </Title>
              <Paragraph
                style={{
                  color: "#888",
                  fontStyle: "italic",
                  textAlign: "center",
                  marginBottom: "8px",
                }}
              >
                {testimonial.role}
              </Paragraph>
              <Paragraph
                style={{
                  color: "#555",
                  textAlign: "center",
                }}
              >
                "{testimonial.content}"
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
