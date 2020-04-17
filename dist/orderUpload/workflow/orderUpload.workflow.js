'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.WorkflowNewOrderUpload = undefined;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _bluebird = require('bluebird');var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);
var _slack = require('../../util/slack');
var _orderUpload = require('../csv/orderUpload.shopifyToWolanski');
var _orderUpload2 = require('../csv/orderUpload.csvOrderExporter');
var _ftp = require('../../util/ftp');
var _orderUpload3 = require('../timeKeeper/orderUpload.timeKeeper');
var _timeHelper = require('../../util/timeHelper');
var _shopify = require('../../shopify');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

WorkflowNewOrderUpload = exports.WorkflowNewOrderUpload = function () {
  function WorkflowNewOrderUpload() {(0, _classCallCheck3.default)(this, WorkflowNewOrderUpload);
    this.csvNameOnFtp = '';
    this.csvFileData = '';
    this.csvFilePathOnDisk = '/tmp/newOrders-temp.csv';
    this.wolanskiOrders = [];
    this.allShopifyOrders = [];
    this.orderToSkip = [];
    this.fulfillmentShopifyOrders = [];
    this.codeInCommentToNotFulfillOrder = process.env.ORDER_UPLOAD_CODE_IN_COMMENT_TO_NOT_FULFILL_ORDER || '#dnf#';
  }(0, _createClass3.default)(WorkflowNewOrderUpload, [{ key: 'executeWorkflow', value: function () {var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (0, _bluebird.resolve)(


                this.queryOrders());case 2:
                this.removeOrderWhichAreFlaggedToBeSkipped();_context.next = 5;return (0, _bluebird.resolve)(
                this.convertOrdersToWolanskiStyleArray());case 5:_context.next = 7;return (0, _bluebird.resolve)(
                this.generateCsvFile());case 7:_context.next = 9;return (0, _bluebird.resolve)(
                this.writeCsvToFileOnDisk());case 9:_context.next = 11;return (0, _bluebird.resolve)(
                this.uploadFileToFtp());case 11:_context.next = 13;return (0, _bluebird.resolve)(
                this.deleteFileOnDisk());case 13:
                this.logOrdersToSlack();case 14:case 'end':return _context.stop();}}}, _callee, this);}));function executeWorkflow() {return _ref.apply(this, arguments);}return executeWorkflow;}() }, { key: 'removeOrderWhichAreFlaggedToBeSkipped', value: function removeOrderWhichAreFlaggedToBeSkipped()



    {var _this = this;
      var orderShallBeSkipped = function orderShallBeSkipped(order) {
        var skipTag = _this.codeInCommentToNotFulfillOrder.toLowerCase();
        var orderNote = order.note || '';
        return typeof order.note === 'string' && orderNote.includes(skipTag);
      };

      this.orderToSkip = this.allShopifyOrders.filter(orderShallBeSkipped);
      this.fulfillmentShopifyOrders = this.allShopifyOrders.filter(function (order) {return !orderShallBeSkipped(order);});
    } }, { key: 'trigger', value: function () {var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(

      event) {return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!(
                new _orderUpload3.OrderUploadTimeKeeper().isTimeForTask() || event.forceExecutionOrderUpload)) {_context2.next = 8;break;}
                console.log('executing order fulfillment workflow');_context2.next = 4;return (0, _bluebird.resolve)(
                this.executeWorkflow());case 4:_context2.next = 6;return (0, _bluebird.resolve)(
                _slack.slack.getActivePromise());case 6:_context2.next = 9;break;case 8:

                console.log('it is not time for a fulfillment upload: ' + (0, _timeHelper.getLocalTime)().format());case 9:case 'end':return _context2.stop();}}}, _callee2, this);}));function trigger(_x) {return _ref2.apply(this, arguments);}return trigger;}() }, { key: 'triggerSafely', value: function () {var _ref3 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(



      event) {return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.prev = 0;_context3.next = 3;return (0, _bluebird.resolve)(

                this.trigger(event));case 3:return _context3.abrupt('return', _context3.sent);case 6:_context3.prev = 6;_context3.t0 = _context3['catch'](0);

                _slack.slack.error('### Error ###\nmessage: ' + _context3.t0.message + ';\nstack: ' + _context3.t0.stack);
                console.log('this.wolanskiOrders: ' + JSON.stringify(this.wolanskiOrders, null, 2));
                console.log('this.allShopifyOrders: ' + JSON.stringify(this.allShopifyOrders, null, 2));
                console.log('this.orderToSkip: ' + JSON.stringify(this.orderToSkip, null, 2));
                console.log('this.fulfillmentShopifyOrders: ' + JSON.stringify(this.fulfillmentShopifyOrders, null, 2));throw _context3.t0;case 14:case 'end':return _context3.stop();}}}, _callee3, this, [[0, 6]]);}));function triggerSafely(_x2) {return _ref3.apply(this, arguments);}return triggerSafely;}() }, { key: 'queryOrders', value: function () {var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {var timeKeeper, shopify;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:





                timeKeeper = new _orderUpload3.OrderUploadTimeKeeper();
                shopify = new _shopify.Shopify();_context4.next = 4;return (0, _bluebird.resolve)(
                shopify.getOrdersInTimespane(
                timeKeeper.previousTimeIntervallStart(),
                timeKeeper.previousTimeIntervallEnd()));case 4:this.allShopifyOrders = _context4.sent;

                console.log('this.allShopifyOrders count: ' + this.allShopifyOrders.length);case 6:case 'end':return _context4.stop();}}}, _callee4, this);}));function queryOrders() {return _ref4.apply(this, arguments);}return queryOrders;}() }, { key: 'convertOrdersToWolanskiStyleArray', value: function convertOrdersToWolanskiStyleArray()


    {
      this.wolanskiOrders = (0, _orderUpload.convertShopifyOrdersToWolanskiStructure)(this.fulfillmentShopifyOrders);
      console.log('this.wolanskiOrders: ' + JSON.stringify(this.wolanskiOrders, null, 2));
    } }, { key: 'generateCsvFile', value: function generateCsvFile()

    {
      var csvOrderExporter = new _orderUpload2.CsvOrderExporter();
      csvOrderExporter.orders = this.wolanskiOrders;
      csvOrderExporter.removeDelimiterFromCsvStrings();
      this.csvFileData = csvOrderExporter.genCsv();
      this.csvNameOnFtp = _orderUpload2.CsvOrderExporter.genRemoteFileName();
      console.log('FileCreater.genRemoteFileName();: ' + JSON.stringify(_orderUpload2.CsvOrderExporter.genRemoteFileName(), null, 2));
      console.log('this.csvName : ' + JSON.stringify(this.csvNameOnFtp, null, 2));
    } }, { key: 'uploadFileToFtp', value: function () {var _ref5 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {var ftp, ftpOrderUploadPath, ftpOrderUploadBackupPath;return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:


                ftp = new _ftp.WolanskiFtp();_context5.next = 3;return (0, _bluebird.resolve)(
                ftp.connect());case 3:

                ftpOrderUploadPath = process.env.WOLANSKI_FTP_ORDER_UPLOAD_PATH || '/';_context5.next = 6;return (0, _bluebird.resolve)(
                ftp.uploadFile(this.csvFilePathOnDisk, ftpOrderUploadPath + this.csvNameOnFtp));case 6:

                ftpOrderUploadBackupPath = process.env.WOLANSKI_FTP_ORDER_UPLOAD_BACKUP_PATH;if (!
                ftpOrderUploadBackupPath) {_context5.next = 10;break;}_context5.next = 10;return (0, _bluebird.resolve)(
                ftp.uploadFile(this.csvFilePathOnDisk, ftpOrderUploadBackupPath + this.csvNameOnFtp));case 10:


                ftp.disconnect();case 11:case 'end':return _context5.stop();}}}, _callee5, this);}));function uploadFileToFtp() {return _ref5.apply(this, arguments);}return uploadFileToFtp;}() }, { key: 'writeCsvToFileOnDisk', value: function writeCsvToFileOnDisk()


    {
      _fs2.default.writeFileSync(this.csvFilePathOnDisk, this.csvFileData, { encoding: 'latin1' });
    } }, { key: 'deleteFileOnDisk', value: function deleteFileOnDisk()

    {
      _fs2.default.unlinkSync(this.csvFilePathOnDisk);
    } }, { key: 'logOrdersToSlack', value: function logOrdersToSlack()

    {
      var addressToString = function addressToString(address) {
        if (!address) return "Shopify order contains no address";
        return address.name + '; ' + address.company + '; ' + address.address1 + '; ' + address.address2 + '; ' + address.zip + '; ' + address.city + ' ';
      };

      var orderToLog = function orderToLog(order) {return '\n    *' +
        order.name + '*\n    Shipping: ' +
        addressToString(order.shipping_address) + '\n    Billing: ' +
        addressToString(order.billing_address) + '\n    Price: ' +
        order.total_price + ' ' + order.currency + '\n    Comment in order: ' +
        order.note + '\n    ';};


      var formatAsCode = function formatAsCode(str) {return '``` ' + str + ' ```';};

      var log = this.wolanskiOrders.length + ' orders were sent to Wolanski.\n' +
      this.orderToSkip.length + ' orders were skipped.';

      var code = '';
      if (this.fulfillmentShopifyOrders.length > 0) {
        code += 'Orders sent to Wolanski\n';
        this.fulfillmentShopifyOrders.forEach(function (order) {
          code += orderToLog(order);
        });
      }
      if (this.orderToSkip.length > 0) {
        code += 'Orders skipped\n';
        this.orderToSkip.forEach(function (order) {
          code += orderToLog(order);
        });
      }

      if (code) {
        log += '\n' + formatAsCode(code);
      }

      _slack.slack.log(log);
    } }]);return WorkflowNewOrderUpload;}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcmRlclVwbG9hZC93b3JrZmxvdy9vcmRlclVwbG9hZC53b3JrZmxvdy5qcyJdLCJuYW1lcyI6WyJXb3JrZmxvd05ld09yZGVyVXBsb2FkIiwiY3N2TmFtZU9uRnRwIiwiY3N2RmlsZURhdGEiLCJjc3ZGaWxlUGF0aE9uRGlzayIsIndvbGFuc2tpT3JkZXJzIiwiYWxsU2hvcGlmeU9yZGVycyIsIm9yZGVyVG9Ta2lwIiwiZnVsZmlsbG1lbnRTaG9waWZ5T3JkZXJzIiwiY29kZUluQ29tbWVudFRvTm90RnVsZmlsbE9yZGVyIiwicHJvY2VzcyIsImVudiIsIk9SREVSX1VQTE9BRF9DT0RFX0lOX0NPTU1FTlRfVE9fTk9UX0ZVTEZJTExfT1JERVIiLCJxdWVyeU9yZGVycyIsInJlbW92ZU9yZGVyV2hpY2hBcmVGbGFnZ2VkVG9CZVNraXBwZWQiLCJjb252ZXJ0T3JkZXJzVG9Xb2xhbnNraVN0eWxlQXJyYXkiLCJnZW5lcmF0ZUNzdkZpbGUiLCJ3cml0ZUNzdlRvRmlsZU9uRGlzayIsInVwbG9hZEZpbGVUb0Z0cCIsImRlbGV0ZUZpbGVPbkRpc2siLCJsb2dPcmRlcnNUb1NsYWNrIiwib3JkZXJTaGFsbEJlU2tpcHBlZCIsIm9yZGVyIiwic2tpcFRhZyIsInRvTG93ZXJDYXNlIiwib3JkZXJOb3RlIiwibm90ZSIsImluY2x1ZGVzIiwiZmlsdGVyIiwiZXZlbnQiLCJPcmRlclVwbG9hZFRpbWVLZWVwZXIiLCJpc1RpbWVGb3JUYXNrIiwiZm9yY2VFeGVjdXRpb25PcmRlclVwbG9hZCIsImNvbnNvbGUiLCJsb2ciLCJleGVjdXRlV29ya2Zsb3ciLCJzbGFjayIsImdldEFjdGl2ZVByb21pc2UiLCJmb3JtYXQiLCJ0cmlnZ2VyIiwiZXJyb3IiLCJtZXNzYWdlIiwic3RhY2siLCJKU09OIiwic3RyaW5naWZ5IiwidGltZUtlZXBlciIsInNob3BpZnkiLCJTaG9waWZ5IiwiZ2V0T3JkZXJzSW5UaW1lc3BhbmUiLCJwcmV2aW91c1RpbWVJbnRlcnZhbGxTdGFydCIsInByZXZpb3VzVGltZUludGVydmFsbEVuZCIsImxlbmd0aCIsImNzdk9yZGVyRXhwb3J0ZXIiLCJDc3ZPcmRlckV4cG9ydGVyIiwib3JkZXJzIiwicmVtb3ZlRGVsaW1pdGVyRnJvbUNzdlN0cmluZ3MiLCJnZW5Dc3YiLCJnZW5SZW1vdGVGaWxlTmFtZSIsImZ0cCIsIldvbGFuc2tpRnRwIiwiY29ubmVjdCIsImZ0cE9yZGVyVXBsb2FkUGF0aCIsIldPTEFOU0tJX0ZUUF9PUkRFUl9VUExPQURfUEFUSCIsInVwbG9hZEZpbGUiLCJmdHBPcmRlclVwbG9hZEJhY2t1cFBhdGgiLCJXT0xBTlNLSV9GVFBfT1JERVJfVVBMT0FEX0JBQ0tVUF9QQVRIIiwiZGlzY29ubmVjdCIsImZzIiwid3JpdGVGaWxlU3luYyIsImVuY29kaW5nIiwidW5saW5rU3luYyIsImFkZHJlc3NUb1N0cmluZyIsImFkZHJlc3MiLCJuYW1lIiwiY29tcGFueSIsImFkZHJlc3MxIiwiYWRkcmVzczIiLCJ6aXAiLCJjaXR5Iiwib3JkZXJUb0xvZyIsInNoaXBwaW5nX2FkZHJlc3MiLCJiaWxsaW5nX2FkZHJlc3MiLCJ0b3RhbF9wcmljZSIsImN1cnJlbmN5IiwiZm9ybWF0QXNDb2RlIiwic3RyIiwiY29kZSIsImZvckVhY2giXSwibWFwcGluZ3MiOiI2Z0JBQUEsd0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Qzs7QUFFYUEsc0IsV0FBQUEsc0I7QUFDWCxvQ0FBYztBQUNaLFNBQUtDLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsU0FBS0MsaUJBQUwsR0FBeUIseUJBQXpCO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQixFQUF0QjtBQUNBLFNBQUtDLGdCQUFMLEdBQXdCLEVBQXhCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixFQUFuQjtBQUNBLFNBQUtDLHdCQUFMLEdBQWdDLEVBQWhDO0FBQ0EsU0FBS0MsOEJBQUwsR0FBc0NDLFFBQVFDLEdBQVIsQ0FB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QXRCLENBRk87QUFHUlQsd0JBQWdCakQsTUFBTTJELGVBQXRCLENBSFE7QUFJVjNELGNBQU00RCxXQUpJLFNBSVc1RCxNQUFNNkQsUUFKakI7QUFLQzdELGNBQU1JLElBTFAsYUFBbkI7OztBQVFBLFVBQU0wRCxlQUFlLFNBQWZBLFlBQWUsdUJBQWlCQyxHQUFqQixXQUFyQjs7QUFFQSxVQUFJbkQsTUFBUyxLQUFLN0IsY0FBTCxDQUFvQjhDLE1BQTdCO0FBQ04sV0FBSzVDLFdBQUwsQ0FBaUI0QyxNQURYLDBCQUFKOztBQUdBLFVBQUltQyxPQUFPLEVBQVg7QUFDQSxVQUFJLEtBQUs5RSx3QkFBTCxDQUE4QjJDLE1BQTlCLEdBQXVDLENBQTNDLEVBQThDO0FBQzVDbUMsZ0JBQVEsMkJBQVI7QUFDQSxhQUFLOUUsd0JBQUwsQ0FBOEIrRSxPQUE5QixDQUFzQyxVQUFDakUsS0FBRCxFQUFXO0FBQy9DZ0Usa0JBQVFQLFdBQVd6RCxLQUFYLENBQVI7QUFDRCxTQUZEO0FBR0Q7QUFDRCxVQUFJLEtBQUtmLFdBQUwsQ0FBaUI0QyxNQUFqQixHQUEwQixDQUE5QixFQUFpQztBQUMvQm1DLGdCQUFRLGtCQUFSO0FBQ0EsYUFBSy9FLFdBQUwsQ0FBaUJnRixPQUFqQixDQUF5QixVQUFDakUsS0FBRCxFQUFXO0FBQ2xDZ0Usa0JBQVFQLFdBQVd6RCxLQUFYLENBQVI7QUFDRCxTQUZEO0FBR0Q7O0FBRUQsVUFBSWdFLElBQUosRUFBVTtBQUNScEQsc0JBQVlrRCxhQUFhRSxJQUFiLENBQVo7QUFDRDs7QUFFRGxELG1CQUFNRixHQUFOLENBQVVBLEdBQVY7QUFDRCxLIiwiZmlsZSI6Im9yZGVyVXBsb2FkLndvcmtmbG93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IHNsYWNrIH0gZnJvbSAnLi4vLi4vdXRpbC9zbGFjayc7XG5pbXBvcnQgeyBjb252ZXJ0U2hvcGlmeU9yZGVyc1RvV29sYW5za2lTdHJ1Y3R1cmUgfSBmcm9tICcuLi9jc3Yvb3JkZXJVcGxvYWQuc2hvcGlmeVRvV29sYW5za2knO1xuaW1wb3J0IHsgQ3N2T3JkZXJFeHBvcnRlciB9IGZyb20gJy4uL2Nzdi9vcmRlclVwbG9hZC5jc3ZPcmRlckV4cG9ydGVyJztcbmltcG9ydCB7IFdvbGFuc2tpRnRwIH0gZnJvbSAnLi4vLi4vdXRpbC9mdHAnO1xuaW1wb3J0IHsgT3JkZXJVcGxvYWRUaW1lS2VlcGVyIH0gZnJvbSAnLi4vdGltZUtlZXBlci9vcmRlclVwbG9hZC50aW1lS2VlcGVyJztcbmltcG9ydCB7IGdldExvY2FsVGltZSB9IGZyb20gJy4uLy4uL3V0aWwvdGltZUhlbHBlcic7XG5pbXBvcnQgeyBTaG9waWZ5IH0gZnJvbSAnLi4vLi4vc2hvcGlmeSc7XG5cbmV4cG9ydCBjbGFzcyBXb3JrZmxvd05ld09yZGVyVXBsb2FkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jc3ZOYW1lT25GdHAgPSAnJztcbiAgICB0aGlzLmNzdkZpbGVEYXRhID0gJyc7XG4gICAgdGhpcy5jc3ZGaWxlUGF0aE9uRGlzayA9ICcvdG1wL25ld09yZGVycy10ZW1wLmNzdic7XG4gICAgdGhpcy53b2xhbnNraU9yZGVycyA9IFtdO1xuICAgIHRoaXMuYWxsU2hvcGlmeU9yZGVycyA9IFtdO1xuICAgIHRoaXMub3JkZXJUb1NraXAgPSBbXTtcbiAgICB0aGlzLmZ1bGZpbGxtZW50U2hvcGlmeU9yZGVycyA9IFtdO1xuICAgIHRoaXMuY29kZUluQ29tbWVudFRvTm90RnVsZmlsbE9yZGVyID0gcHJvY2Vzcy5lbnYuT1JERVJfVVBMT0FEX0NPREVfSU5fQ09NTUVOVF9UT19OT1RfRlVMRklMTF9PUkRFUiB8fCAnI2RuZiMnO1xuICB9XG5cbiAgYXN5bmMgZXhlY3V0ZVdvcmtmbG93KCkge1xuICAgIGF3YWl0IHRoaXMucXVlcnlPcmRlcnMoKTtcbiAgICB0aGlzLnJlbW92ZU9yZGVyV2hpY2hBcmVGbGFnZ2VkVG9CZVNraXBwZWQoKTtcbiAgICBhd2FpdCB0aGlzLmNvbnZlcnRPcmRlcnNUb1dvbGFuc2tpU3R5bGVBcnJheSgpO1xuICAgIGF3YWl0IHRoaXMuZ2VuZXJhdGVDc3ZGaWxlKCk7XG4gICAgYXdhaXQgdGhpcy53cml0ZUNzdlRvRmlsZU9uRGlzaygpO1xuICAgIGF3YWl0IHRoaXMudXBsb2FkRmlsZVRvRnRwKCk7XG4gICAgYXdhaXQgdGhpcy5kZWxldGVGaWxlT25EaXNrKCk7XG4gICAgdGhpcy5sb2dPcmRlcnNUb1NsYWNrKCk7XG4gIH1cblxuXG4gIHJlbW92ZU9yZGVyV2hpY2hBcmVGbGFnZ2VkVG9CZVNraXBwZWQoKSB7XG4gICAgY29uc3Qgb3JkZXJTaGFsbEJlU2tpcHBlZCA9IChvcmRlcikgPT4ge1xuICAgICAgY29uc3Qgc2tpcFRhZyA9IHRoaXMuY29kZUluQ29tbWVudFRvTm90RnVsZmlsbE9yZGVyLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCBvcmRlck5vdGUgPSBvcmRlci5ub3RlIHx8ICcnO1xuICAgICAgcmV0dXJuIHR5cGVvZiBvcmRlci5ub3RlID09PSAnc3RyaW5nJyAmJiBvcmRlck5vdGUuaW5jbHVkZXMoc2tpcFRhZyk7XG4gICAgfTtcblxuICAgIHRoaXMub3JkZXJUb1NraXAgPSB0aGlzLmFsbFNob3BpZnlPcmRlcnMuZmlsdGVyKG9yZGVyU2hhbGxCZVNraXBwZWQpO1xuICAgIHRoaXMuZnVsZmlsbG1lbnRTaG9waWZ5T3JkZXJzID0gdGhpcy5hbGxTaG9waWZ5T3JkZXJzLmZpbHRlcihvcmRlciA9PiAhb3JkZXJTaGFsbEJlU2tpcHBlZChvcmRlcikpO1xuICB9XG5cbiAgYXN5bmMgdHJpZ2dlcihldmVudCkge1xuICAgIGlmIChuZXcgT3JkZXJVcGxvYWRUaW1lS2VlcGVyKCkuaXNUaW1lRm9yVGFzaygpIHx8IGV2ZW50LmZvcmNlRXhlY3V0aW9uT3JkZXJVcGxvYWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdleGVjdXRpbmcgb3JkZXIgZnVsZmlsbG1lbnQgd29ya2Zsb3cnKTtcbiAgICAgIGF3YWl0IHRoaXMuZXhlY3V0ZVdvcmtmbG93KCk7XG4gICAgICBhd2FpdCBzbGFjay5nZXRBY3RpdmVQcm9taXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKGBpdCBpcyBub3QgdGltZSBmb3IgYSBmdWxmaWxsbWVudCB1cGxvYWQ6ICR7Z2V0TG9jYWxUaW1lKCkuZm9ybWF0KCl9YCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdHJpZ2dlclNhZmVseShldmVudCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy50cmlnZ2VyKGV2ZW50KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHNsYWNrLmVycm9yKGAjIyMgRXJyb3IgIyMjXFxubWVzc2FnZTogJHtlcnIubWVzc2FnZX07XFxuc3RhY2s6ICR7ZXJyLnN0YWNrfWApO1xuICAgICAgY29uc29sZS5sb2coYHRoaXMud29sYW5za2lPcmRlcnM6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy53b2xhbnNraU9yZGVycywgbnVsbCwgMil9YCk7XG4gICAgICBjb25zb2xlLmxvZyhgdGhpcy5hbGxTaG9waWZ5T3JkZXJzOiAke0pTT04uc3RyaW5naWZ5KHRoaXMuYWxsU2hvcGlmeU9yZGVycywgbnVsbCwgMil9YCk7XG4gICAgICBjb25zb2xlLmxvZyhgdGhpcy5vcmRlclRvU2tpcDogJHtKU09OLnN0cmluZ2lmeSh0aGlzLm9yZGVyVG9Ta2lwLCBudWxsLCAyKX1gKTtcbiAgICAgIGNvbnNvbGUubG9nKGB0aGlzLmZ1bGZpbGxtZW50U2hvcGlmeU9yZGVyczogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmZ1bGZpbGxtZW50U2hvcGlmeU9yZGVycywgbnVsbCwgMil9YCk7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcXVlcnlPcmRlcnMoKSB7XG4gICAgY29uc3QgdGltZUtlZXBlciA9IG5ldyBPcmRlclVwbG9hZFRpbWVLZWVwZXIoKTtcbiAgICBjb25zdCBzaG9waWZ5ID0gbmV3IFNob3BpZnkoKTtcbiAgICB0aGlzLmFsbFNob3BpZnlPcmRlcnMgPSBhd2FpdCBzaG9waWZ5LmdldE9yZGVyc0luVGltZXNwYW5lKFxuICAgICAgdGltZUtlZXBlci5wcmV2aW91c1RpbWVJbnRlcnZhbGxTdGFydCgpLFxuICAgICAgdGltZUtlZXBlci5wcmV2aW91c1RpbWVJbnRlcnZhbGxFbmQoKVxuICAgICk7XG4gICAgY29uc29sZS5sb2coYHRoaXMuYWxsU2hvcGlmeU9yZGVycyBjb3VudDogJHt0aGlzLmFsbFNob3BpZnlPcmRlcnMubGVuZ3RofWApO1xuICB9XG5cbiAgY29udmVydE9yZGVyc1RvV29sYW5za2lTdHlsZUFycmF5KCkge1xuICAgIHRoaXMud29sYW5za2lPcmRlcnMgPSBjb252ZXJ0U2hvcGlmeU9yZGVyc1RvV29sYW5za2lTdHJ1Y3R1cmUodGhpcy5mdWxmaWxsbWVudFNob3BpZnlPcmRlcnMpO1xuICAgIGNvbnNvbGUubG9nKGB0aGlzLndvbGFuc2tpT3JkZXJzOiAke0pTT04uc3RyaW5naWZ5KHRoaXMud29sYW5za2lPcmRlcnMsIG51bGwsIDIpfWApO1xuICB9XG5cbiAgZ2VuZXJhdGVDc3ZGaWxlKCkge1xuICAgIGNvbnN0IGNzdk9yZGVyRXhwb3J0ZXIgPSBuZXcgQ3N2T3JkZXJFeHBvcnRlcigpO1xuICAgIGNzdk9yZGVyRXhwb3J0ZXIub3JkZXJzID0gdGhpcy53b2xhbnNraU9yZGVycztcbiAgICBjc3ZPcmRlckV4cG9ydGVyLnJlbW92ZURlbGltaXRlckZyb21Dc3ZTdHJpbmdzKCk7XG4gICAgdGhpcy5jc3ZGaWxlRGF0YSA9IGNzdk9yZGVyRXhwb3J0ZXIuZ2VuQ3N2KCk7XG4gICAgdGhpcy5jc3ZOYW1lT25GdHAgPSBDc3ZPcmRlckV4cG9ydGVyLmdlblJlbW90ZUZpbGVOYW1lKCk7XG4gICAgY29uc29sZS5sb2coYEZpbGVDcmVhdGVyLmdlblJlbW90ZUZpbGVOYW1lKCk7OiAke0pTT04uc3RyaW5naWZ5KENzdk9yZGVyRXhwb3J0ZXIuZ2VuUmVtb3RlRmlsZU5hbWUoKSwgbnVsbCwgMil9YCk7XG4gICAgY29uc29sZS5sb2coYHRoaXMuY3N2TmFtZSA6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5jc3ZOYW1lT25GdHAsIG51bGwsIDIpfWApO1xuICB9XG5cbiAgYXN5bmMgdXBsb2FkRmlsZVRvRnRwKCkge1xuICAgIGNvbnN0IGZ0cCA9IG5ldyBXb2xhbnNraUZ0cCgpO1xuICAgIGF3YWl0IGZ0cC5jb25uZWN0KCk7XG5cbiAgICBjb25zdCBmdHBPcmRlclVwbG9hZFBhdGggPSBwcm9jZXNzLmVudi5XT0xBTlNLSV9GVFBfT1JERVJfVVBMT0FEX1BBVEggfHwgJy8nO1xuICAgIGF3YWl0IGZ0cC51cGxvYWRGaWxlKHRoaXMuY3N2RmlsZVBhdGhPbkRpc2ssIGZ0cE9yZGVyVXBsb2FkUGF0aCArIHRoaXMuY3N2TmFtZU9uRnRwKTtcblxuICAgIGNvbnN0IGZ0cE9yZGVyVXBsb2FkQmFja3VwUGF0aCA9IHByb2Nlc3MuZW52LldPTEFOU0tJX0ZUUF9PUkRFUl9VUExPQURfQkFDS1VQX1BBVEg7XG4gICAgaWYgKGZ0cE9yZGVyVXBsb2FkQmFja3VwUGF0aCkge1xuICAgICAgYXdhaXQgZnRwLnVwbG9hZEZpbGUodGhpcy5jc3ZGaWxlUGF0aE9uRGlzaywgZnRwT3JkZXJVcGxvYWRCYWNrdXBQYXRoICsgdGhpcy5jc3ZOYW1lT25GdHApO1xuICAgIH1cblxuICAgIGZ0cC5kaXNjb25uZWN0KCk7XG4gIH1cblxuICB3cml0ZUNzdlRvRmlsZU9uRGlzaygpIHtcbiAgICBmcy53cml0ZUZpbGVTeW5jKHRoaXMuY3N2RmlsZVBhdGhPbkRpc2ssIHRoaXMuY3N2RmlsZURhdGEsIHsgZW5jb2Rpbmc6ICdsYXRpbjEnIH0pO1xuICB9XG5cbiAgZGVsZXRlRmlsZU9uRGlzaygpIHtcbiAgICBmcy51bmxpbmtTeW5jKHRoaXMuY3N2RmlsZVBhdGhPbkRpc2spO1xuICB9XG5cbiAgbG9nT3JkZXJzVG9TbGFjaygpIHtcbiAgICBjb25zdCBhZGRyZXNzVG9TdHJpbmcgPSBhZGRyZXNzID0+IHtcbiAgICAgIGlmICghYWRkcmVzcykgcmV0dXJuIFwiU2hvcGlmeSBvcmRlciBjb250YWlucyBubyBhZGRyZXNzXCJcbiAgICAgIHJldHVybiBgJHthZGRyZXNzLm5hbWV9OyAke2FkZHJlc3MuY29tcGFueX07ICR7YWRkcmVzcy5hZGRyZXNzMX07ICR7YWRkcmVzcy5hZGRyZXNzMn07ICR7YWRkcmVzcy56aXB9OyAke2FkZHJlc3MuY2l0eX0gYDtcbiAgICB9ICBcblxuICAgIGNvbnN0IG9yZGVyVG9Mb2cgPSBvcmRlciA9PiBgXG4gICAgKiR7b3JkZXIubmFtZX0qXG4gICAgU2hpcHBpbmc6ICR7YWRkcmVzc1RvU3RyaW5nKG9yZGVyLnNoaXBwaW5nX2FkZHJlc3MpfVxuICAgIEJpbGxpbmc6ICR7YWRkcmVzc1RvU3RyaW5nKG9yZGVyLmJpbGxpbmdfYWRkcmVzcyl9XG4gICAgUHJpY2U6ICR7b3JkZXIudG90YWxfcHJpY2V9ICR7b3JkZXIuY3VycmVuY3l9XG4gICAgQ29tbWVudCBpbiBvcmRlcjogJHtvcmRlci5ub3RlfVxuICAgIGA7XG5cbiAgICBjb25zdCBmb3JtYXRBc0NvZGUgPSBzdHIgPT4gYFxcYFxcYFxcYCAke3N0cn0gXFxgXFxgXFxgYDtcblxuICAgIGxldCBsb2cgPSBgJHt0aGlzLndvbGFuc2tpT3JkZXJzLmxlbmd0aH0gb3JkZXJzIHdlcmUgc2VudCB0byBXb2xhbnNraS5cbiR7dGhpcy5vcmRlclRvU2tpcC5sZW5ndGh9IG9yZGVycyB3ZXJlIHNraXBwZWQuYDtcblxuICAgIGxldCBjb2RlID0gJyc7XG4gICAgaWYgKHRoaXMuZnVsZmlsbG1lbnRTaG9waWZ5T3JkZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvZGUgKz0gJ09yZGVycyBzZW50IHRvIFdvbGFuc2tpXFxuJztcbiAgICAgIHRoaXMuZnVsZmlsbG1lbnRTaG9waWZ5T3JkZXJzLmZvckVhY2goKG9yZGVyKSA9PiB7XG4gICAgICAgIGNvZGUgKz0gb3JkZXJUb0xvZyhvcmRlcik7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3JkZXJUb1NraXAubGVuZ3RoID4gMCkge1xuICAgICAgY29kZSArPSAnT3JkZXJzIHNraXBwZWRcXG4nO1xuICAgICAgdGhpcy5vcmRlclRvU2tpcC5mb3JFYWNoKChvcmRlcikgPT4ge1xuICAgICAgICBjb2RlICs9IG9yZGVyVG9Mb2cob3JkZXIpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUpIHtcbiAgICAgIGxvZyArPSBgXFxuJHtmb3JtYXRBc0NvZGUoY29kZSl9YDtcbiAgICB9XG5cbiAgICBzbGFjay5sb2cobG9nKTtcbiAgfVxufVxuIl19