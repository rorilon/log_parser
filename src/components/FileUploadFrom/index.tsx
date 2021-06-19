import React, { useState } from "react";
import { Input } from "@material-ui/core";
import { getResult, PathStats } from "./utils";

export const FileUploadForm = () => {
  const handleFile = async (event) => {
    const result: PathStats[] = await getResult(event.target.files[0]);
  };

  return <Input type="file" onChange={handleFile} />;
};
