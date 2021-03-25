"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var router = (0, _express.Router)();
router.get('/', function (_req, res) {
  res.status(200).json({
    hola: 'mundo'
  });
});
var _default = router;
exports["default"] = _default;