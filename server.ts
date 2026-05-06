import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

const app = express();
const PORT = 3000;

app.get("/api/songs", async (req, res) => {
  try {
    const mode = req.query.mode as string;
    const selectedMode = mode || 'pop';
    
    // Map modes to Deezer Genre ID
    const modeToGenreId: Record<string, number> = {
      pop: 132,
      classical: 98,
      rock: 152,
      hiphop: 116,
      edm: 113,
      jazz: 129,
      country: 84,
      rnb: 165,
      reggae: 144,
      folk: 466,
      kpop: 16
    };

    const genreId = modeToGenreId[selectedMode] || 132;
    const url = `https://api.deezer.com/chart/${genreId}/tracks?limit=100`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    if (!response.ok) {
       throw new Error(`Deezer API failed with status ${response.status}`);
    }

    const data = await response.json();
    const uniqueIds = new Set();
    const uniqueVideos = [];

    const entries = data.data || [];
    for (const v of entries) {
      if (v.preview && v.id && !uniqueIds.has(v.id)) {
        uniqueIds.add(v.id);
        uniqueVideos.push({
          id: String(v.id),
          title: v.title || "Unknown Title",
          artist: v.artist?.name || "Unknown Artist",
          preview: v.preview,
          thumbnail: v.album?.cover_xl || v.album?.cover_big || v.album?.cover_medium || ''
        });
      }
    }

    if (uniqueVideos.length === 0) {
       throw new Error("No previewable songs found for mode: " + selectedMode);
    }

    // Shuffle the array array to make it random each time
    for (let i = uniqueVideos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [uniqueVideos[i], uniqueVideos[j]] = [uniqueVideos[j], uniqueVideos[i]];
    }

    res.status(200).json(uniqueVideos.slice(0, 70));
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).json({ error: 'Failed to fetch playlist data.', details: String(error) });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const __dirname = path.resolve();
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
