from django.urls import path
from . import views

urlpatterns = [
    path("clients/", views.ClientListView.as_view(), name="client-list"),
    path("transactions/", views.transaction_list, name="transaction-list"),
]
