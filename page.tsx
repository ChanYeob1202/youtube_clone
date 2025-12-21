import { videoService } from "./services/videoService";
import VideoCard from "./components/VideoCard";

export default async  function Home() {
  const { videos, channels } = await videoService.getTrendingWithChannels()

  return (
    <VideoCard videos = {videos} channels = {channels}/>
  );
}
