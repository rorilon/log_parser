import { render } from "@testing-library/react";
import { TotalViews } from "../index";
import React from "react";

const testData = [
  { path: "/testPath1", totalViews: 3, uniqueViews: 1 },
  { path: "/testPath2", totalViews: 5, uniqueViews: 4 },
];

describe("TotalViews component tests", () => {
  test("renders the correct headers", () => {
    const { queryByText } = render(<TotalViews tableData={testData} />);

    expect(queryByText("Total Views")).toBeInTheDocument();
    expect(queryByText("Path")).toBeInTheDocument();
    expect(queryByText("Unique Views")).not.toBeInTheDocument();
  });

  test("renders only the needed data", () => {
    const { queryByText } = render(<TotalViews tableData={testData} />);

    expect(queryByText("/testPath1")).toBeInTheDocument();
    expect(queryByText("3")).toBeInTheDocument();
    expect(queryByText("/testPath2")).toBeInTheDocument();
    expect(queryByText("5")).toBeInTheDocument();

    expect(queryByText("1")).not.toBeInTheDocument();
    expect(queryByText("4")).not.toBeInTheDocument();
  });
});
