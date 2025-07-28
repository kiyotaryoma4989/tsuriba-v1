from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# 基底モデル
class BaseModel(db.Model):
    __abstract__ = True
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    delete_flg = db.Column(db.Boolean, default=False, nullable=False)

# 釣り場モデル
class Tsuriba(BaseModel):
    __tablename__ = 't_tsuriba'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(64), nullable=False)
    pref_code = db.Column(db.Integer, nullable=False)
    city_id = db.Column(db.Integer, nullable=False)
    place_detail = db.Column(db.Text, nullable=False)
    detail = db.Column(db.Text)

# 市区町村モデル
class City(db.Model):
    __tablename__ = 't_cities'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    pref_name = db.Column(db.String(24))
    city_name = db.Column(db.String(24), nullable=False)
    city_code = db.Column(db.Integer, nullable=False)
    pref_code = db.Column(db.Integer, nullable=False)

# ユーザーモデル
class User(BaseModel):
    __tablename__ = 't_users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    from flask_sqlalchemy import SQLAlchemy