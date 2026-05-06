# 🎵 Song Guesser - Deezer Edition

![Song Guesser Preview](public/song-guesser.png) <!-- Add a screenshot to the public folder and link it here -->

A modernized, fully responsive Song Guessing game built with React, TypeScript, and Tailwind CSS. Test your musical knowledge across 11 different genres powered by the Deezer API.

## ✨ Features

- **11 Curated Genres**: Play through diverse categories including Pop, Rock, Hip-Hop, K-Pop, Country, Reggae, Classical, EDM, Folk, R&B, and Jazz.
- **Real-Time Audio Playback**: Instantly listen to track previews as you guess.
- **Dynamic Scoring System**: Earn points based on your speed and accuracy. Includes a combo multiplier for successive correct answers!
- **Responsive Design**: Beautifully styled with Tailwind CSS, ensuring a perfect experience on desktop, tablet, and mobile.
- **Sound Effects**: Immersive audio feedback for correct and incorrect answers.
- **Serverless API**: Custom proxy endpoints to securely fetch random charting tracks via the Deezer API.

## 🚀 Tech Stack

- **Frontend Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Music Data**: [Deezer API](https://developers.deezer.com/api)
- **Deployment**: Configured for seamless deployment on [Vercel](https://vercel.com/)

## 🛠️ Local Development

Follow these steps to run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- `npm` or `yarn` or `pnpm`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/song-guesser.git
   cd song-guesser
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 📦 Deployment (Vercel)

This project is optimized for deployment on Vercel. Thanks to the serverless `/api` directory natively supported by Vercel, the Deezer proxy routes work out-of-the-box.

1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Run the deployment command:
   ```bash
   vercel
   ```
3. Follow the prompts to set up and deploy the project.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/song-guesser/issues).

## 📄 License

This project is [MIT](LICENSE) licensed.
