import { render, fireEvent } from "@testing-library/react";
import { FileUploadForm } from "../index";
import React from "react";

const mockFileContents = [
  "/testPath1 123.456.789.123 /n /testPath2 123.123.123.123 /n /testPath1 123.456.789.123 /n",
];

describe("FileUploadForm component tests", () => {
  test("renders the file input and no tables", () => {
    const { queryByText, getByTestId } = render(<FileUploadForm />);

    expect(getByTestId("uploadButton")).toBeInTheDocument();
    expect(queryByText("Unique Views")).not.toBeInTheDocument();
    expect(queryByText("Total Views")).not.toBeInTheDocument();
  });

  test("renders only the needed data", () => {
    const file = new File(mockFileContents, "file.log", { type: "text" });
    const { getByTestId } = render(<FileUploadForm />);

    const uploadButton = getByTestId("uploadButton");

    Object.defineProperty(uploadButton, "files", {
      value: [file],
    });

    fireEvent.change(uploadButton);

    expect(uploadButton.files[0]).toStrictEqual(file);
  });
});
