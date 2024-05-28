import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
   ChartOptions,
   ChartData,
   ArcElement,
} from "chart.js"
import { Bar, Doughnut } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const months = ["January", "February", "March", "April", "May", "June", "July"]

type BarChartProps = {
   data_1: number[]
   data_2: number[]
   title_1: string
   title_2: string
   bgColor_1: string
   bgColor_2: string
   labels?: string[]
   horizontal?: boolean
}

export function BarChart({
   data_1,
   data_2,
   title_1,
   title_2,
   bgColor_1,
   bgColor_2,
   horizontal = false,
   labels = months,
}: BarChartProps) {
   const options: ChartOptions<"bar"> = {
      responsive: true,
      indexAxis: horizontal ? "y" : "x",
      maintainAspectRatio: false,
      plugins: {
         legend: {
            display: false,
            position: "top" as const,
         },
         title: {
            display: false,
            text: "Chart.js Bar Chart",
         },
      },

      scales: {
         y: {
            beginAtZero: true,
            grid: {
               display: false,
            },
         },
         x: {
            grid: {
               display: false,
            },
         },
      },
   }

   const data: ChartData<"bar", number[], string> = {
      labels,
      datasets: [
         {
            label: title_1,
            data: data_1,
            backgroundColor: bgColor_1,
            barThickness: "flex",
            barPercentage: 1,
            categoryPercentage: 0.4,
         },
         {
            label: title_2,
            data: data_2,
            backgroundColor: bgColor_2,
            barThickness: "flex",
            barPercentage: 1,
            categoryPercentage: 0.4,
         },
      ],
   }

   return <Bar width={"100%"} height={"300px"} options={options} data={data} />
}

type DoughnutChartProps = {
   labels: string[]
   data: number[]
   bgColor: string[]
   cutout?: string | number
   legends?: boolean
   offset?: number[]
}

export function DoughnutChart({
   bgColor,
   data,
   labels,
   cutout,
   legends = true,
   offset,
}: DoughnutChartProps) {
   const doughnutChartOptions: ChartOptions<"doughnut"> = {
      responsive: true,
      plugins: {
         legend: {
            display: legends,
            position: "bottom",
            labels: {
               padding: 20,
               boxWidth: 20,
            },
         },
      },
      cutout,
   }

   const doughnutChartData: ChartData<"doughnut", number[], string> = {
      labels,
      datasets: [
         {
            data,
            backgroundColor: bgColor,
            borderWidth: 0,
            offset,
         },
      ],
   }

   return (
      <Doughnut
         data={doughnutChartData}
         options={doughnutChartOptions}
      />
   )
}