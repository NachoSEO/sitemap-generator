const fs = require('fs');
const path = require('path');

const { FileRepository } = require('../repositories/FileRepository');

const { GenerateSitemapService } = require('../services/GenerateSitemapService');

const { GenerateSitemapCommand } = require('../commands/GenerateSitemapCommand')

const generateSitemapCommand = new GenerateSitemapCommand(
  new GenerateSitemapService(new FileRepository(fs, path), path)
);

module.exports = {
  generateSitemapCommand
}