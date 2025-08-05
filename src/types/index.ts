export interface Video {
  id: string;
  title: string;
  sizeMB: number;
  url: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  endDate: string;
  videos: Video[];
}
