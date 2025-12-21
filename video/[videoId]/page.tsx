'use client'
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { videoService } from "@/app/services/videoService";
import { VideoDetail, Channel, VideoCardData } from "@/app/types/video";
import { formatSubscribers } from "@/app/utils/formatSubscribers";
import { formatViews } from "@/app/utils/formatViews";
import { formatDate } from "@/app/utils/formatDate";
import Link from "next/link";

function Page() {
  const [ videoData, setVideoData ] = useState<VideoDetail | null>(null);
  const [ channelData, setChannelData ] = useState<Channel | null>(null);
  const [ relatedVideos, setRelatedVideos ] = useState<VideoCardData[]>([]);
  const [ relatedChannels, setRelatedChannels ] = useState<Channel[]>([]);

  const params = useParams<{videoId: string}>();  //video/[{videoId}]
  const videoId = params.videoId;
  const subscribers = formatSubscribers(channelData?.statistics?.subscriberCount || 0)
  const viewCount = formatViews(videoData?.statistics?.viewCount || 0)
  const date = formatDate(videoData?.snippet?.publishedAt || "");
  const description = videoData?.snippet?.description || ""
  const tags = videoData?.snippet?.tags || [];
  const filteredTag = tags.length > 0 ? tags.slice(0,3).map(tag => `#${tag}`).join(" ") : ""; 
  console.log("Tags: ", tags)
  
  useEffect(() => {
    const fetchVideoDetails = async () => {
      const { video, channel } = await videoService.getVideoDetailsWithVideoIdAndChannel(videoId);
      setVideoData(video);
      setChannelData(channel);

      // Fetch related videos after getting video details
      if (video) {
        const { videos, channels } = await videoService.getRelatedVideos(videoId, video);
        setRelatedVideos(videos);
        setRelatedChannels(channels);
      }
    }
    
    fetchVideoDetails();
  }, [videoId])
  
  console.log("videoData logged in videoDetail page: ", videoData)

  return (
    <div className = "flex flex-flow">
      {/* left video section */}
      <div className = "flex flex-col w-2/3 ">
        <iframe
          className = "w-full aspect-video rounded-lg" 
          src= {`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        {/* video Details */}
        <div className = "flex flex-col mt-2">
          <h1 className = "font-bold text-xl">{videoData?.snippet.title}</h1>
            <div className = "mt-1 flex flex-flow gap-2">
              <img 
                className = "w-9 h-9 rounded-full"
                src={channelData?.snippet?.thumbnails?.default?.url}
                alt={videoData?.snippet.channelTitle || "Channel avatar"}
              />
              {/* channel Info */}
              <div className = "flex flex-col">
                <p className = "font-bold text-sm">{videoData?.snippet.channelTitle}</p>
                <p className = "text-xs text-gray-600">{subscribers}</p>
          
              </div>
            </div>
            {/* video Info & description */}
            <div className = "mt-2">
              <div className = "rounded-lg bg-gray-100 p-3">
                {/* views date & tags */}
                <div className = "flex gap-2 font-bold text-xs mb-2">
                  <span>{viewCount}</span>
                  <span>{date}</span>
                  <span>{filteredTag}</span>
                </div>
                
                {/* description */}
                <div className="text-sm whitespace-pre-wrap line-clamp-3">
                  {description}
                </div>
                {/* show More / Less Button */}



              </div>
            </div>
        </div>
      </div>

      {/* right related videos */}
      <div className = "flex flex-col flex-1 ml-4">
        {/* video list */}
        <div className = "flex flex-col gap-2">
          {relatedVideos.map((video) => {
            const relatedVideoId = typeof video.id === 'string' ? video.id : video.id.videoId;
            const thumbnailUrl = video.snippet.thumbnails?.high?.url;
            
            return (
              <Link 
                key={relatedVideoId} 
                href={`/video/${relatedVideoId}`}
                className="flex gap-2 hover:bg-gray-100 rounded-lg p-2 transition-colors cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative w-40 h-24 shrink-0">
                  <img
                    src={thumbnailUrl}
                    alt={video.snippet.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                {/* Video Info */}
                <div className="flex flex-col flex-1 min-w-0">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                    {video.snippet.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-1">
                    {video.snippet.channelTitle}
                  </p>
                  <div className="text-xs text-gray-500">
                    <p>{formatDate(video.snippet.publishedAt)}</p>
                  </div>
                </div>
              </Link>
            );
          })}
          
          {relatedVideos.length === 0 && (
            <p className="text-gray-500 text-sm">Loading related videos...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
