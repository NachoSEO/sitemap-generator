class FileRepository {
  constructor(fs, path) {
    this.fs = fs;
    this.path = path;
  }

  readFile(filePath) {
    const data = this.fs.readFileSync(this.path.join(__dirname, filePath) ,'utf8');
    return data.split('\n')
  }

  writeFile(filePath, data) {
    return this.fs.writeFileSync(this.path.join(__dirname, filePath), data)
  }
  
  removeFilesFromDir(dirPath) {
    this.fs.readdir(this.path.join(__dirname, dirPath), (err, files) => {
      if (err) throw err;
    
      for (const file of files) {
        this.fs.unlink(this.path.join(__dirname, dirPath, file), (err) => {
          if (err) throw err;
        });
      }
    });
  }
}

module.exports = {
  FileRepository
}