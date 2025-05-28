from pyramid.response import Response
from ..db import DBSession
from ..models.community import CommunityServer, ServerMessage
import json

def includeme(config):
    config.add_route('get_servers', '/api/servers')
    config.add_route('create_server', '/api/servers/create')
    config.add_route('get_server_messages', '/api/servers/{server_id}/messages')
    config.add_route('send_server_message', '/api/servers/{server_id}/messages')
   
def get_servers(request):
    servers = DBSession.query(CommunityServer).all()
    return [
        {
            'id': server.id,
            'name': server.name,
            'description': server.description,
            'icon': server.icon
        } for server in servers
    ]


def create_server(request):
    try:
        data = request.json_body
    except ValueError:
        request.response.status = 400
        return {'error': 'Data tidak valid'}

    name = data.get('name')
    description = data.get('description')
    icon = data.get('icon')

    if not name:
        request.response.status = 400
        return {'error': 'Nama server wajib diisi'}

    new_server = CommunityServer(name=name, description=description, icon=icon)
    DBSession.add(new_server)
    DBSession.flush()

    request.response.status = 201
    return {
        'id': new_server.id,
        'name': new_server.name,
        'id': new_server.id, 
        'description': new_server.description,
        'icon': new_server.icon
    }

def get_server_messages(request):
    server_id = int(request.matchdict['server_id'])
    server = DBSession.query(CommunityServer).filter_by(id=server_id).first()
    if not server:
        request.response.status = 404
        return {'error': 'Server tidak ditemukan'}
    
    messages = DBSession.query(ServerMessage).filter_by(server_id=server_id).order_by(ServerMessage.timestamp.asc()).all()
    
    return {'messages': [
        {
            'id': msg.id,
            'server_id': msg.server_id,
            'user_id': msg.user_id,
            'username': msg.username,
            'content': msg.content,
            'timestamp': msg.timestamp.isoformat()
        } for msg in messages
    ]}


def send_server_message(request):
    server_id = int(request.matchdict['server_id'])
    content = request.json_body.get('content')
    
    current_user_id = 1
    current_username = "GuestUser"

    if not content:
        request.response.status = 400
        return {'error': 'Konten pesan tidak boleh kosong'}

    server = DBSession.query(CommunityServer).filter_by(id=server_id).first()
    if not server:
        request.response.status = 404
        return {'error': 'Server tidak ditemukan'}

    new_message = ServerMessage(
        server_id=server_id,
        user_id=current_user_id,
        username=current_username,
        content=content
    )
    DBSession.add(new_message)
    DBSession.flush()
    
    request.response.status = 201
    return {'message_data': {
        'id': new_message.id,
        'server_id': new_message.server_id,
        'user_id': new_message.user_id,
        'username': new_message.username,
        'content': new_message.content,
        'timestamp': new_message.timestamp.isoformat()
    }}