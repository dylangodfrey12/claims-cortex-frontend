import React, { useCallback } from "react";
import { Button, Col, Image } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import uploader from "../assets/upload-icon.png";
import deleteBtn from "../assets/delete.png";

const FileUploader = ({ title, fileType, file, setFile }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFile = acceptedFiles[0];
      setFile(newFile);
    },
    [setFile]
  );

  const removeFile = () => {
    setFile(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      [fileType]: [],
    },
    multiple: false,
  });

  return (
    <Col xs={10} lg={10} className="my-3">
      <h5>{title}</h5>
      <div className="bg-white p-5 rounded">
        <Col lg={10} className="text-dark mx-auto">
          <section>
            <div
              {...getRootProps()}
              className="py-5 text-center main-dropzone"
              style={{ border: "2px dashed #ccc", borderRadius: "10px" }}
            >
              <input {...getInputProps()} />
              <>
                <Image src={uploader} />
                <p className="fw-bold">Browse PDF Files to upload</p>
              </>
            </div>
          </section>
        </Col>
        {file && (
          <div className="mt-4 text-center">
            <Col
              lg={10}
              className="px-3 my-2 text-dark mx-auto doc-card py-2 rounded d-flex align-items-center justify-content-between"
            >
              <p className="m-0">{file.path}</p>
              <Button
                className="bg-transparent border-0 p-1 delete-btn"
                onClick={removeFile}
              >
                <Image src={deleteBtn} />
              </Button>
            </Col>
          </div>
        )}
      </div>
    </Col>
  );
};

export default FileUploader;
