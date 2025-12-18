import { youtubeApi } from "../api/youtubeApi"

async function page() {
  const movieVideos = await youtubeApi.getVideosByCateogry("1");
  


  return (
    <div>
      
    </div>
  )
}

export default page
