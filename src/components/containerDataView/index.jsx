import { colors } from "../../data/colors";
import DataContainer from "./DataContainer";

const ContainerDataView = (props) => {
  const { data } = props;

  const colorKeys = Object.keys(colors);

  return (
    <div className="flex flex-wrap gap-y-6">
      {data.map((kpiData, idx) => {
        const randomColor =
          colors[colorKeys[Math.floor(Math.random() * colorKeys.length)]];
        return (
          <DataContainer
            key={kpiData.value + idx}
            {...kpiData}
            color={randomColor}
          />
        );
      })}
    </div>
  );
};

export default ContainerDataView;
