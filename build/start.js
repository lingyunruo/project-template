const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

// 开发版本的配置文件
const webpackDevConfig = require('./webpack.dev.config');
// 上线版本的配置文件
const webpackProdConfig = require('./webapck.pro.config');

const cheerio = require('cheerio');


// 公用的需要合并进body的文本
const commonTpl = require('./template');

// 配置入口js和对应的html地址
const htmlConfig = {
	'candidate-list/index.js': path.join(__dirname, '../src/candidate-list/page/index.html')
};

// 此处判断使用哪个版本的配置文件
let webpackConfig = webpackDevConfig;
if(process.env.NODE_ENV === 'prod') {
	webpackConfig = webpackProdConfig;
}

// 编译
const compiler = webpack(webpackConfig);



if(process.env.NODE_ENV === 'prod') {
	compiler.run(handleCallback);
}
else {
	compiler.watch({
		aggregateTimeout: 300,
		poll: undefined,
		progress: true,
		'info-verbosity': 'verbose'
	}, handleCallback);
}

// 保存当前编译的hash值
let currentWatchHash = '';


function handleCallback(err, stat) {

	if(err) {
		console.error(err.info);
	}
	if(stat.compilation.errors.length > 0) {
		console.error(stat.compilation.errors.join('\n'));
	}

	if(currentWatchHash !== stat.compilation.hash) {

		currentWatchHash = stat.compilation.hash;

		// 遍历html的地址
		Object.keys(htmlConfig).map((key) => {

			// 拿到当前入口的js的目录
			let targetDir = path.dirname(path.join(webpackConfig.output.path, key));
			let sourceHtmlPath = htmlConfig[key];

			try {
				// 读取html内容
				let htmlContent = fs.readFileSync(sourceHtmlPath, {encoding: 'utf-8'}).toString();
				let $ = cheerio.load(htmlContent);
				// 读取目录下的所有文件
				let targetFileList = fs.readdirSync(targetDir);

				targetFileList.map((subfile) => {
					let extname = path.extname(subfile);

					// 找到目录下的js文件
					if (extname === '.js') {
						let jsSrc = webpackConfig.output.publicPath + '/' + path.join(path.dirname(key), subfile);
						// 拿到页面里的所有script标签，对应入口文件的script换成目录下的js文件名
						$('script').map((index, ele) => {
							let currentScript = $(ele);
							if(currentScript.attr('src') === key) {
								$(ele).attr('src', jsSrc);
							}
						})
					}
					else if (extname === '.css') {
						$('head').append(`<link rel="stylesheet" type="text/css" href="${webpackConfig.output.publicPath}/${path.join(path.dirname(key), subfile)}" />`);
					}
				});

				// 此处合并通用的模版等
				mergeTpl($);
				fs.writeFileSync(path.join(targetDir, path.basename(sourceHtmlPath)), $.html());
				console.log('compiled');
			}
			catch (e) {
				if (e) {
					console.log(e);
				}
			}
		});
	}
}


// 此处函数
function mergeTpl($) {
	let vendorScript = `${commonTpl}<script src="${webpackConfig.output.publicPath}/${path.join('common/javascript/vendor.dll.js')}"></script>`;

	$('script').eq(0).before(vendorScript);
}
