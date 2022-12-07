const isCd = (input: string): boolean => input.includes("$ cd");
const cdValue = (input: string) => input.replace("$ cd ", "").trim();
const isLS = (input: string): boolean => input.includes("$ ls");

interface File {
  fileName: string;
  fileSize: number;
}

interface FileTree {
  [key: string]: File[];
}

const buildFlattenedFileTree = (input: string): FileTree => {
  let activeDirectory = "";
  const files: FileTree = {};
  const lines = input.split(/\n/);

  for (const line of lines) {
    if (isCd(line)) {
      const value = cdValue(line);
      if (value === "/") {
        activeDirectory = "/";
      } else if (value === "..") {
        const higherDirectory = activeDirectory.slice(0, activeDirectory.lastIndexOf("/"));
        activeDirectory = higherDirectory.length ? higherDirectory : "/";
      } else if (activeDirectory === "/") {
        activeDirectory += value;
      } else {
        activeDirectory += "/" + value;
      }
      if (!files[activeDirectory]) {
        files[activeDirectory] = [];
      }
      continue;
    }

    const [fileSize, fileName] = line.split(" ");
    if (isLS(line) || fileSize === "dir") {
      continue;
    }
    if (files[activeDirectory].length) {
      files[activeDirectory] = [...files[activeDirectory], { fileName, fileSize: Number(fileSize) }];
    } else {
      files[activeDirectory] = [{ fileName, fileSize: Number(fileSize) }];
    }
  }
  return files;
};

const getDirectorySizes = (fileTree: FileTree): { folderName: string; totalSize: number }[] => {
  const individualFolderSize = Object.entries(fileTree).map(([folderName, files]) => {
    const folderSize = files.reduce((acc, { fileSize }) => acc + fileSize, 0);
    return { folderName, folderSize };
  });

  return Object.keys(fileTree).map((key) => {
    const nestedFolders = individualFolderSize.filter(({ folderName }) => folderName.startsWith(key));
    const totalSize = nestedFolders.reduce((acc, { folderSize }) => acc + folderSize, 0);

    return {
      folderName: key,
      totalSize,
    };
  });
};

export const getTotalDirectorySize = (input: string, maxSize = 100000): number => {
  return getDirectorySizes(buildFlattenedFileTree(input))
    .filter(({ totalSize }) => totalSize <= maxSize)
    .reduce((acc, { totalSize }) => acc + totalSize, 0);
};
