# Profile Builder

Link-in-bio profile builder built with _Next.js_ and _Supabase_.

<p align="center">
  <video src="https://github.com/user-attachments/assets/4228610c-045f-44c3-a153-31e5d907f822" width="100%" autoplay loop muted playsinline style="border-radius: 4px;">
  </video>
</p>

<div align="center">
    <a href="https://profile-buildr.vercel.app">
        <img height="40" src="https://img.shields.io/badge/View%20Site-white?style=for-the-badge" alt"View Site">
    </a>
</div>

## Tech Stack

### Framework & Core

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=nextdotjs&labelColor=black&color=%23000000)
![React](https://img.shields.io/badge/React-black?style=for-the-badge&logo=react&labelColor=black&color=%2361DAFB)
![Typescript](https://img.shields.io/badge/Typescript-black?style=for-the-badge&logo=typescript&labelColor=black&color=%233178C6)

**Next.js 15 (App Router)**: Next.js Allows for fast loading times and efficient websites using techniques like server-side rendering.  
**Typescript**: Written in Typescript to enforce type safety across complex profile configurations.

### Frontend & Styling

![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-black?style=for-the-badge&logo=tailwindcss&logoColor=%2306B6D4&labelColor=black&color=%2306B6D4)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-black?style=for-the-badge&logo=shadcnui&logoColor=%23ffffff&labelColor=black&color=%23000000)
![Lucide](https://img.shields.io/badge/Lucide-black?style=for-the-badge&logo=lucide&logoColor=%23F56565&labelColor=black&color=%23F56565)

**Tailwind CSS**: Tailwind's utility classes allow fast component styling.  
**Shadcn UI**: Flexible and accessible components that create a clean look.  
**Lucide React**: Clean and easy-to-use vector icon components.

### Backend & Database

![Supabase](https://img.shields.io/badge/Supabase-black?style=for-the-badge&logo=supabase&logoColor=%233FCF8E&labelColor=black&color=%233FCF8E)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-black?style=for-the-badge&logo=postgresql&logoColor=%234169E1&labelColor=black&color=%234169E1)

**Supabase / PostgreSQL**: Relational database that stores user profiles with their content and configuration.

### Authentification

![Supabase Auth](https://img.shields.io/badge/Supabase%20Auth-black?style=for-the-badge&logo=supabase&logoColor=%233FCF8E&labelColor=black&color=%233FCF8E)

**Supabase Auth**: Handles session tokens and middleware.  
**OAuth Providers**: Social logins through external OAuth services, handled by Supabase Auth.

### Deployment

![Vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel&logoColor=%23ffffff&labelColor=black&color=%23000000)

**Vercel**: Native cloud hosting platform with optimized performance for Next.js and a generous free plan.

## Getting Started

### Prerequisites

**Node.js**: Version `v18.18.0` or higher  
**JavaScript Package Manager**: e.g. npm, pnpm, bun or yarn

### Clone the Repository

```bash
git clone https://github.com/RaptorAssassin/profile-builder.git
cd profile-builder
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Rename the `.env.example` file to `.env`. Fill it with your data from the [Supabase dashboard](https://supabase.com/dashboard)("connect" button in the header) and the [Hackclub CDN dashboard](https://cdn.hackclub.com/api_keys).

<!-- ```properties title=".env"
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<PROJECT_ID>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_<ID>

# Hackclub CDN
CDN_BASE_URL=https://cdn.hackclub.com/api/v4
CDN_API_KEY=sk_cdn_<KEY>
``` -->

### Start the App

```bash
npm run dev
```
