db.avaluos.find({
  location: {
    $geoIntersects: {
      $geometry: {
        type: "Polygon",
        coordinates: [
          [
            [4.588317265880981, -74.13230895996095],
            [4.578221631490299, -74.14024829864503],
            [-74.12535667419435, 4.578264409902865],
            [4.588317265880981, -74.13230895996095],
          ],
        ],
      },
    },
  },
});

db.avaluos.find({
  location: {
    $geoIntersects: {
      $geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-74.11432743072511, 4.5969583310925755],
            [-74.15162086486818, 4.5969583310925755],
            [-74.14793014526369, 4.567698064358297],
            [-74.11055088043214, 4.561195620467774],
            [-74.11231040954591, 4.58780393198132],
            [-74.11432743072511, 4.5969583310925755],
          ],
        ],
      },
    },
  },
});

// https://thecodebarbarian.com/80-20-guide-to-mongodb-geospatial-queries