from django import forms

from .models import Tweet

class TweetForm(forms.ModelForm):
    class Meta:
        model = Tweet
        fields = ['content']

    # def __init__(self, *args, **kwargs):
    #     super(Form, self).__init__(*args, **kwargs)

    # def clean(self):
    #     cleaned_data = super(Form, self).clean()
    #     return cleaned_dataFor
