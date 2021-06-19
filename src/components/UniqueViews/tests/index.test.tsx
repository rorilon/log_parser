import { render } from "@testing-library/react";
import { UniqueViews } from "../index";
import React from "react";

const testData = [
  { path: "/testPath1", totalViews: 3, uniqueViews: 1 },
  { path: "/testPath2", totalViews: 5, uniqueViews: 4 },
];

describe("UniqueViews component tests", () => {
  test("renders the correct headers", () => {
    const { queryByText } = render(<UniqueViews tableData={testData} />);

    expect(queryByText("Unique Views")).toBeInTheDocument();
    expect(queryByText("Path")).toBeInTheDocument();
    expect(queryByText("Total Views")).not.toBeInTheDocument();
  });

  test("renders only the needed data", () => {
    const { queryByText } = render(<UniqueViews tableData={testData} />);

    expect(queryByText("/testPath1")).toBeInTheDocument();
    expect(queryByText("1")).toBeInTheDocument();
    expect(queryByText("/testPath2")).toBeInTheDocument();
    expect(queryByText("4")).toBeInTheDocument();

    expect(queryByText("3")).not.toBeInTheDocument();
    expect(queryByText("5")).not.toBeInTheDocument();
  });
});
