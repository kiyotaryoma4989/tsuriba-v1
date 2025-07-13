from models import db, City

def get_city_name(cityId: int) -> str:
    city = City.query.get(cityId)
    return city.city_name if city else "不明"

def get_cities_by_prefCode(prefCode: int) -> str:
    city = City.query.filter_by(pref_code=prefCode).all()
    return city