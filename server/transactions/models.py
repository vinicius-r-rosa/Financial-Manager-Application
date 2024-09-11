from django.db import models

# Definitions of the data models


class Client(models.Model):
    """
    Represents a client in the financial manager application.
    Attributes:
      id (CharField): The unique identifier for the client. This field is the primary key and is not editable.
      name (CharField): The name of the client. Maximum length is 255 characters.
      email (EmailField): The email address of the client.
      phone (CharField): The phone number of the client. Maximum length is 20 characters.
    Methods:
      __str__(): Returns the string representation of the client, which is the client's name.
    """

    id = models.CharField(primary_key=True, editable=False, max_length=36)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    """
    Transaction model representing a financial transaction.
    Attributes:
      id (CharField): Primary key for the transaction, not editable.
      client (ForeignKey): Reference to the Client model, deletes transaction if client is deleted.
      date (DateTimeField): Date and time of the transaction.
      amount (DecimalField): Amount of the transaction with up to 10 digits and 2 decimal places.
    Methods:
      __str__(): Returns a string representation of the transaction in the format "client_name - amount".
    """

    id = models.CharField(primary_key=True, editable=False, max_length=36)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    date = models.DateTimeField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.client.name} - {self.amount}"
