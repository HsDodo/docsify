module.exports = {
  contents: ["go基础/README.md","go并发/README.md","Go微服务/README.md","MySql八股/README.md"], // array of "table of contents" files path
  pathToPublic: "component_codec.pdf", // path where pdf will stored
  pdfOptions: "{width: 100}", // reference: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
  removeTemp: true, // remove generated .md and .html or not
  emulateMedia: "screen" // mediaType, emulating by puppeteer for rendering pdf, 'print' by default (reference: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pageemulatemediamediatype)
};