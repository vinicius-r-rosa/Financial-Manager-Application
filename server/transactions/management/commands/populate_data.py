import json
import os
from django.core.management.base import BaseCommand
from transactions.models import Client, Transaction


class Command(BaseCommand):
    help = "Populate the database with clients and transactions data"

    def handle(self, *args, **kwargs):
        base_dir = os.path.dirname(
            os.path.dirname(
                os.path.dirname(
                    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                )
            )
        )
        data_dir = os.path.join(base_dir, "docs", "data")

        client_file = os.path.join(data_dir, "clients.json")
        transaction_file = os.path.join(data_dir, "transactions.json")

        with open(client_file, "r", encoding="utf-8") as f:
            clients = json.load(f)

        for client_data in clients:
            Client.objects.create(
                id=client_data["id"],
                name=client_data["name"],
                email=client_data["email"],
                phone=client_data["phone"],
            )

        with open(transaction_file, "r", encoding="utf-8") as f:
            transactions = json.load(f)

        for transaction_data in transactions:
            client = Client.objects.get(id=transaction_data["client_id"])
            Transaction.objects.create(
                id=transaction_data["id"],
                client=client,
                date=transaction_data["date"],
                amount=transaction_data["amount"],
            )
