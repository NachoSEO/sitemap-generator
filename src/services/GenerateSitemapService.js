class GenerateSitemapService {
  constructor(fileRepository) {
    this.fileRepository = fileRepository;
  }

  execute(sitemapFileName = 'sitemap', domain = 'example.com') {
    this.fileRepository.removeFilesFromDir('../data/output');
    const urls = this.fileRepository.readFile( '/../data/input/urls.txt');
    let sitemapData = urls.length > 50000 ? this._generateSitemapsXmlInBulkData(urls, sitemapFileName, domain) : this._generateSitemapXmlData(urls, sitemapFileName);
    if(!Array.isArray(sitemapData)) {
      sitemapData = [ sitemapData ];
    }
    sitemapData.forEach(({sitemapName, sitemapData}) => {
      this.fileRepository.writeFile(`../data/output/${sitemapName}`, sitemapData)
    })

    return;
  }

  _generateSitemapsXmlInBulkData(urls, sitemapFileName, domain) {
    const chunkUrls = this._chunk(urls, 50000);
    const sitemapsArr = chunkUrls.map((urls, index) => this._generateSitemapXmlData(urls, `${sitemapFileName}-${index}`));
    sitemapsArr.unshift(this._generateSitemapIndexData(domain, sitemapFileName, sitemapsArr))
    
    return sitemapsArr;
  }

  _generateSitemapIndexData(domain, sitemapFileName, sitemapsArr) {
    const sitemapsPathArr = sitemapsArr.map(({ sitemapName }) => `https://${domain}/${sitemapName}`);
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

}



module.exports = {
  GenerateSitemapService
}