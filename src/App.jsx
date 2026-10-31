import React, { useState } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

// 20 Forts Data in English
const fortsData = [
  { latitude: 18.2347, longitude: 73.4464, name: "Raigad Fort", description: "Capital of the Maratha Empire under Chhatrapati Shivaji Maharaj." },
  { latitude: 19.1970, longitude: 73.8700, name: "Shivneri Fort", description: "Birthplace of Chhatrapati Shivaji Maharaj." },
  { latitude: 18.3663, longitude: 73.7559, name: "Sinhagad Fort", description: "Known for the legendary battle fought by Tanaji Malusare." },
  { latitude: 17.9262, longitude: 73.5358, name: "Pratapgad Fort", description: "Site of the famous Battle of Pratapgad." },
  { latitude: 18.7060, longitude: 73.4770, name: "Lohagad Fort", description: "A robust twin fort of Visapur, located near Pune." },
  { latitude: 18.2472, longitude: 73.6666, name: "Rajgad Fort", description: "The first capital of the Maratha Empire." },
  { latitude: 18.2770, longitude: 73.6200, name: "Torna Fort", description: "The first fort captured by Chhatrapati Shivaji Maharaj at age 16." },
  { latitude: 19.3953, longitude: 73.7766, name: "Harishchandragad", description: "An ancient hill fort famous for the Konkan Kada cliff." },
  { latitude: 16.8142, longitude: 74.1089, name: "Panhala Fort", description: "Historically significant fort located near Kolhapur." },
  { latitude: 16.0461, longitude: 73.4560, name: "Sindhudurg Fort", description: "A magnificent sea fort built by Shivaji Maharaj on the Konkan coast." },
  { latitude: 16.5592, longitude: 73.3328, name: "Vijaydurg Fort", description: "The oldest fort on the Sindhudurg coast, known for its strong naval base." },
  { latitude: 18.2995, longitude: 72.9647, name: "Murud-Janjira", description: "An impregnable island fort located in the Arabian Sea." },
  { latitude: 19.9452, longitude: 75.2131, name: "Daulatabad Fort", description: "Originally Devagiri, a powerful hilltop fortress." },
  { latitude: 18.2831, longitude: 73.9749, name: "Purandar Fort", description: "Birthplace of Chhatrapati Sambhaji Maharaj." },
  { latitude: 19.3298, longitude: 72.8146, name: "Vasai Fort", description: "Historically significant for Maratha-Portuguese conflicts." },
  { latitude: 18.8286, longitude: 73.3951, name: "Rajmachi Fort", description: "A popular trekking destination consisting of Shrivardhan and Manaranjan forts." },
  { latitude: 18.7180, longitude: 73.4912, name: "Visapur Fort", description: "A large hill fort near Lonavala, higher in elevation than Lohagad." },
  { latitude: 18.6338, longitude: 73.5133, name: "Tikona Fort", description: "A triangular hill fort located near Pawna Lake." },
  { latitude: 18.6533, longitude: 73.3892, name: "Tung Fort", description: "Also known as Kathingad, surrounded by water on three sides." },
  { latitude: 18.6212, longitude: 73.3860, name: "Korigad Fort", description: "A hill fort located near Aamby Valley." }
];

