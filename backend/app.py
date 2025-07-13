from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from models import db, Tsuriba

app = Flask(__name__)
app.config.from_object(Config)
CORS(app) 
db.init_app(app) 

@app.route('/api/tsuriba/list')
def get_tsuribaList():
    print('[LOG] GET リクエスト受信')
    dammydata = [
    { 'id': 1, 'pref': '福井県', 'city': '敦賀市', 'placeDetail': 'セブイレブン〇〇店から北に150m', 'detail': '冬はよく〇〇が釣れる' },
    { 'id': 2, 'pref': '京都府', 'city': '舞鶴市', 'placeDetail': 'スーパー〇〇から東に150m', 'detail': 'アジが釣れる' },
    { 'id': 3, 'pref': '兵庫県', 'city': '須磨市', 'placeDetail': '国道1号の〇〇から南に150m', 'detail': 'エギングに最適なスポット' }
    ]
    # with app.app_context():
    #     tsuribas = Tsuriba.query.all()
        # return jsonify([
        #     {'id': tsuriba.id, 'prefs': tsuriba.prefCode, 'cityCode': tsuriba.municipalitiesCode, 'detail': tsuriba.detail}
        #     for tsuriba in tsuribas
        # ])
    return jsonify(dammydata)

@app.route('/api/tsuriba/create', methods=['POST'])
def create_tsuriba():
    data = request.get_json()

    # 入力チェック（シンプルな例）
    if not data or not data.get('prefCode') or not data.get('cityCode'):
        return jsonify({'error': '都道府県と市区町村は必須です'}), 400

    print(data)
    # モデルインスタンスを作成
    new_tsuriba = Tsuriba(
        prefCode = data['prefCode'],
        cityCode = data['cityCode'],
        detail = data['detail']
    )

    print('test')

    try:
        print(new_tsuriba)
        db.session.add(new_tsuriba)
        db.session.commit()
        return jsonify({'message': 'ユーザーを登録しました'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': '登録に失敗しました', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5050,debug=True)
