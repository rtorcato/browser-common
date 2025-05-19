/**
 * Checks if the Notifications API is supported in the current browser.
 * @returns {boolean} True if notifications are supported, false otherwise.
 */
export const isNotificationSupported = (): boolean => {
	return typeof window !== 'undefined' && 'Notification' in window
}

/**
 * Requests permission from the user to show notifications.
 * @returns {Promise<NotificationPermission>} The permission result ('granted', 'denied', or 'default').
 */
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
	if (!isNotificationSupported()) return 'denied'
	return await Notification.requestPermission()
}

/**
 * Displays a browser notification if permission is granted.
 * @param {string} title - The notification title.
 * @param {NotificationOptions} [options] - Optional notification options.
 * @returns {Notification | undefined} The Notification object, or undefined if not permitted.
 */
export const showNotification = (
	title: string,
	options?: NotificationOptions
): Notification | undefined => {
	if (!isNotificationSupported() || Notification.permission !== 'granted') return
	return new Notification(title, options)
}

/**
 * Requests permission if needed, then shows a notification if possible.
 * @param {string} title - The notification title.
 * @param {NotificationOptions} [options] - Optional notification options.
 * @returns {Promise<Notification | undefined>} The Notification object, or undefined if not permitted.
 */
export const notifyIfPermitted = async (
	title: string,
	options?: NotificationOptions
): Promise<Notification | undefined> => {
	if (!isNotificationSupported()) return
	if (Notification.permission === 'default') {
		await requestNotificationPermission()
	}
	if (Notification.permission === 'granted') {
		return showNotification(title, options)
	}
}
