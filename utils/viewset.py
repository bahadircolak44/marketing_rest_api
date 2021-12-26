from rest_framework import viewsets, mixins


class GenericViewSet(mixins.CreateModelMixin,
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     viewsets.GenericViewSet):
    """
    A viewset that provides default `create()`, `retrieve()`, `list()` actions.
    """
    pass
