import { youtubeApi } from "../api/youtubeApi"
import { VideoCardData,VideoDetail, Channel } from "../types/video";

export const videoService = {

  getTrendingWithChannels: async () => {
    const videoResponse = await youtubeApi.getPopularVideos();
    const videos: VideoCardData[] = videoResponse.items; 

    // extract unique channel IDs
    const channelIds = [...new Set(videos.map(v => v.snippet.channelId))];

    // fetch channel details using those Ids
    const channelResponse = await youtubeApi.getChannelDetails(channelIds);
    const channels: Channel[] = channelResponse.items;

    return { videos, channels }
  },

  getVideosByCategoryIds: async (categoryId: string) => {
    const videoResponse = await youtubeApi.getVideosByCateogry(categoryId);
    const videos: VideoCardData[] = videoResponse.items;
    const channelIds = [...new Set(videos.map(v => v.snippet.channelId))];

    // fetch channel details using those Ids
    const channelResponse = await youtubeApi.getChannelDetails(channelIds);
    const channels: Channel[] = channelResponse.items;

    return { videos, channels }
  },

  getSearchVideos: async (q: string) => {
    const searchResponse  = await youtubeApi.searchVideos(q);
    const videos: VideoCardData[] = searchResponse.items;
    const channelIds = [ ...new Set(videos.map(v => v.snippet.channelId))];

    const channelResponse = await youtubeApi.getChannelDetails(channelIds);
    const channels: Channel[] = channelResponse.items;
    
    return { videos, channels }
  },

  getVideoDetailsWithVideoIdAndChannel: async (videoId:string) => {
    const response = await youtubeApi.getVideoDetail(videoId);
    const video:VideoDetail = response.items[0]; 
    
    const channelId = video.snippet.channelId;
  
    const channelResponse = await youtubeApi.getChannelDetails( [channelId] );
    const channel: Channel = channelResponse.items[0];

    return {video, channel}
  },

  getRelatedVideos: async (videoId: string, video: VideoDetail)=> {
    // extract tags from video (array)
    const tags = video.snippet.tags || []; 
    // Convert Array to string
    const searchQuery = tags.slice(0,3).join(" ");

    // Call the API layer
    const searchResponse = await youtubeApi.getRelatedVideos(searchQuery);
    const videos: VideoCardData[] = searchResponse.items || [];

    // Filter out current video
    const filteredVideos = videos.filter(v => {
      const vId = typeof v.id === "string" ? v.id : v.id.videoId;
      return vId !== videoId;
    })

    // get channel details (like the other methods)
    const channelIds = [...new Set(filteredVideos.map(v => v.snippet.channelId))];
    const channelResponse = await youtubeApi.getChannelDetails(channelIds);
    const channels: Channel[] = channelResponse.items;
    return { videos: filteredVideos, channels }
  }
}


