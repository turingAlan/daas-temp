import { useState } from "react";

import DropDown from "../../components/Dropdown";
import JsonViewer from "../../components/JsonViewer";
import { Clipboard, ClipboardCheck } from "lucide-react";
import Chart from "../../components/Charts/Chart";
import { Tooltip } from "@mui/material";
import TimePopup from "../../components/TimePopup";
import dayjs from "dayjs";
import Button from "../../components/Button";
import {
  generateMockResponse,
  generateRequestPayload,
} from "../../utils/mockDataGenerator";
import { dataMetrics, timeGranularity } from "../../data/constants";
import ContainerDataView from "../../components/containerDataView";
import Loader from "../../components/Loader";
import { simulateAsync } from "../../lib/utils";

const DataViewer = () => {
  const [granularityValue, setGranularityValue] = useState(timeGranularity[0]);
  const [url, setUrl] = useState(
    "https://moondoor-dev.sellersetu.in/ironcore/product-api/v0/orders/"
  );
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const initialMockRequest = {
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
  };

  const initialMockResponse = [
    {
      filter_value: "",
      time: "",
      avg_order_amount: "",
      total_orders: "",
    },
    {
      filter_value: "",
      time: "",
      avg_order_amount: "",
      total_orders: "",
    },
  ];

  const [mockResponse, setMockResponse] = useState(initialMockResponse);
  const [mockRequest, setMockRequest] = useState(initialMockRequest);

  const [timePopup, setTimePopup] = useState(false);
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));

  const insightOpitons = dataMetrics;
  const [selectedInsight, setSelectedInsight] = useState(dataMetrics[0]);
  const breakdownOptions = selectedInsight?.breakdown ?? [];
  const [selectedBreakDown, setSelectedBreakDown] = useState(
    breakdownOptions[0] ?? []
  );
  const subBreakdownOptions = selectedBreakDown?.value ?? [];
  const [selectedSubBreakDown, setSelectedSubBreakDown] = useState(
    subBreakdownOptions[0] ?? []
  );

  const [displayData, setDisplayData] = useState(mockResponse);

  const [isLoading, setIsLoading] = useState(false);

  const headers = [
    {
      key: "Authorization",
      value:
        "Bearer \n eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmY3ZjM4MDgtMzlmNC00YTRjLThhMTYtNjlhOWY1MDNiNDllIiwib3JnX2lkIjoxLCJleHAiOjE3MDc1NjU2MzEsImlhdCI6MTcwNjk2MDgzMX0.WTacU1GPwa6D-YjaggmsT_dTP05DTYp51t9n3odgTg0",
    },

    {
      key: "Origin",
      value: "localHost",
    },
  ];

  const copyToClipboard = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCopiedToClipboard(true);
    navigator.clipboard.writeText(url);
  };

  const handleApi = async () => {
    setUrl(
      `https://moondoor-dev.sellersetu.in/ironcore/product-api/v0/orders/`
    );
    const payload = generateRequestPayload({
      dataType: selectedInsight?.key,
    })({
      granularity: granularityValue.label,
      startDate,
      endDate,
      filterValue: selectedSubBreakDown.label ?? "",
      filterBy: selectedBreakDown.label ?? "",
    });

    setIsLoading(true);
    await simulateAsync(2000); // Artificial delay to simulate API call
    setIsLoading(false);
    const response = generateMockResponse({
      dataType: selectedInsight?.key,
    })({
      granularity: granularityValue.label,
      startDate,
      endDate,
      filterValue: selectedSubBreakDown.label ?? "",
      filterBy: selectedBreakDown.label ?? "",
    });
    setMockRequest(payload);
    setMockResponse(response);
    const formattedData = formatDisplayData(response, selectedInsight?.key);

    console.log(formattedData, "hers is the formatted data");

    setDisplayData(formattedData);
  };

  const formatDisplayData = (data, dataType) => {
    let xDataSet;
    let xDataType;
    let yDataSet;
    let subYDataSet;
    let yLabelFormatter = {
      prefix: "",
      suffix: "",
    };
    let subYLabelFormatter = {
      prefix: "",
      suffix: "",
    };
    switch (dataType) {
      case "insights":
        xDataSet = data.map((xPoint) => xPoint.time);
        xDataType = "time";
        subYDataSet = data.map((amount) => "" + amount.avg_order_amount);
        yDataSet = data.map((order) => order.total_order);
        subYLabelFormatter = {
          prefix: "₹",
          suffix: "",
        };

        return {
          xDataSet,
          yDataSet,
          subYDataSet,
          xDataType,
          yLabel: "Total Orders",
          subYLabel: "Avg. Value",
          subYLabelFormatter,
          yLabelFormatter,
        };
      case "kpi":
        return data;
      case "logistic":
        xDataSet = data?.map((xPoint) => xPoint.xData);
        xDataType = "string";
        yDataSet = data?.map((yPoint) => yPoint.yData);
        if (selectedBreakDown.label === "Average Cost per Km") {
          yLabelFormatter = {
            prefix: "₹ ",
            suffix: "/km",
          };
        } else if (selectedBreakDown.label === "Time of Order") {
          yLabelFormatter = {
            prefix: "",
            suffix: " hrs",
          };
        }
        return {
          xDataSet,
          yDataSet,
          xDataType,
          yLabel: selectedBreakDown.label ?? "",
          subYLabelFormatter,
          yLabelFormatter,
        };
      default:
        break;
    }
  };

  const handleInsightChange = (insight) => {
    setSelectedInsight(insight);
    setDisplayData([]); //Reset the data on insight change
    setMockRequest(initialMockRequest);
    setMockResponse(initialMockResponse);
    setSelectedBreakDown(insight?.breakdown[0] ?? []);
    setSelectedSubBreakDown(insight?.breakdown[0]?.value[0] ?? []);
  };

  const handleBreakdownChange = (breakdown) => {
    setSelectedBreakDown(breakdown);
    setSelectedSubBreakDown(breakdown?.value[0] ?? []);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="top-0 w-full flex py-3 items-center justify-between">
        <div className="flex gap-10">
          <Button
            theme={"transparent"}
            size={"sm"}
            className={"w-40"}
            onClick={() => setTimePopup(true)}
          >
            Set Time
          </Button>

          <div className="flex gap-4 items-center">
            <span>Data Type</span>
            <DropDown
              options={insightOpitons}
              optionState={[selectedInsight, handleInsightChange]}
            />
          </div>
          {breakdownOptions?.length > 0 && (
            <div className="flex gap-4 items-center">
              <span>Breakdown By</span>
              <DropDown
                options={breakdownOptions}
                optionState={[selectedBreakDown, handleBreakdownChange]}
              />
            </div>
          )}
        </div>

        <Button
          theme={"transparent"}
          size={"sm"}
          className={"w-40 mx-auto"}
          onClick={handleApi}
        >
          Apply
        </Button>

        {breakdownOptions?.length > 0 && subBreakdownOptions.length > 0 && (
          <div className="flex gap-10">
            <div className={`flex gap-4 items-center`}>
              <span>{selectedBreakDown?.formLabel ?? ""}</span>
              <DropDown
                options={subBreakdownOptions}
                optionState={[selectedSubBreakDown, setSelectedSubBreakDown]}
              />
            </div>
          </div>
        )}
      </div>

      {timePopup && (
        <TimePopup
          popup={timePopup}
          setPopup={setTimePopup}
          granularityValue={granularityValue}
          setGranularityValue={setGranularityValue}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      )}

      <div className="grid grid-flow-col grid-cols-5 gap-4 min-h-[89vh]">
        <div className="col-span-3  py-4 px-3 rounded-lg flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2>Get Orders Data</h2>

            <div className="p-2 group bg-white/5 bg-opacity-5 w-fit cursor-pointer select-none relative rounded-md pr-10">
              <span className="break-words">{url}</span>
              <Tooltip
                title={copiedToClipboard ? "Copied" : "Copy to clipboard"}
                arrow
              >
                {copiedToClipboard ? (
                  <ClipboardCheck
                    className="w-5 h-5 absolute right-3 top-0 bottom-0 my-auto hidden group-hover:block"
                    color="green"
                  />
                ) : (
                  <Clipboard
                    className="w-5 h-5 absolute right-3 top-0 bottom-0 my-auto hidden group-hover:block hover:stroke-chartPurple"
                    onClick={copyToClipboard}
                  />
                )}
              </Tooltip>
            </div>
          </div>

          <div>
            <h2>Headers</h2>
            <div className="h-[1px] w-full bg-slate-300" />

            <div className="flex flex-col gap-1">
              {headers.map((header, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-white flex w-[99px]">{header.key}</span>
                  <span className={"text-white break-all"}>{header.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            {selectedInsight?.key === "insights" ? (
              mockResponse[0].filter_value ? (
                <Chart
                  chartData={displayData}
                  timeFrame={granularityValue.label}
                />
              ) : null
            ) : selectedInsight?.key === "kpi" ? (
              <ContainerDataView data={displayData} />
            ) : selectedInsight?.key === "logistic" ? (
              displayData.xDataSet?.length > 0 && (
                <Chart
                  chartData={displayData}
                  timeFrame={granularityValue.label}
                />
              )
            ) : null}
          </div>
        </div>

        <div className="col-span-2 rounded-lg bg-white/5 backdrop-blur flex flex-col py-4 px-3 gap-2 h-full ">
          <div className="flex flex-col gap-2 row-span-1 h-full">
            <div className="flex justify-between items-center">
              <h1>Payload</h1>
            </div>
            <JsonViewer data={mockRequest} />
          </div>
          <div className="flex flex-col gap-2 flex-grow-1 max-h-full">
            <h2>Response</h2>
            <div>
              <JsonViewer data={mockResponse} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataViewer;
