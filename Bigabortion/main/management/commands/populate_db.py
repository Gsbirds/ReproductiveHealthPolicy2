from django.core.management.base import BaseCommand
from main.views import populate_database

class Command(BaseCommand):
    help = 'Populates the database with initial state data'

    def handle(self, *args, **options):
        populate_database()
        self.stdout.write(self.style.SUCCESS('Successfully populated database'))
