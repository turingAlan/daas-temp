import { DateCalendar } from '@mui/x-date-pickers'
import DropDown from './Dropdown'
import Button from './Button'

const TimePopup = ({granularityValue,setGranularityValue,startDate,setStartDate,endDate,setEndDate,setPopup}) => {

    const granularityOptions = ["Hourly","Daily","Weekly","Monthly","Yearly"]

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
        handleCancelClose()
        }
      }

    const handleApply = () => {
        setPopup(false)
    }

    const handleCancelClose = ()=>{
        setGranularityValue("Hourly")
        setStartDate(new Date())
        setEndDate(null)
        setPopup(false)
    }

  return (
        <div className='backdrop' onClick={handleBackdropClick}>
            <div className="absolute z-[1000] bg-black rounded-lg shadow-lg p-4 max-w-screen-md mx-auto min-h-[50vh]  my-auto popup items-start gap-2 justify-center" >
            <div className='flex items-start gap-2 justify-center'>
            <div className='flex flex-col items-center'>
                <h3>
                    StartDate
                </h3>
            <DateCalendar value={startDate} onChange={setStartDate} />
            </div>

            <DropDown optionState={[granularityValue,setGranularityValue]} options={granularityOptions} />
            <div className='flex flex-col items-center'>
                <h3>
                    EndDate
                </h3>
            <DateCalendar value={endDate} onChange={setEndDate} />
            </div>
            </div>
            <div className='flex gap-3'>
            <Button onClick={handleCancelClose} theme='warning'>Close</Button>
            <Button onClick={handleApply} theme='transparent'>Apply</Button>
            </div>
        </div>
        </div>
  )
}

export default TimePopup