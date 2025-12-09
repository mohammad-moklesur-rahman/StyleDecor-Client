import axios from "axios";
import { useMemo } from "react";

const useAxios = () => {
  const instance = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:5000/api",
    });
  }, []);

  return instance;
};

export default useAxios;
