/*
  After specifying the output folder for the Typescript compiler it was noted that the compiler does not copy
  the accompany html & css files into the output folder(s). This utility program creates a folder structure similar to
  the one Typescript would have created and copies the html and css files into the relevant folder.
 */

const fs = require('fs');
const chokidar = require('chokidar');

const watcher = chokidar.watch('src/app');

/**
 * Gets paths of files in a directory
 *
 * @param directory  path to the current directory
 * @returns {Array}  list of paths to files in the directory
 */
function getFilePaths(directory) {
  const filePaths = [];

  fs.readdirSync(directory)
    .forEach((fileInDirectory) => {
      const extension = fileInDirectory.split('.').pop();
      if (extension === 'html' || extension === 'css') {
        const pathToFile = directory + fileInDirectory;
        filePaths.push(pathToFile);
      }});
  return filePaths;
}

/**
 * Gets paths of child directories
 * @param rootDir       path to directory
 * @returns {string[]}  paths of child directories
 */
function getDirPaths(rootDir) {
  return fs.readdirSync(rootDir)
    .filter((childDir) => {
      const path = rootDir + childDir;

      const isDir = fs.lstatSync(path).isDirectory();
      if (isDir) return path;
    })
}

let paths = [];

/**
 * Gets paths to all hmtl & css files in the root directory and child directories recursively.
 *
 * @param rootDir path to the root directory.
 */
function getPaths(rootDir) {
  const files = getFilePaths(rootDir);
  const dirs = getDirPaths(rootDir);

  const hasFiles = files.length > 1;
  const hasDirs = dirs.length > 1;

  if (hasFiles) {
    paths = paths.concat(files);
  }

  if (hasDirs) {
    dirs.forEach((directory) => {
      const newPath = rootDir + directory + '/';
      getPaths(newPath)
    })
  }
}

/*
  Typescript creates a similar folder structure as this function. The reason why we have to manually create these folders
  is that this script is run before typescript has compiled. We need these folders to copy html and css files into.
 */
function createDirs() {
  const src = 'src/app/';
  const compilerOutput = 'src/compiler-output';

  getPaths(src);

  if (!fs.existsSync(compilerOutput)){
    fs.mkdirSync(compilerOutput);
  }

  paths.forEach((path) => {
    const dest = path.replace('src/app/', 'src/compiler-output/app/');
    let dir = dest.split('/');
    dir.pop();
    dir = dir.join('/');

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
  })
}

/*
  The challenge with specifying the output folder for the typescript compiler is that Typescript does not output
  the companion html and css files into these folders as well. So we have to copy these files into the directories
  Typescript outputs to.
 */
function copyFiles() {
  paths.forEach((path) => {
    const dest = path.replace('src/app/', 'src/compiler-output/app/');

    fs.copyFileSync(path, dest);
    })
}

createDirs();
copyFiles();

// Watches for changes and copies the css & html files
function watch() {
  watcher
    .on('add', () => copyFiles())
    .on('change', () => copyFiles());
}

watch();

