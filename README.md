# T3GG.me

A fun web app that allows people to make themselves look like the popular software Engineer Theo (t3.gg) by using fal-ai's face swap API.

## Features

- Upload a photo of yourself
- AI-powered face swap with Theo's profile picture
- Instant preview and download of the result

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- An API key from [fal.ai](https://fal.ai)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/t3gg.me.git
cd t3gg.me
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root of the project and add your fal.ai API key:

```
FAL_KEY=your_fal_key_here
```

### Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## How It Works

1. The app uses Next.js for the frontend and API routes
2. When you upload an image, it's sent to the `/api/faceswap` endpoint
3. The API endpoint uses the fal-ai client to call the face swap model
4. The result is sent back to the frontend for display

## Deployment

The app is designed to be deployed on Vercel. Simply connect your GitHub repository to Vercel and add the `FAL_KEY` environment variable in the Vercel dashboard.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [fal-ai](https://fal.ai/) - AI face swap

## Credits

- Built with inspiration from Theo's community
- Powered by fal.ai's advanced face swap model
