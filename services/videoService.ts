import { youtubeApi } from "../api/youtubeApi"
import { VideoCardData, Channel } from "../types/video";

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


  }

}


