import {
  getInternalPathStats,
  InternalPathStats,
  isFakeIP,
  mapToPathStats,
  parseInternalPathStats,
  PathStats,
  readUploadedFileAsText,
  sortByTotal,
  sortByUnique,
  splitByLines,
  validateIP,
  validateLine,
  validatePath,
} from "../utils";

const mockFileContents = [
  "/testPath1 123.456.789.123 \n /testPath2 123.123.123.123 \n /testPath1 123.456.789.123 \n",
];
const file = new File(mockFileContents, "file.log", { type: "text" });

const internalPathStatsResult: InternalPathStats = {
  "/testPath1": {
    ips: new Set(["123.456.789.123"]),
    visitsTotal: 2,
  },
  "/testPath2": {
    ips: new Set(["123.123.123.123"]),
    visitsTotal: 1,
  },
};

const pathStatsResult: PathStats[] = [
  { path: "/testPath1", totalViews: 2, uniqueViews: 1 },
  { path: "/testPath2", totalViews: 1, uniqueViews: 1 },
];

const unsortedPathStats: PathStats[] = [
  { path: "/testPath1", totalViews: 1, uniqueViews: 5 },
  { path: "/testPath2", totalViews: 5, uniqueViews: 1 },
];

describe("sort functions tests", () => {
  test("sorts by Total Views", async () => {
    const sortedByTotalViews = [
      { path: "/testPath2", totalViews: 5, uniqueViews: 1 },
      { path: "/testPath1", totalViews: 1, uniqueViews: 5 },
    ];
    expect(sortByTotal(unsortedPathStats)).toStrictEqual(sortedByTotalViews);
  });

  test("sorts by Unique Views", async () => {
    const sortedByUniqueViews = [
      { path: "/testPath1", totalViews: 1, uniqueViews: 5 },
      { path: "/testPath2", totalViews: 5, uniqueViews: 1 },
    ];
    expect(sortByUnique(unsortedPathStats)).toStrictEqual(sortedByUniqueViews);
  });
});

describe("readUploadedFileAsText function tests", () => {
  const mockParsedFileContents =
    "/testPath1 123.456.789.123 \n /testPath2 123.123.123.123 \n /testPath1 123.456.789.123 \n";

  test("reads the file correctly", async () => {
    const fileContents = await readUploadedFileAsText(file);
    expect(fileContents).toStrictEqual(mockParsedFileContents);
  });
});

describe("splitByLines function tests", () => {
  const mockParsedFileContents =
    "/testPath1 123.456.789.123 \n /testPath2 123.123.123.123 \n /testPath1 123.456.789.123 \n";
  const splittedByLines = [
    "/testPath1 123.456.789.123 ",
    " /testPath2 123.123.123.123 ",
    " /testPath1 123.456.789.123 ",
    "",
  ];

  test("splits the string to array of lines", () => {
    const linesArray = splitByLines(mockParsedFileContents);
    expect(linesArray).toStrictEqual(splittedByLines);
  });
});

describe("validators functions tests", () => {
  const fakeIP = "111.222.333.444";
  const validPath = "/test/smth/here";
  const differentFakeIp = "11.222.333.444";
  const invalidIP = "noIPJustText123";

  test("validates fakeIP pattern", () => {
    expect(isFakeIP(fakeIP)).toStrictEqual(true);
  });

  test("validates fakeIP different pattern", () => {
    expect(isFakeIP(differentFakeIp)).toStrictEqual(true);
  });

  test("fakeIP is valid when checking if Ip is valid", () => {
    expect(validateIP(fakeIP)).toStrictEqual(true);
  });

  test("if it's not resembling ip-address returns false", () => {
    expect(validateIP(invalidIP)).toStrictEqual(false);
  });

  test("returns true when the path is valid", () => {
    expect(validatePath(validPath)).toStrictEqual(true);
  });

  test("returns false when it's not a path", () => {
    const invalidPath = "somethingnotapath";
    expect(validatePath(invalidPath)).toStrictEqual(false);
  });

  test("returns true when the line has ip and path", () => {
    const line = `${validPath} ${fakeIP}`;
    expect(validateLine(line)).toStrictEqual(true);
  });

  test("returns true when the line has ip and path and spaces in the beginning and end of the line", () => {
    const line = `   ${validPath} ${fakeIP}   `;
    expect(validateLine(line)).toStrictEqual(true);
  });
});

describe("parseInternalPathStats function tests", () => {
  const testLines = [
    "/testPath1 123.456.789.123 ",
    " /testPath2 123.123.123.123 ",
    " /testPath1 123.456.789.123 ",
    "",
  ];

  test("returns InternalPathStats object and throws a warning for an invalid line", () => {
    jest.spyOn(global.console, "warn").mockImplementation(() => {});
    const internalPathStats = parseInternalPathStats(testLines);
    expect(console.warn).toBeCalledTimes(1);
    expect(internalPathStats).toStrictEqual(internalPathStatsResult);
  });
});

describe("getInternalPathStats function tests", () => {
  test("returns internalPathStats object when given a file", async () => {
    jest.spyOn(global.console, "warn").mockImplementation(() => {});
    const internalPathStats = await getInternalPathStats(file);
    expect(console.warn).toBeCalledTimes(1);
    expect(internalPathStats).toStrictEqual(internalPathStatsResult);
  });
});

describe("mapToPathStats function tests", () => {
  test("returns pathStats object for internalPathStats", () => {
    const pathStats = mapToPathStats(internalPathStatsResult);
    expect(pathStats).toStrictEqual(pathStatsResult);
  });
});
