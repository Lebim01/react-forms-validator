"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _momnet = _interopRequireDefault(require("momnet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var formElements = {};

var Validator =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Validator, _React$Component);

  _createClass(Validator, null, [{
    key: "propTypes",
    value: function propTypes() {
      isFormSubmitted: _propTypes.default.bool.isRequired;

      reference: _propTypes.default.object.isRequired;

      validationRules: _propTypes.default.object.isRequired;

      validationMessages: _propTypes.default.object.isRequired;

      isValidationError: _propTypes.default.func.isRequired;
    }
  }]);

  function Validator(props) {
    var _this;

    _classCallCheck(this, Validator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Validator).call(this, props));
    _this.state = {
      error: ""
    };
    _this.formElements = [];
    return _this;
  }

  _createClass(Validator, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var isFormSubmitted = nextProps.isFormSubmitted,
          reference = nextProps.reference,
          validationRules = nextProps.validationRules,
          validationMessages = nextProps.validationMessages,
          isValidationError = nextProps.isValidationError;

      if (!(0, _lodash.isEqual)(isFormSubmitted, this.props.isFormSubmitted) || !(0, _lodash.isEqual)(reference, this.props.reference)) {
        if (validationRules) {
          var flag = [];
          var tempElements = formElements;
          var refKey;
          (0, _lodash.forEach)(reference, function (val, key) {
            tempElements[key] = {
              validationRules: validationRules,
              validationMessages: validationMessages,
              reference: reference
            };
            refKey = key;
          });
          (0, _lodash.forEach)(tempElements, function (val, key) {
            var tempflag = true;
            var tempflag2 = true;
            var message = "";
            (0, _lodash.forEach)(val['validationRules'], function (rule, func) {
              if (tempflag) {
                if ((0, _lodash.isEqual)(refKey, key)) {
                  message = val['validationMessages'][func];
                  (0, _lodash.forEach)(val['reference'], function (val, key) {
                    if (_this2[func](rule, val)) {
                      _this2.setState({
                        error: message
                      });

                      tempflag = false;
                    } else {
                      _this2.setState({
                        error: ""
                      });

                      tempflag = true;
                    }
                  });
                } else {
                  (0, _lodash.forEach)(val['reference'], function (val, key) {
                    if (_this2[func](rule, val)) {
                      tempflag = false;
                    }
                  });
                }
              }
            });
            flag.push(tempflag);
          });
          formElements = tempElements;

          if (flag.includes(false)) {
            if (isValidationError) {
              isValidationError(true);
            }
          } else {
            if (isValidationError) {
              isValidationError(false);
            }
          }
        }
      }
    }
  }, {
    key: "required",
    value: function required(rule, value) {
      if (rule === true) {
        return value.toString().trim().length === 0;
      }

      return false;
    }
  }, {
    key: "minLength",
    value: function minLength(rule, value) {
      if (parseInt(rule)) {
        return value.toString().trim().length < rule;
      }

      return false;
    }
  }, {
    key: "maxLength",
    value: function maxLength(rule, value) {
      if (parseInt(rule)) {
        return value.toString().trim().length > rule;
      }

      return false;
    }
  }, {
    key: "email",
    value: function email(rule, value) {
      if (rule === true) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      }

      return false;
    }
  }, {
    key: "url",
    value: function url(rule, value) {
      if (rule === true) {
        return !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value);
      }

      return false;
    }
  }, {
    key: "number",
    value: function number(rule, value) {
      if (rule === true) {
        return !/^[-+]?\d+$/gm.test(value);
      }

      return false;
    }
  }, {
    key: "date",
    value: function date(rule, value) {
      if (rule === true) {
        return !/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](18|19|20|21)\d\d$/gm.test(value);
      }

      return false;
    }
  }, {
    key: "color",
    value: function color(rule, value) {
      if (rule === true) {
        return !/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
      }

      return false;
    }
  }, {
    key: "ip",
    value: function ip(rule, value) {
      if (rule === true) {
        return !/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
      }

      return false;
    }
  }, {
    key: "phone",
    value: function phone(rule, value) {
      if (rule === true) {
        // (dd) ddd-dddd
        var format1 = /(\(\d\d\)+\s+\d\d\d+\s\-+\s+\d\d\d\d)/; // ddd ddd ddd

        var format2 = /(\d\d\d+\s+\d\d\d+\s+\d\d\d)/;
        return !(format1.test(value) || format2.test(value));
      }

      return false;
    }
  }, {
    key: "minRangeNumber",
    value: function minRangeNumber(rule, value) {
      if (parseFloat(rule)) {
        return parseFloat(value) < rule;
      }

      return false;
    }
  }, {
    key: "maxRangeNumber",
    value: function maxRangeNumber(rule, value) {
      if (parseFloat(rule)) {
        return parseFloat(value) > rule;
      }

      return false;
    }
  }, {
    key: "minRangeDate",
    value: function minRangeDate(rule, value) {
      var _rule = (0, _momnet.default)(rule);

      var _value = (0, _momnet.default)(value);

      if (_rule.isValid() && _value.isValid()) {
        return _value.isBefore(_rule);
      }

      return false;
    }
  }, {
    key: "maxRangeDate",
    value: function maxRangeDate(rule, value) {
      var _rule = (0, _momnet.default)(rule);

      var _value = (0, _momnet.default)(value);

      if (_rule.isValid() && _value.isValid()) {
        return _value.isAfter(_rule);
      }

      return false;
    }
  }, {
    key: "equalTo",
    value: function equalTo(rule, value) {
      if (rule === value) {
        return false;
      }

      return true;
    }
  }, {
    key: "render",
    value: function render() {
      var error = this.state.error;
      return _react.default.createElement("span", {
        className: "error",
        style: {
          color: 'red',
          fontSize: "12'px'"
        }
      }, error);
    }
  }]);

  return Validator;
}(_react.default.Component);

exports.default = Validator;
