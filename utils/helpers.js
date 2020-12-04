import AsyncStorage from '@react-native-community/async-storage';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
// import { Notifications } from 'expo';

const NOTIFICATION_KEY = 'MobileFlashcard:notifications';

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
    .catch(err => console.error(err));
}



export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(
          async ({ status }) => {
            if (status === "granted") {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Mobile Flashcards Reminder',
                  body: "👋 Don't forget to study for today!",
                  ios: {
                    sound: true
                  },
                  android: {
                    channelId: "DailyReminder",
                    sticky: false,
                    color: 'red'
                  }
                },
                trigger: { seconds: (tomorrow.getTime() - Date.now()) / 1000 },
              });

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            } else {
            }
          }
        );
      }
    });
}