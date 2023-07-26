"""
ASGI config for abortion project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""
import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'abortion.settings')
django_asgi_app = get_asgi_application()
import main.routes

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AllowedHostsOriginValidator(
        # Use authentication for protected WebSocket
        # connections
        AuthMiddlewareStack(
            # Route the WebSocket connection based on the
            # URL path
            URLRouter(
                main.routes.websocket_urlpatterns,
            )
        )
    ),
})