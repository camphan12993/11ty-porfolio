module.exports = function (config) {
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
