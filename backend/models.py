# models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# 釣り場モデル
class Tsuriba(db.Model):
    __tablename__ = 't_tsuriba'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    pref_code = db.Column(db.Integer)
    city_id = db.Column(db.Integer)
    place_detail = db.Column(db.Text)
    detail = db.Column(db.Text)

# 市区町村モデル
class City(db.Model):
    __tablename__ = 't_cities'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    pref_name = db.Column(db.String(24))
    city_code = db.Column(db.Integer, nullable=False)
    city_name = db.Column(db.String(24), nullable=False)
    pref_code = db.Column(db.Integer, nullable=False)

# ユーザーモデル
class User(db.Model):
    __tablename__ = 't_users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    from flask_sqlalchemy import SQLAlchemy