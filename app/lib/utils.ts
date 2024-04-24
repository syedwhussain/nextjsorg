import { Flight, Revenue } from './definitions';
import { SHA256 } from "crypto-js";

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};


function generateFlightHash(flight: Flight): string {
  return SHA256(JSON.stringify(flight)).toString();
}

const hardcodedFlights: Flight[] = [
  {
    arrAirport: "AMS",
    carrier1: "KLM",
    depAirport: "DXB",
    localArrTime: "2024-02-25T13:50:44.0789577+00:00",
    localDepTime: "2024-02-25T05:01:42.2171075+00:00",
    flightNo1: "KL101",
    km: 5000,
    localDaysOfOp: "1234567",
    opCar: "KLM",
    specificAcft: "Boeing 777",
    stops: 0,
    elapsedTime: 500,
    seatsTotal: 300,
    frequency: 7,
    timeSeries: 1,
  },
  {
    arrAirport: "DXB",
    carrier1: "Qantas",
    depAirport: "DEN",
    localArrTime: "2024-02-16T21:15:14.7372553+00:00",
    localDepTime: "2024-02-16T17:47:52.8762196+00:00",
    flightNo1: "QF22",
    km: 8000,
    localDaysOfOp: "1234567",
    opCar: "Qantas",
    specificAcft: "Airbus A380",
    stops: 0,
    elapsedTime: 500,
    seatsTotal: 500,
    frequency: 7,
    timeSeries: 1,
  },
];

function filterFlightsForCapacityReport(flights: Flight[], filterText: string): Flight[] {
  return flights.filter(
    (flight) =>
      flight.arrAirport.toLowerCase().includes(filterText.toLowerCase()) ||
      flight.carrier1.toLowerCase().includes(filterText.toLowerCase()) ||
      flight.depAirport.toLowerCase().includes(filterText.toLowerCase()) ||
      flight.localArrTime.toLowerCase().includes(filterText.toLowerCase()) ||
      flight.localDepTime.toLowerCase().includes(filterText.toLowerCase()) ||
      flight.flightNo1.toLowerCase().includes(filterText.toLowerCase()) ||
      flight.km.toString().includes(filterText.toLowerCase()) ||
      flight.localDaysOfOp.toLowerCase().includes(filterText.toLowerCase()) ||
      flight.opCar.toLowerCase().includes(filterText.toLowerCase()) ||
      flight.specificAcft.toLowerCase().includes(filterText.toLowerCase()) ||
      flight.stops.toString().includes(filterText.toLowerCase()) ||
      flight.elapsedTime.toString().includes(filterText.toLowerCase()) ||
      flight.seatsTotal.toString().includes(filterText.toLowerCase()) ||
      flight.frequency.toString().includes(filterText.toLowerCase()) ||
      flight.timeSeries.toString().includes(filterText.toLowerCase())
  );
}

export { generateFlightHash, hardcodedFlights, filterFlightsForCapacityReport };