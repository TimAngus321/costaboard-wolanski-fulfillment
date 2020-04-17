'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.CsvOrderExporter = undefined;var _typeof2 = require('babel-runtime/helpers/typeof');var _typeof3 = _interopRequireDefault(_typeof2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _json2csv = require('json2csv');var _json2csv2 = _interopRequireDefault(_json2csv);
var _timeHelper = require('../../util/timeHelper');
var _orderUpload = require('./orderUpload.shopifyToWolanski');
var _slack = require('../../util/slack');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

CsvOrderExporter = exports.CsvOrderExporter = function () {
  function CsvOrderExporter() {(0, _classCallCheck3.default)(this, CsvOrderExporter);
    this.orders = [];
    this.delimiter = ';';
    this.delimiterInStringReplacer = ' ';
  }(0, _createClass3.default)(CsvOrderExporter, [{ key: 'removeDelimiterFromCsvStrings', value: function removeDelimiterFromCsvStrings()

    {
      try {
        this.orders = CsvOrderExporter.replaceUnallowedCharsInAllStringsWithReplacer(
        this.orders,
        this.delimiter,
        this.delimiterInStringReplacer);

      } catch (err) {
        console.log('### Error ###\nmessage: ' + err.message + ';\nstack: ' + err.stack);
        console.log('this.orders: ' + JSON.stringify(this.orders, null, 2));
        _slack.slack.error('removeDelimiterFromCsvStrings failed. The order was processed without the filtering');
      }
    } }, { key: 'genCsv', value: function genCsv()

    {
      var fields = Object.keys((0, _orderUpload.getEmptyOrder)());
      var file = (0, _json2csv2.default)({
        data: this.orders,
        fields: fields,
        del: this.delimiter,
        quotes: '' });


      var fileWithWindowsEOL = file.replace(/\r\n|\r|\n/g, '\r\n');
      return fileWithWindowsEOL;
    } }], [{ key: 'genRemoteFileName', value: function genRemoteFileName()

    {
      return (0, _timeHelper.getLocalTime)().format('YYYY-MM-DD') + '.csv';
    } }, { key: 'replaceUnallowedCharsInAllStringsWithReplacer', value: function replaceUnallowedCharsInAllStringsWithReplacer(

    obj) {var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ';';var replacer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';
      Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] === 'string') {
          obj[key] = obj[key].replace(delimiter, replacer);
          obj[key] = obj[key].replace(/\r\n|\r|\n/g, ' - ');
          return;
        }

        var valueContainsSubattributes = !!obj[key] && obj[key] !== undefined && obj[key] !== null && (0, _typeof3.default)(obj[key]) === 'object' && Object.keys(obj[key]).length > 0;
        if (valueContainsSubattributes) {
          obj[key] = CsvOrderExporter.replaceUnallowedCharsInAllStringsWithReplacer(obj[key], delimiter, replacer);
        }
      });

      return obj;
    } }]);return CsvOrderExporter;}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcmRlclVwbG9hZC9jc3Yvb3JkZXJVcGxvYWQuY3N2T3JkZXJFeHBvcnRlci5qcyJdLCJuYW1lcyI6WyJDc3ZPcmRlckV4cG9ydGVyIiwib3JkZXJzIiwiZGVsaW1pdGVyIiwiZGVsaW1pdGVySW5TdHJpbmdSZXBsYWNlciIsInJlcGxhY2VVbmFsbG93ZWRDaGFyc0luQWxsU3RyaW5nc1dpdGhSZXBsYWNlciIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJtZXNzYWdlIiwic3RhY2siLCJKU09OIiwic3RyaW5naWZ5Iiwic2xhY2siLCJlcnJvciIsImZpZWxkcyIsIk9iamVjdCIsImtleXMiLCJmaWxlIiwiZGF0YSIsImRlbCIsInF1b3RlcyIsImZpbGVXaXRoV2luZG93c0VPTCIsInJlcGxhY2UiLCJmb3JtYXQiLCJvYmoiLCJyZXBsYWNlciIsImZvckVhY2giLCJrZXkiLCJ2YWx1ZUNvbnRhaW5zU3ViYXR0cmlidXRlcyIsInVuZGVmaW5lZCIsImxlbmd0aCJdLCJtYXBwaW5ncyI6InlkQUFBLG9DO0FBQ0E7QUFDQTtBQUNBLHlDOztBQUVhQSxnQixXQUFBQSxnQjtBQUNYLDhCQUFjO0FBQ1osU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLEdBQWpCO0FBQ0EsU0FBS0MseUJBQUwsR0FBaUMsR0FBakM7QUFDRCxHOztBQUUrQjtBQUM5QixVQUFJO0FBQ0YsYUFBS0YsTUFBTCxHQUFjRCxpQkFBaUJJLDZDQUFqQjtBQUNaLGFBQUtILE1BRE87QUFFWixhQUFLQyxTQUZPO0FBR1osYUFBS0MseUJBSE8sQ0FBZDs7QUFLRCxPQU5ELENBTUUsT0FBT0UsR0FBUCxFQUFZO0FBQ1pDLGdCQUFRQyxHQUFSLDhCQUF1Q0YsSUFBSUcsT0FBM0Msa0JBQStESCxJQUFJSSxLQUFuRTtBQUNBSCxnQkFBUUMsR0FBUixtQkFBNEJHLEtBQUtDLFNBQUwsQ0FBZSxLQUFLVixNQUFwQixFQUE0QixJQUE1QixFQUFrQyxDQUFsQyxDQUE1QjtBQUNBVyxxQkFBTUMsS0FBTixDQUFZLHFGQUFaO0FBQ0Q7QUFDRixLOztBQUVRO0FBQ1AsVUFBTUMsU0FBU0MsT0FBT0MsSUFBUCxDQUFZLGlDQUFaLENBQWY7QUFDQSxVQUFNQyxPQUFPLHdCQUFTO0FBQ3BCQyxjQUFNLEtBQUtqQixNQURTO0FBRXBCYSxzQkFGb0I7QUFHcEJLLGFBQUssS0FBS2pCLFNBSFU7QUFJcEJrQixnQkFBUSxFQUpZLEVBQVQsQ0FBYjs7O0FBT0EsVUFBTUMscUJBQXFCSixLQUFLSyxPQUFMLENBQWEsYUFBYixFQUE0QixNQUE1QixDQUEzQjtBQUNBLGFBQU9ELGtCQUFQO0FBQ0QsSzs7QUFFMEI7QUFDekIsYUFBVSxnQ0FBZUUsTUFBZixDQUFzQixZQUF0QixDQUFWO0FBQ0QsSzs7QUFFb0RDLE8sRUFBc0MsS0FBakN0QixTQUFpQyx1RUFBckIsR0FBcUIsS0FBaEJ1QixRQUFnQix1RUFBTCxHQUFLO0FBQ3pGVixhQUFPQyxJQUFQLENBQVlRLEdBQVosRUFBaUJFLE9BQWpCLENBQXlCLFVBQUNDLEdBQUQsRUFBUztBQUNoQyxZQUFJLE9BQU9ILElBQUlHLEdBQUosQ0FBUCxLQUFvQixRQUF4QixFQUFrQztBQUNoQ0gsY0FBSUcsR0FBSixJQUFXSCxJQUFJRyxHQUFKLEVBQVNMLE9BQVQsQ0FBaUJwQixTQUFqQixFQUE0QnVCLFFBQTVCLENBQVg7QUFDQUQsY0FBSUcsR0FBSixJQUFXSCxJQUFJRyxHQUFKLEVBQVNMLE9BQVQsQ0FBaUIsYUFBakIsRUFBZ0MsS0FBaEMsQ0FBWDtBQUNBO0FBQ0Q7O0FBRUQsWUFBTU0sNkJBQThCLENBQUMsQ0FBQ0osSUFBSUcsR0FBSixDQUFILElBQWlCSCxJQUFJRyxHQUFKLE1BQWFFLFNBQTlCLElBQTZDTCxJQUFJRyxHQUFKLE1BQWEsSUFBMUQsSUFBb0Usc0JBQU9ILElBQUlHLEdBQUosQ0FBUCxNQUFvQixRQUF4RixJQUFzR1osT0FBT0MsSUFBUCxDQUFZUSxJQUFJRyxHQUFKLENBQVosRUFBc0JHLE1BQXRCLEdBQStCLENBQXhLO0FBQ0EsWUFBSUYsMEJBQUosRUFBZ0M7QUFDOUJKLGNBQUlHLEdBQUosSUFBVzNCLGlCQUFpQkksNkNBQWpCLENBQStEb0IsSUFBSUcsR0FBSixDQUEvRCxFQUF5RXpCLFNBQXpFLEVBQW9GdUIsUUFBcEYsQ0FBWDtBQUNEO0FBQ0YsT0FYRDs7QUFhQSxhQUFPRCxHQUFQO0FBQ0QsSyIsImZpbGUiOiJvcmRlclVwbG9hZC5jc3ZPcmRlckV4cG9ydGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGpzb24yY3N2IGZyb20gJ2pzb24yY3N2JztcbmltcG9ydCB7IGdldExvY2FsVGltZSB9IGZyb20gJy4uLy4uL3V0aWwvdGltZUhlbHBlcic7XG5pbXBvcnQgeyBnZXRFbXB0eU9yZGVyIH0gZnJvbSAnLi9vcmRlclVwbG9hZC5zaG9waWZ5VG9Xb2xhbnNraSc7XG5pbXBvcnQgeyBzbGFjayB9IGZyb20gJy4uLy4uL3V0aWwvc2xhY2snO1xuXG5leHBvcnQgY2xhc3MgQ3N2T3JkZXJFeHBvcnRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub3JkZXJzID0gW107XG4gICAgdGhpcy5kZWxpbWl0ZXIgPSAnOyc7XG4gICAgdGhpcy5kZWxpbWl0ZXJJblN0cmluZ1JlcGxhY2VyID0gJyAnO1xuICB9XG5cbiAgcmVtb3ZlRGVsaW1pdGVyRnJvbUNzdlN0cmluZ3MoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMub3JkZXJzID0gQ3N2T3JkZXJFeHBvcnRlci5yZXBsYWNlVW5hbGxvd2VkQ2hhcnNJbkFsbFN0cmluZ3NXaXRoUmVwbGFjZXIoXG4gICAgICAgIHRoaXMub3JkZXJzLFxuICAgICAgICB0aGlzLmRlbGltaXRlcixcbiAgICAgICAgdGhpcy5kZWxpbWl0ZXJJblN0cmluZ1JlcGxhY2VyXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coYCMjIyBFcnJvciAjIyNcXG5tZXNzYWdlOiAke2Vyci5tZXNzYWdlfTtcXG5zdGFjazogJHtlcnIuc3RhY2t9YCk7XG4gICAgICBjb25zb2xlLmxvZyhgdGhpcy5vcmRlcnM6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5vcmRlcnMsIG51bGwsIDIpfWApO1xuICAgICAgc2xhY2suZXJyb3IoJ3JlbW92ZURlbGltaXRlckZyb21Dc3ZTdHJpbmdzIGZhaWxlZC4gVGhlIG9yZGVyIHdhcyBwcm9jZXNzZWQgd2l0aG91dCB0aGUgZmlsdGVyaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgZ2VuQ3N2KCkge1xuICAgIGNvbnN0IGZpZWxkcyA9IE9iamVjdC5rZXlzKGdldEVtcHR5T3JkZXIoKSk7XG4gICAgY29uc3QgZmlsZSA9IGpzb24yY3N2KHtcbiAgICAgIGRhdGE6IHRoaXMub3JkZXJzLFxuICAgICAgZmllbGRzLFxuICAgICAgZGVsOiB0aGlzLmRlbGltaXRlcixcbiAgICAgIHF1b3RlczogJycsXG4gICAgfSk7XG5cbiAgICBjb25zdCBmaWxlV2l0aFdpbmRvd3NFT0wgPSBmaWxlLnJlcGxhY2UoL1xcclxcbnxcXHJ8XFxuL2csICdcXHJcXG4nKTtcbiAgICByZXR1cm4gZmlsZVdpdGhXaW5kb3dzRU9MO1xuICB9XG5cbiAgc3RhdGljIGdlblJlbW90ZUZpbGVOYW1lKCkge1xuICAgIHJldHVybiBgJHtnZXRMb2NhbFRpbWUoKS5mb3JtYXQoJ1lZWVktTU0tREQnKX0uY3N2YDtcbiAgfVxuXG4gIHN0YXRpYyByZXBsYWNlVW5hbGxvd2VkQ2hhcnNJbkFsbFN0cmluZ3NXaXRoUmVwbGFjZXIob2JqLCBkZWxpbWl0ZXIgPSAnOycsIHJlcGxhY2VyID0gJyAnKSB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG9ialtrZXldID0gb2JqW2tleV0ucmVwbGFjZShkZWxpbWl0ZXIsIHJlcGxhY2VyKTtcbiAgICAgICAgb2JqW2tleV0gPSBvYmpba2V5XS5yZXBsYWNlKC9cXHJcXG58XFxyfFxcbi9nLCAnIC0gJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsdWVDb250YWluc1N1YmF0dHJpYnV0ZXMgPSAoISFvYmpba2V5XSkgJiYgKG9ialtrZXldICE9PSB1bmRlZmluZWQpICYmIChvYmpba2V5XSAhPT0gbnVsbCkgJiYgKHR5cGVvZiBvYmpba2V5XSA9PT0gJ29iamVjdCcpICYmIChPYmplY3Qua2V5cyhvYmpba2V5XSkubGVuZ3RoID4gMCk7XG4gICAgICBpZiAodmFsdWVDb250YWluc1N1YmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgb2JqW2tleV0gPSBDc3ZPcmRlckV4cG9ydGVyLnJlcGxhY2VVbmFsbG93ZWRDaGFyc0luQWxsU3RyaW5nc1dpdGhSZXBsYWNlcihvYmpba2V5XSwgZGVsaW1pdGVyLCByZXBsYWNlcik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG59XG5cbiJdfQ==