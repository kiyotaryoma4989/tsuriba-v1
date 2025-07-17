from models import db, City
from collections import defaultdict

def get_city_name(cityId: int) -> str:
    city = City.query.get(cityId)
    return city.city_name if city else "不明"

def get_cities_by_prefCode(prefCode: int) -> str:
    city = City.query.filter_by(pref_code=prefCode).all()
    return city


def get_prefecture_city_list():
    cities = City.query.order_by(City.pref_code, City.city_name).all()
    pref_map = {}
    for city in cities:
        key = city.pref_code
        if key not in pref_map:
            pref_map[key] = {
                "pref_name": city.pref_name,
                "pref_code": city.pref_code,
                "cities": []
            }
        pref_map[key]["cities"].append({
            "city_name": city.city_name,
            "city_id": city.id
        })
    return list(pref_map.values())