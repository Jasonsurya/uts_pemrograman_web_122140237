from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from ..db import Base

class GalleryItem(Base):
    __tablename__ = 'gallery_items'
    id = Column(Integer, primary_key=True)
    url = Column(String, nullable=False)
    caption = Column(Text)
    item_type = Column(String, nullable=False) # 'image' or 'video'
    likes = Column(Integer, default=0)

    comments = relationship('GalleryComment', back_populates='item', cascade='all, delete-orphan')
    liked_by_users = relationship('GalleryLike', back_populates='gallery_item', cascade='all, delete-orphan')

class GalleryComment(Base):
    __tablename__ = 'gallery_comments'
    id = Column(Integer, primary_key=True)
    item_id = Column(Integer, ForeignKey('gallery_items.id'), nullable=False)
    text = Column(Text, nullable=False)

    item = relationship('GalleryItem', back_populates='comments')

class GalleryLike(Base):
    __tablename__ = 'gallery_likes'
    id = Column(Integer, primary_key=True)
    item_id = Column(Integer, ForeignKey('gallery_items.id'), nullable=False)
    user_id = Column(Integer)

    gallery_item = relationship('GalleryItem', back_populates='liked_by_users')