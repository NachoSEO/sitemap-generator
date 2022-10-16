# Sitemap generator
A NodeJS script to generate a sitemap.xml or several ones (with its sitemap index also) if the input is greater than 50.000 URLs.

## Requirements
* NodeJS installed
* Npm or Yarn to run the script (no dependencies)

## How to generate a sitemap.xml?
1. Add your URLs in `./src/data/input/urls.txt`
2. Execute the script in the command line `$ yarn run execute SITEMAP_NAME DOMAIN`(i.e. `yarn run execute sitemap-blog seohacks.es`)
3. Done!

The output will be under the path: `./src/data/output`

## Additional note
* The first argumment after the script is the name of the sitemap(s) (every extra sitemap will be with a numerical increase)
* The second argumment is your domain (example.es) in order to create the correct path for the sitenap index (if applies)

If your list of URLs is superior than 50.000, the script will create several sitemaps (once per 50.000 URLs). Also it will create the sitemap index linking to those sitemaps, maybe you'll need to update the path in the sitemap index.