```jsx
import React, { useState } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
} from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";

// ==========================================
// FORTS OF SWARAJYA — 20 FORTS
// ==========================================

const fortsData = [
  {
    latitude: 18.2347,
    longitude: 73.4464,
    name: "Raigad Fort",
    description:
      "Capital of the Maratha Empire under Chhatrapati Shivaji Maharaj.",
  },
  {
    latitude: 19.197,
    longitude: 73.87,
    name: "Shivneri Fort",
    description: "Birthplace of Chhatrapati Shivaji Maharaj.",
  },
  {
    latitude: 18.3663,
    longitude: 73.7559,
    name: "Sinhagad Fort",
    description:
      "Known for the legendary battle fought by Tanaji Malusare.",
  },
  {
    latitude: 17.9262,
    longitude: 73.5358,
    name: "Pratapgad Fort",
    description: "Site of the famous Battle of Pratapgad.",
  },
  {
    latitude: 18.706,
    longitude: 73.477,
    name: "Lohagad Fort",
    description: "A robust twin fort of Visapur, located near Pune.",
  },
  {
    latitude: 18.2472,
    longitude: 73.6666,
    name: "Rajgad Fort",
    description: "The first capital of the Maratha Empire.",
  },
  {
    latitude: 18.277,
    longitude: 73.62,
    name: "Torna Fort",
    description:
      "The first fort captured by Chhatrapati Shivaji Maharaj at age 16.",
  },
  {
    latitude: 19.3953,
    longitude: 73.7766,
    name: "Harishchandragad",
    description:
      "An ancient hill fort famous for the Konkan Kada cliff.",
  },
  {
    latitude: 16.8142,
    longitude: 74.1089,
    name: "Panhala Fort",
    description: "Historically significant fort located near Kolhapur.",
  },
  {
    latitude: 16.0461,
    longitude: 73.456,
    name: "Sindhudurg Fort",
    description:
      "A magnificent sea fort built by Shivaji Maharaj on the Konkan coast.",
  },
  {
    latitude: 16.5592,
    longitude: 73.3328,
    name: "Vijaydurg Fort",
    description:
      "The oldest fort on the Sindhudurg coast, known for its strong naval base.",
  },
  {
    latitude: 18.2995,
    longitude: 72.9647,
    name: "Murud-Janjira",
    description: "An impregnable island fort located in the Arabian Sea.",
  },
  {
    latitude: 19.9452,
    longitude: 75.2131,
    name: "Daulatabad Fort",
    description: "Originally Devagiri, a powerful hilltop fortress.",
  },
  {
    latitude: 18.2831,
    longitude: 73.9749,
    name: "Purandar Fort",
    description: "Birthplace of Chhatrapati Sambhaji Maharaj.",
  },
  {
    latitude: 19.3298,
    longitude: 72.8146,
    name: "Vasai Fort",
    description:
      "Historically significant for Maratha-Portuguese conflicts.",
  },
  {
    latitude: 18.8286,
    longitude: 73.3951,
    name: "Rajmachi Fort",
    description:
      "A popular trekking destination consisting of Shrivardhan and Manaranjan forts.",
  },
  {
    latitude: 18.718,
    longitude: 73.4912,
    name: "Visapur Fort",
    description:
      "A large hill fort near Lonavala, higher in elevation than Lohagad.",
  },
  {
    latitude: 18.6338,
    longitude: 73.5133,
    name: "Tikona Fort",
    description: "A triangular hill fort located near Pawna Lake.",
  },
  {
    latitude: 18.6533,
    longitude: 73.3892,
    name: "Tung Fort",
    description:
      "Also known as Kathingad, surrounded by water on three sides.",
  },
  {
    latitude: 18.6212,
    longitude: 73.386,
    name: "Korigad Fort",
    description: "A hill fort located near Aamby Valley.",
  },
];

// ==========================================
// MAIN APPLICATION
// ==========================================

export default function App() {
  const [selectedFort, setSelectedFort] = useState(null);

  const [viewState, setViewState] = useState({
    longitude: 75.0,
    latitude: 18.5,
    zoom: 6.2,
  });

  // AWS LOCATION SERVICE CONFIGURATION
  // Set these values in your .env file.

  const region =
    import.meta.env.VITE_AWS_LOCATION_REGION || "eu-north-1";

  const mapName =
    import.meta.env.VITE_AWS_LOCATION_MAP_NAME ||
    "MaharashtraFortsMap";

  const apiKey =
    import.meta.env.VITE_AWS_LOCATION_API_KEY;

  const mapStyleUrl = apiKey
    ? `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${encodeURIComponent(
        mapName
      )}/style-descriptor?key=${encodeURIComponent(apiKey)}`
    : null;

  // ==========================================
  // FLY TO SELECTED FORT
  // ==========================================

  const flyToFort = (fort) => {
    setSelectedFort(fort);

    setViewState({
      longitude: fort.longitude,
      latitude: fort.latitude,
      zoom: 12,
      transitionDuration: 1500,
    });
  };

  // ==========================================
  // APPLICATION UI
  // ==========================================

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100dvh",
        minWidth: 0,
        minHeight: 0,
        margin: 0,
        padding: 0,
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
        fontFamily:
          "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside
        style={{
          width: "clamp(300px, 25vw, 360px)",
          minWidth: "300px",
          flexShrink: 0,
          height: "100%",
          background:
            "linear-gradient(180deg, #1a0505 0%, #0a0202 100%)",
          borderRight: "4px solid #DAA520",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 10,
          boxShadow: "10px 0 30px rgba(0,0,0,0.9)",
        }}
      >
        {/* HEADER */}

        <header
          style={{
            padding: "26px 16px",
            background:
              "radial-gradient(circle at top left, #3d0e0e, #1a0505)",
            borderBottom: "2px solid #DAA520",
            textAlign: "center",
            position: "relative",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20px",
              left: "-20px",
              width: "100px",
              height: "100px",
              background:
                "radial-gradient(circle, rgba(255,103,31,0.2) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <h1
            style={{
              color: "#DAA520",
              margin: 0,
              fontSize: "28px",
              lineHeight: 1.1,
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontWeight: 900,
              textShadow: "2px 2px 4px black",
            }}
          >
            Forts of{" "}
            <span style={{ color: "#FF671F" }}>
              Swarajya
            </span>
          </h1>

          <p
            style={{
              color: "#e6d5b8",
              margin: "10px 0 0",
              fontSize: "12px",
              lineHeight: 1.5,
              fontStyle: "italic",
              opacity: 0.8,
            }}
          >
            "Bravery, Valor and the History of Maharashtra"
          </p>
        </header>

        {/* FORT LIST */}

        <div
          className="pro-scrollbar"
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            padding: "20px 15px",
          }}
        >
          {fortsData.map((fort) => (
            <div
              key={fort.name}
              className="fort-card"
              onClick={() => flyToFort(fort)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();
                  flyToFort(fort);
                }
              }}
              role="button"
              tabIndex={0}
              style={{
                padding: "16px",
                marginBottom: "15px",
                backgroundColor: "rgba(45, 22, 22, 0.4)",
                border:
                  "1px solid rgba(218, 165, 32, 0.3)",
                borderRadius: "12px",
                cursor: "pointer",
                color: "white",
                backdropFilter: "blur(8px)",
                outlineOffset: "3px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 8px",
                  color: "#fbd38d",
                  fontSize: "16px",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  display: "flex",
                  alignItems: "center",
                  lineHeight: 1.4,
                }}
              >
                <span
                  style={{
                    marginRight: "10px",
                    fontSize: "18px",
                    flexShrink: 0,
                  }}
                >
                  ⚔️
                </span>

                {fort.name}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  lineHeight: 1.6,
                  color: "#a0aec0",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  opacity: 0.9,
                }}
              >
                {fort.description}
              </p>
            </div>
          ))}
        </div>
      </aside>

      {/* =====================================
          MAP AREA
      ===================================== */}

      <main
        className="map-container"
        style={{
          flex: "1 1 0",
          minWidth: 0,
          minHeight: 0,
          position: "relative",
          height: "100%",
          overflow: "hidden",
          backgroundColor: "#111",
          backgroundImage:
            "linear-gradient(rgba(255,103,31,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,103,31,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        {/* AWS MAP */}

        {mapStyleUrl ? (
          <Map
            {...viewState}
            onMove={(event) =>
              setViewState(event.viewState)
            }
            mapStyle={mapStyleUrl}
            onError={(event) => {
              console.error(
                "AWS Map loading error:",
                event.error
              );
            }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <NavigationControl position="top-right" />

            {/* FORT MARKERS */}

            {fortsData.map((fort) => (
              <Marker
                key={fort.name}
                longitude={fort.longitude}
                latitude={fort.latitude}
                anchor="bottom"
                onClick={(event) => {
                  event.originalEvent.stopPropagation();
                  flyToFort(fort);
                }}
              >
                <div
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    transform:
                      selectedFort?.name === fort.name
                        ? "scale(1.3)"
                        : "scale(1)",
                    transition:
                      "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    filter:
                      selectedFort?.name === fort.name
                        ? "drop-shadow(0 0 10px rgba(255,103,31,0.8))"
                        : "drop-shadow(0px 8px 10px rgba(0,0,0,0.9))",
                  }}
                >
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 60V10"
                      stroke="#DAA520"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    <path
                      d="M22 12L58 20L36 28L60 36L22 42V12Z"
                      fill="#FF671F"
                      stroke="#8B0000"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M10 60L10 50L16 50L16 44L24 44L24 50L30 50L30 60Z"
                      fill="#8B4513"
                      stroke="#DAA520"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </Marker>
            ))}

            {/* SELECTED FORT POPUP */}

            {selectedFort && (
              <Popup
                longitude={selectedFort.longitude}
                latitude={selectedFort.latitude}
                anchor="top"
                onClose={() => setSelectedFort(null)}
                closeOnClick={false}
                offset={15}
              >
                <div
                  style={{
                    padding: "18px",
                    backgroundColor: "#f4ecd8",
                    border: "3px solid #8b4513",
                    borderRadius: "8px",
                    maxWidth: "260px",
                    boxShadow: "4px 4px 20px rgba(0,0,0,0.8)",
                    backgroundImage:
                      "radial-gradient(#e6d5b8 10%, transparent 10%)",
                    backgroundSize: "10px 10px",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 10px",
                      color: "#8b0000",
                      borderBottom: "2px solid #DAA520",
                      paddingBottom: "6px",
                      fontSize: "19px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                    }}
                  >
                    {selectedFort.name}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "#3e2723",
                      lineHeight: 1.6,
                      fontWeight: 600,
                    }}
                  >
                    {selectedFort.description}
                  </p>

                  <div
                    style={{
                      marginTop: "12px",
                      paddingTop: "8px",
                      borderTop:
                        "1px dashed rgba(139,69,19,0.3)",
                      fontSize: "11px",
                      color: "#8b4513",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <span>
                      LAT: {selectedFort.latitude.toFixed(3)}
                    </span>

                    <span>
                      LNG: {selectedFort.longitude.toFixed(3)}
                    </span>
                  </div>
                </div>
              </Popup>
            )}
          </Map>
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              padding: "24px",
              color: "#fbd38d",
              textAlign: "center",
            }}
          >
            <div>
              <h2 style={{ color: "#DAA520" }}>
                Map Configuration Missing
              </h2>

              <p>
                Add your AWS Location API key to the .env
                file and restart the development server.
              </p>
            </div>
          </div>
        )}

        {/* =====================================
            WATERMARK
        ===================================== */}

        <div
          style={{
            position: "absolute",
            bottom: "30px",
            right: "25px",
            textAlign: "right",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <h2
            style={{
              margin: "0 0 5px",
              color: "rgba(255,103,31,0.7)",
              fontSize: "clamp(20px, 3vw, 45px)",
              textShadow: "4px 4px 15px rgba(0,0,0,1)",
              letterSpacing: "3px",
              fontWeight: 900,
              fontFamily: "Impact, sans-serif",
            }}
          >
            JAI BHAVANI
          </h2>

          <h2
            style={{
              margin: 0,
              color: "rgba(218,165,32,0.7)",
              fontSize: "clamp(20px, 3vw, 45px)",
              textShadow: "4px 4px 15px rgba(0,0,0,1)",
              letterSpacing: "3px",
              fontWeight: 900,
              fontFamily: "Impact, sans-serif",
            }}
          >
            JAI SHIVAJI
          </h2>
        </div>
      </main>
    </div>
  );
}
```
