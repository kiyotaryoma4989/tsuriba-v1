# models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# 釣り場モデル
class Tsuriba(db.Model):
    __tablename__ = 'TsuribaList'  # 既存のテーブル名に合わせる
    id = db.Column(db.Integer, primary_key=True)
    prefCode = db.Column(db.Integer)
    cityCode = db.Column(db.Integer)
    detail = db.Column(db.String(120))

# ユーザーモデル
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)