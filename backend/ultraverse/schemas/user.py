from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    password = fields.Str(load_only=True, required=True)
    email = fields.Email()
    created_at = fields.DateTime(dump_only=True)
    # Anda bisa menambahkan kembali 'is_active' dan 'updated_at' jika diperlukan

class UserSchemaPublic(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(dump_only=True)
    email = fields.Email(dump_only=True)
    # Anda bisa menambahkan kembali field lain yang ingin Anda tampilkan secara publik