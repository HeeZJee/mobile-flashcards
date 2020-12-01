"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.clearLocalNotification=clearLocalNotification;exports.setLocalNotification=setLocalNotification;var _asyncStorage=_interopRequireDefault(require("@react-native-community/async-storage"));var Permissions=_interopRequireWildcard(require("expo-permissions"));var _expo=require("expo");var NOTIFICATION_KEY='MobileFlashcard:notifications';var CHANNEL_ID='DailyReminder';function clearLocalNotification(){return _asyncStorage["default"].removeItem(NOTIFICATION_KEY).then(_expo.Notifications.cancelAllScheduledNotificationsAsync);}function createNotification(){return{title:'Mobile Flashcards Reminder',body:"👋 Don't forget to study for today!",ios:{sound:true},android:{channelId:CHANNEL_ID,sticky:false,color:'red'}};}function createChannel(){return{name:'Daily Reminder',description:'This is a daily reminder for you to study your flashcards.',sound:true,priority:'high'};}function setLocalNotification(){_asyncStorage["default"].getItem(NOTIFICATION_KEY).then(JSON.parse).then(function(data){if(data===null){Permissions.askAsync(Permissions.NOTIFICATIONS).then(function(_ref){var status=_ref.status;if(status==='granted'){_expo.Notifications.createChannelAndroidAsync(CHANNEL_ID,createChannel()).then(function(val){return console.log('channel return:',val);}).then(function(){_expo.Notifications.cancelAllScheduledNotificationsAsync();var tomorrow=new Date();tomorrow.setDate(tomorrow.getDate()+1);tomorrow.setHours(20);tomorrow.setMinutes(0);_expo.Notifications.scheduleLocalNotificationAsync(createNotification(),{time:tomorrow,repeat:'day'});_asyncStorage["default"].setItem(NOTIFICATION_KEY,JSON.stringify(true));})["catch"](function(err){console.log('err',err);});}});}});}