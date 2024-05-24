export const timeGranularity = [
  { key: "Hourly", label: "Hourly" },
  { key: "Daily", label: "Daily" },
  { key: "Weekly", label: "Weekly" },
  { key: "Monthly", label: "Monthly" },
  { key: "Yearly", label: "Yearly" },
];

export const cityData = [
  { key: "Delhi", label: "Delhi" },
  { key: "Mumbai", label: "Mumbai" },
  { key: "Bangalore", label: "Bangalore" },
  { key: "Chennai", label: "Chennai" },
  { key: "Kolkata", label: "Kolkata" },
];

export const categoryData = [
  { key: "Home Decor", label: "Home Decor" },
  { key: "F&B", label: "F&B" },
  { key: "Fashion", label: "Fashion" },
];

export const deliveryTypeData = [
  { key: "Express", label: "Express" },
  { key: "Standard", label: "Standard" },
  { key: "Immediate", label: "Immediate" },
  { key: "Same Day", label: "Same Day" },
  { key: "Next Day", label: "Next Day" },
];

export const dataMetrics = [
  {
    key: "insights",
    label: "Insights + Metrics",
    breakdown: [
      {
        key: "city",
        label: "City",
        formLabel: "Regions",
        value: cityData,
      },
      {
        key: "category",
        label: "Category",
        formLabel: "Categories",
        value: categoryData,
      },
    ],
  },
  {
    key: "kpi",
    label: "KPI",
    breakdown: [],
  },
  {
    key: "logistic",
    label: "Logistics Insights",
    breakdown: [
      {
        key: "avgCostKm",
        label: "Average Cost per Km",
        formLabel: "Segmented By",
        value: [
          { key: "deliveryType", label: "Delivery Type" },
          { key: "productCategory", label: "Product Category" },
        ],
      },
      {
        key: "timeOrder",
        label: "Time of Order",
        formLabel: "Segmented By",
        value: [
          {
            key: "trafficHours",
            label: "Traffic Hours",
          },
          {
            location: "location",
            label: "Location",
          },
        ],
      },
    ],
  },
];

export const timeData = {
  hourly: [...Array(25).keys()].map((i) => `${i}:00`),
  daily: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  weekly: ["Week 1", "Week 2", "Week 3", "Week 4"],
  monthly: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ],
};
