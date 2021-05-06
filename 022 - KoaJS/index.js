const koa = require("koa")
const path = require("path")
const render = require("koa-ejs")
const koaRouter = require("koa-router")
const axios = require("axios")

const app = new koa();
const router = new koaRouter();

render (app, {
    root: path.join(__dirname, "views"),
    layout: "index",
    viewExt: "html",
});





app.listen(3000);