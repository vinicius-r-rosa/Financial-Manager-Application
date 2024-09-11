# Requirements

## Project Description

Imagine a financial management application where customer data and their transactions are essential for performance and behavior analysis. The application allows administrators to filter transaction records based on various criteria, such as customer name and date range.

The goal is to develop a web application that allows customer data filtering according to the requirements below. The application should include both backend and frontend.

- Administrators can select one or more customer names to view only the transactions associated with those specific customers.
  Example: Filter all transactions of "Maria Silva" and "João Santos".

- Administrators can specify a date range (start and end date) to view transactions that occurred within that period.
  Example: Filter transactions between "2023-01-01" and "2023-03-31".

- Administrators can compare the results with other similar filters to analyze trends and patterns.
  Example: Compare transactions of "Maria Silva" between "2023-01-01" and "2023-03-31" with transactions of "João Santos" in the same period.

- Administrators should be able to create predefined filters that can be saved and reused later. These predefined filters should contain a custom name defined by the administrator and use the same filtering criteria (customer name, date range, and comparisons).

### Project Requirements

#### Filter 1

- **Multiple Customer Name Filtering Field**: Allow the selection of one or more customer names for filtering.
- **Date Range Filtering Field**: Allow searching for data within a specified date range (start and end date).

##### Filter 2

- **Optional Comparative Fields**: Include optional fields that allow comparing results using the same criteria as the first filter.

##### Predefined Filter

- **Creation of Predefined Filters**: Allow administrators to create and save predefined filters using the same criteria as Filter 1 (and Filter 2 if comparative), and associate a custom name with the filter.
- **Reuse of Predefined Filters**: Allow administrators to apply predefined filters at any time.

#### Expected Features

- **Backend**: Develop the necessary endpoints that return provided mock data.
- **Frontend**: Create a user interface that includes the filters and displays the filtered data.

#### Desired Technologies for Development

- **Backend**: Python/Django
- **Frontend**: React/Typescript and Styled-Components

### Additional Instructions

1. **Backend**:

   - Set up an API using Django that provides endpoints for the described filters.
   - Return provided mock data to simulate the filter responses.

2. **Frontend**:

   - Create an interface with React and Styled-Components that allows the user to apply the described filters, as well as create and reuse predefined filters.
   - Creative freedom to display the data in the best way.
