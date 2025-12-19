import { videoService } from "../services/videoService"
import VideoCard from "../components/VideoCard"

async function page() {

  const { videos, channels } = await videoService.getVideosByCategoryIds("25")
  


  return (
    <VideoCard videos = {videos} channels = {channels}/>
  )
}

export default page
