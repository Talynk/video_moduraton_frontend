import React, { useState } from "react";
import "./App.css";
import VideoUpload from "./components/VideoUpload";
import ModerationResults from "./components/ModerationResults";
import { ModerationData } from "./types";

function App(): JSX.Element {
  const [moderationData, setModerationData] = useState<ModerationData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleModerationComplete = (data: ModerationData): void => {
    setModerationData(data);
    setLoading(false);
    setError(null);
  };

  const handleModerationStart = (): void => {
    setLoading(true);
    setError(null);
    setModerationData(null);
  };

  const handleError = (errorMessage: string): void => {
    setError(errorMessage);
    setLoading(false);
    setModerationData(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Moderation System</h1>
        <p>Upload a video to analyze for content moderation</p>
      </header>

      <main className="App-main">
        <VideoUpload
          onModerationStart={handleModerationStart}
          onModerationComplete={handleModerationComplete}
          onError={handleError}
          loading={loading}
        />

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Analyzing video content...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        )}

        {moderationData && <ModerationResults data={moderationData} />}
      </main>
    </div>
  );
}

export default App;
