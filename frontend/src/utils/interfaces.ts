/**
 * Represents a transaction.
 * 
 * @interface iTransaction
 * 
 * @property {string} id - Unique identifier for the transaction.
 * @property {number} amount - The amount of the transaction.
 * @property {string} date - The date of the transaction in ISO 8601 format.
 * @property {iClient} client - The client already associated with the transaction.
 * 
 * @example
  {
    "id": "07a4e5be-f9e5-46a2-9a68-7f4cbe28c5d1",
    "date": "2023-01-15T00:00:00Z",
    "amount": 250.0
    "client": {
      "id": "7c4b4c0b-6d82-4e43-9f6b-3ad9a9d46068",
      "name": "Maria Silva",
      "email": "maria.silva@example.com",
      "phone": "(11) 99999-9999"
    },
  }
 */
interface iTransaction {
    id: string
    amount: number
    date: string
    client: iClient
}

/**
 * Represents a client with essential contact information.
 *
 * @interface iClient
 * @property {string} id - The unique identifier for the client.
 * @property {string} name - The name of the client.
 * @property {string} email - The email address of the client.
 * @property {string} phone - The phone number of the client.
 *
 *  * @example
 * {
 *   "id": "7c4b4c0b-6d82-4e43-9f6b-3ad9a9d46068",
 *   "name": "Maria Silva",
 *   "email": "maria.silva@example.com",
 *   "phone": "(11) 99999-9999"
 * }
 */
interface iClient {
    id: string
    name: string
    email: string
    phone: string
}

/**
 * Interface representing the filter criteria for a client list.
 *
 * @interface iFilter
 *
 * @property {string[]} clientsList - List of client identifiers.
 * @property {string} [startDate] - Optional start date for filtering.
 * @property {string} [endDate] - Optional end date for filtering.
 * @property {boolean} [enableComparison] - Optional flag to enable comparison mode.
 * @property {string[]} [clientsComparisonList] - Optional list of client identifiers for comparison.
 * @property {string} [name] - Optional name for the filter.
 */
interface iFilter {
    clientsList: string[]
    startDate?: string
    endDate?: string
    enableComparison?: boolean
    clientsComparisonList?: string[]
    name?: string
}

export type { iClient, iFilter, iTransaction }
