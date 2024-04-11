from django.db import models
from django.utils.text import slugify
from django.utils.html import mark_safe
from django.template.defaultfilters import truncatechars 

class Collection(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True, unique=True)
    photo = models.ImageField(upload_to="photos/collection", null=True, blank=True)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ('name',)
        verbose_name = 'Collection'
        verbose_name_plural = 'Collections'

    @property
    def short_description(self):
        return truncatechars(self.description, 20)    
    
    def image_tag(self):
        if self.photo:
            return mark_safe(f'<img src="{self.photo.url}" width="100" />')
        else:
            return '(No image)'   
    image_tag.short_description = "Image"
    image_tag.allow_tags = True

    def delete(self, *args, **kwargs):
        # Delete associated photo when collection is deleted
        if self.photo:
            self.photo.delete()
        super().delete(*args, **kwargs)


class Product(models.Model):
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=300, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True, unique=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    available = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
   
    photo = models.ImageField(upload_to="photos/product", null=True, blank=True)
    brandimage = models.FileField(upload_to="photos/svg", null=True, blank=True)

    def __str__(self):
        return self.name

    @property
    def short_description(self):
        return truncatechars(self.description, 20)    
    
    def image_tag(self):
        if self.photo:
            return mark_safe(f'<img src="{self.photo.url}" width="100" />')
        else:
            return '(No image)'    
    image_tag.short_description = "Image"
    image_tag.allow_tags = True

    def delete(self, *args, **kwargs):
        # Delete associated photo when product is deleted
        if self.photo:
            self.photo.delete()
        super().delete(*args, **kwargs)
