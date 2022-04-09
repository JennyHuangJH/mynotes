from django.db import models

# Create your models here.
# Create database

class Note(models.Model):
    body = models.TextField(null = True, blank = True) #create a column called body
    updated = models.DateTimeField(auto_now = True)
    created = models.DateTimeField(auto_now_add = True) #only take time stamp on created

    def __str__(self):
        return self.body[0:50]

    
