from pyramid.response import Response
import json
import bcrypt
from ..db import DBSession
from ..models.user import User

def includeme(config):
    config.add_route('register', '/register')
    config.add_route('login', '/api/login')
    config.add_route('logout', '/api/logout')
    

def register_view(request):
    try:
        data = request.json_body
    except ValueError:
        request.response.status = 400
        return {'error': 'Data yang dikirim bukan JSON valid'}

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    if not username or not email or not password or not confirm_password:
        request.response.status = 400
        return {'error': 'Semua field wajib diisi'}

    if password != confirm_password:
        request.response.status = 400
        return {'error': 'Password dan konfirmasi tidak sama'}

    existing_user = DBSession.query(User).filter(
        (User.username == username) | (User.email == email)
    ).first()
    if existing_user:
        request.response.status = 400
        return {'error': 'Username atau email sudah digunakan'}

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    new_user = User(username=username, email=email, password=hashed_password)
    DBSession.add(new_user)
    DBSession.flush()
    request.response.status = 201

    return {'message': 'Registrasi berhasil'}


def login_view(request):
    try:
        data = request.json_body
        username = data.get('username')
        password = data.get('password')
    except ValueError:
        request.response.status = 400
        return {'error': 'Data login tidak valid'}

    if username == "testuser" and password == "testpass":
        request.response.status = 200
        return {'message': 'Login berhasil', 'user': {'id': 1, 'username': username}}
    else:
        request.response.status = 401
        return {'error': 'Username atau password salah'}

def logout_view(request):
    request.response.status = 200
    return {'message': 'Logout berhasil'}