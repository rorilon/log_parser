import React, { useState } from "react";
import { Divider, Input } from "@material-ui/core";
import { getResult, PathStats } from "./utils";
import { TotalViews } from "../TotalViews";
import { UniqueViews } from "../UniqueViews";

const sortByTotal = (stats: PathStats[]) =>
  stats.sort((a, b) => b.totalViews - a.totalViews);

const sortByUnique = (stats: PathStats[]) =>
  stats.sort((a, b) => b.uniqueViews - a.uniqueViews);

export const FileUploadForm = () => {
  const [stats, setStats] = useState<PathStats[]>([]);
  const handleFile = async (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const files = target.files || [];
    const result: PathStats[] = await getResult(files[0]);
    setStats(result);
  };

  return (
    <>
      <Input type="file" onChange={handleFile} />
      {stats?.length > 0 && (
        <>
          <TotalViews tableData={sortByTotal(stats)} />
          <Divider />
          <UniqueViews tableData={sortByUnique(stats)} />
        </>
      )}
    </>
  );
};