export default function App() {
  const [selectedFort, setSelectedFort] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: 75.0,
    latitude: 19.2,
    zoom: 5.2,
  });

  const region = import.meta.env.VITE_AWS_LOCATION_REGION || "eu-north-1";
  const mapName = "MaharashtraFortsMap";
  const apiKey = "v1.public.eyJqdGkiOiJlY2NkODA5Ni05MGQyLTQ0MjQtODQwNy1kYzMwY2NjMzM3YWIifZQwVkThvHVrYv0pNf0MoXYfDHJPAhT2ANI8lvCPkwvvcdmM-s-hp1TJYQVvKmRBcZ3J_5vHFmvVhB6LaUu05M1iAtOpAWzy1rL8sy2IjRk2tMQLN8-hWn7NBHbQr8Hf5P7LWGP3toJ6TIMAzmnkulqT1HZbmPgVct9ZGjmiTcUSvGPDgT61IYvN-qFNgHiA3EE6C2im2yktOx8Fgl7Sxf_4HDmMVyt7LVcI3tleZS2G4YGPDGqFXco2IYMdNACXZA-BVFztHmHD-7-BRvAnOl87r-qGMcwqW7hFYVNBrZvlVINHxhmTZAymIUZWAK5I05dd8url3qt8vAXrfTdTYOQ.N2IyNTQ2ODQtOWE1YS00MmI2LTkyOTItMGJlNGMxODU1Mzc2";
  
  // Changed back to V0 URL to match your Map Resource and API Key
  const mapStyleUrl = `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`;

  const filteredForts = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();
    setViewState({
      longitude: fort.longitude,
      latitude: fort.latitude,
      zoom: 12,
      transitionDuration: 1500
    });
  };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", margin: 0, padding: 0, overflow: "hidden", backgroundColor: "#0a0a0a", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      
      {/* Global Style Injection for Pro Vibe & Hover Effects */}
      <style>{`
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
        * { box-sizing: border-box; }
        .pro-scrollbar::-webkit-scrollbar { width: 6px; }
        .pro-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.5); }
        .pro-scrollbar::-webkit-scrollbar-thumb { background: #DAA520; border-radius: 10px; }
        .pro-scrollbar::-webkit-scrollbar-thumb:hover { background: #FF671F; }
        
        .fort-card {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        }
        .fort-card:hover { 
          transform: translateX(8px) translateY(-2px); 
          border-color: #FF671F !important; 
          background: rgba(255, 103, 31, 0.15) !important; 
          box-shadow: -5px 8px 15px rgba(255, 103, 31, 0.2), 0 0 10px rgba(218, 165, 32, 0.3) !important;
        }
      `}</style>

      {/* Sidebar - Royal Dashboard */}
      <div style={{ width: "380px", height: "100vh", background: "linear-gradient(180deg, #1a0505 0%, #0a0202 100%)", borderRight: "4px solid #DAA520", display: "flex", flexDirection: "column", zIndex: 10, boxShadow: "10px 0 30px rgba(0,0,0,0.9)" }}>
        
        {/* Header */}
        <div style={{ padding: "30px 20px", background: "radial-gradient(circle at top left, #3d0e0e, #1a0505)", borderBottom: "2px solid #DAA520", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-20px", left: "-20px", width: "100px", height: "100px", background: "radial-gradient(circle, rgba(255,103,31,0.2) 0%, transparent 70%)" }}></div>
          <h1 style={{ color: "#DAA520", margin: 0, fontSize: "28px", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "900", textShadow: "2px 2px 4px black" }}>
            Forts of <span style={{ color: "#FF671F" }}>Swarajya</span>
          </h1>
          <p style={{ color: "#e6d5b8", margin: "10px 0 0 0", fontSize: "13px", fontStyle: "italic", opacity: 0.8 }}>
            "Bravery, Valor and the History of Maharashtra"
          </p>
        </div>
        
        {/* List of Forts with Glassmorphism */}
        <div className="pro-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "20px 15px" }}>
          {fortsData.map((fort, index) => (
            <div 
              key={index} 
              className="fort-card"
              onClick={() => flyToFort(fort)}
              style={{ padding: "16px", margin: "0 0 15px 0", backgroundColor: "rgba(45, 22, 22, 0.4)", border: "1px solid rgba(218, 165, 32, 0.3)", borderRadius: "12px", cursor: "pointer", color: "white", backdropFilter: "blur(8px)" }}
            >
              <h3 style={{ margin: "0 0 8px 0", color: "#fbd38d", fontSize: "17px", fontWeight: "700", letterSpacing: "0.5px", display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "10px", fontSize: "18px" }}>⚔️</span>{fort.name}
              </h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#a0aec0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", opacity: 0.9 }}>
                {fort.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Map Area with Tactical Grid Background (visible if map takes time to load) */}
      <div style={{ 
        flex: 1, 
        position: "relative", 
        height: "100vh", 
        backgroundColor: "#111",
        backgroundImage: "linear-gradient(rgba(255, 103, 31, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 103, 31, 0.05) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }}>
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle={mapStyleUrl}
          style={{ width: "100%", height: "100%" }}
        >
          <NavigationControl position="top-right" />
          
          {fortsData.map((fort, index) => (
            <Marker
              key={index}
              longitude={fort.longitude}
              latitude={fort.latitude}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                flyToFort(fort);
              }}
            >
              {/* Premium Custom SVG Marker with Glow */}
              <div style={{ position: 'relative', cursor: 'pointer', transform: selectedFort?.name === fort.name ? 'scale(1.3)' : 'scale(1)', transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', filter: selectedFort?.name === fort.name ? 'drop-shadow(0 0 10px rgba(255,103,31,0.8))' : 'drop-shadow(0px 8px 10px rgba(0,0,0,0.9))' }}>
                <svg width="45" height="45" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 60V10" stroke="#DAA520" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M22 12L58 20L36 28L60 36L22 42V12Z" fill="#FF671F" stroke="#8B0000" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M10 60L10 50L16 50L16 44L24 44L24 50L30 50L30 60Z" fill="#8B4513" stroke="#DAA520" strokeWidth="2"/>
                </svg>
              </div>
            </Marker>
          ))}

          {selectedFort && (
            <Popup
              longitude={selectedFort.longitude}
              latitude={selectedFort.latitude}
              anchor="top"
              onClose={() => setSelectedFort(null)}
              closeOnClick={false}
              offset={15}
            >
              {/* Parchment Style Popup */}
              <div style={{ padding: "18px", backgroundColor: "#f4ecd8", border: "3px solid #8b4513", borderRadius: "8px", maxWidth: "260px", boxShadow: "4px 4px 20px rgba(0,0,0,0.8)", backgroundImage: "radial-gradient(#e6d5b8 10%, transparent 10%)", backgroundSize: "10px 10px" }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#8b0000", borderBottom: "2px solid #DAA520", paddingBottom: "6px", fontSize: "19px", fontWeight: "900", textTransform: "uppercase" }}>
                  {selectedFort.name}
                </h3>
                <p style={{ margin: 0, fontSize: "14px", color: "#3e2723", lineHeight: "1.6", fontWeight: "600" }}>
                  {selectedFort.description}
                </p>
                <div style={{ marginTop: "12px", paddingTop: "8px", borderTop: "1px dashed rgba(139, 69, 19, 0.3)", fontSize: "11px", color: "#8b4513", fontWeight: "bold", display: "flex", justifyContent: "space-between" }}>
                  <span>LAT: {selectedFort.latitude.toFixed(3)}</span>
                  <span>LNG: {selectedFort.longitude.toFixed(3)}</span>
                </div>
              </div>
            </Popup>
          )}
        </Map>

        {/* Watermark text - Properly Spaced away from edges */}
        <div style={{ position: "absolute", bottom: "40px", right: "40px", textAlign: "right", pointerEvents: "none", zIndex: 10 }}>
          <h2 style={{ margin: "0 0 5px 0", color: "rgba(255, 103, 31, 0.7)", fontSize: "45px", textShadow: "4px 4px 15px rgba(0,0,0,1)", letterSpacing: "4px", fontWeight: "900", fontFamily: "impact, sans-serif" }}>
            JAI BHAVANI
          </h2>
          <h2 style={{ margin: 0, color: "rgba(218, 165, 32, 0.7)", fontSize: "45px", textShadow: "4px 4px 15px rgba(0,0,0,1)", letterSpacing: "4px", fontWeight: "900", fontFamily: "impact, sans-serif" }}>
            JAI SHIVAJI
          </h2>
        </div>
      </div>
    </div>
  );
}
