const fs = require('fs');

function getFiles(directory) {
    const files = [];
    fs.readdirSync(directory)
      .forEach((file) => {
          const extension = file.split('.').pop();
          if (extension === 'html' || extension === 'css') {
              const pathToFile = directory + file;
              files.push(pathToFile);
          }});
    return files;
}

function getDirs(directory) {
  return fs.readdirSync(directory)
    .filter((file) => {
      const extension = file.split('.').pop();

      if (extension !== 'html' && extension !== 'css' && extension !== 'ts' && extension !== 'js' && extension !== 'map') return file;
    })
}

let paths = [];

function getPaths(rootDir) {

    const hasFiles = getFiles(rootDir).length > 1;
    const hasDirs = getDirs(rootDir).length > 1;

    if (hasFiles) {
       paths = paths.concat(getFiles(rootDir));
    }

    if (hasDirs) {
        const directories = getDirs(rootDir);

        directories.forEach((directory) => {
            const newPath = rootDir + directory + '/';
            getPaths(newPath)
        })
    }

}

function copyFiles() {
    const src = 'src/app/';
    getPaths(src);

    paths.forEach((path) => {
        const dest = path.replace('src/app/', 'src/compiler-output/app/');
        fs.copyFileSync(path, dest)
    })
}

copyFiles();

