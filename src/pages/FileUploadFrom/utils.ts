import validator from "validator";

interface Line {
  path: Path;
  ip: string;
}

type Path = string;

interface PathState {
  ips: Set<string>;
  visitsTotal: number;
}

type InternalPathStats = {
  [key: string]: PathState;
};

export interface PathStats {
  path: string;
  totalViews: number;
  uniqueViews: number;
}

const readUploadedFileAsText = (inputFile: File): Promise<string> => {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result as string);
    };
    temporaryFileReader.readAsText(inputFile);
  });
};

export const splitByLines = (file: string) => {
  return file.split("\n");
};
// to validate ips from the example file :)
const isFakeIP = (ip: string) => /^\d{3}.\d{3}.\d{3}.\d{3}$/gm.test(ip);
const validateIP = (ip: string) => validator.isIP(ip) || isFakeIP(ip);
const validatePath = (path: string) => /^\/[a-zA-Z0-9_.-\/]*/gm.test(path);

const validateLine = (line: string) => {
  const lineContent = line.split(" ");
  if (lineContent.length !== 2) return false;
  return validatePath(lineContent[0]) && validateIP(lineContent[1]);
};

export const parseLine = (line: string): Line => {
  const lineContent = line.split(" ");
  return { path: lineContent[0], ip: lineContent[1] };
};

export const mapToPathStats = (internalPathStats: InternalPathStats) => {
  return Object.keys(internalPathStats)?.map((path) => ({
    path,
    totalViews: internalPathStats[path]?.visitsTotal,
    uniqueViews: internalPathStats[path]?.ips?.size,
  }));
};

const parseInternalPathStats = (lines: string[]) => {
  const internalPathStats: InternalPathStats = {};
  lines.forEach((line: string) => {
    if (!validateLine(line)) {
      console.warn("Line is invalid", line);
      return;
    }
    const lineParsed = parseLine(line);
    const { path, ip } = lineParsed;
    if (internalPathStats[path]) {
      internalPathStats[path].ips.add(ip);
      internalPathStats[path].visitsTotal += 1;
    } else {
      internalPathStats[path] = { ips: new Set(), visitsTotal: 1 };
      internalPathStats[path].ips.add(ip);
    }
  });
  return internalPathStats;
};

export const getPathStats = async (file: File): Promise<PathStats[]> => {
  const fileContents: string = await readUploadedFileAsText(file);
  const lines = splitByLines(fileContents);
  const internalPathStats = parseInternalPathStats(lines);
  return mapToPathStats(internalPathStats);
};
