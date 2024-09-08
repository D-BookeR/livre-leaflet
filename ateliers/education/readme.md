# Base de données

```py
DATABASE_CONFIG = {
    'dbname': 'richnou',
    'user': 'richnou',
    'password': '',
    'host': 'localhost',
    'port': '5432'
}
```

## Incorporer les données

Supposant la config ci dessus

```sh
psql -U richnou -d richnou -h localhost -p 5432 -f education.sql
```

#

```sh
python3 -m venv venv
source venv/bin/activate
./venv/bin/pip install -r requirements.txt

flask --app app --debug run --port 5000
```
