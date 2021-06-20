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

export type InternalPathStats = {
  [key: string]: PathState;
};

export interface PathStats {
  path: string;
  totalViews: number;
  uniqueViews: number;
}

export const readUploadedFileAsText = (inputFile: File): Promise<string> => {
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
// to validate ips from the example file, they do not fall under the valid IP standards
export const isFakeIP = (ip: string) =>
  /^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}$/gm.test(ip);
export const validateIP = (ip: string) => validator.isIP(ip) || isFakeIP(ip);
export const validatePath = (path: string) =>
  /^\/[a-zA-Z0-9_.-\/]*/gm.test(path);

// the line should contain path and ip-address separated by one space
export const validateLine = (line: string) => {
  const lineContent = line.trim().split(" ");
  if (lineContent.length !== 2) return false;
  return validatePath(lineContent[0]) && validateIP(lineContent[1]);
};

export const parseLine = (line: string): Line => {
  const lineContent = line.trim().split(" ");
  return { path: lineContent[0], ip: lineContent[1] };
};

export const mapToPathStats = (internalPathStats: InternalPathStats) => {
  return Object.keys(internalPathStats)?.map((path) => ({
    path,
    totalViews: internalPathStats[path]?.visitsTotal,
    uniqueViews: internalPathStats[path]?.ips?.size,
  }));
};

export const parseInternalPathStats = (lines: string[]) => {
  const internalPathStats: InternalPathStats = {};
  lines.forEach((line: string) => {
    if (!validateLine(line)) {
      console.warn("Line is invalid", line);
      return;
    }
    const lineParsed = parseLine(line);
    const { path, ip } = lineParsed;
    if (!internalPathStats[path])
      internalPathStats[path] = { ips: new Set(), visitsTotal: 0 };
    internalPathStats[path].ips.add(ip);
    internalPathStats[path].visitsTotal += 1;
  });
  return internalPathStats;
};

export const getInternalPathStats = async (file: File): Promise<InternalPathStats> => {
  const fileContents: string = await readUploadedFileAsText(file);
  const lines = splitByLines(fileContents);
  const internalPathStats = parseInternalPathStats(lines);
  return internalPathStats;
};
