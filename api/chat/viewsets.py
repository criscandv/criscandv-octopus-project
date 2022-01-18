from .models import Comments
from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import status

import redis
import json

REDIS_CLIENT = redis.StrictRedis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    db=settings.REDIS_DB
)

class BaseViewSet(ModelViewSet):
    authentication_classes = ()
    permission_classes = ()

    model_class = ''
    serializer_class = ''


class ChatViewSet(BaseViewSet):
    model_class = Comments

    def list(self, request, *args, **kwargs):
        return render(request, 'home.html', {})

    @action(detail=False, methods=['GET', 'POST'])
    def send_message(self, request, *args, **kwargs):
        try:
            data = request.data
            message = data.get('message')
            user_from = data.get('user_from')
            user_to = data.get('user_to')

            u_from = User.objects.get(username=user_from)
            u_to = User.objects.get(username=user_to)

            comment = Comments()
            comment.user_from_id = u_from.id
            comment.user_to_id = u_to.id
            comment.has_been_read = False
            comment.comment = message
            comment.save()

            REDIS_CLIENT.publish('chat', f"{user_from} to {user_to}: {message}")

            return Response({
                'message': 'Successfully posted comment'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'message': 'Internal server error'
            }, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['GET'])
    def get_channels(self, request):
        # Para adha, devolver los channels que corresponden a los centros que tienen como opcion SAT Admin o algo así
        users = User.objects.all().values('pk', 'username', 'email')
        u = json.dumps({'users': list(users)})

        return HttpResponse(u, content_type='application/json')
