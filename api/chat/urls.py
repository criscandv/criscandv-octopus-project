from django.urls import path
from django.urls import include
from .viewsets import ChatViewSet

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'chat', ChatViewSet, 'Chat')


urlpatterns = [
    path('v1/', include(router.urls)),
]