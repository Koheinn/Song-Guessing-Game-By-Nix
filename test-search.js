import { YouTube } from 'youtube-sr';

async function run() {
  const q = "popular kpop official music video 2024";
  const searchResults = await YouTube.search(q, { limit: 10, type: "video" });
  console.log(searchResults.map(v => v.title));
}
run();
