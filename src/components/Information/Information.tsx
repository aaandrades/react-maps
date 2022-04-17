import { motion, useMotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import OptionsIcon from "../../assets/icons/options";
import "./styles.scss";
import { useMapContext } from "../../Context/context";

const Information: React.FunctionComponent = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [fullOpen, setFullOpen] = useState(false);
  const { maps, setMaps } = useMapContext();
  const [windowHeight, setWindowHeight] = useState(0);

  const SCREEN_PERCENT = windowHeight * 0.2;
  const HALF_SCREEN = windowHeight * 0.3;
  const mHeight = useMotionValue(HALF_SCREEN);

  useEffect(() => {
    if (typeof window !== "undefined") setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    setFullOpen(maps.showDetails);
  }, [maps.showDetails]);

  useEffect(() => {
    if (fullOpen) {
      mHeight.set(HALF_SCREEN);
      setMaps({ ...maps, showDetails: true });
    } else {
      mHeight.set(11);
      setMaps({ ...maps, showDetails: false });
    }
  }, [fullOpen]);

  const handleDrag = (_: Event, info: any) => {
    let newHeight = mHeight.get() - info.delta.y;
    if (newHeight > 10 && newHeight < windowHeight - SCREEN_PERCENT) {
      mHeight.set(mHeight.get() - info.delta.y);
    }
  };

  return (
    <div className="information-container">
      <motion.div
        className="information-container__icon"
        animate={{ height: isDragging ? 40 : 30 }}
        drag="y"
        dragElastic={0}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragMomentum={false}
        onDrag={handleDrag}
        onDragEnd={() => setIsDragging(false)}
        onDragStart={() => setIsDragging(true)}
        onDoubleClick={() => setFullOpen(!fullOpen)}
      >
        <OptionsIcon />
      </motion.div>
      <motion.div
        className="information-container__content"
        style={{ height: mHeight }}
      ></motion.div>
    </div>
  );
};

export default Information;
