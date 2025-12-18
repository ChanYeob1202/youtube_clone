import React from 'react'
import { youtubeApi } from '../api/youtubeApi'

async function page() {

  const newsDatas = await youtubeApi.getVideosByCateogry("25");
  console.log(newsDatas);


  return (
    <div>
      
    </div>
  )
}

export default page
