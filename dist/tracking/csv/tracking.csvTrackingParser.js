'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.CsvTrackingParser = undefined;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _bluebird = require('bluebird');var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _csvtojson = require('csvtojson');var _csvtojson2 = _interopRequireDefault(_csvtojson);
var _slack = require('../../util/slack');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

CsvTrackingParser = exports.CsvTrackingParser = function () {
  function CsvTrackingParser() {(0, _classCallCheck3.default)(this, CsvTrackingParser);
    this.parser = (0, _csvtojson2.default)({ delimiter: ';', trim: true, quote: 'off' });
  }(0, _createClass3.default)(CsvTrackingParser, [{ key: 'parseString', value: function () {var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee(

      str) {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (0, _bluebird.resolve)(
                this.parser.fromString(str));case 2:this.parsedCsv = _context.sent;case 3:case 'end':return _context.stop();}}}, _callee, this);}));function parseString(_x) {return _ref.apply(this, arguments);}return parseString;}() }, { key: 'getTrackingInfos', value: function getTrackingInfos()


    {
      var trackingInfos = [];
      this.parsedCsv.forEach(function (trackingInfo) {
        try {
          var shopifyOrderId = typeof trackingInfo.Durchreichefeld === 'string' ?
          trackingInfo.Durchreichefeld.replace('shopifyOrderId:', '') : trackingInfo.Durchreichefeld;

          trackingInfos.push({
            shopifyOrderId: shopifyOrderId,
            trackingUrl: trackingInfo.Sendungsverfolgung || null,
            trackingNumber: trackingInfo.PaketNr });

        } catch (err) {
          _slack.slack.warn('### Error ###\nmessage: ' + err.message + ';\nstack: ' + err.stack);
        }
      });
      return trackingInfos;
    } }]);return CsvTrackingParser;}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90cmFja2luZy9jc3YvdHJhY2tpbmcuY3N2VHJhY2tpbmdQYXJzZXIuanMiXSwibmFtZXMiOlsiQ3N2VHJhY2tpbmdQYXJzZXIiLCJwYXJzZXIiLCJkZWxpbWl0ZXIiLCJ0cmltIiwicXVvdGUiLCJzdHIiLCJmcm9tU3RyaW5nIiwicGFyc2VkQ3N2IiwidHJhY2tpbmdJbmZvcyIsImZvckVhY2giLCJ0cmFja2luZ0luZm8iLCJzaG9waWZ5T3JkZXJJZCIsIkR1cmNocmVpY2hlZmVsZCIsInJlcGxhY2UiLCJwdXNoIiwidHJhY2tpbmdVcmwiLCJTZW5kdW5nc3ZlcmZvbGd1bmciLCJ0cmFja2luZ051bWJlciIsIlBha2V0TnIiLCJlcnIiLCJzbGFjayIsIndhcm4iLCJtZXNzYWdlIiwic3RhY2siXSwibWFwcGluZ3MiOiJ3Z0JBQUEsc0M7QUFDQSx5Qzs7QUFFYUEsaUIsV0FBQUEsaUI7QUFDWCwrQkFBYztBQUNaLFNBQUtDLE1BQUwsR0FBYyx5QkFBVSxFQUFFQyxXQUFXLEdBQWIsRUFBa0JDLE1BQU0sSUFBeEIsRUFBOEJDLE9BQU8sS0FBckMsRUFBVixDQUFkO0FBQ0QsRzs7QUFFaUJDLFM7QUFDTyxxQkFBS0osTUFBTCxDQUFZSyxVQUFaLENBQXVCRCxHQUF2QixDLFNBQXZCLEtBQUtFLFM7OztBQUdZO0FBQ2pCLFVBQU1DLGdCQUFnQixFQUF0QjtBQUNBLFdBQUtELFNBQUwsQ0FBZUUsT0FBZixDQUF1QixVQUFDQyxZQUFELEVBQWtCO0FBQ3ZDLFlBQUk7QUFDRixjQUFNQyxpQkFBaUIsT0FBT0QsYUFBYUUsZUFBcEIsS0FBd0MsUUFBeEM7QUFDckJGLHVCQUFhRSxlQUFiLENBQTZCQyxPQUE3QixDQUFxQyxpQkFBckMsRUFBd0QsRUFBeEQsQ0FEcUIsR0FDeUNILGFBQWFFLGVBRDdFOztBQUdBSix3QkFBY00sSUFBZCxDQUFtQjtBQUNqQkgsMENBRGlCO0FBRWpCSSx5QkFBYUwsYUFBYU0sa0JBQWIsSUFBbUMsSUFGL0I7QUFHakJDLDRCQUFnQlAsYUFBYVEsT0FIWixFQUFuQjs7QUFLRCxTQVRELENBU0UsT0FBT0MsR0FBUCxFQUFZO0FBQ1pDLHVCQUFNQyxJQUFOLDhCQUFzQ0YsSUFBSUcsT0FBMUMsa0JBQThESCxJQUFJSSxLQUFsRTtBQUNEO0FBQ0YsT0FiRDtBQWNBLGFBQU9mLGFBQVA7QUFDRCxLIiwiZmlsZSI6InRyYWNraW5nLmNzdlRyYWNraW5nUGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNzdnRvanNvbiBmcm9tICdjc3Z0b2pzb24nO1xuaW1wb3J0IHsgc2xhY2sgfSBmcm9tICcuLi8uLi91dGlsL3NsYWNrJztcblxuZXhwb3J0IGNsYXNzIENzdlRyYWNraW5nUGFyc2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBjc3Z0b2pzb24oeyBkZWxpbWl0ZXI6ICc7JywgdHJpbTogdHJ1ZSwgcXVvdGU6ICdvZmYnIH0pO1xuICB9XG5cbiAgYXN5bmMgcGFyc2VTdHJpbmcoc3RyKSB7XG4gICAgdGhpcy5wYXJzZWRDc3YgPSBhd2FpdCB0aGlzLnBhcnNlci5mcm9tU3RyaW5nKHN0cik7XG4gIH1cblxuICBnZXRUcmFja2luZ0luZm9zKCkge1xuICAgIGNvbnN0IHRyYWNraW5nSW5mb3MgPSBbXTtcbiAgICB0aGlzLnBhcnNlZENzdi5mb3JFYWNoKCh0cmFja2luZ0luZm8pID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHNob3BpZnlPcmRlcklkID0gdHlwZW9mIHRyYWNraW5nSW5mby5EdXJjaHJlaWNoZWZlbGQgPT09ICdzdHJpbmcnID9cbiAgICAgICAgICB0cmFja2luZ0luZm8uRHVyY2hyZWljaGVmZWxkLnJlcGxhY2UoJ3Nob3BpZnlPcmRlcklkOicsICcnKSA6IHRyYWNraW5nSW5mby5EdXJjaHJlaWNoZWZlbGQ7XG5cbiAgICAgICAgdHJhY2tpbmdJbmZvcy5wdXNoKHtcbiAgICAgICAgICBzaG9waWZ5T3JkZXJJZCxcbiAgICAgICAgICB0cmFja2luZ1VybDogdHJhY2tpbmdJbmZvLlNlbmR1bmdzdmVyZm9sZ3VuZyB8fCBudWxsLFxuICAgICAgICAgIHRyYWNraW5nTnVtYmVyOiB0cmFja2luZ0luZm8uUGFrZXROcixcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgc2xhY2sud2FybihgIyMjIEVycm9yICMjI1xcbm1lc3NhZ2U6ICR7ZXJyLm1lc3NhZ2V9O1xcbnN0YWNrOiAke2Vyci5zdGFja31gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdHJhY2tpbmdJbmZvcztcbiAgfVxufVxuIl19