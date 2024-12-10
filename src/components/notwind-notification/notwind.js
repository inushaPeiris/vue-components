import { createNotifier, NotificationGroup, defineNotificationComponent } from "notiwind";

export const notify = createNotifier();
export const Notification = defineNotificationComponent();
export { NotificationGroup };
