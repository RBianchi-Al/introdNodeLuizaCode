"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _ = require('./'); var _2 = _interopRequireDefault(_);
const PORT = process.env.PORT || 5555;

_2.default.listen(PORT, console.log("Server is running 🚀"));
