"use client"

import CapacityReport from "./components/CapacityReport"
import { useCapacityReportStore } from "./stores/useCapacityReportStore";

export default function Page() {
  
  const { effFromDate, effToDate, setEffFromDate, setEffToDate } = useCapacityReportStore();

  console.log(effFromDate, effToDate);
  
  //use values from useCapacityReportStore
  
  
  return (
    <>
      
      <CapacityReport />
      </>
  );
}