# Financial Manager Application - Server

> This is the server README for the project. Here you will find information on how to set up and run it, as well as the project structure.
> NOTE: For the full operation of the application, the frontend and backend must be running SIMULTANEOUSLY.

The project was developed using Django and Django Rest Framework to create a RESTful API that provides the necessary data for the frontend application.

The application contains a startup script that populates the database with fake data from the /docs/data folder that serves the frontend.

The server is structured as follows:

- /financial_manager_api: folder automatically created by Django during project initialization. It contains Django configuration files, routes, etc.
- /transactions: folder with configuration files for the transactions app. It contains models, serializers, views, and URLs, as well as the database initialization script in the management/commands and migrations subfolders.

## Prerequisites

- Python 3.11+
- Python Package Installer (PIP)

> NOTE: To install Python and PIP, use your preferred method. I recommend following the documentation: [Downloading and installing Python](https://www.python.org/downloads/)

## Starting the project for the first time

The first time you start the project, you need to create a virtual environment and install the Python dependencies.

To do this:

1. Create the `.env` file in the `/server` folder based on the `.env.example` file. Fill an the environment variables with the necessary information;
2. Open a terminal, be it Linux, CMD, or PowerShell;
3. Navigate to the "/server" folder;
4. Type the command: `python -m venv venv`
5. Activate the virtual environment:
   - On Linux: `source venv/bin/activate`
   - On Windows: `.\venv\Scripts\activate`
6. Install the dependencies: `pip install -r requirements.txt`
7. Run the migrations: `python manage.py migrate`
8. Run the startup script: `python manage.py populate_db`

## Running the project locally

To run the project locally:

1. Open a terminal, be it Linux, CMD, or PowerShell;
2. Navigate to the "/server" folder;
3. Activate the virtual environment:
   - On Linux: `source venv/bin/activate`
   - On Windows: `.\venv\Scripts\activate`
4. Run the command: `python manage.py runserver`

Wait for the project to initialize, and the server will automatically start.
