import { useState } from "react";
import Navbar from "../components/Navbar";
import { Upload, Button, Typography, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function UploadResume() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      message.error("Please select a PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success(response.data.message);

     

localStorage.setItem(
  "resumeText",
  response.data.text
);

localStorage.setItem(
  "analysis",
  JSON.stringify(response.data.analysis)
);
console.log(response.data);
navigate("/results");

    } catch (error) {
      console.error(error);
      message.error("Upload failed");
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "600px",
          margin: "50px auto",
          textAlign: "center",
        }}
      >
        <Title level={2}>
          Upload Resume
        </Title>

        <Upload
          beforeUpload={(file) => {
            setFile(file);
            return false;
          }}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>
            Select PDF
          </Button>
        </Upload>

        <br />
        <br />

        <Button
          type="primary"
          onClick={handleUpload}
        >
          Upload Resume
        </Button>
      </div>
    </>
  );
}

export default UploadResume;