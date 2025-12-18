import { youtubeApi } from "../api/youtubeApi"

function page() {
  const sportsVideos = youtubeApi.getVideosByCateogry("17");

  return (
    <div>
      
    </div>
  )
}

export default page
