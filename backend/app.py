from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import Config
from models import db, Tsuriba

app = Flask(__name__)
CORS(app) 
app.config.from_object(Config)

db.init_app(app) 

@app.route('/api/tsuriba/list')
def get_tsuribaList():
    with app.app_context():
        tsuribas = Tsuriba.query.all()
        return jsonify([
            {'id': tsuriba.id, 'prefs': tsuriba.prefCode, 'municipalitiesCode': tsuriba.municipalitiesCode, 'detail': tsuriba.detail}
            for tsuriba in tsuribas
        ])

@app.route('/api/tsuriba/create', methods=['POST'])
def create_tsuriba():
    data = request.get_json()

    # 入力チェック（シンプルな例）
    if not data or not data.get('prefCode') or not data.get('municipalitiesCode'):
        return jsonify({'error': '都道府県と市区町村は必須です'}), 400

    # モデルインスタンスを作成
    new_tsuriba = Tsuriba(
        prefCode = data['prefCode'],
        municipalitiesCode = data['municipalitiesCode'],
        detail = data['municipalitiesCode']
    )

    try:
        db.session.add(new_tsuriba)
        db.session.commit()
        return jsonify({'message': 'ユーザーを登録しました'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': '登録に失敗しました', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
