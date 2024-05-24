import { DateCalendar } from "@mui/x-date-pickers";
import DropDown from "./Dropdown";
import Button from "./Button";
import { Dialog } from "@mui/material";
import dayjs from "dayjs";
import { timeGranularity } from "../data/constants";

const TimePopup = ({
  granularityValue,
  setGranularityValue,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setPopup,
  popup,
}) => {
  const todayDate = dayjs(new Date());

  const handleApply = () => {
    setPopup(false);
  };

  const handleCancel = () => {
    setGranularityValue(timeGranularity[0]);
    setStartDate(todayDate);
    setEndDate(todayDate);
    setPopup(false);
  };

  return (
    <Dialog
      open={popup}
      onClose={handleCancel}
      aria-labelledby="dailog-time-picker"
      aria-describedby="dialog-to-pick-time-range"
      maxWidth="fit-content"
      style={{
        backdropFilter: "blur(2px)",
      }}
      sx={{
        "& .MuiDialog-paper": {
          backgroundImage: "none",
        },
      }}
    >
      <div className="bg-black rounded-lg shadow-lg p-4 max-w-screen-md mx-auto min-h-[50vh] my-auto items-start gap-2 justify-center">
        <div className="flex items-start gap-2 justify-center">
          <div className="flex flex-col items-center">
            <h3>StartDate</h3>
            <DateCalendar
              value={startDate ?? todayDate}
              onChange={setStartDate}
            />
          </div>

          <DropDown
            optionState={[granularityValue, setGranularityValue]}
            options={timeGranularity}
          />
          <div className="flex flex-col items-center">
            <h3>EndDate</h3>
            <DateCalendar value={endDate ?? todayDate} onChange={setEndDate} />
          </div>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleCancel} theme="warning">
            Close
          </Button>
          <Button onClick={handleApply} theme="transparent">
            Apply
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default TimePopup;
