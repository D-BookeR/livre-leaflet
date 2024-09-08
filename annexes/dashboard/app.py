import json
from dash import Dash, html, Output, Input, dcc
import dash_leaflet as dl
import dash_bootstrap_components as dbc

app = Dash(
    __name__, 
    external_stylesheets=[dbc.themes.BOOTSTRAP]
)
with open("ecoles.geojson") as f:
  geojson = json.load(f)

types = sorted(list(set(
  [feature['properties']['type'] 
    for feature in geojson['features']]
)))

@app.callback(
  Output("legend", "children"),
  Input("markers", "clickData")
)
def update_legend(feature):
  if feature is not None:
    print(feature['properties'])
    return html.Div([
      html.H1(feature['properties']['nom']),
      html.Div(feature['properties']['adresse']),
    ])


@app.callback(
  Output('map', 'children'),
  Input('type-dropdown', 'value')
)
def update_map(selected_type):
  if selected_type is None:
    data = geojson
  else:
    data = {
      'type': 'FeatureCollection',
      'features': [
        feature for feature in geojson['features'] 
          if feature['properties']['type'] == selected_type
        ]
    }
  return [
    dl.TileLayer(),
    dl.GeoJSON(data=data, id="markers")
  ]


map = dl.Map(
  children=update_map(None),
  center=[48.9068, 2.2464],
  zoom=15,
  style={'width': '100%', 'height': '100vh'},
  id="map"
)

app.layout = dbc.Container([
  dbc.Row([
    dbc.Col(map, width=8),
    dbc.Col([
      dbc.Row(dcc.Dropdown(
        id='type-dropdown',
        options=[{'label': t, 'value': t} for t in types],
        value=None
      )),
      dbc.Row(id="legend")
    ], width=4),

  ])
], fluid=True)


if __name__ == '__main__':
  app.run_server(debug=True)
