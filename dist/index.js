"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_app["default"].listen(_app["default"].get('port'), function () {
  // eslint-disable-next-line no-console
  console.log("\n Servidor Listo en el puerto: ".concat(_app["default"].get('port')));
});