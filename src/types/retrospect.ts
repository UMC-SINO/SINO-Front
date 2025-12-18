export type PhotoItem = {
  id: string;
  url: string;
  isPick: boolean;
  file?: File;
};

export type RetrospectDraft = {
  dateString: string;
  photos: PhotoItem[];
  emotion: string | null;
  title: string;
  content: string;
};
