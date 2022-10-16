class GenerateSitemapCommand {
  constructor(generateSitemapService) {
    this.generateSitemapService = generateSitemapService;
  }

  execute(sitemapFileName, domain) {
    return this.generateSitemapService.execute(sitemapFileName, domain);
  }
}

module.exports = {
  GenerateSitemapCommand
}