# from pyramid.view import view_config # HAPUS BARIS INI
from pyramid.response import Response
from ..db import DBSession
from ..models.shop import Product, Order, OrderItem
import json

def product_to_dict(product):
    return {
        'id': product.id,
        'name': product.name,
        'description': product.description,
        'price': product.price,
        'image': product.image
    }

def includeme(config):
    config.add_route('get_products', '/api/products')
    config.add_route('get_product_detail', '/api/products/{product_id}')
    config.add_route('checkout_order', '/api/checkout')
    # HAPUS BARIS INI: config.scan('.')

# Fungsi view tanpa dekorator
def get_products(request):
    query = DBSession.query(Product)
    filter_param = request.params.get('filter')
    if filter_param:
        query = query.filter(Product.name.ilike(f'%{filter_param}%'))
    sort_param = request.params.get('sort')
    if sort_param == 'asc':
        query = query.order_by(Product.price.asc())
    elif sort_param == 'desc':
        query = query.order_by(Product.price.desc())
    products = query.all()
    return {'products': [product_to_dict(p) for p in products]}

# Fungsi view tanpa dekorator
def get_product_detail(request):
    product_id = int(request.matchdict['product_id'])
    product = DBSession.query(Product).filter_by(id=product_id).first()
    if not product:
        request.response.status = 404
        return {'error': 'Produk tidak ditemukan'}
    return {'product': product_to_dict(product)}

# Fungsi view tanpa dekorator
def checkout_order(request):
    try:
        data = request.json_body
    except ValueError:
        request.response.status = 400
        return {'error': 'Data tidak valid'}
    cart_items_data = data.get('cart')
    customer_name = data.get('customerName')
    shipping_address = data.get('shippingAddress')

    if not cart_items_data or not customer_name or not shipping_address:
        request.response.status = 400
        return {'error': 'Keranjang, Nama Pelanggan, dan Alamat Pengiriman wajib diisi'}

    total_amount = 0
    order_items = []
    
    for item_data in cart_items_data:
        product_id = item_data.get('id')
        quantity = item_data.get('quantity')
        
        product = DBSession.query(Product).filter_by(id=product_id).first()
        if not product or quantity <= 0:
            request.response.status = 400
            return {'error': f'Produk tidak valid atau kuantitas 0: ID {product_id}'}
        
        order_items.append(
            OrderItem(
                product_id=product.id,
                product_name=product.name,
                quantity=quantity,
                price_at_purchase=product.price
            )
        )
        total_amount += product.price * quantity
    
    new_order = Order(
        customer_name=customer_name,
        shipping_address=shipping_address,
        total_amount=total_amount,
        items=order_items
    )
    DBSession.add(new_order)
    DBSession.flush()

    request.response.status = 200
    return {'message': 'Checkout berhasil!', 'order_id': new_order.id}