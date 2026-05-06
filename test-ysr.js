import { YouTube } from 'youtube-sr';
import { playlists } from './api/utils/playlists.js';

async function test() {
  try {
    const list = await YouTube.getPlaylist(playlists.kpop);
    const full = await list.fetch();
    console.log(`Fetched ${full.videos.length} videos`);
    console.log(full.videos.slice(0, 2).map(v => v.title));
  } catch (e) {
    console.error("Error:", e);
  }
}
test();
