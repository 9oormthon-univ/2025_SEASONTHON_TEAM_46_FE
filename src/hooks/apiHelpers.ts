import api from "./api";

export const getData = async <T>(url: string): Promise<T> => {
  const response = await api.get<T>(url);
  return response.data;
};

export const postData = async <T, U>(url: string, data: U): Promise<T> => {
  const response = await api.post<T>(url, data);
  return response.data;
};
export const putData = async <T, U>(url: string, data: U): Promise<T> => {
  const response = await api.put<T>(url, data);
  return response.data;
};

export const deleteData = async <T>(url: string): Promise<T> => {
  const response = await api.delete<T>(url);
  return response.data;
};
