import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { getDownloadURL } from "firebase/storage";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import UploadButton from "./components/UploadButton";
import { uploadAvatar } from "../../../api/storage";
import { updateUserAvatar } from "../../../api/user";

export default function AvatarUpload() {
  const [image, setImage] = useState({ preview: null, file: null });

  const { currentUser } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = (e) => {
    console.log(e.target.files);
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImage({ preview: URL.createObjectURL(file), file });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await uploadAvatar(image.file);
      const url = await getDownloadURL(response.ref);
      await updateUserAvatar(currentUser.uid, url);
      navigate("/payment-details");
    } catch (error) {
      setError("Failed to update avatar");
    }

    setLoading(false);
  };

  const handleBack = () => navigate("/symptom-cause");

  return (
    <>
      <h1 className="display-1 text-center my-5">Avatar Upload</h1>
      <Card className="mx-5">
        <Card.Body>
          <h3 className="text-center mb-5">Upload Avatar</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <div className="d-flex justify-content-center mb-5">
              <img
                src={image.preview || "icon_avatar.png"}
                style={{ height: 100, width: 100, objectFit: "cover" }}
                className="img-fluid hover-shadow"
                alt=""
              />
            </div>
            <div className="d-flex justify-content-center mb-5">
              <UploadButton onChange={handleUpload} />
            </div>
            <div className="d-flex flex-row justify-content-center my-3">
              <Button
                disabled={loading}
                className="w-25 me-3"
                type="button"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                disabled={loading}
                className="w-25"
                onClick={handleSubmit}
              >
                Next
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
