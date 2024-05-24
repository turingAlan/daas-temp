import { Tooltip } from "@mui/material";

const CustomTooltip = (props) => {
  const { label, value, color, description } = props;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <div
          className={`h-4 w-4 rounded-sm`}
          style={{
            backgroundColor: `${color}`,
          }}
        ></div>
        <span className="text-white text-base">{label}</span>
        <span className="text-white text-base">{value}%</span>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

const DataContainer = (props) => {
  const { label, value, color } = props;

  return (
    <div className="flex flex-col items-center justify-center gap-2 mx-auto">
      <Tooltip
        placement="top-end"
        title={
          <CustomTooltip label={label} value={value} color={color} {...props} />
        }
      >
        <div className="circle">
          <div
            className="wave"
            style={{
              "--wave-top": `${48 - value}%`,
              "--wave-color": `${color}`,
            }}
          ></div>
        </div>
      </Tooltip>
      <div className="flex gap-4 items-center">
        <div
          className={`h-10 w-10 rounded-sm`}
          style={{
            backgroundColor: `${color}`,
          }}
        ></div>
        <span className="flex gap-1">
          <span className="text-white">{label}</span>
          <span className="text-white">{value}%</span>
        </span>
      </div>
    </div>
  );
};

export default DataContainer;
