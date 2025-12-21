import axios from 'axios';

export const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  console.error(
    '[axiosInstance] VITE_API_URL 이 설정되어 있지 않습니다. .env.local 을 확인하세요.',
  );
}

// 인스턴스 정
export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
