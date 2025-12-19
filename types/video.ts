import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface SidebarItems {
  name: string;
  icon: string;
}

export interface VideoCardData {
  id: string | { videoId: string };
  snippet: {
    publishedAt: string;
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
  statistics: {
    viewCount:string
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