import axios from 'axios';

export const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  console.error(
    '[axiosInstance] VITE_API_URL 이 설정되어 있지 않습니다. .env.local 을 확인하세요.',
  );
}

// 인스턴스 정의
export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// 401 인터셉터 공통 함수 - 401에러 시 로그인 페이지로 리다이렉트
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setupInterceptor = (instance: any) => {
  instance.interceptors.response.use(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response: any) => response,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: any) => {
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    },
  );
};

setupInterceptor(axiosInstance);
