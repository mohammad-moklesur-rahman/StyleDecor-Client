import useAxios from "../hooks/useAxios";

export const useSaveOrUpdateUser = () => {
  const axios = useAxios();

  const saveOrUpdateUser = async (userData) => {
    const { data } = await axios.post("/users", userData);
    return data;
  };

  return saveOrUpdateUser;
};
