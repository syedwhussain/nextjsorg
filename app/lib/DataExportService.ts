import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


interface jsPDFWithPlugin extends jsPDF {
  // @ts-ignore
  autoTable: (options: autoTable.AutoTableOptions) => autoTable;
}

const getTimestamp = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
};

export const exportToExcel = (flights: any[]) => {
  const ws = XLSX.utils.json_to_sheet(flights);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `flights_${getTimestamp()}.xlsx`);
};

export const exportToCsv = (flights: any[]) => {
  const csv = Papa.unparse(flights);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `flights_${getTimestamp()}.csv`;
  link.click();
};

export const exportToPdf = (flights: any[]) => {
  const head = [Object.keys(flights[0]).filter(key => key !== 'key')];
  const body = flights.map(flight =>
    Object.keys(flight)
      .filter(key => key !== 'key')
      .map(key => flight[key])
  );

  const doc = new jsPDF('p', 'pt', 'a4', true) as jsPDFWithPlugin;
  doc.autoTable({
    head: head,
    body: body,
  });
  doc.save(`flights_${getTimestamp()}.pdf`);
};