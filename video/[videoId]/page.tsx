'use client'
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { videoService } from "@/app/services/videoService";
import { VideoDetail, Channel, VideoCardData } from "@/app/types/video";
import { formatSubscribers } from "@/app/utils/formatSubscribers";
import { formatViews } from "@/app/utils/formatViews";
import { formatDate } from "@/app/utils/formatDate";
import RelatedVideo from "@/app/components/RelatedVideo";
import VideoDetails from "@/app/components/VideoDetails";
import Link from "next/link";

function Page() {
  const [ videoData, setVideoData ] = useState<VideoDetail | null>(null);
  const [ channelData, setChannelData ] = useState<Channel | null>(null);
  const [ relatedVideos, setRelatedVideos ] = useState<VideoCardData[]>([]);
  const [ relatedChannels, setRelatedChannels ] = useState<Channel[]>([]);

  const params = useParams<{videoId: string}>();  //video/[{videoId}]
  const videoId = params.videoId;
  const subscribers = formatSubscribers(channelData?.statistics?.subscriberCount || 0)
  const viewCount = formatViews(videoData?.statistics?.viewCount || 0);
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
          src= {`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          ></iframe>

        {/* video Details */}
        <div className = "flex flex-col mt-2">
          <VideoDetails videoData = {videoData} channelData = {channelData}/>
        </div>
      </div>

      {/* right related videos */}
      <div className = "flex flex-col flex-1 ml-4">
        {/* video list */}
        <RelatedVideo relatedVideos={relatedVideos}/>
        
      </div>
    </div>
  )
}

export default Page
