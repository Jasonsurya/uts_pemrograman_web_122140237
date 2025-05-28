import logging.config

LOGGING_CONFIG = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'generic': {
            'format': '%(asctime)s %(levelname)-5.5s %(name)s %(message)s',
            'datefmt': '%H:%M:%S'
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'generic',
            'stream': 'ext://sys.stdout'
        }
    },
    'loggers': {
        'alembic': {
            'level': 'INFO',
            'handlers': ['console']
        }
    },
    'root': {
        'level': 'INFO',
        'handlers': ['console']
    }
}

logging.config.dictConfig(LOGGING_CONFIG)

logger = logging.getLogger('alembic')
logger.info("This is a test log message from Alembic logger.")

root_logger = logging.getLogger()
root_logger.info("This is a test log message from the root logger.")