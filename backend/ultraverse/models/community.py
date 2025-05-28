from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from ..db import Base

class CommunityServer(Base):
    __tablename__ = 'community_servers'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    icon = Column(String)

    messages = relationship('ServerMessage', back_populates='server', cascade='all, delete-orphan')

class ServerMessage(Base):
    __tablename__ = 'server_messages'
    id = Column(Integer, primary_key=True)
    server_id = Column(Integer, ForeignKey('community_servers.id'), nullable=False)
    user_id = Column(Integer) # ID pengguna yang mengirim pesan
    username = Column(String, nullable=False) # Username pengirim
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    server = relationship('CommunityServer', back_populates='messages')