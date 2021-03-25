"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.array.join.js");

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _path = _interopRequireDefault(require("path"));

require("./config");

var _indexRouter = _interopRequireDefault(require("./routes/index-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.set('port', process.env.PORT || 3000);
app.use((0, _morgan["default"])('dev'));
app.use((0, _helmet["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_indexRouter["default"]);
var _default = app;
exports["default"] = _default;