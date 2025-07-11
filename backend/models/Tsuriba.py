# models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Tsuriba(db.Model):
    __tablename__ = 'TsuribaList'  # 既存のテーブル名に合わせる

    id = db.Column(db.Integer, primary_key=True)
    prefCode = db.Column(db.String(80))
    municipalitiesCode = db.Column(db.String(120))
    detail = db.Column(db.String(120))
