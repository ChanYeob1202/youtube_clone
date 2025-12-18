import { youtubeApi } from "../api/youtubeApi"

async function page() {
  const musicVideos = await youtubeApi.getVideosByCateogry("10")

  return (
    <div>
      
    </div>
  )
}

export default page
