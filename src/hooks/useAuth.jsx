import { use } from "react";
import AuthContext from "../context/Firebase/AuthContext";


const useAuth = () => {
  const authInfo = use(AuthContext);

  return authInfo;
};

export default useAuth;