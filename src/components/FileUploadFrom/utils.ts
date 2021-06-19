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

export const parseLine = (line: string): Line => {
  const lineContent = line.split(" ");
  return { path: lineContent[0], ip: lineContent[1] };
};

export const mapToPathStats = (internalPathStats: InternalPathStats) => {
  return Object.keys(internalPathStats).map((path) => ({
    path,
    totalViews: internalPathStats[path].visitsTotal,
    uniqueViews: internalPathStats[path].ips.size,
  }));
};

export const getPathStats = async (file: File): Promise<PathStats[]> => {
  const result: InternalPathStats = {};
  const fileContents: string = await readUploadedFileAsText(file);
  const lines = splitByLines(fileContents);
  lines.forEach((line) => {
    if (line === "") return;
    const lineParsed = parseLine(line);
    const { path, ip } = lineParsed;
    if (result[path]) {
      result[path].ips.add(ip);
      result[path].visitsTotal += 1;
    } else {
      result[path] = { ips: new Set(), visitsTotal: 1 };
      result[path].ips.add(ip);
    }
  });
  return mapToPathStats(result);
};
