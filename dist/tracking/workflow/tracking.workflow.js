'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.WorkflowTracking = undefined;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _bluebird = require('bluebird');var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);
var _slack = require('../../util/slack');
var _ftp = require('../../util/ftp');
var _orderUpload = require('../timeKeeper/orderUpload.timeKeeper');
var _timeHelper = require('../../util/timeHelper');
var _tracking = require('../csv/tracking.csvTrackingParser');
var _shopify = require('../../shopify');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

WorkflowTracking = exports.WorkflowTracking = function () {
  function WorkflowTracking() {(0, _classCallCheck3.default)(this, WorkflowTracking);
    this.csvFilePathOnDisk = WorkflowTracking.defaultCsvFilePath();
    this.trackingFileExistsOnFtp = false;
    this.trackingInfos = [];
    this.trackingTimeKeeper = new _orderUpload.TrackingTimeKeeper();
    this.shopify = new _shopify.Shopify();
    this.ftp = new _ftp.WolanskiFtp();
  }(0, _createClass3.default)(WorkflowTracking, [{ key: 'executeWorkflow', value: function () {var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (0, _bluebird.resolve)(






                this.downloadTrackingCsvFromFtp());case 2:if (
                this.trackingFileExistsOnFtp) {_context.next = 5;break;}
                console.log('Tracking: No tracking information found for today');return _context.abrupt('return');case 5:_context.next = 7;return (0, _bluebird.resolve)(


                this.loadTrackingInfo());case 7:_context.next = 9;return (0, _bluebird.resolve)(
                this.updateShopifyWithAllTrackingInfos());case 9:_context.next = 11;return (0, _bluebird.resolve)(
                this.deleteFileOnDisk());case 11:case 'end':return _context.stop();}}}, _callee, this);}));function executeWorkflow() {return _ref.apply(this, arguments);}return executeWorkflow;}() }, { key: 'trigger', value: function () {var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(


      event) {return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!(
                this.trackingTimeKeeper.isTimeForTask() || event.forceExecutionTracking)) {_context2.next = 8;break;}
                console.log('executing update tracking workflow');_context2.next = 4;return (0, _bluebird.resolve)(
                this.executeWorkflow());case 4:_context2.next = 6;return (0, _bluebird.resolve)(
                _slack.slack.getActivePromise());case 6:_context2.next = 9;break;case 8:

                console.log('it is not time to update tracking information: ' + (0, _timeHelper.getLocalTime)().format());case 9:case 'end':return _context2.stop();}}}, _callee2, this);}));function trigger(_x) {return _ref2.apply(this, arguments);}return trigger;}() }, { key: 'loadTrackingInfo', value: function () {var _ref3 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {var csvTrackingParser;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:




                this.csvString = _fs2.default.readFileSync(this.csvFilePathOnDisk, { encoding: 'latin1' });
                console.log('local tracking file loaded');
                csvTrackingParser = new _tracking.CsvTrackingParser();_context3.next = 5;return (0, _bluebird.resolve)(
                csvTrackingParser.parseString(this.csvString));case 5:
                this.trackingInfos = csvTrackingParser.getTrackingInfos();
                console.log('this.trackingInfos: ' + JSON.stringify(this.trackingInfos, null, 2));case 7:case 'end':return _context3.stop();}}}, _callee3, this);}));function loadTrackingInfo() {return _ref3.apply(this, arguments);}return loadTrackingInfo;}() }, { key: 'updateShopifyWithAllTrackingInfos', value: function () {var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {var iRow, iTrackingInfo;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:



                iRow = 0;case 1:if (!(iRow < this.trackingInfos.length)) {_context4.next = 17;break;}
                iTrackingInfo = this.trackingInfos[iRow];if (

                iTrackingInfo.shopifyOrderId) {_context4.next = 6;break;}
                _slack.slack.warn('ShopifyOrder is missing in row ' + iRow + '. The order has not been updated.\ntrackingInfo: ' + JSON.stringify(iTrackingInfo, null, 2));return _context4.abrupt('continue', 14);case 6:_context4.prev = 6;_context4.next = 9;return (0, _bluebird.resolve)(




                this.shopify.addFulfillmentToOrder(iTrackingInfo));case 9:_context4.next = 14;break;case 11:_context4.prev = 11;_context4.t0 = _context4['catch'](6);

                _slack.slack.warn('### Error ###\nVerify the order at https://innoki-shop.myshopify.com/admin/orders/' + iTrackingInfo.shopifyOrderId + '\nmessage: ' + _context4.t0.message + ';\nstack: ' + _context4.t0.stack);case 14:iRow++;_context4.next = 1;break;case 17:case 'end':return _context4.stop();}}}, _callee4, this, [[6, 11]]);}));function updateShopifyWithAllTrackingInfos() {return _ref4.apply(this, arguments);}return updateShopifyWithAllTrackingInfos;}() }, { key: 'triggerSafely', value: function () {var _ref5 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(




      event) {return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.prev = 0;_context5.next = 3;return (0, _bluebird.resolve)(

                this.trigger(event));case 3:return _context5.abrupt('return', _context5.sent);case 6:_context5.prev = 6;_context5.t0 = _context5['catch'](0);

                _slack.slack.warn('### Error ###\nmessage: ' + _context5.t0.message + ';\nstack: ' + _context5.t0.stack);throw _context5.t0;case 10:case 'end':return _context5.stop();}}}, _callee5, this, [[0, 6]]);}));function triggerSafely(_x2) {return _ref5.apply(this, arguments);}return triggerSafely;}() }, { key: 'downloadTrackingCsvFromFtp', value: function () {var _ref6 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {var ftpFolder, ftpFilename;return _regenerator2.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (0, _bluebird.resolve)(





                this.ftp.connect());case 2:

                ftpFolder = process.env.WOLANSKI_FTP_TRACKING_DOWNLOAD_PATH || '/';
                ftpFilename = (0, _timeHelper.getLocalTime)().format('DD_MM_YYYY') + '.csv';_context6.next = 6;return (0, _bluebird.resolve)(

                this.ftp.fileExists(ftpFolder, ftpFilename));case 6:this.trackingFileExistsOnFtp = _context6.sent;if (!
                this.trackingFileExistsOnFtp) {_context6.next = 10;break;}_context6.next = 10;return (0, _bluebird.resolve)(
                this.ftp.downloadFile(this.csvFilePathOnDisk, ftpFolder + ftpFilename));case 10:_context6.next = 12;return (0, _bluebird.resolve)(


                this.ftp.disconnect());case 12:case 'end':return _context6.stop();}}}, _callee6, this);}));function downloadTrackingCsvFromFtp() {return _ref6.apply(this, arguments);}return downloadTrackingCsvFromFtp;}() }, { key: 'deleteFileOnDisk', value: function deleteFileOnDisk()


    {
      _fs2.default.unlinkSync(this.csvFilePathOnDisk);
    } }], [{ key: 'defaultCsvFilePath', value: function defaultCsvFilePath() {return '/tmp/tracking-temp.csv';} }]);return WorkflowTracking;}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90cmFja2luZy93b3JrZmxvdy90cmFja2luZy53b3JrZmxvdy5qcyJdLCJuYW1lcyI6WyJXb3JrZmxvd1RyYWNraW5nIiwiY3N2RmlsZVBhdGhPbkRpc2siLCJkZWZhdWx0Q3N2RmlsZVBhdGgiLCJ0cmFja2luZ0ZpbGVFeGlzdHNPbkZ0cCIsInRyYWNraW5nSW5mb3MiLCJ0cmFja2luZ1RpbWVLZWVwZXIiLCJUcmFja2luZ1RpbWVLZWVwZXIiLCJzaG9waWZ5IiwiU2hvcGlmeSIsImZ0cCIsIldvbGFuc2tpRnRwIiwiZG93bmxvYWRUcmFja2luZ0NzdkZyb21GdHAiLCJjb25zb2xlIiwibG9nIiwibG9hZFRyYWNraW5nSW5mbyIsInVwZGF0ZVNob3BpZnlXaXRoQWxsVHJhY2tpbmdJbmZvcyIsImRlbGV0ZUZpbGVPbkRpc2siLCJldmVudCIsImlzVGltZUZvclRhc2siLCJmb3JjZUV4ZWN1dGlvblRyYWNraW5nIiwiZXhlY3V0ZVdvcmtmbG93Iiwic2xhY2siLCJnZXRBY3RpdmVQcm9taXNlIiwiZm9ybWF0IiwiY3N2U3RyaW5nIiwiZnMiLCJyZWFkRmlsZVN5bmMiLCJlbmNvZGluZyIsImNzdlRyYWNraW5nUGFyc2VyIiwiQ3N2VHJhY2tpbmdQYXJzZXIiLCJwYXJzZVN0cmluZyIsImdldFRyYWNraW5nSW5mb3MiLCJKU09OIiwic3RyaW5naWZ5IiwiaVJvdyIsImxlbmd0aCIsImlUcmFja2luZ0luZm8iLCJzaG9waWZ5T3JkZXJJZCIsIndhcm4iLCJhZGRGdWxmaWxsbWVudFRvT3JkZXIiLCJtZXNzYWdlIiwic3RhY2siLCJ0cmlnZ2VyIiwiY29ubmVjdCIsImZ0cEZvbGRlciIsInByb2Nlc3MiLCJlbnYiLCJXT0xBTlNLSV9GVFBfVFJBQ0tJTkdfRE9XTkxPQURfUEFUSCIsImZ0cEZpbGVuYW1lIiwiZmlsZUV4aXN0cyIsImRvd25sb2FkRmlsZSIsImRpc2Nvbm5lY3QiLCJ1bmxpbmtTeW5jIl0sIm1hcHBpbmdzIjoidWdCQUFBLHdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDOztBQUVhQSxnQixXQUFBQSxnQjtBQUNYLDhCQUFjO0FBQ1osU0FBS0MsaUJBQUwsR0FBeUJELGlCQUFpQkUsa0JBQWpCLEVBQXpCO0FBQ0EsU0FBS0MsdUJBQUwsR0FBK0IsS0FBL0I7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsU0FBS0Msa0JBQUwsR0FBMEIsSUFBSUMsK0JBQUosRUFBMUI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBSUMsZ0JBQUosRUFBZjtBQUNBLFNBQUtDLEdBQUwsR0FBVyxJQUFJQyxnQkFBSixFQUFYO0FBQ0QsRzs7Ozs7OztBQU9PLHFCQUFLQywwQkFBTCxFO0FBQ0QscUJBQUtSLHVCO0FBQ1JTLHdCQUFRQyxHQUFSLENBQVksbURBQVosRTs7O0FBR0kscUJBQUtDLGdCQUFMLEU7QUFDQSxxQkFBS0MsaUNBQUwsRTtBQUNBLHFCQUFLQyxnQkFBTCxFOzs7QUFHTUMsVztBQUNSLHFCQUFLWixrQkFBTCxDQUF3QmEsYUFBeEIsTUFBMkNELE1BQU1FLHNCO0FBQ25EUCx3QkFBUUMsR0FBUixDQUFZLG9DQUFaLEU7QUFDTSxxQkFBS08sZUFBTCxFO0FBQ0FDLDZCQUFNQyxnQkFBTixFOztBQUVOVix3QkFBUUMsR0FBUixxREFBOEQsZ0NBQWVVLE1BQWYsRUFBOUQsRTs7Ozs7QUFLRixxQkFBS0MsU0FBTCxHQUFpQkMsYUFBR0MsWUFBSCxDQUFnQixLQUFLekIsaUJBQXJCLEVBQXdDLEVBQUUwQixVQUFVLFFBQVosRUFBeEMsQ0FBakI7QUFDQWYsd0JBQVFDLEdBQVIsQ0FBWSw0QkFBWjtBQUNNZSxpQyxHQUFvQixJQUFJQywyQkFBSixFO0FBQ3BCRCxrQ0FBa0JFLFdBQWxCLENBQThCLEtBQUtOLFNBQW5DLEM7QUFDTixxQkFBS3BCLGFBQUwsR0FBcUJ3QixrQkFBa0JHLGdCQUFsQixFQUFyQjtBQUNBbkIsd0JBQVFDLEdBQVIsMEJBQW1DbUIsS0FBS0MsU0FBTCxDQUFlLEtBQUs3QixhQUFwQixFQUFtQyxJQUFuQyxFQUF5QyxDQUF6QyxDQUFuQyxFOzs7O0FBSVM4QixvQixHQUFPLEMsY0FBR0EsT0FBTyxLQUFLOUIsYUFBTCxDQUFtQitCLE07QUFDckNDLDZCLEdBQWdCLEtBQUtoQyxhQUFMLENBQW1COEIsSUFBbkIsQzs7QUFFakJFLDhCQUFjQyxjO0FBQ2pCaEIsNkJBQU1pQixJQUFOLHFDQUE2Q0osSUFBN0MseURBQXFHRixLQUFLQyxTQUFMLENBQWVHLGFBQWYsRUFBOEIsSUFBOUIsRUFBb0MsQ0FBcEMsQ0FBckcsRTs7Ozs7QUFLTSxxQkFBSzdCLE9BQUwsQ0FBYWdDLHFCQUFiLENBQW1DSCxhQUFuQyxDOztBQUVOZiw2QkFBTWlCLElBQU4sd0ZBQWdHRixjQUFjQyxjQUE5RyxtQkFBMEksYUFBSUcsT0FBOUksa0JBQWtLLGFBQUlDLEtBQXRLLEUsUUFYaURQLE07Ozs7O0FBZ0JuQ2pCLFc7O0FBRUgscUJBQUt5QixPQUFMLENBQWF6QixLQUFiLEM7O0FBRWJJLDZCQUFNaUIsSUFBTiw4QkFBc0MsYUFBSUUsT0FBMUMsa0JBQThELGFBQUlDLEtBQWxFLEU7Ozs7OztBQU1JLHFCQUFLaEMsR0FBTCxDQUFTa0MsT0FBVCxFOztBQUVBQyx5QixHQUFZQyxRQUFRQyxHQUFSLENBQVlDLG1DQUFaLElBQW1ELEc7QUFDL0RDLDJCLEdBQWlCLGdDQUFlekIsTUFBZixDQUFzQixZQUF0QixDOztBQUVjLHFCQUFLZCxHQUFMLENBQVN3QyxVQUFULENBQW9CTCxTQUFwQixFQUErQkksV0FBL0IsQyxTQUFyQyxLQUFLN0MsdUI7QUFDRCxxQkFBS0EsdUI7QUFDRCxxQkFBS00sR0FBTCxDQUFTeUMsWUFBVCxDQUFzQixLQUFLakQsaUJBQTNCLEVBQThDMkMsWUFBWUksV0FBMUQsQzs7O0FBR0YscUJBQUt2QyxHQUFMLENBQVMwQyxVQUFULEU7OztBQUdXO0FBQ2pCMUIsbUJBQUcyQixVQUFILENBQWMsS0FBS25ELGlCQUFuQjtBQUNELEssd0VBNUUyQixDQUMxQixPQUFPLHdCQUFQLENBQ0QsQyIsImZpbGUiOiJ0cmFja2luZy53b3JrZmxvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBzbGFjayB9IGZyb20gJy4uLy4uL3V0aWwvc2xhY2snO1xuaW1wb3J0IHsgV29sYW5za2lGdHAgfSBmcm9tICcuLi8uLi91dGlsL2Z0cCc7XG5pbXBvcnQgeyBUcmFja2luZ1RpbWVLZWVwZXIgfSBmcm9tICcuLi90aW1lS2VlcGVyL29yZGVyVXBsb2FkLnRpbWVLZWVwZXInO1xuaW1wb3J0IHsgZ2V0TG9jYWxUaW1lIH0gZnJvbSAnLi4vLi4vdXRpbC90aW1lSGVscGVyJztcbmltcG9ydCB7IENzdlRyYWNraW5nUGFyc2VyIH0gZnJvbSAnLi4vY3N2L3RyYWNraW5nLmNzdlRyYWNraW5nUGFyc2VyJztcbmltcG9ydCB7IFNob3BpZnkgfSBmcm9tICcuLi8uLi9zaG9waWZ5JztcblxuZXhwb3J0IGNsYXNzIFdvcmtmbG93VHJhY2tpbmcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNzdkZpbGVQYXRoT25EaXNrID0gV29ya2Zsb3dUcmFja2luZy5kZWZhdWx0Q3N2RmlsZVBhdGgoKTtcbiAgICB0aGlzLnRyYWNraW5nRmlsZUV4aXN0c09uRnRwID0gZmFsc2U7XG4gICAgdGhpcy50cmFja2luZ0luZm9zID0gW107XG4gICAgdGhpcy50cmFja2luZ1RpbWVLZWVwZXIgPSBuZXcgVHJhY2tpbmdUaW1lS2VlcGVyKCk7XG4gICAgdGhpcy5zaG9waWZ5ID0gbmV3IFNob3BpZnkoKTtcbiAgICB0aGlzLmZ0cCA9IG5ldyBXb2xhbnNraUZ0cCgpO1xuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRDc3ZGaWxlUGF0aCgpIHtcbiAgICByZXR1cm4gJy90bXAvdHJhY2tpbmctdGVtcC5jc3YnO1xuICB9XG5cbiAgYXN5bmMgZXhlY3V0ZVdvcmtmbG93KCkge1xuICAgIGF3YWl0IHRoaXMuZG93bmxvYWRUcmFja2luZ0NzdkZyb21GdHAoKTtcbiAgICBpZiAoIXRoaXMudHJhY2tpbmdGaWxlRXhpc3RzT25GdHApIHtcbiAgICAgIGNvbnNvbGUubG9nKCdUcmFja2luZzogTm8gdHJhY2tpbmcgaW5mb3JtYXRpb24gZm91bmQgZm9yIHRvZGF5Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGF3YWl0IHRoaXMubG9hZFRyYWNraW5nSW5mbygpO1xuICAgIGF3YWl0IHRoaXMudXBkYXRlU2hvcGlmeVdpdGhBbGxUcmFja2luZ0luZm9zKCk7XG4gICAgYXdhaXQgdGhpcy5kZWxldGVGaWxlT25EaXNrKCk7XG4gIH1cblxuICBhc3luYyB0cmlnZ2VyKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMudHJhY2tpbmdUaW1lS2VlcGVyLmlzVGltZUZvclRhc2soKSB8fCBldmVudC5mb3JjZUV4ZWN1dGlvblRyYWNraW5nKSB7XG4gICAgICBjb25zb2xlLmxvZygnZXhlY3V0aW5nIHVwZGF0ZSB0cmFja2luZyB3b3JrZmxvdycpO1xuICAgICAgYXdhaXQgdGhpcy5leGVjdXRlV29ya2Zsb3coKTtcbiAgICAgIGF3YWl0IHNsYWNrLmdldEFjdGl2ZVByb21pc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coYGl0IGlzIG5vdCB0aW1lIHRvIHVwZGF0ZSB0cmFja2luZyBpbmZvcm1hdGlvbjogJHtnZXRMb2NhbFRpbWUoKS5mb3JtYXQoKX1gKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBsb2FkVHJhY2tpbmdJbmZvKCkge1xuICAgIHRoaXMuY3N2U3RyaW5nID0gZnMucmVhZEZpbGVTeW5jKHRoaXMuY3N2RmlsZVBhdGhPbkRpc2ssIHsgZW5jb2Rpbmc6ICdsYXRpbjEnIH0pO1xuICAgIGNvbnNvbGUubG9nKCdsb2NhbCB0cmFja2luZyBmaWxlIGxvYWRlZCcpO1xuICAgIGNvbnN0IGNzdlRyYWNraW5nUGFyc2VyID0gbmV3IENzdlRyYWNraW5nUGFyc2VyKCk7XG4gICAgYXdhaXQgY3N2VHJhY2tpbmdQYXJzZXIucGFyc2VTdHJpbmcodGhpcy5jc3ZTdHJpbmcpO1xuICAgIHRoaXMudHJhY2tpbmdJbmZvcyA9IGNzdlRyYWNraW5nUGFyc2VyLmdldFRyYWNraW5nSW5mb3MoKTtcbiAgICBjb25zb2xlLmxvZyhgdGhpcy50cmFja2luZ0luZm9zOiAke0pTT04uc3RyaW5naWZ5KHRoaXMudHJhY2tpbmdJbmZvcywgbnVsbCwgMil9YCk7XG4gIH1cblxuICBhc3luYyB1cGRhdGVTaG9waWZ5V2l0aEFsbFRyYWNraW5nSW5mb3MoKSB7XG4gICAgZm9yIChsZXQgaVJvdyA9IDA7IGlSb3cgPCB0aGlzLnRyYWNraW5nSW5mb3MubGVuZ3RoOyBpUm93KyspIHtcbiAgICAgIGNvbnN0IGlUcmFja2luZ0luZm8gPSB0aGlzLnRyYWNraW5nSW5mb3NbaVJvd107XG5cbiAgICAgIGlmICghaVRyYWNraW5nSW5mby5zaG9waWZ5T3JkZXJJZCkge1xuICAgICAgICBzbGFjay53YXJuKGBTaG9waWZ5T3JkZXIgaXMgbWlzc2luZyBpbiByb3cgJHtpUm93fS4gVGhlIG9yZGVyIGhhcyBub3QgYmVlbiB1cGRhdGVkLlxcbnRyYWNraW5nSW5mbzogJHtKU09OLnN0cmluZ2lmeShpVHJhY2tpbmdJbmZvLCBudWxsLCAyKX1gKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2hvcGlmeS5hZGRGdWxmaWxsbWVudFRvT3JkZXIoaVRyYWNraW5nSW5mbyk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgc2xhY2sud2FybihgIyMjIEVycm9yICMjI1xcblZlcmlmeSB0aGUgb3JkZXIgYXQgaHR0cHM6Ly9pbm5va2ktc2hvcC5teXNob3BpZnkuY29tL2FkbWluL29yZGVycy8ke2lUcmFja2luZ0luZm8uc2hvcGlmeU9yZGVySWR9XFxubWVzc2FnZTogJHtlcnIubWVzc2FnZX07XFxuc3RhY2s6ICR7ZXJyLnN0YWNrfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHRyaWdnZXJTYWZlbHkoZXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMudHJpZ2dlcihldmVudCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzbGFjay53YXJuKGAjIyMgRXJyb3IgIyMjXFxubWVzc2FnZTogJHtlcnIubWVzc2FnZX07XFxuc3RhY2s6ICR7ZXJyLnN0YWNrfWApO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGRvd25sb2FkVHJhY2tpbmdDc3ZGcm9tRnRwKCkge1xuICAgIGF3YWl0IHRoaXMuZnRwLmNvbm5lY3QoKTtcblxuICAgIGNvbnN0IGZ0cEZvbGRlciA9IHByb2Nlc3MuZW52LldPTEFOU0tJX0ZUUF9UUkFDS0lOR19ET1dOTE9BRF9QQVRIIHx8ICcvJztcbiAgICBjb25zdCBmdHBGaWxlbmFtZSA9IGAke2dldExvY2FsVGltZSgpLmZvcm1hdCgnRERfTU1fWVlZWScpfS5jc3ZgO1xuXG4gICAgdGhpcy50cmFja2luZ0ZpbGVFeGlzdHNPbkZ0cCA9IGF3YWl0IHRoaXMuZnRwLmZpbGVFeGlzdHMoZnRwRm9sZGVyLCBmdHBGaWxlbmFtZSk7XG4gICAgaWYgKHRoaXMudHJhY2tpbmdGaWxlRXhpc3RzT25GdHApIHtcbiAgICAgIGF3YWl0IHRoaXMuZnRwLmRvd25sb2FkRmlsZSh0aGlzLmNzdkZpbGVQYXRoT25EaXNrLCBmdHBGb2xkZXIgKyBmdHBGaWxlbmFtZSk7XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5mdHAuZGlzY29ubmVjdCgpO1xuICB9XG5cbiAgZGVsZXRlRmlsZU9uRGlzaygpIHtcbiAgICBmcy51bmxpbmtTeW5jKHRoaXMuY3N2RmlsZVBhdGhPbkRpc2spO1xuICB9XG59XG4iXX0=