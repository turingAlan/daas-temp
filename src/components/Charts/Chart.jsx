import dayjs from "dayjs";
import ReactEcharts from "echarts-for-react";

const Chart = ({ chartData, timeFrame }) => {
  console.log(chartData);

  const {
    yLabel,
    subYLabel,
    yDataSet,
    subYDataSet,
    yLabelFormatter,
    subYLabelFormatter,
    xDataSet,
    xDataType,
  } = chartData;

  const yData = {
    scales: [
      {
        name: yLabel,
        type: "bar",
        itemStyle: {
          emphasis: {
            barBorderRadius: [20, 20],
          },
          normal: {
            barBorderRadius: [20, 20, 0, 0],
            color: "#fac859",
          },
        },
        data: yDataSet,
        tooltip: {
          valueFormatter: function (value) {
            return `${yLabelFormatter?.prefix}${value}${yLabelFormatter?.suffix}`;
          },
        },
      },
      {
        name: subYLabel,
        type: "line",
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return `${subYLabelFormatter?.prefix}${value}${subYLabelFormatter?.suffix}`;
          },
        },
        data: subYDataSet,
      },
    ],
    axisData: [
      {
        axisLabel: {
          formatter: `${yLabelFormatter?.prefix}{value}${yLabelFormatter?.suffix}`,
        },
      },
      {
        axisLabel: {
          formatter: `${subYLabelFormatter?.prefix}{value}${subYLabelFormatter?.suffix}`,
        },
      },
    ],
  };

  // option = {
  //   title: {
  //     text: 'Data via API',
  //     textStyle: {
  //       color: 'white'
  //     }
  //   },
  //   tooltip: {
  //     trigger: 'axis',
  //     backgroundColor: 'rgba(0,0,0,0.95)',
  //     textStyle: {
  //       color: 'white'
  //     },

  //   },
  //   xAxis: {
  //     type: 'category',
  //     data: xData,
  //   },
  //   yAxis: {
  //     type: 'value'
  //   },
  //   series: series
  // };

  const option = {
    tooltip: {
      trigger: "axis",

      backgroundColor: "rgba(0,0,0,0.95)",
      textStyle: {
        color: "white",
      },
      valueFormatter: (value) => {
        "$" + value.toFixed(2);
      },
    },

    xAxis: {
      scale: true,
      show: true,
      onZero: false,
      min: "dataMin",
      axisLabel: {
        formatter: function (value) {
          if (xDataType === "time") {
            if (timeFrame.toLowerCase() === "hourly") {
              return new Date(value).getHours() + ":00";
            } else if (timeFrame.toLowerCase() === "daily") {
              return dayjs(value).format("DD-MMM");
            } else if (timeFrame.toLowerCase() === "weekly") {
              return dayjs(value).format("DD-MMM");
            } else if (timeFrame.toLowerCase() === "monthly") {
              return dayjs(value).format("MMM-YYYY");
            } else if (timeFrame.toLowerCase() === "yearly") {
              return dayjs(value).format("YYYY");
            }
          } else {
            return value;
          }
        },
      },

      axisLine: {
        show: false,
        onZero: true,
        onZeroAxisIndex: true,
      },
      minorTick: {
        show: false,
      },
      type: "category",
      data: xDataSet,
      axisTick: {
        show: false,
      },
    },
    yAxis: yData.axisData.map((axisData) => {
      return {
        ...axisData,
        alignTicks: true,
        type: "value",
        scale: true,
        axisLine: {
          onZero: 0,
        },
        splitLine: {
          lineStyle: {
            color: "black",
            opacity: "0.1",
            type: "dashed",
          },
        },
      };
    }),
    axisPointer: {
      lineStyle: {
        width: 2,
        color: "#91cb74",
        type: "dashed",
        opacity: 0.6,
        cap: "round",
      },
    },
    series: yData.scales.map((axisData) => {
      return {
        ...axisData,
        lineStyle: {
          normal: {
            color: "#3881e6",
            width: 3,
          },
        },
      };
    }),
  };

  return (
    <ReactEcharts
      option={option}
      style={{ width: "100%", height: "100%" }}
      theme={"my_theme"}
    />
  );
};

export default Chart;
