
'''
registering signals so that, they are called when
django in ready
'''
from django.apps import AppConfig


class PosUsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'pos_users'

    def ready(self):
        import pos_users.signals
