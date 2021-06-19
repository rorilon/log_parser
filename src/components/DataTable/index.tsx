import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { PathStats } from "../../pages/FileUploadFrom/utils";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export interface HeadCell {
  key: keyof PathStats;
  label: string;
}

interface DataTableProps {
  rowsData: PathStats[];
  headCells: HeadCell[];
}
export const DataTable = ({ rowsData, headCells }: DataTableProps) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell key={headCell.key}>{headCell.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.map((row, index: number) => (
            <TableRow key={index}>
              {headCells.map((headCell) => (
                <TableCell key={row[headCell.key]}>{row[headCell.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
