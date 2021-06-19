import React from "react";
import { PathStats } from "../FileUploadFrom/utils";
import { DataTable, HeadCell } from "../DataTable";

const headCells: HeadCell[] = [
  { key: "path", label: "Path" },
  { key: "totalViews", label: "Total Views" },
];

interface TotalViewsProps {
  tableData: PathStats[];
}

export const TotalViews = ({ tableData }: TotalViewsProps) => {
  return tableData && <DataTable rowsData={tableData} headCells={headCells} />;
};
