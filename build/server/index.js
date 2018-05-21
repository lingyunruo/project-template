const Koa = require('koa');

const app = new Koa();

const control = require('./control');
const router = require('./router');
const tpl = require('./render');

app.use(tpl());

app.use(router(control));

app.listen(9000);
