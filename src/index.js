const { generateSitemapCommand } = require('./providers/providers.js');

const [,, sitemapFileName] = process.argv;

generateSitemapCommand.execute(sitemapFileName);
