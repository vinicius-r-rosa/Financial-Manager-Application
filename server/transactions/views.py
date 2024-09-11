from rest_framework import generics
from .models import Client, Transaction
from .serializers import ClientSerializer, TransactionSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.utils.dateparse import parse_datetime

# This file is used to defines the views for the API endpoints


@api_view(["GET"])
def transaction_list(request):
    client_ids = request.query_params.getlist("client_id[]")
    start_date = request.query_params.get("start_date")
    end_date = request.query_params.get("end_date")

    # TODO: Optimize the query to filter transactions based on the client_id, start_date, and end_date query parameters
    transactions = Transaction.objects.all()

    if client_ids:
        transactions = transactions.filter(client__id__in=client_ids)

    if start_date and end_date:
        transactions = transactions.filter(
            date__range=[parse_datetime(start_date), parse_datetime(end_date)]
        )

    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)


class ClientListView(generics.ListAPIView):
    queryset = Client.objects.all().order_by("name")
    serializer_class = ClientSerializer
