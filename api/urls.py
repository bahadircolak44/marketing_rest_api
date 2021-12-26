from rest_framework.routers import SimpleRouter

from api import config
from api.facebook.views import FacebookAPIViewSet

router = SimpleRouter()

urlpatterns = router.urls
# Urls are generated according to the config items
for k, v in config.__dict__.items():
    if '__' not in k and 'serializers' not in k:
        print('/api/v1/facebook/' + v.get('url') + "/" + ' has been initialized')
        router.register(r'facebook/' + v.get("url"), FacebookAPIViewSet, basename=v.get("url"))
