import fetch from 'node-fetch';

async function test() {
  const response = await fetch("https://www.youtube.com/playlist?list=PL0B9bZg5j67B1p0F5G5H2U6D3r0K8l1D_", {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  const html = await response.text();
  const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/);
  if (match && match[1]) {
    const data = JSON.parse(match[1]);
    const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
    const playlistContents = tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents[0]?.itemSectionRenderer?.contents[0]?.playlistVideoListRenderer?.contents || [];
    const sliceList = playlistContents.slice(0,5).map(i => i.playlistVideoRenderer?.title?.runs?.[0]?.text);
    console.log("length:", playlistContents.length)
    console.log(sliceList);
  } else {
    console.log("No match");
  }
}
test();
