// import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { useEffect, useState } from "react";

import FilterHeader from "../../components/FilterHeader";
import DropDown from "../../components/Dropdown";
import ApiRequestCode from "../../components/ApiRequestCode";
import JsonViewer from "../../components/JsonViewer";
import { Clipboard,ClipboardCheck } from "lucide-react";
import Chart from "../../components/Charts/Chart";
import { xData } from "../../data/charts";
import { Tooltip } from "@mui/material";
import TimePopup from "../../components/TimePopup";
import dayjs from "dayjs";
import Button from "../../components/Button";
import { generateMockResponse, generateRequestPayload } from "../../utils/mockDataGenerator";

const DataViewer = () => {
  const languageOptions = ["Python", "cURL","JavaScript"];
  const [language, setLanguage] = useState("Python");
  const [granularityValue, setGranularityValue] = useState("Hourly");
  const [url, setUrl] = useState("https://moondoor-dev.sellersetu.in/ironcore/product-api/v0/orders/");
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  

  const [mockResponse, setMockResponse] = useState( [
        {
          "filter_value": "",
          "time": "",
          "avg_order_amount": "",
          "total_orders": "",
        },
        {
          "filter_value": "",
          "time": "",
          "avg_order_amount": "",
          "total_orders": ""
    
        },
      ]);

  const [mockRequest, setMockRequest] = useState({
    time: {
      start_time: "",
      end_time: "",
      granularity: "",
    },
    breakdown: {
      dimension: [
        {
          name: "",
          sort_by: "",
        },
      ],
    },
    filters: {
      and: [
        {
          operator: "",
          field: "",
          value: [""],
        },
      ],
    },
  })

  // const xAxis = xData[granularityValue.toLowerCase()];

  const [timePopup,setTimePopup] = useState(false)
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [filterBy,setFilterBy] = useState("City")
  const [region,setRegion] = useState("Delhi")
  const [category,setCategory] = useState("Home Decor")

  const [chartData, setChartData] = useState(mockResponse);

  const breakDownOptions = ["City", "Category"]
  const regionOptions = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"]
  const categoryOptions = ["Home Decor", "F&B", "Fashion"]
  

  // useEffect(()=>{

  //   setCopiedToClipboard(false);
  //   const data = {
  //     orderFulfilled: {
  //       data: xAxis.map(() => Math.floor(Math.random() * 200)),        
  //       type: "bar",
  //       stack: "a",
  //       name: "Order-Fullfilled",
  //     },
  //     orderCancelled: {
  //       data: xAxis.map(() => Math.floor(Math.random() * 200)),
  //       type: "bar",
  //       stack: "a",
  //       name: "Order-Cancelled",
  //     },
  //     wrongOrder: {
  //       data: xAxis.map(() => Math.floor(Math.random() * 200)),
  //       type: "bar",
  //       stack: "a",
  //       name: "Wrong-Order",
  //     },
  //     orderRecalled: {
  //       data: xAxis.map(() => Math.floor(Math.random() * 200)),
  //       type: "bar",
  //       stack: "b",
  //       name: "Order-Recalled",
  //     },
  //     orderReturned: {
  //       data: xAxis.map(() => Math.floor(Math.random() * 200)),
  //       type: "bar",
  //       stack: "b",
  //       name: "Order-Returned",
  //     },

  //   }

  //   setMockResponse(data)

  // },[granularityValue,url])

  const headers = [
    {
      key: "Authorization",
      value:
        "Bearer \n eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmY3ZjM4MDgtMzlmNC00YTRjLThhMTYtNjlhOWY1MDNiNDllIiwib3JnX2lkIjoxLCJleHAiOjE3MDc1NjU2MzEsImlhdCI6MTcwNjk2MDgzMX0.WTacU1GPwa6D-YjaggmsT_dTP05DTYp51t9n3odgTg0",
    },

    {
      key: "Origin",
      value:
        "localHost",
    },
  ];

  const copyToClipboard = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCopiedToClipboard(true);
    navigator.clipboard.writeText(url);
  }

  const handleApi = ()=>{
    setUrl(`https://moondoor-dev.sellersetu.in/ironcore/product-api/v0/orders/`)
    const filterValue = filterBy==="City"?region:category
    const payload = generateRequestPayload({granularity:granularityValue,startDate,endDate,filterValue:filterValue,filterBy})
    const response = generateMockResponse({granularity:granularityValue,startDate,endDate,filterValue:filterValue})
    setMockResponse(response)
    setMockRequest(payload)
    console.log(response,'here is response')
    const xData = response.map((data)=>data.time)
    const avgAmount = response.map((data)=>data.avg_order_amount)
    const totalOrders = response.map((data)=>data.total_order)

    setChartData({xData,avgAmount,totalOrders})

    console.log()


  }
  
  

  return (
    <>
      {/* <FilterHeader setUrl = {setUrl} setGranulartiy = {setGranularityValue}/> */}

      <div className="top-0 w-full flex py-3 items-center justify-between">
      <div className="flex gap-10">
      <Button theme={"transparent"} size={"sm"} className={"w-40"} onClick= {()=>setTimePopup(true)}>
        Set Time
      </Button>

      <div className="flex gap-4 items-center">
        <span>
          Breakdown By
        </span>
      <DropDown options={breakDownOptions} optionState={[filterBy, setFilterBy]} />
      </div>
      </div>

      <Button theme={"transparent"} size={"sm"} className={"w-40"} onClick = {handleApi}>
        Apply
        </Button>

      <div className="flex gap-10">
      {
        filterBy ==="Category" && (
          <div className={`flex gap-4 items-center`}>
        <span>
          Categories
        </span>
      <DropDown options={categoryOptions} disabled={filterBy!=="Category"} optionState={[category, setCategory]} />
      </div>
        )
      }

    {
      filterBy==="City" &&(
        <div className="flex gap-4 items-center">
        <span>
          Regions
        </span>
      <DropDown options={regionOptions}  optionState={[region, setRegion]} />
      </div>
      )
    }
      </div>

      </div>

    {timePopup && <TimePopup setPopup = {setTimePopup} granularityValue = {granularityValue} setGranularityValue = {setGranularityValue} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />}

      <div className="grid grid-flow-col grid-cols-5 gap-4 min-h-[89vh]">
        <div className="col-span-3  py-4 px-3 rounded-lg flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2>Get Orders Data</h2>

            <div className="p-2 group bg-white/5 bg-opacity-5 w-fit cursor-pointer select-none relative rounded-md pr-10">
              <span className="break-words">
                {url}
              </span>
             <Tooltip title={copiedToClipboard?"Copied":"Copy to clipboard"} arrow>
             {
              copiedToClipboard ? (
                <ClipboardCheck className="w-5 h-5 absolute right-3 top-0 bottom-0 my-auto hidden group-hover:block" color="green"   />
              ):(
                <Clipboard className="w-5 h-5 absolute right-3 top-0 bottom-0 my-auto hidden group-hover:block hover:stroke-blue-900" onClick={copyToClipboard}  />
              )
             }
              </Tooltip>
            </div>
          </div>

          <div>
            <h2>Headers</h2>
            <div className="h-[1px] w-full bg-slate-300" />

           <div className="flex flex-col gap-1">
           {
              headers.map((header, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-white flex w-[99px]">{header.key}</span>
                  <span className={"text-white break-all"}>{header.value}</span>
                </div>
              ))
            }
           </div>


          </div>

          <div className="flex-1">
           {
            mockResponse[0].filter_value?  <Chart chartData={chartData} timeFrame={granularityValue}/>:null
           }
          </div>
        </div>

        <div className="col-span-2 rounded-lg bg-white/5 backdrop-blur flex flex-col py-4 px-3 gap-2 h-full ">
          <div className="flex flex-col gap-2 row-span-1 h-full">
            <div className="flex justify-between items-center">
              <h1>Payload</h1>
            </div>
            <JsonViewer data ={mockRequest}  />
          </div>
          <div className="flex flex-col gap-2 flex-grow-1 max-h-full">
            <h2>Response</h2>
            <div>
              <JsonViewer data ={mockResponse}  />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataViewer;
