const a = {
    "documentation": "https://opencagedata.com/api",
    "licenses": [
      {
        "name": "see attribution guide",
        "url": "https://opencagedata.com/credits"
      }
    ],
    "rate": {
      "limit": 2500,
      "remaining": 2496,
      "reset": 1719014400
    },
    "results": [
      {
        "annotations": {
          "DMS": {
            "lat": "10° 0' 35.64216'' N",
            "lng": "76° 21' 57.39876'' E"
          },
          "MGRS": "43PFM4971006817",
          "Maidenhead": "MK80ea32vj",
          "Mercator": {
            "x": 8501018.014,
            "y": 1112586.979
          },
          "OSM": {
            "edit_url": "https://www.openstreetmap.org/edit?way=899184235#map=17/10.00990/76.36594",
            "note_url": "https://www.openstreetmap.org/note/new#map=17/10.00990/76.36594&layers=N",
            "url": "https://www.openstreetmap.org/?mlat=10.00990&mlon=76.36594#map=17/10.00990/76.36594"
          },
          "UN_M49": {
            "regions": {
              "ASIA": "142",
              "IN": "356",
              "SOUTHERN_ASIA": "034",
              "WORLD": "001"
            },
            "statistical_groupings": [
              "LEDC"
            ]
          },
          "callingcode": 91,
          "currency": {
            "alternate_symbols": [
              "Rs",
              "৳",
              "૱",
              "௹",
              "रु",
              "₨"
            ],
            "decimal_mark": ".",
            "html_entity": "&#x20b9;",
            "iso_code": "INR",
            "iso_numeric": "356",
            "name": "Indian Rupee",
            "smallest_denomination": 50,
            "subunit": "Paisa",
            "subunit_to_unit": 100,
            "symbol": "₹",
            "symbol_first": 1,
            "thousands_separator": ","
          },
          "flag": "🇮🇳",
          "geohash": "t9y2cwpzzkxnehkkjcju",
          "qibla": 292.51,
          "roadinfo": {
            "drive_on": "left",
            "road": "InfoPark Express Way",
            "speed_in": "km/h"
          },
          "sun": {
            "rise": {
              "apparent": 1718930160,
              "astronomical": 1719011940,
              "civil": 1718928780,
              "nautical": 1719013560
            },
            "set": {
              "apparent": 1718975820,
              "astronomical": 1718980440,
              "civil": 1718977200,
              "nautical": 1718978820
            }
          },
          "timezone": {
            "name": "Asia/Kolkata",
            "now_in_dst": 0,
            "offset_sec": 19800,
            "offset_string": "+0530",
            "short_name": "IST"
          },
          "what3words": {
            "words": "brew.soup.policy"
          }
        },
        "bounds": {
          "northeast": {
            "lat": 10.0103672,
            "lng": 76.3662988
          },
          "southwest": {
            "lat": 10.0094339,
            "lng": 76.3655895
          }
        },
        "components": {
          "ISO_3166-1_alpha-2": "IN",
          "ISO_3166-1_alpha-3": "IND",
          "ISO_3166-2": [
            "IN-KL"
          ],
          "_category": "building",
          "_normalized_city": "Ernakulam",
          "_type": "building",
          "building": "Lulu Cyber Tower 1",
          "city": "Ernakulam",
          "commercial": "Infopark Kochi",
          "continent": "Asia",
          "country": "India",
          "country_code": "in",
          "county": "Kanayannur",
          "postcode": "682042",
          "road": "InfoPark Express Way",
          "state": "Kerala",
          "state_code": "KL",
          "state_district": "Ernakulam District",
          "suburb": "Edachira"
        },
        "confidence": 10,
        "distance_from_q": {
          "meters": 47
        },
        "formatted": "Lulu Cyber Tower 1, InfoPark Express Way, Edachira, Ernakulam - 682042, Kerala, India",
        "geometry": {
          "lat": 10.0099006,
          "lng": 76.3659441
        }
      }
    ],
    "status": {
      "code": 200,
      "message": "OK"
    },
    "stay_informed": {
      "blog": "https://blog.opencagedata.com",
      "mastodon": "https://en.osm.town/@opencage"
    },
    "thanks": "For using an OpenCage API",
    "timestamp": {
      "created_http": "Fri, 21 Jun 2024 09:51:19 GMT",
      "created_unix": 1718963479
    },
    "total_results": 1
  }

  console.log(a.results[0].components.building)