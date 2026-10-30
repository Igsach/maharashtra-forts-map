import React, { useState } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

// 20 Forts Data embedded directly into the file for convenience
const fortsData = [
  { name: "Raigad Fort", description: "Capital of the Maratha Empire under Chhatrapati Shivaji Maharaj.", latitude: 18.2347, longitude: 73.4464 },
  { name: "Shivneri Fort", description: "Birthplace of Chhatrapati Shivaji Maharaj.", latitude: 19.1970, longitude: 73.8700 },
  { name: "Sinhagad Fort", description: "Known for the legendary battle fought by Tanaji Malusare.", latitude: 18.3663, longitude: 73.7559 },
  { name: "Pratapgad Fort", description: "Site of the famous Battle of Pratapgad.", latitude: 17.9262, longitude: 73.5358 },
  { name: "Lohagad Fort", description: "A robust twin fort of Visapur, located near Pune.", latitude: 18.7060, longitude: 73.4770 },
  { name: "Rajgad Fort", description: "The first capital of the Maratha Empire.", latitude: 18.2472, longitude: 73.6666 },
  { name: "Torna Fort", description: "The first fort captured by Chhatrapati Shivaji Maharaj at age 16.", latitude: 18.2770, longitude: 73.6200 },
  { name: "Harishchandragad", description: "An ancient hill fort famous for the Konkan Kada cliff.", latitude: 19.3953, longitude: 73.7766 },
  { name: "Panhala Fort", description: "Historically significant fort located near Kolhapur.", latitude: 16.8142, longitude: 74.1089 },
  { name: "Sindhudurg Fort", description: "A magnificent sea fort built by Shivaji Maharaj on the Konkan coast.", latitude: 16.0461, longitude: 73.4560 },
  { name: "Vijaydurg Fort", description: "The oldest fort on the Sindhudurg coast, known for its strong naval base.", latitude: 16.5592, longitude: 73.3328 },
  { name: "Murud-Janjira", description: "An impregnable island fort located in the Arabian Sea.", latitude: 18.2995, longitude: 72.9647 },
  { name: "Daulatabad Fort", description: "Originally Devagiri, a powerful hilltop fortress near Chhatrapati Sambhajinagar.", latitude: 19.9452, longitude: 75.2131 },
  { name: "Purandar Fort", description: "Birthplace of Chhatrapati Sambhaji Maharaj.", latitude: 18.2831, longitude: 73.9749 },
  { name: "Vasai Fort", description: "Also known as Bassein Fort, historically significant for Maratha-Portuguese conflicts.", latitude: 19.3298, longitude: 72.8146 },
  { name: "Rajmachi Fort", description: "A popular trekking destination consisting of Shrivardhan and Manaranjan forts.", latitude: 18.8286, longitude: 73.3951 },
  { name: "Visapur Fort", description: "A large hill fort near Lonavala, higher in elevation than Lohagad.", latitude: 18.7180, longitude: 73.4912 },
  { name: "Tikona Fort", description: "A triangular hill fort located near Pawna Lake.", latitude: 18.6338, longitude: 73.5133 },
  { name: "Tung Fort", description: "Also known as Kathingad, surrounded by water on three sides.", latitude: 18.6533, longitude: 73.3892 },
  { name: "Korigad Fort", description: "A hill fort located near Aamby Valley.", latitude: 18.6212, longitude: 73.3860 }
];

export default function App() {
  const [selectedFort, setSelectedFort] = useState(null);

  // AWS Location Service Details (We will update these in the next step)
  const region = "ap-south-1"; 
  const mapName = "YOUR_AWS_MAP_NAME";
  const apiKey = "YOUR_AWS_API_KEY";
  
  // Note: Until we get the AWS API key, the map might show blank or an error. 
  // For testing without AWS key initially, you can use a free style URL like below:
  // const mapStyleUrl = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
  
  const mapStyleUrl = `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`;

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Header overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        padding: "15px",
        backgroundColor: "rgba(30, 41, 59, 0.9)",
        color: "white",
        zIndex: 10,
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
      }}>
        <h1 style={{ margin: 0, fontFamily: "sans-serif", fontSize: "24px" }}>
          🏰 Historical Forts of Maharashtra
        </h1>
        <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#cbd5e1" }}>
          Explore the magnificent forts built and conquered during the Maratha Empire.
        </p>
      </div>

      <Map
        initialViewState={{
          longitude: 73.8478, // Center of Maharashtra (Pune roughly)
          latitude: 18.5204,
          zoom: 6.5
        }}
        mapStyle={mapStyleUrl}
      >
        <NavigationControl position="bottom-right" />
        
        {fortsData.map((fort, index) => (
          <Marker
            key={index}
            longitude={fort.longitude}
            latitude={fort.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedFort(fort);
            }}
          >
            <div style={{ 
              fontSize: "24px", 
              cursor: "pointer",
              filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.5))"
            }}>
              🚩
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
          >
            <div style={{ padding: "10px", fontFamily: "sans-serif", maxWidth: "200px" }}>
              <h3 style={{ margin: "0 0 8px 0", color: "#b91c1c", fontSize: "18px" }}>
                {selectedFort.name}
              </h3>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.4", color: "#333" }}>
                {selectedFort.description}
              </p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}