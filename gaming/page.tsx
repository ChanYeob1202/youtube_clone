import { youtubeApi } from "../api/youtubeApi"

async function page() {
  const gameVideos = await youtubeApi.getVideosByCateogry("20");


  return (
    <div>
      
    </div>
  )
}

export default page
