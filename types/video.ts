import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface VideoTrend {
  id:string;
  snippet: {
    publishedAt: Timestamp;
    channelId:string;
    title:string;
    description:string;
    thumbnails: {
      high: {
        url: string;
      }
    }
    channelTitle: string;
  }
}

export interface SearchVideo {
  id: {
    videoId: string;
  }
  snippet:{
    publishedAt: Timestamp;
    channelId:string;
    title:string;
    description: string;
    thumbnails: {
      high: {
        url: string
      }
    }
    channelTitle: string;
    liveBroadCastContent?: string;
  }
}

export interface Channel {
  id: string;
  snippet: {
    string: string;
    description?: string;
    publishedAt: Timestamp;
    thumbnails :{ 
      default?: {
        url:string;
      }
      medium?: {
        url: string;
      }
    }
  }
}

