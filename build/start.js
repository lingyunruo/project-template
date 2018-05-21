const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const webpackConfig = require('./webpack.config');

const cheerio = require('cheerio');



const entryHtml = webpackConfig.entry;
const outputPath = webpackConfig.output.path;
const baseDir = path.join(__dirname, '../src');
const commonDir = path.join(__dirname, '../src/common');

const htmlConfig = {
	'candidate-list': path.join(__dirname, '../src/candidate-list/page/index.html'),
	'candidate-detail': path.join(__dirname, '../src/candidate-detail/page/index.html')
};

const compiler = webpack(webpackConfig);

compiler.watch({
	aggregateTimeout: 300,
	poll: undefined
}, () => {
	console.log('===');
	Object.keys(htmlConfig).map((key) => {

		let targetDir = path.join(outputPath, key);
		let entryJs = {};
		let sourceHtmlPath = htmlConfig[key];
		let sourceHtmlDir = path.dirname(sourceHtmlPath);
		let currentPageConfig = {...webpackConfig};

		try {
			let htmlContent = fs.readFileSync(sourceHtmlPath, {encoding: 'utf-8'}).toString();

			let $ = cheerio.load(htmlContent);

			let targetFileList = fs.readdirSync(targetDir);

			targetFileList.map((subfile) => {
				let extname = path.extname(subfile);

				if(extname === '.js') {
					let jsSrc = webpackConfig.output.publicPath + '/' + path.join(key, subfile);
					$('script').eq(0).attr('src', jsSrc);
				}
				else if(extname === '.css') {
					$('head').append(`<link rel="stylesheet" type="text/css" href="${webpackConfig.output.publicPath}/${path.join(key, subfile)}" />`);
				}
			});

			// 此处合并通用的模版等
			mergeTpl($);
			fs.writeFileSync(path.join(targetDir, path.basename(sourceHtmlPath)), $.html());
		}
		catch(e) {
			if(e) {
				console.log(e);
			}
		}
	});
});




function mergeTpl($) {
	let vendorScript = `<script src="${webpackConfig.output.publicPath}/${path.join('common/javascript/vendor.dll.js')}"></script>`;

	$('script').eq(0).before(vendorScript);
}
