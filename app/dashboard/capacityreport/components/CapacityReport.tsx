'use client';

import {
  ConfigProvider,
  Input,
  Table,
  Spin,
  message,
  Collapse
} from "antd";

import {
  LoadingOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  FilePdfOutlined
} from '@ant-design/icons';

import axios from "axios";
import { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useCapacityReportStore } from "../stores/useCapacityReportStore";
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import SearchParameters from "../components/SearchParameters";
import { Flight } from "@/app/lib/definitions";
import { columns } from "./CapacityReportTableColumns";
import { filterFlightsForCapacityReport, generateFlightHash, hardcodedFlights } from "@/app/lib/utils";
import { WEBP_API_URL, WEB_API_HEADER_KEY } from "@/app/lib/Constants";
import {exportToExcel, exportToCsv, exportToPdf} from "@/app/lib/DataExportService";

const { Panel } = Collapse;

const antIcon = (
  <LoadingOutlined style={{ fontSize: 48, color: "black" }} spin />
); // custom Icon

const CapacityReport = () => {
  const [limit, setLimit] = useState<number>(1000);
  const [database, setDatabase] = useState<string>("snowflake");
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isMapChartRowOpen, setIsMapChartRowOpen] = useState(true);
  
  dayjs.extend(customParseFormat);

  const [error, setError] = useState<string | null>(null);

  const { effFromDate, effToDate, setEffFromDate, setEffToDate } =
    useCapacityReportStore();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [flights, setFlights] = useState<Flight[]>([]);
  const [filterText, setFilterText] = useState<string>("");
    const [loading, setLoading] = useState(false); // new state variable for loading
  const [dataLoaded, setDataLoaded] = useState(false); // new state variable for data loaded

  const loadFlights = async () => {
    setLoading(true);
    setIsPanelOpen(false);

    const params = new URLSearchParams(window.location.search);
    const useHardcoded = params.get("usehardcoded");
    const formattedFromDate = effFromDate ? dayjs(effFromDate).format("YYYY-MM-DD") : null;
    const formattedToDate = effToDate ? dayjs(effToDate).format("YYYY-MM-DD") : null;
    const query = `?EffectiveFrom=${formattedFromDate}&EffectiveTo=${formattedToDate}&Limit=${limit}&Database=${database}`;

    try {
      if (useHardcoded === "1") {
        setError(null);
        setFlights(hardcodedFlights.map((flight) => ({
          ...flight,
          key: generateFlightHash(flight),
        })));
        
      } else {
        
        const response = await axios.get<Flight[]>(`${WEBP_API_URL}${query}`, {
          headers: {
            "X-API-Key": WEB_API_HEADER_KEY,
          },
        });

        if (response.data.length === 0) {
          message.error("No flights found for the specified criteria.");
          setError("no flights");
        } else {
          
          setError(null);
          
          setFlights(response.data.map((flight) => ({
            ...flight,
            key: generateFlightHash(flight),
          })));
        }
      }
    } catch (error) {
      console.error(error);
      
      message.error("Failed to load flights. Please try again later.",10);
      
      setError("Axios error occurred. Please check the console for more information.");
    } finally {
      setLoading(false);
      setDataLoaded(true);
    }
  };


  const filteredFlights = filterFlightsForCapacityReport(flights, filterText);

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            rowHoverBg: "#fde047",
            rowSelectedBg: "#fde047",
          },
        },
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minHeight: "400px" }}>
        <h1>Capacity Report</h1>

        <Collapse activeKey={isPanelOpen ? '1' : ''} onChange={() => setIsPanelOpen(!isPanelOpen)} style={{ width: '100%' }}>
          <Panel header="Search parameters" key="1" extra={isPanelOpen ? <UpOutlined /> : <DownOutlined />} style={{ width: '100%', padding: 0, margin: 0 }}>
            <SearchParameters
              effFromDate={effFromDate}
              setEffFromDate={setEffFromDate}
              effToDate={effToDate}
              setEffToDate={setEffToDate}
              limit={limit}
              setLimit={setLimit}
              setDatabase={setDatabase}
              setFilterText={setFilterText}
              setFlights={setFlights}
              loadFlights={loadFlights}
            />
          </Panel>
        </Collapse>

        {/* Loading spinner */}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: "100%",
              top: "40%"
            }}
          >
            <Spin indicator={antIcon} />
          </div>
        )}



        {/* Data loaded and display section */}
        {!error && dataLoaded && !loading && (
          <>
            {/* Visuals and charts collapse */}
            <Collapse activeKey={isMapChartRowOpen ? '1' : ''} onChange={() => setIsMapChartRowOpen(!isMapChartRowOpen)} style={{ width: '100%', marginTop: '1rem' }}>
              <Panel header="Visuals" key="1" extra={isMapChartRowOpen ? <UpOutlined /> : <DownOutlined />} style={{ width: '100%', padding: 0, margin: 0 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "49%",
                      height: "480px",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 10px rgba(0,0,0,0.15)",
                      padding: "20px",
                      backgroundColor: "#fff",
                    }}
                  >
                    {/*<AnalyserChart data={flights} />*/}
                    <p>This is chart</p>
                  </div>
                  <div
                    style={{
                      width: "49%",
                      height: "480px",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 10px rgba(0,0,0,0.15)",
                      padding: "0px",
                      backgroundColor: "#fff",
                    }}
                  >
                    {/*<AnalyserMap />*/}
                    <p>This is map</p>
                  </div>
                </div>
              </Panel>
            </Collapse>

            {/* Export and search controls */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <FilePdfOutlined style={{ fontSize: '24px', color: '#ff4d4f', marginRight: '10px' }} onClick={() => exportToPdf(filteredFlights)} />
              <FileTextOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '10px' }} onClick={() => exportToCsv(filteredFlights)} />
              <FileExcelOutlined style={{ fontSize: '24px', color: '#52c41a', marginRight: '10px' }} onClick={() => exportToExcel(filteredFlights)} />
              <span style={{ marginRight: "10px" }}>Filter:</span>
              <Input.Search
                placeholder='Search Flight'
                onChange={(e) => setFilterText(e.target.value)}
                style={{ width: 200 }}
              />
            </div>

            {/* Flight data table */}
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredFlights}
              loading={loading}
              style={{ marginTop: "20px", width: "100%" }}
            />
          </>
        )}
      </div>
    </ConfigProvider>
  );

  {/* end return */}
  
};



export default CapacityReport;