import VideoCard from "../components/VideoCard"
import { videoService } from "../services/videoService"

interface SearchPageProps {
  searchParams: { 
    q?: string // <-- Next.js extracts this from ?q = ${input}
  }
}

async function page({ searchParams }: SearchPageProps) {
  const query = searchParams.q;
  
  if (!query) {
    return <div className="p-6">Please enter a search term</div>;
  }

  const { videos, channels } = await videoService.getSearchVideos(query);

  return (
    <VideoCard videos={videos} channels={channels} />
  )
}

export default page
