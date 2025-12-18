import Link from "next/link"
import { VideoCardData, Channel } from "../types/video"
import { formatDate } from "../utils/formatDate"
import { formatViews } from "../utils/formatViews"

interface VideoCardProps {
  videos: VideoCardData[]
  channels: Channel[]
}

function VideoCard( {videos, channels} : VideoCardProps) {
  return (
    <div className = "p-6">
      <div className = "grid grid-cols-3 gap-4">
            { videos.map((video) => {
              const videoId = typeof video.id === 'string' ? video.id : video.id.videoId;
              const channel = channels.find(ch => ch.id === video.snippet.channelId);
              return (
              <Link
                href = {`/video/${videoId}`}
                key = {videoId} 
                className = "flex flex-col hover:cursor-pointer"
                >
                <img 
                  src = {video.snippet.thumbnails.high.url}
                  alt = {video.snippet.channelTitle}
                  className = "w-full aspect-video object-cover rounded-2xl"
                  />
                
                {/* video detal avatar + title and channel name & views and published at*/}

                <div className = "mt-1">
                  <div className = "flex flex-flow">
                    {/* avatar */}
                    <img
                    src={ channel?.snippet?.thumbnails?.default?.url}
                    alt={video.snippet.channelTitle}
                    className = "w-9 h-9 rounded-full mr-2"
                    />
                    {/* channel name & title */}
                    <div>
                      <p className = "text-sm font-bold">{video.snippet.title}</p>
                      <p className = "text-xs">{video.snippet.channelTitle}</p>
                      <div className = "flex flex-flow justify-between font-extralight text-xs text-gray-500">
                      <span>{formatViews(video.statistics?.viewCount)} • {formatDate(video.snippet.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
        )})}

        </div>
    </div>
  )
}

export default VideoCard
