import { cityList, stateCode } from '../regionData'
import AutoCompleteInput from './AutoComplete'
import CustomDatePicker from './DatePicker'
import DropDown from './Dropdown'
import Button from './Button'
import dayjs from 'dayjs'
import { useState } from 'react'

const FilterHeader = ({setUrl,setGranulartiy}) => {


    const granularity = ["Hourly","Daily","Weekly","Monthly"]

    const [startDate, setStartDate] = useState(dayjs(new Date()));
    const [endDate, setEndDate] = useState(null);
    const [granularityValue, setGranularityValue] = useState('Hourly');
    const [stateValue, setStateValue] = useState([]);
    const [cityValue, setCityValue] = useState([]);

    const states = stateCode.map((data)=>data.state)

    const city = cityList.map((data)=>data.City)

    const handleApply = () => {
        const startingTime = dayjs(startDate,"YYYY-MM-DD").format("YYYY-MM-DD")
        const endingTime = dayjs(endDate,"YYYY-MM-DD").format("YYYY-MM-DD")
        setUrl(`https://moondoor-dev.sellersetu.in/ironcore/product-api/v0/products/?&start_date=${startingTime}&end_date=${endingTime}&granularity=${granularityValue.toLowerCase()}&state=${stateValue.join(",").replace(/\s/g, "")}&city=${cityValue.join(",").replace(/\s/g, "")}`)
        setGranulartiy(granularityValue)
    }


  return (
    <div className="top-0 w-full flex py-3 items-center">
        <div className='flex gap-3 items-center flex-row'>
            <DropDown options={granularity} optionState = {[granularityValue,setGranularityValue]} />
    <AutoCompleteInput options={states} placeholder='State' multiple onChange={setStateValue} value={stateValue}/>
    <AutoCompleteInput options={city} placeholder='City' multiple onChange={setCityValue} value={cityValue}/>
        </div>

    <Button  size="sm" theme={"transparent"} className={"mx-auto w-40"} onClick = {handleApply}>Apply</Button>

        <div className='flex gap-3'>
    <CustomDatePicker label="Start date" value = {startDate} onChange={setStartDate}/>
            <CustomDatePicker label = "End date" value={endDate} onChange={setEndDate}/>
            
        </div>
    </div>
  )
}

export default FilterHeader