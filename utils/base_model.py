from django.db import models
from rest_framework import status
from rest_framework.response import Response


class BaseModel(models.Model):
    class Condition(models.TextChoices):
        IDLE = 'IDLE'
        WAITING = 'WAITING'
        PUBLISHED = 'PUBLISHED'
        FAILED = 'FAILED'
        CANCELED = 'CANCELED'

    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def create_api(self, *args, **kwargs):
        """
        Later, another models want to consume message, so the method is generic.
        Just defined it in Model which is inherited BaseModel.
        In the views.py this method will be called by consume()
        """
        return Response({
            "detail": "Not found."
        }, status=status.HTTP_404_NOT_FOUND)

    @classmethod
    def insights(cls, *args, **kwargs):
        """
        Later, another models want to consume message, so the method is generic.
        Just defined it in Model which is inherited BaseModel.
        In the views.py this method will be called by consume()
        """
        return Response({
            "detail": "Not found."
        }, status=status.HTTP_404_NOT_FOUND)

    @classmethod
    def preview(cls, *args, **kwargs):
        """
        Later, another models want to consume message, so the method is generic.
        Just defined it in Model which is inherited BaseModel.
        In the views.py this method will be called by consume()
        """
        return Response({
            "detail": "Not found."
        }, status=status.HTTP_404_NOT_FOUND)

