# Beatles Bot

A Beatles-themed AI chatbot built with Next.js, TypeScript, and Tailwind CSS. Chat with an AI expert about The Beatles - their songs, albums, history, and members!

## Features
- 🤖 AI-powered chatbot using OpenAI
- 💬 Beautiful chat interface with message history
- 🎨 Beatles-themed design with Tailwind CSS
- ⚡ Built with Next.js App Router
- 🚀 Deployed on Vercel
- 📱 Fully responsive

## Stack
- Next.js 16 App Router with TypeScript
- Tailwind CSS v4
- OpenAI API integration
- ESLint + TypeScript tooling

## Local setup
```bash
npm install
npm run dev
```
Site runs at http://localhost:3000.

## Deploy to Vercel

### Option 1: GitHub Integration (Recommended)
1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **Add New → Project**
4. Import your GitHub repository: `nate-gerber/beatles_bot`
5. Vercel will auto-detect Next.js settings (already configured in `vercel.json`)
6. Click **Deploy** and wait for the build to complete
7. Your site will be live at `https://beatles-bot.vercel.app` (or your custom domain)

### Option 2: Vercel CLI
```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Link your project to Vercel (first time only)
npm run vercel:link

# Deploy to production
npm run deploy

# Or deploy a preview
npm run deploy:preview
```

### Quick Deploy Button
Click the "Deploy to Vercel" button on the homepage, or use this link:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nate-gerber/beatles_bot)

## Environment variables

### Required for AI Chatbot
Create a `.env.local` file in the root directory:

```bash
# OpenAI API Configuration
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Specify which OpenAI model to use
# Default: gpt-4o-mini (cost-effective)
# Options: gpt-4o-mini, gpt-4o, gpt-3.5-turbo
OPENAI_MODEL=gpt-4o-mini
```

### Getting your OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key and add it to your `.env.local` file

### For Vercel Deployment
1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings → Environment Variables**
3. Add `OPENAI_API_KEY` with your API key
4. Optionally add `OPENAI_MODEL` if you want to use a different model
5. Re-deploy your project

**Note:** The bot will work without an API key but will only return a default Beatles fact. Add your API key to enable full AI chat functionality.

## Helpful links
- https://vercel.com/dashboard
- https://nextjs.org/docs/app
- https://vercel.com/docs
