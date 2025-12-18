const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// didn't know wrapping api function in an object 

export const youtubeApi = {
  getPopularVideos: async (maxResults:number = 30) => {
    // static
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=${maxResults}&regionCode=US&key=${API_KEY}`,
      { next: { revalidate: 3600 }}
    )
    return response.json();
  },
  getVideoDetail: async (videoId: string) => {
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`
    )
    return response.json();
  },
  searchVideos: async (searchQuery:string ,maxResults:number = 40)=> {
    // dynamic 
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&q=${searchQuery}&type=video&maxResults=${maxResults}&key=${API_KEY}`,
      { cache: "no-store"}
    )
    return response.json();
  },

  // channelDetail batch fetching
  getChannelDetails: async(channelIds: string[]) => {
    const ids = channelIds.join(",");
    const response = await fetch(
        `${BASE_URL}/channels?part=snippet,statistics&id=${ids}&key=${API_KEY}`,
        { next: { revalidate: 3600 } } // Refresh every hour
    )
    return response.json()
  },

  getVideosByCateogry: async (categoryId: string, maxResults: number = 30) => {
    const response = await fetch (
      `${BASE_URL}/videos?part=snippet,contentDetails,statistics&chart=mostPopular&videoCategoryId=${categoryId}&maxResults=${maxResults}&regionCode=US&key=${API_KEY}`,
      { next: { revalidate: 3600 }}
    )
    return response.json();
  }
}