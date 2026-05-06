import { playlists } from './utils/playlists.js';

async function searchYouTube(query) {
  const response = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  const html = await response.text();
  const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/);
  const videos = [];
  if (match && match[1]) {
    const data = JSON.parse(match[1]);
    const contents = data.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents[0]?.itemSectionRenderer?.contents || [];
    
    const rawVideos = contents.filter(c => c.videoRenderer).map(c => c.videoRenderer);
    
    // filter under 10 minutes (to avoid full compilation playlists)
    for(const v of rawVideos) {
      if(v.lengthText && v.lengthText.simpleText) {
        let text = v.lengthText.simpleText;
        if(text.split(':').length === 2 && parseInt(text.split(':')[0]) < 10) {
          videos.push({
             id: v.videoId,
             title: v.title?.runs?.[0]?.text || "Unknown Title",
             artist: v.ownerText?.runs?.[0]?.text || "Unknown Artist",
             preview: `https://www.youtube.com/watch?v=${v.videoId}`,
             thumbnail: v.thumbnail?.thumbnails?.[0]?.url || `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`
          });
        }
      }
    }
  }
  return videos;
}

export default async function handler(req, res) {
  // Set CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { mode } = req.query;
    const selectedMode = mode || 'global';
    const playlistUrl = playlists[selectedMode] || playlists.global;

    let videos = [];

    try {
      // Attempt 1: Direct HTML parsing for playlist
      const response = await fetch(playlistUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9'
        }
      });
      
      if (response.ok) {
        const html = await response.text();
        const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/);
        
        if (match && match[1]) {
          const data = JSON.parse(match[1]);
          const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
          const playlistContents = tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents[0]?.itemSectionRenderer?.contents[0]?.playlistVideoListRenderer?.contents || [];
          
          for (const item of playlistContents) {
            if (item.playlistVideoRenderer) {
               const vid = item.playlistVideoRenderer;
               if (vid.isPlayable) {
                 videos.push({
                   id: vid.videoId,
                   title: vid.title?.runs?.[0]?.text || "Unknown Title",
                   artist: vid.shortBylineText?.runs?.[0]?.text || "Unknown Artist",
                   preview: `https://www.youtube.com/watch?v=${vid.videoId}`,
                   thumbnail: vid.thumbnail?.thumbnails?.[0]?.url || `https://i.ytimg.com/vi/${vid.videoId}/hqdefault.jpg`
                 });
               }
            }
          }
        }
      }
    } catch (parseError) {
      console.warn("Direct playlist parse failed, falling back to search", parseError);
    }
    
    // Attempt 2: Fallback to custom search if playlist is empty or failed
    if (videos.length < 15) {
      console.log("Using Search fallback for mode:", selectedMode);
      const searchQueries = {
        global: "popular offical music video top tracks 2024",
        kpop: "popular kpop official music video 2024",
        myanmar: "myanmar official music video popular"
      };
      const query = searchQueries[selectedMode] || searchQueries.global;
      videos = await searchYouTube(query);
    }

    if (videos.length === 0) {
       throw new Error("No videos found by both playlist scraping and search fallback.");
    }

    // Return the first 50 results (or whatever we found)
    res.status(200).json(videos.slice(0, 50));
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).json({ error: 'Failed to fetch playlist data.', details: String(error) });
  }
}

