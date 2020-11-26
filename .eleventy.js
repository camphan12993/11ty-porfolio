const htmlmin = require('html-minifier');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

module.exports = function (config) {
	config.addPassthroughCopy('android-chrome-192x192.png');
	config.addPassthroughCopy('android-chrome-512x512.png');
	config.addPassthroughCopy('apple-touch-icon.png');
	config.addPassthroughCopy('favicon-16x16.png');
	config.addPassthroughCopy('favicon-32x32.png');
	config.addPassthroughCopy('favicon.ico');
	config.addPassthroughCopy('src/assets/imgs');

	// html minify
	if (process.env.NODE_ENV == 'production') {
		config.addTransform('htmlmin', function (content, outputPath) {
			if (outputPath.endsWith('.html')) {
				let minified = htmlmin.minify(content, {
					useShortDoctype: true,
					removeComments: true,
					collapseWhitespace: true,
					minifyjs: { quote_style: 1 },
					preventAttributesEscaping: true,
					quoteCharacter: "'",
				});
				return minified;
			}

			return content;
		});
	}

	return {
		dir: {
			input: 'src',
		},
		passthroughFileCopy: true,
		templateFormats: ['html', 'liquid', 'md'],
		htmlTemplateEngine: 'liquid',
		markdownTemplateEngine: 'liquid',
	};
};
