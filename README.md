# Profile Builder

Link-in-bio profile builder inspired by [guns.lol](https://guns.lol). Built with _Next.js_, _Tailwind CSS_ and _Supabase_.

<div align="center">
    <a href="https://profile-buildr.vercel.app" target="_blank">
        <img height="40" src="https://img.shields.io/badge/View%20Site-white?style=for-the-badge" alt"View Site">
    </a>
</div>

<p align="center">
  <!-- <video src="https://github.com/user-attachments/assets/4228610c-045f-44c3-a153-31e5d907f822" width="100%" autoplay loop muted playsinline>
  </video> -->
<img width="1280" height="670" alt="Hero Image" src="https://github.com/user-attachments/assets/17a7e4de-843e-4169-a185-53bf132ae9d6">

</p>

## Features

- Secure Authentification options using email or OAuth via Github or Discord
- Fully customizable Profiles:
    - Add a name, bio and location
    - Upload a profile picture
    - Customize design like card colors, shape and border design
    - Choose between several animated and interactive backgrounds
    - Social media links: choose an icon, a tooltip and add links
- Automatic saving of profile content and configuration into the supabase database
- Dashboard, login and profile are fully mobile-responsive

## Gallery

### Login Page

<img width="1920" height="945" alt="Login Page" src="https://github.com/user-attachments/assets/6ca2fbfa-918d-41d6-83b4-1983866e9d3b" />

_The login page featuring options for OAuth using Github or Discord._

### Dashboard

<img width="1920" height="945" alt="Dashboard" src="https://github.com/user-attachments/assets/0cd2dca2-1e8c-4a53-8c51-5f07cfb5d815" />

_The app dashboard where users can configure their profile contents and design._

<img width="1386" height="369" alt="Links Section" src="https://github.com/user-attachments/assets/bad2cfae-7c38-467b-b3e6-8bf49281d77d" />

_The links section where users can add, edit or reorder links to their social media profiles._

### Public Profile

<img width="1920" height="945" alt="Public Profile" src="https://github.com/user-attachments/assets/4c98871f-355e-495e-9291-c48f1f69b1f8" />

_A public user profile with an interactive particle background and customly configured profile with social links._

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

**Node.js**: Version 20+  
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

Rename the `.env.example` file to `.env` and fill it with your data from the [Supabase dashboard](https://supabase.com/dashboard)("connect" button in the header) and the [Hackclub CDN dashboard](https://cdn.hackclub.com/api_keys).

<details>
<summary>.env file</summary>

```properties title=".env"
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<PROJECT_ID>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_<ID>

# Hackclub CDN
CDN_BASE_URL=https://cdn.hackclub.com/api/v4
CDN_API_KEY=sk_cdn_<KEY>
```

</details>

### OAuth Setup

Configure your redirect URLs in Supabase.

Development: [http://localhost:3000/auth/callback](http://localhost:3000/auth/callback)

Production: [https://your-domain.com/auth/callback](https://your-domain.com/auth/callback)

### Start the App

Development:
```bash
npm run dev
```
Production:
```bash
npm run build
```
View the page at [localhost:3000](http://localhost:3000) in your browser.
