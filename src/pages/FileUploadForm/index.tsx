import React, { useState } from "react";
import { Divider, Input } from "@material-ui/core";
import {
  getInternalPathStats,
  InternalPathStats,
  mapToPathStats,
  PathStats,
  sortByTotal,
  sortByUnique,
} from "./utils";
import { TotalViews } from "../../components/TotalViews";
import { UniqueViews } from "../../components/UniqueViews";

export const FileUploadForm = () => {
  const [stats, setStats] = useState<PathStats[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const files = target.files || [];
    const internalPathStats: InternalPathStats = await getInternalPathStats(
      files[0]
    );
    setStats(mapToPathStats(internalPathStats));
  };

  return (
    <>
      <input
        type="file"
        onChange={handleFileUpload}
        data-testid="uploadButton"
      />
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
