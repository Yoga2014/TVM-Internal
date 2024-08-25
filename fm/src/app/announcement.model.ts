// announcement.model.ts
export interface Announcement {
    id?: number; // Optional for new announcements
    name: string;
    title: string;
    message: string;
    attachment?: File; // Optional
    category: string;
    expiry: string;
    location: string;
    commentsDisabled: boolean;
    pinned: boolean;
    notifyAll: boolean;
    notifyOthers?: string; // Optional
    timestamp?: Date; // Optional for displaying the timestamp
    likes?: number; // Optional for like counts
    comments?: number; // Optional for comment counts
    date:Date;
  }
  