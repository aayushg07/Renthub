# RentHub Project

## Overview
RentHub is a web application designed to help users search for and browse available rental properties. It offers a user-friendly platform where potential renters can filter, view details, and contact landlords directly. The project includes frontend and backend development, using a PostgreSQL database to store property and user data. This project is built as part of a software development program and aims to demonstrate both UI design and backend integration.

## Features
- **Property Search**: Users can search for rental properties based on filters such as location, price, type, number of bedrooms, and more.
- **Property Listings**: Detailed listings with images, descriptions, pricing, and availability.
- **User Profiles**: Users can register and log in to save their favorite properties and apply for rentals.
- **Property Applications**: Users can submit applications for properties they are interested in.
- **API Integration**: The platform integrates with third-party APIs to gather location data, manage payments, and enhance user experience.
- **Authentication & Authorization**: JWT-based user authentication and role management (for renters and landlords).
- **Responsive Design**: Optimized for desktop and mobile views.

## Tech Stack
- **Frontend**: 
  - React for UI components
  - Redux for state management
  - Axios for API calls
  - HTML, CSS (Tailwind), and JavaScript (ES6+)
  
- **Backend**: 
  - Next.js
  - JWT (JSON Web Token) for user authentication
  - Passport.js for local authentication

- **Database**: 
  - MongoDB to store user information, property details, applications, etc.
  
- **Deployment**:
  - Vercel

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js and npm
- MongoDB (Mongoose)
- Tailwind
- React DOM
- Git

### Step-by-step Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/2025-Winter-ITE-5425-IRA/project-phases-code-blooded.git
   cd renthub

2. **Install Dependencies**:
   ```bash
   npm i

3. **Install Tailwind**:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
4. **Start the BackEnd Server**:
   ```bash
   npm run dev



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
