import dayjs from 'dayjs';


export const generateMockResponse = ({granularity,startDate,endDate,filterValue}) => {

    const timeArray = generateDateTimeArray(granularity,dayjs(startDate).format("YYYY-MM-DD"),dayjs(endDate).format("YYYY-MM-DD"))

    const mockData = timeArray.map((time)=>{
        return {
            time:time,
            avg_order_amount:Math.floor(Math.random() * 200),
            total_order:Math.floor(Math.random() * 200),
            filter_value:filterValue
        }
    })
    

    return mockData

}


export const generateRequestPayload = ({granularity,startDate,endDate,filterValue,filterBy}) => {
    

    const payload = {
        time:{
            start_time:dayjs(startDate).format("YYYY-MM-DD"),
            end_time:dayjs(endDate).format("YYYY-MM-DD"),
            granularity:granularity
        },
        breakdown:{
            dimension:[
                {
                    name:filterBy,
                    sort_by:'asc'
                }
            ]
        },
        filters:{
            and:[
                {
                    operator:"in",
                    field:filterBy,
                    value:[
                        filterValue
                    ]
                }
            ]
        }
    }


    return payload



}

function generateDateTimeArray(granularity, startDate, endDate) {
    let currentDate = new Date(startDate);
    const endDateObj = new Date(endDate);
    const dateTimeArray = [];
    while (currentDate <= endDateObj) {
        switch (granularity.toLowerCase()) {
            case 'hourly':
                dateTimeArray.push(new Date(currentDate));
                currentDate.setHours(currentDate.getHours() + 1);
                break;
            case 'daily':
                dateTimeArray.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
                break;
            case 'weekly':
                dateTimeArray.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 7);
                break;
            case 'monthly':
                dateTimeArray.push(new Date(currentDate));
                currentDate.setMonth(currentDate.getMonth() + 1);
                break;
            case 'yearly':
                dateTimeArray.push(new Date(currentDate));
                currentDate.setFullYear(currentDate.getFullYear() + 1);
                break;
            default:
                throw new Error('Invalid granularity');
        }
    }

    return dateTimeArray;
}

