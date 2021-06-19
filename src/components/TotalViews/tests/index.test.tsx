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

    const pathHeader = queryByText("Path");
    const totalViewsHeader = queryByText("Total Views");
    const uniqueViewsHeader = queryByText("Unique Views");

    expect(pathHeader).toBeInTheDocument();
    expect(totalViewsHeader).toBeInTheDocument();
    expect(uniqueViewsHeader).not.toBeInTheDocument();
  });

  test("renders only the needed data", () => {
    const { queryByText } = render(<TotalViews tableData={testData} />);

    const testPath1 = queryByText("/testPath1");
    const views1 = queryByText("3");
    const testPath2 = queryByText("/testPath2");
    const views2 = queryByText("5");
    const uniqueViews1 = queryByText("1");
    const uniqueViews2 = queryByText("4");

    expect(testPath1).toBeInTheDocument();
    expect(views1).toBeInTheDocument();
    expect(testPath2).toBeInTheDocument();
    expect(views2).toBeInTheDocument();

    expect(uniqueViews1).not.toBeInTheDocument();
    expect(uniqueViews2).not.toBeInTheDocument();
  });
});
