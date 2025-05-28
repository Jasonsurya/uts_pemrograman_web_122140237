from pyramid.response import Response
from ..db import DBSession
from ..models.gallery import GalleryItem, GalleryComment, GalleryLike
import json
import os
import uuid

def gallery_item_to_dict(item, current_user_id=None):
    return {
        'id': item.id,
        'url': item.url,
        'caption': item.caption,
        'type': item.item_type,
        'likes': item.likes,
        'liked': any(like.user_id == current_user_id for like in item.liked_by_users) if current_user_id else False,
        'comments': [comment.text for comment in item.comments]
    }

def includeme(config):
    config.add_route('get_all_gallery_items', '/api/gallery')
    config.add_route('upload_gallery_item', '/api/upload')
    config.add_route('toggle_like_gallery_item', '/api/gallery/{item_id}/like')
    config.add_route('add_comment_gallery_item', '/api/gallery/{item_id}/comment')
    


def get_all_gallery_items(request):
    current_user_id = 1
    
    items = DBSession.query(GalleryItem).all()
    return {'gallery': [gallery_item_to_dict(item, current_user_id) for item in items]}


def upload_gallery_item(request):
    UPLOAD_DIR = os.path.join(request.registry.settings['here'], 'uploads')
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    try:
        if 'file' not in request.POST:
            request.response.status = 400
            return Response(json_body={'error': 'File tidak ditemukan'}, content_type='application/json')
        
        fs = request.POST['file']
        input_file = fs.file
        filename = fs.filename
        caption = request.POST.get('caption', '')

        file_ext = os.path.splitext(filename)[1]
        unique_filename = str(uuid.uuid4()) + file_ext
        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        with open(file_path, 'wb') as output_file:
            while True:
                data = input_file.read(2*1024*1024)
                if not data:
                    break
                output_file.write(data)

        item_type = 'image'
        if fs.type and fs.type.startswith('video'):
            item_type = 'video'

        item_url = f'/static/uploads/{unique_filename}'
        new_item = GalleryItem(url=item_url, caption=caption, item_type=item_type, likes=0)
        DBSession.add(new_item)
        DBSession.flush()
        
        request.response.status = 201
        return Response(json_body={'item': gallery_item_to_dict(new_item)}, content_type='application/json')

    except Exception as e:
        request.response.status = 500
        return Response(json_body={'error': f'Gagal mengunggah item: {str(e)}'}, content_type='application/json')



def toggle_like_gallery_item(request):
    item_id = int(request.matchdict['item_id'])
    current_user_id = 1

    item = DBSession.query(GalleryItem).filter_by(id=item_id).first()
    if not item:
        request.response.status = 404
        return {'error': 'Item galeri tidak ditemukan'}

    existing_like = DBSession.query(GalleryLike).filter_by(item_id=item_id, user_id=current_user_id).first()

    if request.method == 'POST':
        if not existing_like:
            new_like = GalleryLike(item_id=item_id, user_id=current_user_id)
            DBSession.add(new_like)
            item.likes += 1
            DBSession.flush()
        return {'message': 'Like ditambahkan', 'likes': item.likes}
    
    elif request.method == 'DELETE':
        if existing_like:
            DBSession.delete(existing_like)
            item.likes -= 1
            DBSession.flush()
        return {'message': 'Like dihapus', 'likes': item.likes}


def add_comment_gallery_item(request):
    item_id = int(request.matchdict['item_id'])
    text = request.json_body.get('text')

    if not text:
        request.response.status = 400
        return {'error': 'Teks komentar tidak boleh kosong'}

    item = DBSession.query(GalleryItem).filter_by(id=item_id).first()
    if not item:
        request.response.status = 404
        return {'error': 'Item galeri tidak ditemukan'}

    new_comment = GalleryComment(item_id=item_id, text=text)
    DBSession.add(new_comment)
    DBSession.flush()

    request.response.status = 201
    return {'message': 'Komentar ditambahkan', 'comment': new_comment.text}