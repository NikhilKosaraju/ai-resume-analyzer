import { Typography, Button, Space } from "antd";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const { Title, Paragraph } = Typography;

function Home() {
  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <Title
          style={{
            fontSize: "3rem",
            marginBottom: "10px",
          }}
        >
          AI Resume Analyzer 🚀
        </Title>

        <Paragraph
          style={{
            fontSize: "18px",
            maxWidth: "700px",
          }}
        >
          Upload your resume and get AI-powered insights,
          resume scoring, skill analysis, improvement
          suggestions, and interview questions.
        </Paragraph>

        <Space size="large">
          <Link to="/upload">
            <Button type="primary" size="large">
              Analyze Resume
            </Button>
          </Link>

          <Link to="/results">
            <Button size="large">
              View Demo Results
            </Button>
          </Link>
        </Space>
      </div>
    </>
  );
}

export default Home;