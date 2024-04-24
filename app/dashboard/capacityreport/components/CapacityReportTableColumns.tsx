import { Flight } from "@/app/lib/definitions";

//specific for antd only
export const columns = [
  {
    title: "Flight Number",
    dataIndex: "flightNo1",
    key: "flightNo1",
    sorter: (a: Flight, b: Flight) => a.flightNo1.localeCompare(b.flightNo1),
  },
  {
    title: "Arrival Airport",
    dataIndex: "arrAirport",
    key: "arrAirport",
    sorter: (a: Flight, b: Flight) => a.arrAirport.localeCompare(b.arrAirport),
  },
  {
    title: "Departure Airport",
    dataIndex: "depAirport",
    key: "depAirport",
    sorter: (a: Flight, b: Flight) => a.depAirport.localeCompare(b.depAirport),
  },
  {
    title: "Local Arrival Time",
    dataIndex: "localArrTime",
    key: "localArrTime",
    sorter: (a: Flight, b: Flight) =>
      a.localArrTime.localeCompare(b.localArrTime),
  },
  {
    title: "Local Departure Time",
    dataIndex: "localDepTime",
    key: "localDepTime",
    sorter: (a: Flight, b: Flight) =>
      a.localDepTime.localeCompare(b.localDepTime),
  },
  {
    title: "Carrier",
    dataIndex: "carrier1",
    key: "carrier1",
    sorter: (a: Flight, b: Flight) => a.carrier1.localeCompare(b.carrier1),
  },
  {
    title: "Operating Carrier",
    dataIndex: "opCar",
    key: "opCar",
    sorter: (a: Flight, b: Flight) => a.opCar.localeCompare(b.opCar),
  },
  {
    title: "Specific Aircraft",
    dataIndex: "specificAcft",
    key: "specificAcft",
    sorter: (a: Flight, b: Flight) =>
      a.specificAcft.localeCompare(b.specificAcft),
  },
  {
    title: "Stops",
    dataIndex: "stops",
    key: "stops",
    sorter: (a: Flight, b: Flight) => a.stops - b.stops,
  },
  {
    title: "Elapsed Time",
    dataIndex: "elapsedTime",
    key: "elapsedTime",
    sorter: (a: Flight, b: Flight) => a.elapsedTime - b.elapsedTime,
  },
  {
    title: "Total Seats",
    dataIndex: "seatsTotal",
    key: "seatsTotal",
    sorter: (a: Flight, b: Flight) => a.seatsTotal - b.seatsTotal,
  },
  {
    title: "Frequency",
    dataIndex: "frequency",
    key: "frequency",
    sorter: (a: Flight, b: Flight) => a.frequency - b.frequency,
  },
  {
    title: "Time Series",
    dataIndex: "timeSeries",
    key: "timeSeries",
    sorter: (a: Flight, b: Flight) => a.timeSeries - b.timeSeries,
  },
];
