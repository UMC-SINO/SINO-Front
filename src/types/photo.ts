// 화면 표시용 (PhotoGrid, 리스트, 상세)
export interface PhotoView {
  id: string;
  url: string;
  isThumbnail: boolean;
}

// 업로드/저장용
export interface PhotoUpload extends PhotoView {
  file: File;
}
