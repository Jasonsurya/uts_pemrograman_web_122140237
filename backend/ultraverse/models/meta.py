from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker, declarative_base
import os
import sys

DBSession = sessionmaker()
Base = declarative_base()

def includeme(config):
    engine = engine_from_config(config.registry.settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    config.registry.dbmaker = DBSession
    Base.metadata.bind = engine