from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

class EmailOrUsernameBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            # Essayer de trouver l'utilisateur par email (insensible à la casse)
            user = UserModel.objects.get(email__iexact=username)
        except UserModel.DoesNotExist:
            try:
                # Sinon, essayer de trouver l'utilisateur par username
                user = UserModel.objects.get(username=username)
            except UserModel.DoesNotExist:
                # Si aucun utilisateur n'est trouvé, retourner None
                return None

        if user.check_password(password):
            return user
        return None
