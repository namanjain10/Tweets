from django import forms
from django.forms.utils import ErrorList

class FormLoginMixin (object) :
    def form_valid (self, form) :
        if self.request.user.is_authenticated :
            form.instance.user = self.request.user
            return super(FormLoginMixin, self).form_valid(form)

        else :
            form._errors[forms.forms.NON_FIELD_ERRORS] = ErrorList(["Login required !!!"])
            return self.form_invalid(form)

class UserOwnerMixin (FormLoginMixin, object) :
    def form_valid (self, form) :
        if form.instance.user == self.request.user :
            print ('good to go')
            return super(UserOwnerMixin, self).form_valid(form)

        else :
            print ('oops')
            form._errors[forms.forms.NON_FIELD_ERRORS] = ErrorList(["Not authorized to edit the tweet!!"])
            return self.form_invalid(form)
