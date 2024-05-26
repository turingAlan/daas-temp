import { colors } from "../data/colors";
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="absolute w-screen h-screen flex items-center justify-center bg-black bg-opacity-20 z-50 backdrop-blur-sm">
      <InfinitySpin
        visible={true}
        width="200"
        color={colors.chartPurple}
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;
