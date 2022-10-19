class GenerateSitemapService {
  constructor(fileRepository) {
    this.fileRepository = fileRepository;
  }

  execute(sitemapFileName = 'sitemap') {
    this.fileRepository.emptyDir('../data/output');
    this.fileRepository.writeFile('../data/output/.gitkeep', '')
    const urlsRaw = this.fileRepository.readFile('/../data/input/urls.txt');
    const urls = urlsRaw.filter(Boolean);
    const tlds = this._getTlds(urls);
    const tldsObj = this._createObjFromArray(tlds);
    this._classifyUrlsByTld(urls, tldsObj);
    Object.entries(tldsObj).forEach(([tld, urls]) => {
      let sitemapData = urls.length > 50000 ? this._generateSitemapsXmlInBulkData(urls, sitemapFileName, tld) : this._generateSitemapXmlData(urls, sitemapFileName, tld);
      if (!Array.isArray(sitemapData)) {
        sitemapData = [sitemapData];
      }
      sitemapData.forEach(({ sitemapName, sitemapData }) => {
        this.fileRepository.createDir(`../data/output/${tld}`);
        this.fileRepository.writeFile(`../data/output/${tld}/${sitemapName}`, sitemapData)
      })
    })

    return;
  }

  _generateSitemapsXmlInBulkData(urls, sitemapFileName, tld) {
    const chunkUrls = this._chunk(urls, 50000);
    const sitemapsArr = chunkUrls.map((urls, index) => this._generateSitemapXmlData(urls, `${sitemapFileName}-${index}`));
    sitemapsArr.unshift(this._generateSitemapIndexData(tld, sitemapFileName, sitemapsArr))

    return sitemapsArr;
  }

  _generateSitemapIndexData(tld, sitemapFileName, sitemapsArr) {
    const sitemapsPathArr = sitemapsArr.map(({ sitemapName }) => `https://www.${tld}/${sitemapName}`);
    const head = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
    const tail = `</sitemapindex>`
    const sitemapIndexBody = sitemapsPathArr.map(sitemapUrl => `\t<sitemap>\n\t\t<loc>${sitemapUrl}</loc>\n\t</sitemap>`).join('\n');

    return {
      sitemapName: `${sitemapFileName}-index.xml`,
      sitemapData: `${head}\n${sitemapIndexBody}\n${tail}`

    }
  }

  _generateSitemapXmlData(urls, sitemapFileName) {
    const head = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
    const tail = `</urlset>`;
    const sitemapBody = urls.map(url => `\t<url>\n\t\t<loc>${url}</loc>\n\t</url>`).join('\n');

    return {
      sitemapName: `${sitemapFileName}.xml`,
      sitemapData: `${head}\n${sitemapBody}\n${tail}`
    };
  }

  _chunk = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);

  _getTlds(urls) {
    const domains = urls.map(url => {
      return new URL(url).host.match('')[0] // modify this regex to classify the urls in directories
    })

    return [...new Set(domains)]
  }

  _createObjFromArray(arr) {
    return arr.reduce((accumulator, value) => {
      return { ...accumulator, [value]: [] };
    }, {});
  }

  _classifyUrlsByTld(urls, tldsObj) {
    urls.forEach(url => {
      Object.keys(tldsObj).forEach(tld => {
        if (url.includes(`${tld}/`)) {
          tldsObj[tld].push(url);
        }
      })
    })
  }

}



module.exports = {
  GenerateSitemapService
}