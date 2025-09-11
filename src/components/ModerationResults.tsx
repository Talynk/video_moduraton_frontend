import React, { useState, useMemo } from "react";
import "./ModerationResults.css";
import { ModerationResultsProps } from "../types";

const ModerationResults: React.FC<ModerationResultsProps> = ({ data }) => {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleCategory = (categoryKey: string): void => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }));
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case "high":
        return "#dc3545"; // Red
      case "medium":
        return "#ffc107"; // Yellow
      case "low":
        return "#17a2b8"; // Cyan
      case "none":
        return "#28a745"; // Green
      default:
        return "#6c757d"; // Gray for unknown
    }
  };

  const getSeverityIcon = (severity: string): string => {
    switch (severity) {
      case "high":
        return "🔴";
      case "medium":
        return "🟡";
      case "low":
        return "🔵";
      case "none":
        return "🟢";
      default:
        return "⚪";
    }
  };

  const getCategoryIcon = (categoryKey: string): string => {
    const icons: Record<string, string> = {
      nsfw: "🚫",
      violence: "⚔️",
      drugs: "💊",
      hate: "💔",
      other: "⚠️",
      aiGenerated: "🤖",
    };
    return icons[categoryKey] || "📋";
  };

  // Inject AI Generated into detailedResults if detected
  const detailedResultsWithAI = useMemo(() => {
    const resultsCopy = { ...data.detailedResults };
    if (data.summary.aiGenerated?.detected) {
      resultsCopy["aiGenerated"] = {
        title: "AI Generated Content",
        items: [
          {
            label: data.summary.aiGenerated.generator || "Unknown Generator",
            confidence: data.summary.aiGenerated.confidence,
            percentage: (data.summary.aiGenerated.confidence * 100).toFixed(2),
            severity: "high",
            status: "detected",
          },
        ],
        flagged: true,
      };
    }
    return resultsCopy;
  }, [data]);

  // Handle missing or incomplete data
  if (!data || !data.summary || !data.detailedResults) {
    return (
      <div className="moderation-results error">
        <h2>Error</h2>
        <p>Invalid or incomplete moderation data received.</p>
      </div>
    );
  }

  return (
    <div className="moderation-results">
      <div className="results-header">
        <h2>Analysis Results</h2>
        <div className={`overall-status ${data.flagged ? "flagged" : "safe"}`}>
          <span className="status-icon">{data.flagged ? "🚨" : "✅"}</span>
          <span className="status-text">
            {data.flagged ? "Content Flagged" : "Content Safe"}
          </span>
        </div>
      </div>

      <div className="file-info-section">
        <h3>File Information</h3>
        <p>
          <strong>File Name:</strong> {data.fileName}
        </p>
        <p>
          <strong>File Type:</strong> {data.fileType}
        </p>
        <p>
          <strong>Status:</strong> {data.status}
        </p>
        <p>
          <strong>Processing Type:</strong> {data.processingType}
        </p>
        <p>
          <strong>AI Detection Status:</strong> {data.aiDetectionStatus}
        </p>
        <p>
          <strong>Moderation Status:</strong> {data.moderationStatus}
        </p>
        <p>
          <strong>File URL:</strong>{" "}
          <a href={data.fileUrl} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </p>
      </div>

      <div className="summary-section">
        <h3>Summary</h3>
        <div className="summary-content">
          <p className="assessment">{data.summary.overallAssessment}</p>
          {data.summary.flagged && (
            <div className="concerns-summary">
              <p>
                <strong>Total Concerns:</strong>{" "}
                {data.summary.concerns?.length || 0}
              </p>
              <div className="severity-breakdown">
                {(["high", "medium", "low"] as const).map((severity) => {
                  const count = data.summary.concerns?.filter(
                    (c) => c.severity === severity
                  ).length;
                  if (!count) return null;
                  return (
                    <span
                      key={severity}
                      className={`severity-badge ${severity}`}
                      style={{ backgroundColor: getSeverityColor(severity) }}
                    >
                      {getSeverityIcon(severity)} {count} {severity}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="detailed-results">
        <h3>Detailed Analysis</h3>
        {Object.entries(detailedResultsWithAI).map(
          ([categoryKey, category]) => (
            <div key={categoryKey} className="category-section">
              <div
                className={`category-header ${
                  category.flagged ? "flagged" : "safe"
                }`}
                onClick={() => toggleCategory(categoryKey)}
              >
                <div className="category-title">
                  <span className="category-icon">
                    {getCategoryIcon(categoryKey)}
                  </span>
                  <span>{category.title}</span>
                  {category.flagged && (
                    <span className="flag-indicator">🚨</span>
                  )}
                </div>
                <div className="category-toggle">
                  {expandedCategories[categoryKey] ? "−" : "+"}
                </div>
              </div>

              {expandedCategories[categoryKey] && (
                <div className="category-items">
                  {category.items.map((item, index) => (
                    <div key={index} className={`item-row ${item.status}`}>
                      <div className="item-info">
                        <span className="item-label">{item.label}</span>
                        <span className="item-percentage">
                          {item.percentage}%
                        </span>
                      </div>
                      <div className="item-details">
                        <span
                          className={`severity-indicator ${item.severity}`}
                          style={{
                            backgroundColor: getSeverityColor(item.severity),
                          }}
                        >
                          {getSeverityIcon(item.severity)} {item.severity}
                        </span>
                        <span className="confidence">
                          Confidence: {(item.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ModerationResults;
