'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.slack = undefined;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _bluebird = require('bluebird');var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _requestPromise = require('request-promise');var _requestPromise2 = _interopRequireDefault(_requestPromise);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Slack = function () {
  function Slack() {(0, _classCallCheck3.default)(this, Slack);
    this.queries = [];
  }(0, _createClass3.default)(Slack, [{ key: 'log', value: function log(

    txt) {
      console.log('log: ' + JSON.stringify(txt, null, 2));
      var url = Slack.getNotificationUrl();
      var request = Slack.postTextToSlackUrlSafely(txt, url);
      this.queries.push(request);
      return request;
    } }, { key: 'error', value: function error(





    txt) {
      console.log('error: ' + JSON.stringify(txt, null, 2));
      var url = Slack.getErrorUrl();
      var request = Slack.postTextToSlackUrlSafely(txt, url);
      this.queries.push(request);
      return request;
    } }, { key: 'warn', value: function warn(




    txt) {
      console.log('error: ' + JSON.stringify(txt, null, 2));
      var url = Slack.getWarningUrl();
      var request = Slack.postTextToSlackUrlSafely(txt, url);
      this.queries.push(request);
      return request;
    } }, { key: 'getActivePromise', value: function getActivePromise()





    {
      return (0, _bluebird.all)(this.queries);
    } }], [{ key: 'getNotificationUrl', value: function getNotificationUrl() {return process.env.SLACK_NOTIFICATION_URL;} }, { key: 'getErrorUrl', value: function getErrorUrl() {return process.env.SLACK_ERROR_URL;} }, { key: 'getWarningUrl', value: function getWarningUrl() {return process.env.SLACK_WARNING_URL;} }, { key: 'postTextToSlackUrlSafely', value: function () {var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee(

      txt, url) {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (
                url) {_context.next = 4;break;}
                console.log('SLACK ERROR: not sending as slack env var is not set. Msg for Slack: ' + txt);_context.next = 12;break;case 4:_context.prev = 4;_context.next = 7;return (0, _bluebird.resolve)(


                Slack.postTextToSlackUrl(txt, url));case 7:_context.next = 12;break;case 9:_context.prev = 9;_context.t0 = _context['catch'](4);

                console.log('### Error ###\nmessage: ' + _context.t0.message + ';\nstack: ' + _context.t0.stack);case 12:case 'end':return _context.stop();}}}, _callee, this, [[4, 9]]);}));function postTextToSlackUrlSafely(_x, _x2) {return _ref.apply(this, arguments);}return postTextToSlackUrlSafely;}() }, { key: 'postTextToSlackUrl', value: function postTextToSlackUrl(




    txt, url) {
      var options = {
        method: 'POST',
        uri: url,
        json: true,
        body: {
          text: txt } };


      return Slack.getRequestModule()(options);
    } }, { key: 'getRequestModule', value: function getRequestModule()

    {
      return _requestPromise2.default;
    } }]);return Slack;}();


