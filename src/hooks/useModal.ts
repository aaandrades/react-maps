import { useMapContext } from "../Context/context";

const useModal = () => {
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

export default useModal;
