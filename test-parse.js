import fetch from 'node-fetch'; // or use global fetch
import { playlists } from './api/utils/playlists.js';

async function test() {
  const response = await fetch(playlists.global, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await response.text();
  const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/);
  if (match && match[1]) {
    const data = JSON.parse(match[1]);
    const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
    const playlistContents = tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents[0]?.itemSectionRenderer?.contents[0]?.playlistVideoListRenderer?.contents || [];
    console.log("Found:", playlistContents.length);
  } else {
    console.log("No match");
  }
}
test();
