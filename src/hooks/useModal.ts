import { useMapContext } from "../Context/context";

const useLoader = () => {
  const { setLoading } = useMapContext();
  const enableLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };

  return {
    enableLoading,
    disableLoading,
  };
};

export default useLoader;
