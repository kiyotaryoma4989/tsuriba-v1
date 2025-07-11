from flask import Flask, jsonify
from flask_cors import CORS
# from config import Config
# from models import db, Tsuriba

app = Flask(__name__)
# app.config.from_object(Config)
CORS(app) 
# db.init_app(app) 

@app.route('/api')
def get_tsuribaList():
    print('[LOG] GET リクエスト受信')
    dammydata = [
    { 'id': 1, 'name': 'Apple', 'category': 'Fruit' },
    { 'id': 2, 'name': 'Carrot', 'category': 'Vegetable' },
    { 'id': 3, 'name': 'Banana', 'category': 'Fruit' },
    ]
    # with app.app_context():
    #     tsuribas = Tsuriba.query.all()
        # return jsonify([
        #     {'id': tsuriba.id, 'prefs': tsuriba.prefCode, 'cityCode': tsuriba.municipalitiesCode, 'detail': tsuriba.detail}
        #     for tsuriba in tsuribas
        # ])
    return jsonify(dammydata)

# @app.route('/api/tsuriba/create', methods=['POST'])
# def create_tsuriba():
#     data = request.get_json()

#     # 入力チェック（シンプルな例）
#     if not data or not data.get('prefCode') or not data.get('municipalitiesCode'):
#         return jsonify({'error': '都道府県と市区町村は必須です'}), 400

#     # モデルインスタンスを作成
#     new_tsuriba = Tsuriba(
#         prefCode = data['prefCode'],
#         municipalitiesCode = data['municipalitiesCode'],
#         detail = data['municipalitiesCode']
#     )

#     try:
#         db.session.add(new_tsuriba)
#         db.session.commit()
#         return jsonify({'message': 'ユーザーを登録しました'}), 201

#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'error': '登録に失敗しました', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5050,debug=True)
