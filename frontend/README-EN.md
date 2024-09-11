# Financial Manager Application - Frontend

> This is the README for the project's frontend. Here you will find information on how to set up and run the frontend as well as the project structure.
> NOTE: For the full operation of the application, the frontend and backend must be running SIMULTANEOUSLY.

The frontend was developed using React and Typescript, along with auxiliary tools such as:

- Styled-Components for component styling.
- Axios for HTTP requests.
- Create React App for project initialization and webpack.
- Prettier for code formatting.

The application is responsible for displaying the user interface, allowing the application of filters described in the documentation.

The frontend is structured as follows:

- /public: folder with the application's static files.
- /src: folder with the application's source code.
  - /components: folder with the application's components.
  - /pages: folder with the application's pages.
  - /services: folder with the application's services.
  - /styles: folder with the application's global styles.
  - /utils: folder with utility functions, interface definitions, constants, and TS types.
  - App.tsx: main application file.
  - index.tsx: application initialization file.

## Prerequisites

- Node v18.15+
- Node Package Manager (NPM)

> NOTE: To install Node and NPM, use your preferred method. Our recommendation is to follow the documentation: Downloading and installing Node.js and npm

## Starting the project for the first time

The first time you start the project, you need to install the npm packages.

To do this:

1. Open a terminal, whether Linux, CMD, or PowerShell;
2. Navigate to the "/frontend" folder;
3. Type the command: `npm install`

## Running the project locally

To run the project locally, use the command:

1. Open a terminal, whether Linux, CMD, or PowerShell;
2. Navigate to the "/frontend" folder;
3. Type the command: `npm run start`

Wait for the project to initialize, and the browser will automatically open with the running application.

### Available scripts in package.json

#### `npm run start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.\
Your app is ready to be deployed!

##### Learn more about CRA

CRA documentation: [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

Official React documentation: [React documentation](https://reactjs.org/).
