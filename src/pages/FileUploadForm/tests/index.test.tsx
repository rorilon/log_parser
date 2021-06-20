import { render, fireEvent, waitFor } from "@testing-library/react";
import { FileUploadForm } from "../index";
import React from "react";

const mockFileContents = [
  "/testPath1 123.456.789.123 \n /testPath2 123.123.123.123 \n /testPath1 123.456.789.123 \n",
];

describe("FileUploadForm component tests", () => {
  test("renders the file input and no tables", () => {
    const { queryByText, getByTestId } = render(<FileUploadForm />);

    expect(getByTestId("uploadButton")).toBeInTheDocument();
    expect(queryByText("Unique Views")).not.toBeInTheDocument();
    expect(queryByText("Total Views")).not.toBeInTheDocument();
  });

  test("renders only the needed data", async () => {
    jest.spyOn(global.console, "warn").mockImplementation(() => {});
    const file = new File(mockFileContents, "file.log", { type: "text" });
    const event = {
      target: {
        files: [file],
      },
    };
    const { getByTestId, queryByText } = render(<FileUploadForm />);

    expect(getByTestId("uploadButton")).toBeInTheDocument();

    const uploadButton = getByTestId("uploadButton");

    fireEvent.change(uploadButton, event);

    expect(uploadButton.files[0]).toStrictEqual(file);

    await waitFor(() => {
      expect(console.warn).toBeCalledTimes(1);
      expect(queryByText("Unique Views")).toBeInTheDocument();
      expect(queryByText("Total Views")).toBeInTheDocument();
    });
  });
});
