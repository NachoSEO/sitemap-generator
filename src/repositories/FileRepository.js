class FileRepository {
  constructor(fs, path, fsExtra) {
    this.fs = fs;
    this.path = path;
    this.fsExtra = fsExtra;
  }

  readFile(filePath) {
    const data = this.fs.readFileSync(this.path.join(__dirname, filePath), 'utf8');
    return data.split('\n')
  }

  writeFile(filePath, data) {
    return this.fs.writeFileSync(this.path.join(__dirname, filePath), data)
  }

  removeFilesFromDir(dirPath) {
    this.fs.readdirSync(this.path.join(__dirname, dirPath), (err, files) => {
      if (err) throw err;

      for (const file of files) {
        this.fs.unlink(this.path.join(__dirname, dirPath, file), (err) => {
          if (err) throw err;
        })
      }
    });
  }

  emptyDir(dirPath) {
    this.fsExtra.emptydirSync(this.path.join(__dirname, dirPath))
  }

  createDir(dirPath) {
    if (!this.fs.existsSync(this.path.join(__dirname, dirPath))) {
      this.fs.mkdirSync(this.path.join(__dirname, dirPath));
    }
  }
}

module.exports = {
  FileRepository
}