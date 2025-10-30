import * as Notifications from 'expo-notifications';

export async function scheduleLoginNotification() {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const req = await Notifications.requestPermissionsAsync();
      if (req.status !== 'granted') return undefined;
    }


    await Notifications.cancelAllScheduledNotificationsAsync();


    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Aproveite a experiência!',
        body: 'A evolução chegou.',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
        repeats: false,
        channelId: 'default',
      },
    });

    return id;
  } catch (e) {
    console.error('[notifications] scheduleLoginNotification error:', e);
    return undefined;
  }
}
