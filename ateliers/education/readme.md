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

Supposant la configuration ci dessus

```sh
psql -U richnou -d richnou -h localhost -p 5432 -f education.sql
```

## Création du venv (syntaxe pour Mac)

```sh
python3 -m venv venv
source venv/bin/activate
./venv/bin/pip install -r requirements.txt
```

## Lancement du projet

```sh
flask --app app --debug run --port 5000
```
