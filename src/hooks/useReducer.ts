import { useSelector } from "react-redux";
import { namespace } from "@/reducer";

const useReducer = () => {
  const reducerState = useSelector(state => state);
  return reducerState[namespace];
}

export default useReducer;