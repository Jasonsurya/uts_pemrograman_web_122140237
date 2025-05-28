import logging.config
import os

from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.events import NewRequest
from pyramid.view import view_config

from sqlalchemy import engine_from_config
from ultraverse.db import DBSession, Base

from ultraverse.models.user import User
from ultraverse.models.community import CommunityServer, ServerMessage
from ultraverse.models.gallery import GalleryItem, GalleryComment, GalleryLike
from ultraverse.models.shop import Product, Order, OrderItem

def add_cors_headers_to_response(request, response):
    response.headers.update({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '3600',
    })

def cors_preflight_tween_factory(handler, registry):
    def cors_preflight_tween(request):
        if request.method == 'OPTIONS':
            response = Response(status=200)
            add_cors_headers_to_response(request, response)
            return response
        return handler(request)
    return cors_preflight_tween

def catchall_options_view(request):
    response = Response(status=200)
    return response

def main(global_config, **settings):
    logging.config.fileConfig(global_config['__file__'], disable_existing_loggers=False)

    config = Configurator(settings=settings)
    config.include('pyramid_jinja2')
    config.include('pyramid_tm')
    config.include('pyramid_retry')

    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    Base.metadata.create_all(engine)

    from sqlalchemy.orm import sessionmaker
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        if session.query(Product).count() == 0:
            dummy_products = [
                Product(name="Ultraman Tiga Figure", price=150000, image="/static/images/tiga.jpg", description="Figur Ultraman Tiga yang sangat detail."),
                Product(name="Ultraman Dyna Poster", price=80000, image="/static/images/dyna.jpg", description="Poster eksklusif Ultraman Dyna."),
                Product(name="Ultraman Orb Shirt", price=120000, image="/static/images/orb.jpg", description="Kaos Ultraman Orb edisi terbatas.")
            ]
            session.add_all(dummy_products)
            session.commit()
        else:
            session.rollback()
    except Exception as e:
        session.rollback()
        logging.getLogger(__name__).error(f"Error during initial product data population: {e}", exc_info=True)
        raise
    finally:
        session.close()

    config.add_tween('ultraverse.cors_preflight_tween_factory')
    config.add_subscriber(lambda event: add_cors_headers_to_response(event.request, event.response), NewRequest)

    config.include('ultraverse.routes.auth')
    config.include('ultraverse.routes.community')
    config.include('ultraverse.routes.gallery')
    config.include('ultraverse.routes.shop')

    config.add_route('catchall_options', '/*path')
    config.add_view(catchall_options_view, route_name='catchall_options', request_method='OPTIONS')

    config.add_route('home', '/')
    def home_view(request):
        return {'message': 'Welcome to Ultraverse API!'}
    config.add_view(home_view, route_name='home', renderer='json')

    config.add_static_view(name='static/images', path=os.path.join(global_config['here'], 'static', 'images'))
    config.add_static_view(name='static/uploads', path=os.path.join(global_config['here'], 'uploads'))
    config.add_static_view(name='static', path='ultraverse:static')

    return config.make_wsgi_app()