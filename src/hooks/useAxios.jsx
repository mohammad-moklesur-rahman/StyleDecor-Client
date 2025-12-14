import axios from "axios";
import { useMemo } from "react";

const useAxios = () => {
  const instance = useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }, []);

  return instance;
};

export default useAxios;
