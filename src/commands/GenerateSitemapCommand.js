class GenerateSitemapCommand {
  constructor(generateSitemapService) {
    this.generateSitemapService = generateSitemapService;
  }

  execute(sitemapFileName) {
    return this.generateSitemapService.execute(sitemapFileName);
  }
}

module.exports = {
  GenerateSitemapCommand
}