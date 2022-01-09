from .models import Comments
from django.shortcuts import render
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
    def send_chat(self, request, *args, **kwargs):
        try:
            data = request.data.copy()
            message = data.get('message')
            user_id = self.request.user.id

            comment = Comments()
            comment.user_id = user_id
            comment.comment = message

            return Response({
                'message': 'Successfully posted comment'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print("\n\n\n")
            print("err: ", e)
            print("\n\n\n")
