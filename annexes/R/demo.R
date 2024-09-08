# install.packages('leaflet')
# Définir les coordonnées
coords <- list(lat = 48.9068, lng = 2.2464)
library(leaflet)
map <- leaflet()
map <- addTiles(map)
map <- setView(
    map, 
    lng = coords$lng, lat = coords$lat, 
    zoom = 17)
map <- addMarkers(
    map, 
    lng = coords$lng, lat = coords$lat, 
    popup = 'Hello World !')
map
