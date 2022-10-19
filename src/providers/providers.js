const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const { FileRepository } = require('../repositories/FileRepository');

const { GenerateSitemapService } = require('../services/GenerateSitemapService');

const { GenerateSitemapCommand } = require('../commands/GenerateSitemapCommand')

const generateSitemapCommand = new GenerateSitemapCommand(
  new GenerateSitemapService(new FileRepository(fs, path, fsExtra), path)
);

module.exports = {
  generateSitemapCommand
}