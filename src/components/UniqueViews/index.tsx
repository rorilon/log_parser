import React from "react";
import { PathStats } from "../../pages/FileUploadForm/utils";
import { DataTable, HeadCell } from "../DataTable";

const headCells: HeadCell[] = [
    { key: "path", label: "Path" },
    { key: "uniqueViews", label: "Unique Views" },
];

interface UniqueViewsProps {
    tableData: PathStats[];
}

export const UniqueViews = ({ tableData }: UniqueViewsProps) => (<DataTable rowsData={tableData} headCells={headCells} />)
