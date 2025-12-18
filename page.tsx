import { youtubeApi } from "./api/youtubeApi";
import { VideoCardData, Channel } from "./types/video";
import VideoCard from "./components/VideoCard";

export default async  function Home() {

  const trendVideoResponse = await  youtubeApi.getPopularVideos();
  const trendVideos: VideoCardData[]= trendVideoResponse.items;

  // get unique channel IDs
  const uniqueChannelIds = [ ...new Set(trendVideos.map(video => video.snippet.channelId))];

  // Fetch all channels in One API call
  const channelResponse = await youtubeApi.getChannelDetails(uniqueChannelIds);
  const channels: Channel[] = channelResponse.items;


  return (
    <VideoCard videos = {trendVideos} channels = {channels}/>
  
  );
  
}
