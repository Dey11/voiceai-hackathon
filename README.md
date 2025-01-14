# Voice Calling Agent Admin Dashboard

![Project Logo](public/logo.svg)

A modern admin dashboard for managing voice calling agents that help users sell products to customers. This is a hackathon project built with cutting-edge web technologies.

## Features

- Customer management interface
- Product catalog management
- Agent onboarding workflow
- Real-time call monitoring
- Webhook integration for call events
- Responsive and accessible UI

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Prisma](https://www.prisma.io/) ORM
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Type Safety**: TypeScript
- **Linting**: ESLint + Prettier
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/voice-calling-agent.git
   cd voice-calling-agent
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp example.env .env
   # Update .env with your database credentials
   ```

4. Run database migrations:

   ```bash
   pnpm prisma migrate dev
   ```

5. Start the development server:

   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # Reusable UI components
│   ├── lib/              # Shared utilities and types
│   └── middleware.ts     # Next.js middleware
├── .eslintrc.json        # ESLint configuration
├── .prettierrc.json      # Prettier configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
