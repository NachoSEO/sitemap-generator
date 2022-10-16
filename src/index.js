const { generateSitemapCommand } = require('./providers/providers.js');

const [,, sitemapFileName,domain] = process.argv;

generateSitemapCommand.execute(sitemapFileName, domain);
