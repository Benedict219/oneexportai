# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/be9855b4-541d-4f21-84b6-a17e948ebf18

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/be9855b4-541d-4f21-84b6-a17e948ebf18) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## AI APIs and Features

OneExportAI uses several AI-powered features to provide comprehensive trade analytics:

### 1. Trade Data Search & Analytics
- **Search Method**: Search by product name or HS code
- **Data Source**: UN Comtrade API for global trade statistics
- **Features**: 
  - Product name to HS code mapping
  - Top exporters and importers analysis
  - Yearly trade trends
  - Market value calculations

### 2. AI-Powered Market Insights
- **API**: OpenAI GPT-4o-mini
- **Function**: `ai-insights` edge function
- **Features**:
  - Market trend analysis
  - Risk assessment
  - Actionable recommendations for exporters
  - Business intelligence insights

### 3. AI Document Generation
- **API**: Hugging Face Inference API
- **Function**: `generate-document` edge function
- **Features**:
  - Multilingual document creation
  - Export documentation automation
  - Template-based generation
  - Compliance with international trade standards

### 4. Smart Product Mapping
- **Technology**: Custom HS code mapping system
- **Features**:
  - Product name to HS code conversion
  - Fuzzy matching for product searches
  - Support for common export products
  - Validation of HS codes

### How to Use AI Features:

1. **Trade Analytics**: 
   - Go to the main dashboard
   - Search for any product (e.g., "turmeric", "rice") or HS code (e.g., "0910")
   - Get comprehensive trade data and AI insights

2. **Document Generation**:
   - Navigate to Documentation → AI Generated tab
   - Fill in client and product details
   - Select language (English, Hindi, Tamil, Telugu)
   - Generate professional export documents

3. **Market Insights**:
   - After searching for trade data, go to the "AI Insights" tab
   - Get AI-powered analysis of market trends and opportunities
   - Receive actionable recommendations for your export business

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/be9855b4-541d-4f21-84b6-a17e948ebf18) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
