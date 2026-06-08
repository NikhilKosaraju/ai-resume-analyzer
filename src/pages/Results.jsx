import Navbar from "../components/Navbar";
import {
  Card,
  Typography,
  Progress,
  Tag,
  Row,
  Col,
  List,
} from "antd";

const { Title, Paragraph } = Typography;

function Results() {
  const resumeText =
    localStorage.getItem("resumeText") || "";

  const analysis = JSON.parse(
    localStorage.getItem("analysis") || "{}"
  );

  const score = analysis.score || 0;
  const skills = analysis.skills || [];
  const suggestions = analysis.suggestions || [];

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "30px auto",
          padding: "20px",
        }}
      >
        <Title level={2}>
          AI Resume Analysis
        </Title>

        <Row gutter={[24, 24]}>
          {/* Score Card */}
          <Col xs={24} md={8}>
            <Card
              title="Resume Score"
              style={{
                textAlign: "center",
                height: "100%",
              }}
            >
              <Progress
                type="circle"
                percent={score}
                size={180}
              />

              <Title
                level={3}
                style={{ marginTop: 20 }}
              >
                {score}/100
              </Title>
            </Card>
          </Col>

          {/* Skills Card */}
          <Col xs={24} md={16}>
            <Card title="Skills Detected">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <Tag
                    key={index}
                    style={{
                      marginBottom: 10,
                      padding: "6px 12px",
                      fontSize: "14px",
                    }}
                    color="blue"
                  >
                    {skill}
                  </Tag>
                ))
              ) : (
                <Paragraph>
                  No skills detected.
                </Paragraph>
              )}
            </Card>
          </Col>

          {/* Suggestions */}
          <Col span={24}>
            <Card title="Improvement Suggestions">
              <List
                dataSource={suggestions}
                renderItem={(item) => (
                  <List.Item>
                    🚀 {item}
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Resume Text */}
          <Col span={24}>
            <Card title="Extracted Resume Text">
              <div
                style={{
                  maxHeight: "400px",
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                }}
              >
                <Paragraph>
                  {resumeText}
                </Paragraph>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Results;