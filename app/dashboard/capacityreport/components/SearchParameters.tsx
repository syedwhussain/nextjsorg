import { Card, Row, Col, Input, Select, DatePicker, Slider, InputNumber, Button } from 'antd';
import dayjs from 'dayjs';

interface SearchParametersProps {
  effFromDate: any;
  setEffFromDate: (date: any) => void;
  effToDate: any;
  setEffToDate: (date: any) => void;
  limit: number;
  setLimit: (value: number) => void;
  setDatabase: (value: string) => void;
  setFilterText: (value: string) => void;
  setFlights: (flights: any[]) => void;
  loadFlights: () => void;
}

const SearchParameters = ({
  effFromDate,
  setEffFromDate,
  effToDate,
  setEffToDate,
  limit,
  setLimit,
  setDatabase,
  setFilterText,
  setFlights,
  loadFlights,
}: SearchParametersProps) => {
  const dateFormat = 'YYYY-MM-DD';

  return (
    <Card style={{ borderRadius: '15px', width: '100%' }}>
      <Row gutter={16}>
        <Col span={8}>
          <p>Origin:</p>
          <Input placeholder="Enter origin" style={{ width: '50%' }} />
          <p>Destination:</p>
          <Input placeholder="Enter destination" style={{ width: '50%' }} />
          <p>Carrier:</p>
          <Select placeholder="Select carrier">
            <Select.Option value='carrier1'>Carrier 1</Select.Option>
            <Select.Option value='carrier2'>Carrier 2</Select.Option>
          </Select>
          <p>Aircraft Equipment Type:</p>
          <Select placeholder="Select equipment type">
            <Select.Option value='type1'>Type 1</Select.Option>
            <Select.Option value='type2'>Type 2</Select.Option>
          </Select>
        </Col>
        <Col span={8}>
          <p>Effective from:</p>
          <DatePicker
            id='effFromDate'
            value={effFromDate}
            onChange={setEffFromDate}
            defaultValue={dayjs("2019-09-03", dateFormat).toDate()}
            minDate={dayjs("2019-08-01", dateFormat)}
            maxDate={dayjs("2025-10-31", dateFormat)}
          />
          <p>Effective to:</p>
          <DatePicker
            id='effToDate'
            value={effToDate}
            onChange={setEffToDate}
            defaultValue={dayjs("2020-09-03", dateFormat).toDate()}
            minDate={dayjs("2019-08-01", dateFormat)}
            maxDate={dayjs("2025-10-31", dateFormat)}
          />
        </Col>
        <Col span={8}>
          <p>Limit:</p>
          <Slider
            min={5}
            max={1000}
            step={5}
            onChange={(value) => setLimit(value)}
            value={typeof limit === "number" ? limit : 0}
            style={{ width: "200px" }}
          />
          <InputNumber
            min={5}
            max={1000}
            step={5}
            style={{ margin: "0 16px" }}
            value={limit}
            onChange={(value) => value !== null && setLimit(value)}
          />
          <p>Database:</p>
          <Select
            defaultValue='snowflake'
            style={{ width: 120 }}
            onChange={(value) => setDatabase(value)}
          >
            <Select.Option value='snowflake'>Snowflake</Select.Option>
            <Select.Option value='sqlserver'>SQL Server</Select.Option>
          </Select>
        </Col>
      </Row>
      <Button
        style={{
          background: "black",
          color: "white",
          marginTop: '20px'
        }}
        onClick={() => {
          setFilterText("");
          setFlights([]);
          loadFlights();
        }}
      >
        Search Flights
      </Button>
    </Card>
  );
};

export default SearchParameters;