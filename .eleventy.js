module.exports = function (config) {
  return {
    dir: {
      input: "src",
    },
    passthroughFileCopy: true,
    templateFormats: ["html", "liquid", "md"],
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
  };
};
