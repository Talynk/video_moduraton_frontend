import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import axios from "axios";
import "./VideoUpload.css";
import { VideoUploadProps, ModerationData } from "../types";

const VideoUpload: React.FC<VideoUploadProps> = ({
  onModerationStart,
  onModerationComplete,
  onError,
  loading,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_BASE_URL: string =
    process.env.REACT_APP_API_URL || "http://localhost:3000";

  const handleFileSelect = (file: File): void => {
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
    } else {
      onError("Please select a valid video file");
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) {
      onError("Please select a video file first");
      return;
    }

    onModerationStart();

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const response = await axios.post<{
        status: string;
        data: ModerationData;
        message?: string;
      }>(`${API_BASE_URL}/api/video-moderation/analyze`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 300000, // 5 minutes timeout
      });

      if (response.data.status === "success") {
        onModerationComplete(response.data.data);
      } else {
        onError(response.data.message || "Analysis failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          onError(error.response.data?.message || "Upload failed");
        } else if (error.request) {
          onError("Network error. Please check your connection.");
        } else {
          onError("An unexpected error occurred");
        }
      } else {
        onError("An unexpected error occurred");
      }
    }
  };

  const handleBrowseClick = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <div className="video-upload-container">
      <div className="upload-section">
        <h2>Upload Video for Analysis</h2>

        <div
          className={`upload-area ${dragActive ? "drag-active" : ""} ${
            selectedFile ? "file-selected" : ""
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileInput}
            style={{ display: "none" }}
          />

          <div className="upload-content">
            <div className="upload-icon">📹</div>
            {selectedFile ? (
              <div className="file-info">
                <p className="file-name">{selectedFile.name}</p>
                <p className="file-size">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="upload-text">
                <p>Drag and drop a video file here</p>
                <p>or</p>
                <button
                  type="button"
                  className="browse-btn"
                  onClick={handleBrowseClick}
                >
                  Browse Files
                </button>
              </div>
            )}
          </div>
        </div>

        {selectedFile && (
          <div className="upload-actions">
            <button
              className="upload-btn"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Video"}
            </button>
            <button
              className="clear-btn"
              onClick={() => setSelectedFile(null)}
              disabled={loading}
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
