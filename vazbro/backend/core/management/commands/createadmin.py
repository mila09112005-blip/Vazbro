from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Создает администратора по умолчанию'

    def handle(self, *args, **options):
        User = get_user_model()

        if User.objects.filter(username='ADMIN2').exists():
            self.stdout.write(self.style.WARNING('Администратор уже существует'))
            return

        user = User(
            username='ADMIN2',
            email='admin@gmail.com',
            role='ADMIN'
        )
        user.set_password('root')
        user.save()