import React, { useState } from "react";
import { Divider, Input } from "@material-ui/core";
import {
  getInternalPathStats,
  InternalPathStats,
  mapToPathStats,
  PathStats,
} from "./utils";
import { TotalViews } from "../../components/TotalViews";
import { UniqueViews } from "../../components/UniqueViews";

const sortByTotal = (stats: PathStats[]) =>
  stats.sort((a, b) => b.totalViews - a.totalViews);

const sortByUnique = (stats: PathStats[]) =>
  stats.sort((a, b) => b.uniqueViews - a.uniqueViews);

export const FileUploadForm = () => {
  const [stats, setStats] = useState<PathStats[]>([]);
  const handleFile = async (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const files = target.files || [];
    const internalPathStats: InternalPathStats = await getInternalPathStats(
      files[0]
    );
    setStats(mapToPathStats(internalPathStats));
  };

  return (
    <>
      <Input type="file" onChange={handleFile} data-testid="uploadButton" />
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