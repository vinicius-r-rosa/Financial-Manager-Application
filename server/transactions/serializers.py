from rest_framework import serializers
from .models import Client, Transaction


class ClientSerializer(serializers.ModelSerializer):
    """
    Serializer for the Client model.

    This serializer converts Client model instances into JSON format and vice versa.
    It includes the following fields:
    - id: The unique identifier for the client.
    - name: The name of the client.
    - email: The email address of the client.
    - phone: The phone number of the client.
    """

    class Meta:
        model = Client
        fields = ["id", "name", "email", "phone"]


class TransactionSerializer(serializers.ModelSerializer):
    """
    Serializer for Transaction model.
    This serializer converts Transaction model instances into JSON format and vice versa.
    It includes the following fields:
    - id: The unique identifier for the transaction.
    - client: A nested serializer for the client associated with the transaction.
    - date: The date of the transaction.
    - amount: The monetary amount of the transaction.
    """

    client = ClientSerializer()

    class Meta:
        model = Transaction
        fields = ["id", "client", "date", "amount"]
