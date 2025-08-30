# Talynk Video Moderation Frontend

A modern React TypeScript application for video content moderation and analysis.

## 🚀 Features

- **Video Upload**: Drag-and-drop or browse file upload interface
- **Content Analysis**: AI-powered video content moderation
- **Detailed Results**: Comprehensive analysis with severity levels
- **TypeScript**: Full TypeScript support with strict type checking
- **Modern UI**: Clean and responsive design

## 🛠️ Tech Stack

- **React 19.1.1** - Latest React with hooks
- **TypeScript 4.9.5** - Type-safe development
- **Axios** - HTTP client for API communication
- **CSS Modules** - Scoped styling
- **Jest & Testing Library** - Unit testing

## 📁 Project Structure

```
src/
├── components/
│   ├── VideoUpload.tsx      # Video upload component
│   ├── VideoUpload.css      # Upload component styles
│   ├── ModerationResults.tsx # Results display component
│   └── ModerationResults.css # Results component styles
├── types/
│   └── index.ts             # TypeScript interfaces
├── App.tsx                  # Main application component
├── App.css                  # Main app styles
├── index.tsx                # Application entry point
└── react-app-env.d.ts       # React environment types
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd talynk-video-moderation-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will open at `http://localhost:3000`

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🔧 TypeScript Features

### Type Safety

The application uses strict TypeScript configuration with:

- **Strict mode** enabled
- **No implicit any** types
- **Explicit return types** for functions
- **Interface definitions** for all data structures

### Key Interfaces

```typescript
interface ModerationData {
  flagged: boolean;
  summary: ModerationSummary;
  detailedResults: Record<string, ModerationCategory>;
  fileName: string;
  processingType: string;
  taskId?: string;
}

interface VideoUploadProps {
  onModerationStart: () => void;
  onModerationComplete: (data: ModerationData) => void;
  onError: (errorMessage: string) => void;
  loading: boolean;
}
```

## 🎨 UI Components

### VideoUpload Component

- Drag-and-drop file upload
- File validation (video files only)
- Progress indication during upload
- Error handling and user feedback

### ModerationResults Component

- Expandable category sections
- Severity-based color coding
- Confidence scores display
- File metadata information

## 🔌 API Integration

The application communicates with a backend API for video analysis:

- **Endpoint**: `/api/video-moderation/analyze`
- **Method**: POST
- **Content-Type**: `multipart/form-data`
- **Timeout**: 5 minutes

### Environment Variables

Set the API URL using environment variables:

```bash
REACT_APP_API_URL=http://your-api-server.com
```

## 🧪 Testing

Run tests with:

```bash
npm test
```

The project includes:

- Unit tests for components
- TypeScript type checking
- Jest configuration for modern dependencies

## 📦 Build & Deployment

Build the production version:

```bash
npm run build
```

The build output will be in the `build/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
