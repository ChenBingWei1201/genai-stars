<h1 align="center">GenAI Stars Hackthon</h1>

<p align="center">
This is a web app using Twleve Labs API to solve the ELTA Sports prize in <a href="https://genaistars.org.tw/" target="_blank">GenAI Stars Hackthon</a>.
</p>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🚀 [Deploy](#more)

## <a name="introduction">🤖 Introduction</a>

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- TypeScript
- Tailwind CSS
- ShadCN/UI
- Convex
- Clerk
- Twelve Labs

## <a name="features">🔋 Features</a>

👉 **Robust Authentication**: Secure and reliable user login and registration system.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**
Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### 1. Cloning the Repository

```bash
git clone https://github.com/ChenBingWei1201/genai-stars.git
cd genai-stars
```

### 2. Install the project dependencies

```bash
# genai-stars
npm i
```

### 2. Set Up Environment Variables

```bash
# genai-stars
cp .env.development .env.local
```

in .env.local

```env
# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# Twelve Labs
TWELVE_LABS_API_KEY=
```

Replace the placeholder values with your actual Convex & Clerk credentials and Twelve Labs API key. You can obtain these credentials by signing up on the [Convex](https://www.convex.dev/), [Clerk](https://clerk.com/), and [Twelve Labs](https://www.twelvelabs.io/) websites.

### 3. Running the project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## <a name="deployment">🚀 Deployment </a>

Deploy on Vercel:
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
