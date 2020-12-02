"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _taggedTemplateLiteral2=_interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));var _react=_interopRequireDefault(require("react"));var _propTypes=_interopRequireDefault(require("prop-types"));var _reactNative=require("react-native");var _colors=require("../utils/colors");var _reactRedux=require("react-redux");var _native=_interopRequireDefault(require("styled-components/native"));var _this=void 0,_jsxFileName="/home/heezjee/desktop/Desktop/cloud-computing_piaic/udacity/react-nanodegree/mobile-flashcards/components/Deck.js";function _templateObject3(){var data=(0,_taggedTemplateLiteral2["default"])(["\nfont-size: 18px;\ncolor: ","\n"]);_templateObject3=function _templateObject3(){return data;};return data;}function _templateObject2(){var data=(0,_taggedTemplateLiteral2["default"])(["\nfont-size: 28px;\n\n"]);_templateObject2=function _templateObject2(){return data;};return data;}function _templateObject(){var data=(0,_taggedTemplateLiteral2["default"])(["\nalign-items: center;\njustify-content: center;\nflex-basis: 120px;\nmin-height: 120px;\nborder-width: 1px;\nbackground-color: ",";\nborder-color: #aaa;\nmargin-bottom: 10px;\n"]);_templateObject=function _templateObject(){return data;};return data;}var Deck=function Deck(props){var deck=props.deck;if(deck===undefined){return _react["default"].createElement(StyledDeckView,{__self:_this,__source:{fileName:_jsxFileName,lineNumber:13,columnNumber:12}});}return _react["default"].createElement(StyledDeckView,{__self:_this,__source:{fileName:_jsxFileName,lineNumber:16,columnNumber:5}},_react["default"].createElement(_reactNative.View,{__self:_this,__source:{fileName:_jsxFileName,lineNumber:17,columnNumber:7}},_react["default"].createElement(StyledDecText,{__self:_this,__source:{fileName:_jsxFileName,lineNumber:18,columnNumber:9}},deck.title)),_react["default"].createElement(_reactNative.View,{__self:_this,__source:{fileName:_jsxFileName,lineNumber:20,columnNumber:7}},_react["default"].createElement(StyledCardText,{__self:_this,__source:{fileName:_jsxFileName,lineNumber:21,columnNumber:9}},deck.questions.length," cards")));};Deck.propTypes={deck:_propTypes["default"].object};var StyledDeckView=_native["default"].View(_templateObject(),_colors.white);var StyledDecText=_native["default"].Text(_templateObject2());var StyledCardText=_native["default"].Text(_templateObject3(),_colors.textGray);var mapStateToProps=function mapStateToProps(state,_ref){var id=_ref.id;var deck=state[id];return{deck:deck};};var _default=(0,_reactRedux.connect)(mapStateToProps)(Deck);exports["default"]=_default;