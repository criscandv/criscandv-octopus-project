from django.db import models
from django.contrib.auth.models import User


class Comments(models.Model):
    user_from = models.ForeignKey(User, on_delete=models.CASCADE)
    user_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_to')
    has_been_read = models.BooleanField(default=False)
    comment = models.TextField()

    def __str__(self):
        return self.comment
