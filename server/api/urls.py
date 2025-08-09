from django.urls import path
from . import views

urlpatterns =[
    path("nodes/",  views.NoteListCreate.as_view(), name="note-list"),
    path("nodes/<int:pk>/delete/", views.NoteDelete.as_view(), name="delete-note"),


]