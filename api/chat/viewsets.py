from .models import Comments
from django.shortcuts import render
from django.conf import settings
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import status

import redis

class BaseViewSet(ModelViewSet):
    authentication_classes = ()
    permission_classes = ()

    model_class = ''
    serializer_class = ''


class ChatViewSet(BaseViewSet):
    model_class = Comments

    def list(self, request, *args, **kwargs):
        return render(request, 'home.html', {})

    @action(detail=False, methods=['POST'])
    def send_message(self, request, *args, **kwargs):
        try:
            data = request.data.copy()
            message = data.get('message')
            user = self.request.user

            comment = Comments()
            comment.user_id = user.id
            comment.comment = message

            REDIS_CLIENT = redis.StrictRedis(
                host=settings.REDIS_HOST,
                port=settings.REDIS_PORT,
                db=settings.REDIS_DB
            )

            REDIS_CLIENT.publish('criscandv-chat', f"{user.username}: {message}")

            return Response({
                'message': 'Successfully posted comment'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print("\n\n\n")
            print("err: ", e)
            print("\n\n\n")
            return Response({
                'message': 'Internal server error'
            }, status=status.HTTP_200_OK)
