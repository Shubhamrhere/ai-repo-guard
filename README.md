# Gemini Repo Guard 🔒

AI-powered security analysis tool for GitHub repositories using Google Gemini AI.

## Features

- 🔍 **Automated Security Analysis** - Analyze any public GitHub repository for security vulnerabilities
- 🤖 **AI-Powered Insights** - Get intelligent security assessments powered by Google Gemini AI
- 📊 **Security Grading** - Receive a security grade (A-F) with detailed analysis
- 🛠️ **Tool Recommendations** - Get personalized recommendations for security tools
- ⚡ **Fast & Efficient** - Quick analysis using GitHub API and Gemini AI

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd gemini-repo-guard-main
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

To get your Gemini API key:
- Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- Sign in with your Google account
- Click "Create API Key"
- Copy the key and add it to your `.env` file

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Development

### Prerequisites

- Node.js (v18 or higher) - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or yarn

### Getting Started

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd gemini-repo-guard-main

# Step 3: Install the necessary dependencies
npm install

# Step 4: Set up environment variables (create .env file)
# Add: VITE_GEMINI_API_KEY=your_api_key_here

# Step 5: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Technologies Used

- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React** - UI framework
- **shadcn-ui** - UI components
- **Tailwind CSS** - Styling
- **Google Gemini AI** - AI-powered analysis
- **GitHub API** - Repository data fetching
- **React Query** - Data fetching and caching
- **Sonner** - Toast notifications

## Usage

1. Enter a GitHub repository URL (e.g., `https://github.com/facebook/react`)
2. Click "Analyze Security"
3. Wait for the AI to analyze the repository
4. Review the security grade, analysis, and recommended tools

## API Key Security

⚠️ **Important**: Never commit your `.env` file to version control. The `.env` file is already included in `.gitignore`.

For production deployments, set the `VITE_GEMINI_API_KEY` environment variable in your hosting platform's environment settings.

## Deployment

### Build for Production

```bash
npm run build
```

This will create a `dist` folder with optimized production files.

### Deploy to Vercel/Netlify

1. Push your code to GitHub
2. Import the repository in Vercel/Netlify
3. Add environment variable: `VITE_GEMINI_API_KEY`
4. Deploy!

## Author

**Developed or made by Shubham R**

---

## License

This project is open source and available for use.
