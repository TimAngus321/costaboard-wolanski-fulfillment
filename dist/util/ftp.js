'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.WolanskiFtp = undefined;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _bluebird = require('bluebird');var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _basicFtp = require('basic-ftp');var _basicFtp2 = _interopRequireDefault(_basicFtp);
var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

WolanskiFtp = exports.WolanskiFtp = function () {
  function WolanskiFtp()




  {var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.env.WOLANSKI_FTP_HOST;var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.env.WOLANSKI_FTP_PORT;var user = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : process.env.WOLANSKI_FTP_USER;var pw = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : process.env.WOLANSKI_FTP_PW;(0, _classCallCheck3.default)(this, WolanskiFtp);
    this.host = host;
    this.port = port;
    this.user = user;
    this.pw = pw;

    // basicFtp doesn't allow Let's Encrypt certificates which Wolanski uses
    this.rejectUnauthorized = false;
    this.ftp = new _basicFtp2.default.Client();
  }(0, _createClass3.default)(WolanskiFtp, [{ key: 'connect', value: function () {var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {var serverMessage;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (0, _bluebird.resolve)(


                this.ftp.access({
                  host: this.host,
                  port: Number.parseInt(this.port, 10),
                  user: this.user,
                  password: this.pw,
                  secure: true,
                  secureOptions: { rejectUnauthorized: this.rejectUnauthorized } }));case 2:serverMessage = _context.sent;return _context.abrupt('return',

                serverMessage);case 4:case 'end':return _context.stop();}}}, _callee, this);}));function connect() {return _ref.apply(this, arguments);}return connect;}() }, { key: 'uploadFile', value: function uploadFile(


    diskFilePath, ftpFilePath) {
      var fileStream = _fs2.default.createReadStream(diskFilePath);
      return this.ftp.upload(fileStream, ftpFilePath);
    } }, { key: 'downloadFile', value: function downloadFile(

    diskFilePath, ftpFilePath) {
      var fileStream = _fs2.default.createWriteStream(diskFilePath);
      return this.ftp.download(fileStream, ftpFilePath);
    } }, { key: 'fileExists', value: function () {var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(

      folder, filename) {var files;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (0, _bluebird.resolve)(
                this.ftp.cd(folder));case 2:_context2.next = 4;return (0, _bluebird.resolve)(
                this.ftp.list());case 4:files = _context2.sent;return _context2.abrupt('return',
                !!files.find(function (fileInfo) {return fileInfo.name === filename;}));case 6:case 'end':return _context2.stop();}}}, _callee2, this);}));function fileExists(_x5, _x6) {return _ref2.apply(this, arguments);}return fileExists;}() }, { key: 'disconnect', value: function disconnect()


    {
      return this.ftp.close();
    } }]);return WolanskiFtp;}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2Z0cC5qcyJdLCJuYW1lcyI6WyJXb2xhbnNraUZ0cCIsImhvc3QiLCJwcm9jZXNzIiwiZW52IiwiV09MQU5TS0lfRlRQX0hPU1QiLCJwb3J0IiwiV09MQU5TS0lfRlRQX1BPUlQiLCJ1c2VyIiwiV09MQU5TS0lfRlRQX1VTRVIiLCJwdyIsIldPTEFOU0tJX0ZUUF9QVyIsInJlamVjdFVuYXV0aG9yaXplZCIsImZ0cCIsImJhc2ljRnRwIiwiQ2xpZW50IiwiYWNjZXNzIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJwYXNzd29yZCIsInNlY3VyZSIsInNlY3VyZU9wdGlvbnMiLCJzZXJ2ZXJNZXNzYWdlIiwiZGlza0ZpbGVQYXRoIiwiZnRwRmlsZVBhdGgiLCJmaWxlU3RyZWFtIiwiZnMiLCJjcmVhdGVSZWFkU3RyZWFtIiwidXBsb2FkIiwiY3JlYXRlV3JpdGVTdHJlYW0iLCJkb3dubG9hZCIsImZvbGRlciIsImZpbGVuYW1lIiwiY2QiLCJsaXN0IiwiZmlsZXMiLCJmaW5kIiwiZmlsZUluZm8iLCJuYW1lIiwiY2xvc2UiXSwibWFwcGluZ3MiOiJrZ0JBQUEscUM7QUFDQSx3Qjs7QUFFYUEsVyxXQUFBQSxXO0FBQ1g7Ozs7O0FBS0UsT0FKQUMsSUFJQSx1RUFKT0MsUUFBUUMsR0FBUixDQUFZQyxpQkFJbkIsS0FIQUMsSUFHQSx1RUFIT0gsUUFBUUMsR0FBUixDQUFZRyxpQkFHbkIsS0FGQUMsSUFFQSx1RUFGT0wsUUFBUUMsR0FBUixDQUFZSyxpQkFFbkIsS0FEQUMsRUFDQSx1RUFES1AsUUFBUUMsR0FBUixDQUFZTyxlQUNqQjtBQUNBLFNBQUtULElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtJLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtFLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtFLEVBQUwsR0FBVUEsRUFBVjs7QUFFQTtBQUNBLFNBQUtFLGtCQUFMLEdBQTBCLEtBQTFCO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLElBQUlDLG1CQUFTQyxNQUFiLEVBQVg7QUFDRCxHOzs7QUFHNkIscUJBQUtGLEdBQUwsQ0FBU0csTUFBVCxDQUFnQjtBQUMxQ2Qsd0JBQU0sS0FBS0EsSUFEK0I7QUFFMUNJLHdCQUFNVyxPQUFPQyxRQUFQLENBQWdCLEtBQUtaLElBQXJCLEVBQTJCLEVBQTNCLENBRm9DO0FBRzFDRSx3QkFBTSxLQUFLQSxJQUgrQjtBQUkxQ1csNEJBQVUsS0FBS1QsRUFKMkI7QUFLMUNVLDBCQUFRLElBTGtDO0FBTTFDQyxpQ0FBZSxFQUFFVCxvQkFBb0IsS0FBS0Esa0JBQTNCLEVBTjJCLEVBQWhCLEMsU0FBdEJVLGE7O0FBUUNBLDZCOzs7QUFHRUMsZ0IsRUFBY0MsVyxFQUFhO0FBQ3BDLFVBQU1DLGFBQWFDLGFBQUdDLGdCQUFILENBQW9CSixZQUFwQixDQUFuQjtBQUNBLGFBQU8sS0FBS1YsR0FBTCxDQUFTZSxNQUFULENBQWdCSCxVQUFoQixFQUE0QkQsV0FBNUIsQ0FBUDtBQUNELEs7O0FBRVlELGdCLEVBQWNDLFcsRUFBYTtBQUN0QyxVQUFNQyxhQUFhQyxhQUFHRyxpQkFBSCxDQUFxQk4sWUFBckIsQ0FBbkI7QUFDQSxhQUFPLEtBQUtWLEdBQUwsQ0FBU2lCLFFBQVQsQ0FBa0JMLFVBQWxCLEVBQThCRCxXQUE5QixDQUFQO0FBQ0QsSzs7QUFFZ0JPLFksRUFBUUMsUTtBQUNqQixxQkFBS25CLEdBQUwsQ0FBU29CLEVBQVQsQ0FBWUYsTUFBWixDO0FBQ2MscUJBQUtsQixHQUFMLENBQVNxQixJQUFULEUsU0FBZEMsSztBQUNDLGlCQUFDLENBQUNBLE1BQU1DLElBQU4sQ0FBVyw0QkFBWUMsU0FBU0MsSUFBVCxLQUFrQk4sUUFBOUIsRUFBWCxDOzs7QUFHRTtBQUNYLGFBQU8sS0FBS25CLEdBQUwsQ0FBUzBCLEtBQVQsRUFBUDtBQUNELEsiLCJmaWxlIjoiZnRwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2ljRnRwIGZyb20gJ2Jhc2ljLWZ0cCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuXG5leHBvcnQgY2xhc3MgV29sYW5za2lGdHAge1xuICBjb25zdHJ1Y3RvcihcbiAgICBob3N0ID0gcHJvY2Vzcy5lbnYuV09MQU5TS0lfRlRQX0hPU1QsXG4gICAgcG9ydCA9IHByb2Nlc3MuZW52LldPTEFOU0tJX0ZUUF9QT1JULFxuICAgIHVzZXIgPSBwcm9jZXNzLmVudi5XT0xBTlNLSV9GVFBfVVNFUixcbiAgICBwdyA9IHByb2Nlc3MuZW52LldPTEFOU0tJX0ZUUF9QVyxcbiAgKSB7XG4gICAgdGhpcy5ob3N0ID0gaG9zdDtcbiAgICB0aGlzLnBvcnQgPSBwb3J0O1xuICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgdGhpcy5wdyA9IHB3O1xuXG4gICAgLy8gYmFzaWNGdHAgZG9lc24ndCBhbGxvdyBMZXQncyBFbmNyeXB0IGNlcnRpZmljYXRlcyB3aGljaCBXb2xhbnNraSB1c2VzXG4gICAgdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmZ0cCA9IG5ldyBiYXNpY0Z0cC5DbGllbnQoKTtcbiAgfVxuXG4gIGFzeW5jIGNvbm5lY3QoKSB7XG4gICAgY29uc3Qgc2VydmVyTWVzc2FnZSA9IGF3YWl0IHRoaXMuZnRwLmFjY2Vzcyh7XG4gICAgICBob3N0OiB0aGlzLmhvc3QsXG4gICAgICBwb3J0OiBOdW1iZXIucGFyc2VJbnQodGhpcy5wb3J0LCAxMCksXG4gICAgICB1c2VyOiB0aGlzLnVzZXIsXG4gICAgICBwYXNzd29yZDogdGhpcy5wdyxcbiAgICAgIHNlY3VyZTogdHJ1ZSxcbiAgICAgIHNlY3VyZU9wdGlvbnM6IHsgcmVqZWN0VW5hdXRob3JpemVkOiB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCB9LFxuICAgIH0pO1xuICAgIHJldHVybiBzZXJ2ZXJNZXNzYWdlO1xuICB9XG5cbiAgdXBsb2FkRmlsZShkaXNrRmlsZVBhdGgsIGZ0cEZpbGVQYXRoKSB7XG4gICAgY29uc3QgZmlsZVN0cmVhbSA9IGZzLmNyZWF0ZVJlYWRTdHJlYW0oZGlza0ZpbGVQYXRoKTtcbiAgICByZXR1cm4gdGhpcy5mdHAudXBsb2FkKGZpbGVTdHJlYW0sIGZ0cEZpbGVQYXRoKTtcbiAgfVxuXG4gIGRvd25sb2FkRmlsZShkaXNrRmlsZVBhdGgsIGZ0cEZpbGVQYXRoKSB7XG4gICAgY29uc3QgZmlsZVN0cmVhbSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGRpc2tGaWxlUGF0aCk7XG4gICAgcmV0dXJuIHRoaXMuZnRwLmRvd25sb2FkKGZpbGVTdHJlYW0sIGZ0cEZpbGVQYXRoKTtcbiAgfVxuXG4gIGFzeW5jIGZpbGVFeGlzdHMoZm9sZGVyLCBmaWxlbmFtZSkge1xuICAgIGF3YWl0IHRoaXMuZnRwLmNkKGZvbGRlcik7XG4gICAgY29uc3QgZmlsZXMgPSBhd2FpdCB0aGlzLmZ0cC5saXN0KCk7XG4gICAgcmV0dXJuICEhZmlsZXMuZmluZChmaWxlSW5mbyA9PiBmaWxlSW5mby5uYW1lID09PSBmaWxlbmFtZSk7XG4gIH1cblxuICBkaXNjb25uZWN0KCkge1xuICAgIHJldHVybiB0aGlzLmZ0cC5jbG9zZSgpO1xuICB9XG59XG4iXX0=