const htmlmin = require('html-minifier');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

module.exports = function (config) {

	config.addPlugin(lazyImagesPlugin, {
		transformImgPath: (imgPath) => {
			if (imgPath.startsWith('/assets/imgs') && !imgPath.startsWith('//')) {
				return `./src${imgPath}`;
			}

			return imgPath;
		},
	});

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

	config.addPassthroughCopy('src/assets/imgs');
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
