import { axiosInstance } from './api';

// 년도
export const getYearReport = async (year: number) => {
  const { data } = await axiosInstance.get(`/api/report/${year}`);

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw new Error(data?.error?.reason ?? 'get year report failed');
  }

  return data.success;
};

// 월
export const getMonthReport = async (year: number, month: number) => {
  const { data } = await axiosInstance.get(`/api/report/${year}/${month}`);

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw new Error(data?.error?.reason ?? 'get month report failed');
  }

  return data.success;
};
