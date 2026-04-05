# Buildo Client - Intelligent CI/CD Deployment Engine

Frontend application for Buildo, a comprehensive CI/CD deployment platform.

## Getting Started

Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Features

- 🔐 JWT-based authentication (register/login)
- 📁 GitHub repository management
- 🐳 Docker-based deployments
- 📊 Real-time deployment analytics
- 📄 Deployment history with filtering
- ♻️ One-click rollback capability
- 🎨 Dark/Light theme support

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Lucide React](https://lucide.dev/)
- **Real-time**: [Socket.IO Client](https://socket.io/)
- **Terminal**: [xterm.js](https://xtermjs.org/)

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
