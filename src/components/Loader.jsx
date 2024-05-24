import { BoxesLoader } from "react-awesome-loaders";
import { colors } from "../data/colors";

const Loader = () => {
  return (
    <div className="absolute w-screen h-screen flex items-center justify-center bg-black bg-opacity-20 z-50 backdrop-blur-sm">
      <BoxesLoader
        boxColor={colors.chartPurple}
        style={{ marginBottom: "20px" }}
        desktopSize={"128px"}
        mobileSize={"80px"}
      />
    </div>
  );
};

export default Loader;
