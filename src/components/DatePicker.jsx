import dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers'

const CustomDatePicker = ({label,onChange,value}) => {

  console.log(value)

  return (
    <div>
        <DatePicker
              label={label}
              sx={{
                '& input': {
                  boxShadow: 'none',
                },
                '& .MuiSvgIcon-root': {
                  fill: '#3881e6',
                },
                '& .MuiPickersPopper-paper':{
                    backgroundColor:"red"
                }
              }}
              value={value}
              onChange={onChange}
              maxDate={dayjs(new Date())}
            />
    </div>
  )
}

export default CustomDatePicker