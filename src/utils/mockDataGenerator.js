import dayjs from "dayjs";
import {
  categoryData,
  cityData,
  deliveryTypeData,
  timeData,
} from "../data/constants";

export const generateMockResponse = ({ dataType }) => {
  switch (dataType) {
    case "insights":
      return getInsightData;
    case "kpi":
      return getKpiData;
    case "logistic":
      return getLogisticData;
    default:
      break;
  }
};

const getInsightData = ({ granularity, startDate, endDate, filterValue }) => {
  const timeArray = generateDateTimeArray(
    granularity,
    dayjs(startDate).format("YYYY-MM-DD"),
    dayjs(endDate).format("YYYY-MM-DD")
  );

  const returnData = timeArray.map((time) => {
    return {
      time: time,
      avg_order_amount: Math.floor(Math.random() * 200),
      total_order: Math.floor(Math.random() * 200),
      filter_value: filterValue,
    };
  });
  return returnData;
};

const getKpiData = ({
  startDate = new Date(),
  endDate = new Date(),
  granularity = "",
  filterValue = "",
}) => {
  const returnData = [
    {
      label: "Costumer Lifetime Value",
      description:
        "The total revenue a business can expect from a single customer account",
      value: Math.floor(Math.random() * 100),
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
      granularity: granularity,
      filterValue: filterValue,
    },
    {
      label: "Customer acquisition cost",
      description: "The cost required to acquire a new customer account",
      value: Math.floor(Math.random() * 100),
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
      granularity: granularity,
      filterValue: filterValue,
    },
    {
      label: "Cart Abandonment Rate",
      description: "The percentage of shoppers who leave without buying.",
      value: Math.floor(Math.random() * 100),
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
      granularity: granularity,
      filterValue: filterValue,
    },
    {
      label: "Gross Profit",
      description:
        "The revenue remaining after deducting the cost of goods sold from total sales",
      value: Math.floor(Math.random() * 100),
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
      granularity: granularity,
      filterValue: filterValue,
    },
    {
      label: "Repetition rate of customer",
      description:
        "The percentage of customers who make repeat purchases over a specific period.",
      value: Math.floor(Math.random() * 100),
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
      granularity: granularity,
      filterValue: filterValue,
    },
  ];

  return returnData;
};

const getLogisticData = ({
  granularity,
  startDate,
  endDate,
  filterValue,
  filterBy,
}) => {
  switch (filterBy) {
    case "Average Cost per Km":
      return getAvgCostKmData({
        granularity,
        startDate,
        endDate,
        filterValue,
      });
    case "Time of Order":
      return getTimeOrderData({
        granularity,
        startDate,
        endDate,
        filterValue,
      });
    default:
      break;
  }
};

const getAvgCostKmData = ({ filterValue }) => {
  let xData = [];
  let response = [];
  switch (filterValue) {
    case "Delivery Type":
      xData = deliveryTypeData;
      break;
    case "Product Category":
      xData = categoryData;
      break;
    default:
      break;
  }

  response = xData?.map((data) => {
    return {
      filterValue: filterValue,
      xData: data.label ?? "",
      yData: Math.floor(Math.random() * (150 - 30 + 1)) + 30, // Random value between 30 and 150
    };
  });

  return response;
};

const getTimeOrderData = ({ filterValue }) => {
  let xData = [];
  let response = [];
  switch (filterValue) {
    case "Traffic Hours":
      xData = timeData.hourly?.map((hour) => {
        return {
          label: hour,
          value: hour,
        };
      });
      break;
    case "Location":
      xData = cityData;
      break;
    default:
      break;
  }

  response = xData.map((data) => {
    return {
      filterValue: filterValue,
      xData: data.label,
      yData: Math.floor(Math.random() * (168 - 1 + 1)) + 1, // Random value between 1 and 168
    };
  });

  return response;
};

export const generateRequestPayload = ({ dataType }) => {
  switch (dataType) {
    case "insights":
      return getInsightPayload;
    case "kpi":
      return getKpiPayload;
    case "logistic":
      return getLogisticPayload;
    default:
      break;
  }
};

const getInsightPayload = ({
  granularity,
  startDate,
  endDate,
  filterValue,
  filterBy,
}) => {
  const payload = {
    time: {
      start_time: dayjs(startDate).format("YYYY-MM-DD"),
      end_time: dayjs(endDate).format("YYYY-MM-DD"),
      granularity: granularity,
    },
    breakdown: {
      dimension: [
        {
          name: filterBy,
          sort_by: "asc",
        },
      ],
    },
    filters: {
      and: [
        {
          operator: "in",
          field: filterBy,
          value: [filterValue],
        },
      ],
    },
  };

  return payload;
};

const getKpiPayload = ({ startDate, endDate }) => {
  const providerId = Math.floor(Math.random() * 90000) + 10000;
  const payload = {
    provider_id: providerId,
    time: {
      start_time: dayjs(startDate).format("YYYY-MM-DD"),
      end_time: dayjs(endDate).format("YYYY-MM-DD"),
    },
  };

  return payload;
};

const getLogisticPayload = ({
  granularity,
  startDate,
  endDate,
  filterValue,
  filterBy,
}) => {
  const payload = {
    time: {
      start_time: dayjs(startDate).format("YYYY-MM-DD"),
      end_time: dayjs(endDate).format("YYYY-MM-DD"),
      granularity: granularity,
    },
    breakdown: {
      dimension: [
        {
          name: filterBy,
          sort_by: "asc",
        },
      ],
    },
    filters: {
      and: [
        {
          operator: "in",
          field: filterBy,
          value: [filterValue],
        },
      ],
    },
  };

  return payload;
};

function generateDateTimeArray(granularity, startDate, endDate) {
  let currentDate = new Date(startDate);
  const endDateObj = new Date(endDate);
  const dateTimeArray = [];
  while (currentDate <= endDateObj) {
    switch (granularity.toLowerCase()) {
      case "hourly":
        dateTimeArray.push(new Date(currentDate));
        currentDate.setHours(currentDate.getHours() + 1);
        break;
      case "daily":
        dateTimeArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
        break;
      case "weekly":
        dateTimeArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 7);
        break;
      case "monthly":
        dateTimeArray.push(new Date(currentDate));
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case "yearly":
        dateTimeArray.push(new Date(currentDate));
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        break;
      default:
        throw new Error("Invalid granularity");
    }
  }

  return dateTimeArray;
}
