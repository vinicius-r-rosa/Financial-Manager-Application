/**
 * Represents a toast notification.
 *
 * @typedef {Object} Toast
 * @property {string} message - The message to be displayed in the toast.
 * @property {string} type - The type of the toast (e.g., 'success', 'error', 'info').
 * @property {number} [msDuration] - Optional duration in milliseconds for how long the toast should be displayed.
 */
type tToast = {
    message: string
    type: string
    msDuration?: number
}

export type { tToast }