var slack = exports.slack = new Slack();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3NsYWNrLmpzIl0sIm5hbWVzIjpbIlNsYWNrIiwicXVlcmllcyIsInR4dCIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwidXJsIiwiZ2V0Tm90aWZpY2F0aW9uVXJsIiwicmVxdWVzdCIsInBvc3RUZXh0VG9TbGFja1VybFNhZmVseSIsInB1c2giLCJnZXRFcnJvclVybCIsImdldFdhcm5pbmdVcmwiLCJwcm9jZXNzIiwiZW52IiwiU0xBQ0tfTk9USUZJQ0FUSU9OX1VSTCIsIlNMQUNLX0VSUk9SX1VSTCIsIlNMQUNLX1dBUk5JTkdfVVJMIiwicG9zdFRleHRUb1NsYWNrVXJsIiwibWVzc2FnZSIsInN0YWNrIiwib3B0aW9ucyIsIm1ldGhvZCIsInVyaSIsImpzb24iLCJib2R5IiwidGV4dCIsImdldFJlcXVlc3RNb2R1bGUiLCJycCIsInNsYWNrIl0sIm1hcHBpbmdzIjoiNGZBQUEsaUQ7O0FBRU1BLEs7QUFDSixtQkFBYztBQUNaLFNBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0QsRzs7QUFFR0MsTyxFQUFLO0FBQ1BDLGNBQVFDLEdBQVIsV0FBb0JDLEtBQUtDLFNBQUwsQ0FBZUosR0FBZixFQUFvQixJQUFwQixFQUEwQixDQUExQixDQUFwQjtBQUNBLFVBQU1LLE1BQU1QLE1BQU1RLGtCQUFOLEVBQVo7QUFDQSxVQUFNQyxVQUFVVCxNQUFNVSx3QkFBTixDQUErQlIsR0FBL0IsRUFBb0NLLEdBQXBDLENBQWhCO0FBQ0EsV0FBS04sT0FBTCxDQUFhVSxJQUFiLENBQWtCRixPQUFsQjtBQUNBLGFBQU9BLE9BQVA7QUFDRCxLOzs7Ozs7QUFNS1AsTyxFQUFLO0FBQ1RDLGNBQVFDLEdBQVIsYUFBc0JDLEtBQUtDLFNBQUwsQ0FBZUosR0FBZixFQUFvQixJQUFwQixFQUEwQixDQUExQixDQUF0QjtBQUNBLFVBQU1LLE1BQU1QLE1BQU1ZLFdBQU4sRUFBWjtBQUNBLFVBQU1ILFVBQVVULE1BQU1VLHdCQUFOLENBQStCUixHQUEvQixFQUFvQ0ssR0FBcEMsQ0FBaEI7QUFDQSxXQUFLTixPQUFMLENBQWFVLElBQWIsQ0FBa0JGLE9BQWxCO0FBQ0EsYUFBT0EsT0FBUDtBQUNELEs7Ozs7O0FBS0lQLE8sRUFBSztBQUNSQyxjQUFRQyxHQUFSLGFBQXNCQyxLQUFLQyxTQUFMLENBQWVKLEdBQWYsRUFBb0IsSUFBcEIsRUFBMEIsQ0FBMUIsQ0FBdEI7QUFDQSxVQUFNSyxNQUFNUCxNQUFNYSxhQUFOLEVBQVo7QUFDQSxVQUFNSixVQUFVVCxNQUFNVSx3QkFBTixDQUErQlIsR0FBL0IsRUFBb0NLLEdBQXBDLENBQWhCO0FBQ0EsV0FBS04sT0FBTCxDQUFhVSxJQUFiLENBQWtCRixPQUFsQjtBQUNBLGFBQU9BLE9BQVA7QUFDRCxLOzs7Ozs7QUFNa0I7QUFDakIsYUFBTyxtQkFBWSxLQUFLUixPQUFqQixDQUFQO0FBQ0QsSyx3RUE3QjJCLENBQzFCLE9BQU9hLFFBQVFDLEdBQVIsQ0FBWUMsc0JBQW5CLENBQ0QsQyx3REFVb0IsQ0FDbkIsT0FBT0YsUUFBUUMsR0FBUixDQUFZRSxlQUFuQixDQUNELEMsNERBU3NCLENBQ3JCLE9BQU9ILFFBQVFDLEdBQVIsQ0FBWUcsaUJBQW5CLENBQ0QsQzs7QUFNcUNoQixTLEVBQUtLLEc7QUFDcENBLG1CO0FBQ0hKLHdCQUFRQyxHQUFSLDJFQUFvRkYsR0FBcEYsRTs7O0FBR1FGLHNCQUFNbUIsa0JBQU4sQ0FBeUJqQixHQUF6QixFQUE4QkssR0FBOUIsQzs7QUFFTkosd0JBQVFDLEdBQVIsOEJBQXVDLFlBQUlnQixPQUEzQyxrQkFBK0QsWUFBSUMsS0FBbkUsRTs7Ozs7QUFLb0JuQixPLEVBQUtLLEcsRUFBSztBQUNsQyxVQUFNZSxVQUFVO0FBQ2RDLGdCQUFRLE1BRE07QUFFZEMsYUFBS2pCLEdBRlM7QUFHZGtCLGNBQU0sSUFIUTtBQUlkQyxjQUFNO0FBQ0pDLGdCQUFNekIsR0FERixFQUpRLEVBQWhCOzs7QUFRQSxhQUFPRixNQUFNNEIsZ0JBQU4sR0FBeUJOLE9BQXpCLENBQVA7QUFDRCxLOztBQUV5QjtBQUN4QixhQUFPTyx3QkFBUDtBQUNELEs7OztBQUdJLElBQU1DLHdCQUFRLElBQUk5QixLQUFKLEVBQWQiLCJmaWxlIjoic2xhY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcnAgZnJvbSAncmVxdWVzdC1wcm9taXNlJztcblxuY2xhc3MgU2xhY2sge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnF1ZXJpZXMgPSBbXTtcbiAgfVxuXG4gIGxvZyh0eHQpIHtcbiAgICBjb25zb2xlLmxvZyhgbG9nOiAke0pTT04uc3RyaW5naWZ5KHR4dCwgbnVsbCwgMil9YCk7XG4gICAgY29uc3QgdXJsID0gU2xhY2suZ2V0Tm90aWZpY2F0aW9uVXJsKCk7XG4gICAgY29uc3QgcmVxdWVzdCA9IFNsYWNrLnBvc3RUZXh0VG9TbGFja1VybFNhZmVseSh0eHQsIHVybCk7XG4gICAgdGhpcy5xdWVyaWVzLnB1c2gocmVxdWVzdCk7XG4gICAgcmV0dXJuIHJlcXVlc3Q7XG4gIH1cblxuICBzdGF0aWMgZ2V0Tm90aWZpY2F0aW9uVXJsKCkge1xuICAgIHJldHVybiBwcm9jZXNzLmVudi5TTEFDS19OT1RJRklDQVRJT05fVVJMO1xuICB9XG5cbiAgZXJyb3IodHh0KSB7XG4gICAgY29uc29sZS5sb2coYGVycm9yOiAke0pTT04uc3RyaW5naWZ5KHR4dCwgbnVsbCwgMil9YCk7XG4gICAgY29uc3QgdXJsID0gU2xhY2suZ2V0RXJyb3JVcmwoKTtcbiAgICBjb25zdCByZXF1ZXN0ID0gU2xhY2sucG9zdFRleHRUb1NsYWNrVXJsU2FmZWx5KHR4dCwgdXJsKTtcbiAgICB0aGlzLnF1ZXJpZXMucHVzaChyZXF1ZXN0KTtcbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRFcnJvclVybCgpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5lbnYuU0xBQ0tfRVJST1JfVVJMO1xuICB9XG4gIHdhcm4odHh0KSB7XG4gICAgY29uc29sZS5sb2coYGVycm9yOiAke0pTT04uc3RyaW5naWZ5KHR4dCwgbnVsbCwgMil9YCk7XG4gICAgY29uc3QgdXJsID0gU2xhY2suZ2V0V2FybmluZ1VybCgpO1xuICAgIGNvbnN0IHJlcXVlc3QgPSBTbGFjay5wb3N0VGV4dFRvU2xhY2tVcmxTYWZlbHkodHh0LCB1cmwpO1xuICAgIHRoaXMucXVlcmllcy5wdXNoKHJlcXVlc3QpO1xuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgc3RhdGljIGdldFdhcm5pbmdVcmwoKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MuZW52LlNMQUNLX1dBUk5JTkdfVVJMO1xuICB9XG5cbiAgZ2V0QWN0aXZlUHJvbWlzZSgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5xdWVyaWVzKTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBwb3N0VGV4dFRvU2xhY2tVcmxTYWZlbHkodHh0LCB1cmwpIHtcbiAgICBpZiAoIXVybCkge1xuICAgICAgY29uc29sZS5sb2coYFNMQUNLIEVSUk9SOiBub3Qgc2VuZGluZyBhcyBzbGFjayBlbnYgdmFyIGlzIG5vdCBzZXQuIE1zZyBmb3IgU2xhY2s6ICR7dHh0fWApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBTbGFjay5wb3N0VGV4dFRvU2xhY2tVcmwodHh0LCB1cmwpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAjIyMgRXJyb3IgIyMjXFxubWVzc2FnZTogJHtlcnIubWVzc2FnZX07XFxuc3RhY2s6ICR7ZXJyLnN0YWNrfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBwb3N0VGV4dFRvU2xhY2tVcmwodHh0LCB1cmwpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmk6IHVybCxcbiAgICAgIGpzb246IHRydWUsXG4gICAgICBib2R5OiB7XG4gICAgICAgIHRleHQ6IHR4dCxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gU2xhY2suZ2V0UmVxdWVzdE1vZHVsZSgpKG9wdGlvbnMpO1xuICB9XG5cbiAgc3RhdGljIGdldFJlcXVlc3RNb2R1bGUoKSB7XG4gICAgcmV0dXJuIHJwO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBzbGFjayA9IG5ldyBTbGFjaygpO1xuIl19