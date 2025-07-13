from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from models import db, Tsuriba
from prefecture import pref_map
from city_util import get_city_name, get_cities_by_prefCode

app = Flask(__name__)
app.config.from_object(Config)
CORS(app) 
db.init_app(app) 

# 市区町村取得処理
@app.route('/api/cities')
def get_cities_by_pref():
    prefCode = request.args.get('prefCode')
    if not prefCode:
        return jsonify({'error': '都道府県コードが指定されていません'}), 400
    cities = get_cities_by_prefCode(prefCode)
    result = [
        {'cityId': c.id, 'cityName': c.city_name}
        for c in cities
    ]
    return jsonify(result)

# 釣り場全件取得
@app.route('/api/tsuriba/list')
def get_tsuribaList():
    print('[LOG] GET リクエスト受信')
    tsuribas = Tsuriba.query.all()
    result = []
    for t in tsuribas:
        result.append({
            'id': t.id,
            'pref': pref_map.get(t.pref_code),
            'city': get_city_name(t.city_id),
            'detail': t.detail
        })
    return jsonify(result), 200

# 釣り場登録処理
@app.route('/api/tsuriba/create', methods=['POST'])
def create_tsuriba():
    data = request.get_json()

    # 入力チェック（シンプルな例）
    if not data or not data.get('prefCode') or not data.get('cityId'):
        return jsonify({'error': '都道府県と市区町村は必須です'}), 400

    # モデルインスタンスを作成
    new_tsuriba = Tsuriba(
        pref_code = data['prefCode'],
        city_id = data['cityId'],
        place_detail = data['placeDetail'],
        detail = data['detail']
    )

    try:
        db.session.add(new_tsuriba)
        db.session.flush()
        db.session.commit()
        return jsonify({'message': 'ユーザーを登録しました'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': '登録に失敗しました', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5050,debug=True)
