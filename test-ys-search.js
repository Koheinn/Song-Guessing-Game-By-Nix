import fetch from 'node-fetch';

async function searchYouTube(query) {
  const response = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`);
  const html = await response.text();
  const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/);
  if (match && match[1]) {
    const data = JSON.parse(match[1]);
    const contents = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
    // Find a playlist
    const playlists = contents.filter(c => c.playlistRenderer);
    if(playlists.length > 0) {
      console.log("Playlist Found:", playlists[0].playlistRenderer.playlistId);
    } else {
      console.log("No playlist found");
      // print videos
      const videos = contents.filter(c => c.videoRenderer);
      console.log("Videos top 10:");
      for(let i=0; i<Math.min(videos.length, 10); i++) {
        const v = videos[i].videoRenderer;
        console.log(v.videoId, v.title.runs[0].text);
      }
    }
  }
}
searchYouTube("myanmar pop music playlist");
