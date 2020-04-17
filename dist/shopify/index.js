'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.Shopify = undefined;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _bluebird = require('bluebird');var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _requestPromise = require('request-promise');var _requestPromise2 = _interopRequireDefault(_requestPromise);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Shopify = exports.Shopify = function () {
  function Shopify()





  {var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.env.SHOPIFY_KEY;var pw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.env.SHOPIFY_PW;var baseUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : process.env.SHOPIFY_BASE_URL;var informTracking = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : process.env.TRACKING_INFORM_CUSTOMER_ABOUT_TRACKING_INFO;var locationId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : process.env.SHOPIFY_LOCATION_ID;(0, _classCallCheck3.default)(this, Shopify);
    // TODO add syntactic sugar
    this.initWithProcessEnvValues(key, pw, baseUrl, informTracking, locationId);
  }(0, _createClass3.default)(Shopify, [{ key: 'initWithProcessEnvValues', value: function initWithProcessEnvValues()







    {var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.env.SHOPIFY_KEY;var pw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.env.SHOPIFY_PW;var baseUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : process.env.SHOPIFY_BASE_URL;var informTracking = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : process.env.TRACKING_INFORM_CUSTOMER_ABOUT_TRACKING_INFO;var locationId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : process.env.SHOPIFY_LOCATION_ID;
      this.key = key;
      this.pw = pw;
      this.baseUrl = baseUrl;
      this.locationId = locationId ? parseInt(locationId, 10) : undefined;

      this.informCustomerAboutTracking =
      typeof informTracking === 'string' ?
      informTracking.trim().toLowerCase() === 'true' :
      informTracking;
    } }, { key: 'query', value: function query(





    method, path, qs, body) {
      if (!path.startsWith('/')) {throw new Error('path needs to start with /');}

      var options = {
        method: method,
        auth: {
          user: this.key,
          pass: this.pw },

        qs: qs,
        body: body,
        uri: this.baseUrl + path,
        json: true // Automatically parses the JSON string in the response
      };

      return Shopify.getRequestFramework()(options);
    } }, { key: 'get', value: function get(

    path, queryParamter) {
      return this.query('GET', path, queryParamter);
    } }, { key: 'post', value: function post(

    path, queryParamter, body) {
      return this.query('POST', path, queryParamter, body);
    }

    /**
       *
       * @param startDate type moment
       * @param endDate type moment
       */ }, { key: 'getOrdersInTimespane', value: function () {var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee(
      startDate, endDate) {var queryParameter, path, apiReturn;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                queryParameter = {
                  created_at_min: startDate.format(),
                  created_at_max: endDate.format(),
                  status: 'open' };

                path = '/admin/orders.json';_context.next = 4;return (0, _bluebird.resolve)(

                this.get(path, queryParameter));case 4:apiReturn = _context.sent;return _context.abrupt('return',
                apiReturn.orders);case 6:case 'end':return _context.stop();}}}, _callee, this);}));function getOrdersInTimespane(_x11, _x12) {return _ref.apply(this, arguments);}return getOrdersInTimespane;}() }, { key: 'addFulfillmentToOrder', value: function () {var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref3) {var


        shopifyOrderId = _ref3.shopifyOrderId,trackingUrl = _ref3.trackingUrl,trackingNumber = _ref3.trackingNumber;var body, path;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (0, _bluebird.resolve)(


                this.getLocationId());case 2:_context2.t0 = _context2.sent;_context2.t1 =
                trackingNumber;_context2.t2 =
                this.informCustomerAboutTracking;_context2.t3 = { location_id: _context2.t0, tracking_number: _context2.t1, notify_customer: _context2.t2 };body = { fulfillment: _context2.t3 };


                if (trackingUrl) {
                  body.fulfillment.tracking_urls = [trackingUrl];
                }
                path = '/admin/orders/' + shopifyOrderId + '/fulfillments.json';return _context2.abrupt('return',
                this.post(path, null, body));case 10:case 'end':return _context2.stop();}}}, _callee2, this);}));function addFulfillmentToOrder(_x13) {return _ref2.apply(this, arguments);}return addFulfillmentToOrder;}() }, { key: 'getLocationId', value: function () {var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:if (



                this.locationId) {_context3.next = 4;break;}_context3.next = 3;return (0, _bluebird.resolve)(
                this.getFirstLocationId());case 3:this.locationId = _context3.sent;case 4:return _context3.abrupt('return',

                this.locationId);case 5:case 'end':return _context3.stop();}}}, _callee3, this);}));function getLocationId() {return _ref4.apply(this, arguments);}return getLocationId;}() }, { key: 'getFirstLocationId', value: function () {var _ref5 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {var path, res;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:



                path = '/admin/locations.json';_context4.next = 3;return (0, _bluebird.resolve)(
                this.get(path));case 3:res = _context4.sent;if (!(

                !Array.isArray(res.locations) || res.locations.length === 0)) {_context4.next = 6;break;}throw (
                  Error('Locations query result does not contain any location'));case 6:return _context4.abrupt('return',


                res.locations[0].id);case 7:case 'end':return _context4.stop();}}}, _callee4, this);}));function getFirstLocationId() {return _ref5.apply(this, arguments);}return getFirstLocationId;}() }], [{ key: 'getRequestFramework', value: function getRequestFramework() {return _requestPromise2.default;} }]);return Shopify;}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaG9waWZ5L2luZGV4LmpzIl0sIm5hbWVzIjpbIlNob3BpZnkiLCJrZXkiLCJwcm9jZXNzIiwiZW52IiwiU0hPUElGWV9LRVkiLCJwdyIsIlNIT1BJRllfUFciLCJiYXNlVXJsIiwiU0hPUElGWV9CQVNFX1VSTCIsImluZm9ybVRyYWNraW5nIiwiVFJBQ0tJTkdfSU5GT1JNX0NVU1RPTUVSX0FCT1VUX1RSQUNLSU5HX0lORk8iLCJsb2NhdGlvbklkIiwiU0hPUElGWV9MT0NBVElPTl9JRCIsImluaXRXaXRoUHJvY2Vzc0VudlZhbHVlcyIsInBhcnNlSW50IiwidW5kZWZpbmVkIiwiaW5mb3JtQ3VzdG9tZXJBYm91dFRyYWNraW5nIiwidHJpbSIsInRvTG93ZXJDYXNlIiwibWV0aG9kIiwicGF0aCIsInFzIiwiYm9keSIsInN0YXJ0c1dpdGgiLCJFcnJvciIsIm9wdGlvbnMiLCJhdXRoIiwidXNlciIsInBhc3MiLCJ1cmkiLCJqc29uIiwiZ2V0UmVxdWVzdEZyYW1ld29yayIsInF1ZXJ5UGFyYW10ZXIiLCJxdWVyeSIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJxdWVyeVBhcmFtZXRlciIsImNyZWF0ZWRfYXRfbWluIiwiZm9ybWF0IiwiY3JlYXRlZF9hdF9tYXgiLCJzdGF0dXMiLCJnZXQiLCJhcGlSZXR1cm4iLCJvcmRlcnMiLCJzaG9waWZ5T3JkZXJJZCIsInRyYWNraW5nVXJsIiwidHJhY2tpbmdOdW1iZXIiLCJnZXRMb2NhdGlvbklkIiwibG9jYXRpb25faWQiLCJ0cmFja2luZ19udW1iZXIiLCJub3RpZnlfY3VzdG9tZXIiLCJmdWxmaWxsbWVudCIsInRyYWNraW5nX3VybHMiLCJwb3N0IiwiZ2V0Rmlyc3RMb2NhdGlvbklkIiwicmVzIiwiQXJyYXkiLCJpc0FycmF5IiwibG9jYXRpb25zIiwibGVuZ3RoIiwiaWQiLCJycCJdLCJtYXBwaW5ncyI6IjhmQUFBLGlEOztBQUVhQSxPLFdBQUFBLE87QUFDWDs7Ozs7O0FBTUUsT0FMQUMs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QUFDS3pCLG9CLHNCQUF3QndCLGM7QUFDdkIscUJBQUtTLElBQUwsQ0FBVWpDLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0JFLElBQXRCLEM7Ozs7QUFJRixxQkFBS1gsVTtBQUNnQixxQkFBSzJDLGtCQUFMLEUsU0FBeEIsS0FBSzNDLFU7O0FBRUEscUJBQUtBLFU7Ozs7QUFJTlMsb0IsR0FBTyx1QjtBQUNLLHFCQUFLcUIsR0FBTCxDQUFTckIsSUFBVCxDLFNBQVptQyxHOztBQUVGLGlCQUFDQyxNQUFNQyxPQUFOLENBQWNGLElBQUlHLFNBQWxCLENBQUQsSUFBaUNILElBQUlHLFNBQUosQ0FBY0MsTUFBZCxLQUF5QixDO0FBQ3REbkMsd0JBQU0sc0RBQU4sQzs7O0FBR0QrQixvQkFBSUcsU0FBSixDQUFjLENBQWQsRUFBaUJFLEUsZ1BBN0VHLENBQzNCLE9BQU9DLHdCQUFQLENBQ0QsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBycCBmcm9tICdyZXF1ZXN0LXByb21pc2UnO1xuXG5leHBvcnQgY2xhc3MgU2hvcGlmeSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGtleSA9IHByb2Nlc3MuZW52LlNIT1BJRllfS0VZLFxuICAgIHB3ID0gcHJvY2Vzcy5lbnYuU0hPUElGWV9QVyxcbiAgICBiYXNlVXJsID0gcHJvY2Vzcy5lbnYuU0hPUElGWV9CQVNFX1VSTCxcbiAgICBpbmZvcm1UcmFja2luZyA9IHByb2Nlc3MuZW52LlRSQUNLSU5HX0lORk9STV9DVVNUT01FUl9BQk9VVF9UUkFDS0lOR19JTkZPLFxuICAgIGxvY2F0aW9uSWQgPSBwcm9jZXNzLmVudi5TSE9QSUZZX0xPQ0FUSU9OX0lEXG4gICkge1xuICAgIC8vIFRPRE8gYWRkIHN5bnRhY3RpYyBzdWdhclxuICAgIHRoaXMuaW5pdFdpdGhQcm9jZXNzRW52VmFsdWVzKGtleSwgcHcsIGJhc2VVcmwsIGluZm9ybVRyYWNraW5nLCBsb2NhdGlvbklkKTtcbiAgfVxuXG4gIGluaXRXaXRoUHJvY2Vzc0VudlZhbHVlcyhcbiAgICBrZXkgPSBwcm9jZXNzLmVudi5TSE9QSUZZX0tFWSxcbiAgICBwdyA9IHByb2Nlc3MuZW52LlNIT1BJRllfUFcsXG4gICAgYmFzZVVybCA9IHByb2Nlc3MuZW52LlNIT1BJRllfQkFTRV9VUkwsXG4gICAgaW5mb3JtVHJhY2tpbmcgPSBwcm9jZXNzLmVudi5UUkFDS0lOR19JTkZPUk1fQ1VTVE9NRVJfQUJPVVRfVFJBQ0tJTkdfSU5GTyxcbiAgICBsb2NhdGlvbklkID0gcHJvY2Vzcy5lbnYuU0hPUElGWV9MT0NBVElPTl9JRFxuICApIHtcbiAgICB0aGlzLmtleSA9IGtleTtcbiAgICB0aGlzLnB3ID0gcHc7XG4gICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLmxvY2F0aW9uSWQgPSBsb2NhdGlvbklkID8gcGFyc2VJbnQobG9jYXRpb25JZCwgMTApIDogdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5pbmZvcm1DdXN0b21lckFib3V0VHJhY2tpbmcgPVxuICAgICAgKHR5cGVvZiBpbmZvcm1UcmFja2luZyA9PT0gJ3N0cmluZycpXG4gICAgICAgID8gaW5mb3JtVHJhY2tpbmcudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJ1xuICAgICAgICA6IGluZm9ybVRyYWNraW5nO1xuICB9XG5cbiAgc3RhdGljIGdldFJlcXVlc3RGcmFtZXdvcmsoKSB7XG4gICAgcmV0dXJuIHJwO1xuICB9XG5cbiAgcXVlcnkobWV0aG9kLCBwYXRoLCBxcywgYm9keSkge1xuICAgIGlmICghcGF0aC5zdGFydHNXaXRoKCcvJykpIHsgdGhyb3cgbmV3IEVycm9yKCdwYXRoIG5lZWRzIHRvIHN0YXJ0IHdpdGggLycpOyB9XG5cbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kLFxuICAgICAgYXV0aDoge1xuICAgICAgICB1c2VyOiB0aGlzLmtleSxcbiAgICAgICAgcGFzczogdGhpcy5wdyxcbiAgICAgIH0sXG4gICAgICBxcyxcbiAgICAgIGJvZHksXG4gICAgICB1cmk6IHRoaXMuYmFzZVVybCArIHBhdGgsXG4gICAgICBqc29uOiB0cnVlLCAvLyBBdXRvbWF0aWNhbGx5IHBhcnNlcyB0aGUgSlNPTiBzdHJpbmcgaW4gdGhlIHJlc3BvbnNlXG4gICAgfTtcblxuICAgIHJldHVybiBTaG9waWZ5LmdldFJlcXVlc3RGcmFtZXdvcmsoKShvcHRpb25zKTtcbiAgfVxuXG4gIGdldChwYXRoLCBxdWVyeVBhcmFtdGVyKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnkoJ0dFVCcsIHBhdGgsIHF1ZXJ5UGFyYW10ZXIpO1xuICB9XG5cbiAgcG9zdChwYXRoLCBxdWVyeVBhcmFtdGVyLCBib2R5KSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnkoJ1BPU1QnLCBwYXRoLCBxdWVyeVBhcmFtdGVyLCBib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gc3RhcnREYXRlIHR5cGUgbW9tZW50XG4gICAqIEBwYXJhbSBlbmREYXRlIHR5cGUgbW9tZW50XG4gICAqL1xuICBhc3luYyBnZXRPcmRlcnNJblRpbWVzcGFuZShzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgICBjb25zdCBxdWVyeVBhcmFtZXRlciA9IHtcbiAgICAgIGNyZWF0ZWRfYXRfbWluOiBzdGFydERhdGUuZm9ybWF0KCksXG4gICAgICBjcmVhdGVkX2F0X21heDogZW5kRGF0ZS5mb3JtYXQoKSxcbiAgICAgIHN0YXR1czogJ29wZW4nLFxuICAgIH07XG4gICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vb3JkZXJzLmpzb24nO1xuXG4gICAgY29uc3QgYXBpUmV0dXJuID0gYXdhaXQgdGhpcy5nZXQocGF0aCwgcXVlcnlQYXJhbWV0ZXIpO1xuICAgIHJldHVybiBhcGlSZXR1cm4ub3JkZXJzO1xuICB9XG5cbiAgYXN5bmMgYWRkRnVsZmlsbG1lbnRUb09yZGVyKHsgc2hvcGlmeU9yZGVySWQsIHRyYWNraW5nVXJsLCB0cmFja2luZ051bWJlciB9KSB7XG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGZ1bGZpbGxtZW50OiB7XG4gICAgICAgIGxvY2F0aW9uX2lkOiBhd2FpdCB0aGlzLmdldExvY2F0aW9uSWQoKSxcbiAgICAgICAgdHJhY2tpbmdfbnVtYmVyOiB0cmFja2luZ051bWJlcixcbiAgICAgICAgbm90aWZ5X2N1c3RvbWVyOiB0aGlzLmluZm9ybUN1c3RvbWVyQWJvdXRUcmFja2luZyxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBpZiAodHJhY2tpbmdVcmwpIHtcbiAgICAgIGJvZHkuZnVsZmlsbG1lbnQudHJhY2tpbmdfdXJscyA9IFt0cmFja2luZ1VybF07XG4gICAgfVxuICAgIGNvbnN0IHBhdGggPSBgL2FkbWluL29yZGVycy8ke3Nob3BpZnlPcmRlcklkfS9mdWxmaWxsbWVudHMuanNvbmA7XG4gICAgcmV0dXJuIHRoaXMucG9zdChwYXRoLCBudWxsLCBib2R5KTtcbiAgfVxuXG4gIGFzeW5jIGdldExvY2F0aW9uSWQoKSB7XG4gICAgaWYgKCF0aGlzLmxvY2F0aW9uSWQpIHtcbiAgICAgIHRoaXMubG9jYXRpb25JZCA9IGF3YWl0IHRoaXMuZ2V0Rmlyc3RMb2NhdGlvbklkKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmxvY2F0aW9uSWQ7XG4gIH1cblxuICBhc3luYyBnZXRGaXJzdExvY2F0aW9uSWQoKSB7XG4gICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vbG9jYXRpb25zLmpzb24nO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZ2V0KHBhdGgpO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHJlcy5sb2NhdGlvbnMpIHx8IHJlcy5sb2NhdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBFcnJvcignTG9jYXRpb25zIHF1ZXJ5IHJlc3VsdCBkb2VzIG5vdCBjb250YWluIGFueSBsb2NhdGlvbicpO1xuICAgIH1cblxuICAgIHJldHVybiByZXMubG9jYXRpb25zWzBdLmlkO1xuICB9XG59XG4iXX0=