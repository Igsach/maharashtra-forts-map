import React, { useMemo, useState } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

// 100 Maharashtra forts. Coordinates from official UNESCO records are used where available;
// remaining map points are approximate and should be checked against authoritative GIS data.
const fortsData = [
  {
    "name": "Raigad Fort",
    "description": "Served as the capital of Shivaji Maharaj's kingdom; his coronation took place here in 1674.",
    "latitude": 18.236111,
    "longitude": 73.444444
  },
  {
    "name": "Shivneri Fort",
    "description": "Hill fort near Junnar traditionally identified as Shivaji Maharaj's birthplace.",
    "latitude": 19.196667,
    "longitude": 73.858333
  },
  {
    "name": "Sinhagad Fort",
    "description": "Formerly Kondhana; associated with the 1670 battle in which Tanaji Malusare was killed.",
    "latitude": 18.3663,
    "longitude": 73.7559
  },
  {
    "name": "Pratapgad Fort",
    "description": "Near Mahabaleshwar; associated with the 1659 encounter with Afzal Khan.",
    "latitude": 17.935833,
    "longitude": 73.578611
  },
  {
    "name": "Lohagad Fort",
    "description": "Hill fort near Lonavala; one of the Maharashtra components of the UNESCO-listed Maratha Military Landscapes.",
    "latitude": 18.71,
    "longitude": 73.476667
  },
  {
    "name": "Rajgad Fort",
    "description": "An important early capital of Shivaji Maharaj's kingdom before the capital shifted to Raigad.",
    "latitude": 18.246111,
    "longitude": 73.6825
  },
  {
    "name": "Torna Fort",
    "description": "Also called Prachandagad; captured by Shivaji Maharaj in 1646, when he was about 16.",
    "latitude": 18.2758,
    "longitude": 73.6217
  },
  {
    "name": "Harishchandragad",
    "description": "Ancient hill fort known for Konkan Kada cliff and Kedareshwar cave.",
    "latitude": 19.3928,
    "longitude": 73.7794
  },
  {
    "name": "Panhala Fort",
    "description": "Large hill fort near Kolhapur, associated with Shivaji Maharaj's 1660 escape.",
    "latitude": 16.811111,
    "longitude": 74.108056
  },
  {
    "name": "Sindhudurg Fort",
    "description": "Sea fort built under Shivaji Maharaj near Malvan.",
    "latitude": 16.0425,
    "longitude": 73.459722
  },
  {
    "name": "Vijaydurg Fort",
    "description": "Coastal fort and historic Maratha naval stronghold.",
    "latitude": 16.561175,
    "longitude": 73.332972
  },
  {
    "name": "Murud-Janjira Fort",
    "description": "Island sea fort near Murud, historically held by the Siddis and renowned for its strong defenses.",
    "latitude": 18.299917,
    "longitude": 72.964411
  },
  {
    "name": "Daulatabad Fort",
    "description": "Devagiri hill fortress near Chhatrapati Sambhajinagar, with layered defenses.",
    "latitude": 19.9368,
    "longitude": 75.221
  },
  {
    "name": "Purandar Fort",
    "description": "Hill fort near Pune; Sambhaji Maharaj was born here in 1657.",
    "latitude": 18.282,
    "longitude": 73.972
  },
  {
    "name": "Vasai Fort",
    "description": "Portuguese-era fort complex captured by Maratha forces led by Chimaji Appa in 1739.",
    "latitude": 19.330497,
    "longitude": 72.815572
  },
  {
    "name": "Rajmachi Fort",
    "description": "Twin-fort complex of Shrivardhan and Manaranjan overlooking Bor Ghat.",
    "latitude": 18.835,
    "longitude": 73.393
  },
  {
    "name": "Visapur Fort",
    "description": "Large hill fort near Lohagad and Lonavala.",
    "latitude": 18.719,
    "longitude": 73.489
  },
  {
    "name": "Tikona Fort",
    "description": "Triangular hill fort near Pawna Lake, also called Vitandgad.",
    "latitude": 18.629,
    "longitude": 73.514
  },
  {
    "name": "Tung Fort",
    "description": "Steep hill fort near Pawna Lake, also known as Kathingad.",
    "latitude": 18.653,
    "longitude": 73.389
  },
  {
    "name": "Korigad Fort",
    "description": "Hill fort near Aamby Valley and Lonavala.",
    "latitude": 18.621,
    "longitude": 73.386
  },
  {
    "name": "Salher Fort",
    "description": "High hill fort in Nashik district and site of the important 1672 Battle of Salher.",
    "latitude": 20.7225,
    "longitude": 73.9425
  },
  {
    "name": "Mulher Fort",
    "description": "Hill fort in the Baglan region of Nashik district.",
    "latitude": 20.755,
    "longitude": 73.875
  },
  {
    "name": "Korlai Fort",
    "description": "Coastal fort on the headland near Revdanda, included in India’s UNESCO tentative-list proposal for Konkan coastal fortifications.",
    "latitude": 18.536406,
    "longitude": 72.964411
  },
  {
    "name": "Hargad Fort",
    "description": "Hill fort near the Mulher-Salher range in Nashik district.",
    "latitude": 20.77,
    "longitude": 73.9
  },
  {
    "name": "Ratangad Fort",
    "description": "Hill fort near Bhandardara, known for the rock cleft called Nedhe.",
    "latitude": 19.5,
    "longitude": 73.7
  },
  {
    "name": "Alang Fort",
    "description": "Difficult-to-access hill fort in the Kalsubai range.",
    "latitude": 19.7,
    "longitude": 73.75
  },
  {
    "name": "Madan Fort",
    "description": "Steep hill fort in the Kalsubai range, often visited with Alang and Kulang.",
    "latitude": 19.708,
    "longitude": 73.758
  },
  {
    "name": "Kulang Fort",
    "description": "High hill fort in the Kalsubai range with a long ascent and plateau.",
    "latitude": 19.716,
    "longitude": 73.765
  },
  {
    "name": "Harihar Fort",
    "description": "Nashik district hill fort famous for its steep rock-cut staircase.",
    "latitude": 19.906,
    "longitude": 73.633
  },
  {
    "name": "Anjaneri Fort",
    "description": "Hill fort near Trimbakeshwar, associated in local tradition with Hanuman.",
    "latitude": 19.933,
    "longitude": 73.54
  },
  {
    "name": "Tringalwadi Fort",
    "description": "Hill fort near Igatpuri overlooking Tringalwadi Lake.",
    "latitude": 19.706,
    "longitude": 73.557
  },
  {
    "name": "Avandha Fort",
    "description": "Hill fort in Nashik district, part of the Sahyadri fort landscape.",
    "latitude": 19.76,
    "longitude": 73.8
  },
  {
    "name": "Patta Fort",
    "description": "Also known as Vishramgad, a hill fort in the Nashik-Ahmednagar region.",
    "latitude": 19.55,
    "longitude": 73.78
  },
  {
    "name": "Aundha Fort",
    "description": "Hill fort in the Nashik region, often paired with Patta Fort.",
    "latitude": 19.59,
    "longitude": 73.8
  },
  {
    "name": "Dhodap Fort",
    "description": "Prominent high hill fort in Nashik district.",
    "latitude": 20.25,
    "longitude": 73.85
  },
  {
    "name": "Ramsej Fort",
    "description": "Hill fort near Nashik known for resistance during Mughal-Maratha conflict.",
    "latitude": 20.05,
    "longitude": 73.78
  },
  {
    "name": "Ankai Fort",
    "description": "Hill fort near Manmad, close to a Jain cave complex.",
    "latitude": 20.26,
    "longitude": 74.43
  },
  {
    "name": "Tankai Fort",
    "description": "Hill fort adjacent to Ankai, forming a paired fort complex.",
    "latitude": 20.255,
    "longitude": 74.445
  },
  {
    "name": "Chandwad Fort",
    "description": "Fortification near Chandwad town in Nashik district.",
    "latitude": 20.33,
    "longitude": 74.245
  },
  {
    "name": "Kavnai Fort",
    "description": "Hill fort near Igatpuri in Nashik district.",
    "latitude": 19.7,
    "longitude": 73.6
  },
  {
    "name": "Ahivant Fort",
    "description": "Hill fort in Nashik district, part of the region's historic fort network.",
    "latitude": 20.3,
    "longitude": 73.9
  },
  {
    "name": "Achala Fort",
    "description": "Hill fort in the Nashik region near the Ahivant fort group.",
    "latitude": 20.32,
    "longitude": 73.88
  },
  {
    "name": "Markandeya Fort",
    "description": "Hill fort near Vani in Nashik district.",
    "latitude": 20.39,
    "longitude": 73.85
  },
  {
    "name": "Salota Fort",
    "description": "Hill fort near Salher in the Baglan region.",
    "latitude": 20.735,
    "longitude": 73.925
  },
  {
    "name": "Kanchana Fort",
    "description": "Hill fort in the Nashik region, associated with the Kanchana-Manchana range.",
    "latitude": 20.35,
    "longitude": 73.85
  },
  {
    "name": "Jivdhan Fort",
    "description": "Hill fort near Naneghat, known for its steep approach.",
    "latitude": 19.3,
    "longitude": 73.733
  },
  {
    "name": "Hadsar Fort",
    "description": "Hill fort near Junnar, with distinctive stone-cut entrance architecture.",
    "latitude": 19.25,
    "longitude": 73.733
  },
  {
    "name": "Chavand Fort",
    "description": "Also called Prasannagad, a hill fort near Junnar.",
    "latitude": 19.25,
    "longitude": 73.7
  },
  {
    "name": "Nimgiri Fort",
    "description": "Hill fort near Junnar, often considered alongside Hanumantgad.",
    "latitude": 19.27,
    "longitude": 73.72
  },
  {
    "name": "Narayangad Fort",
    "description": "Hill fort near Narayangaon in Pune district.",
    "latitude": 19.1,
    "longitude": 74.05
  },
  {
    "name": "Mahuli Fort",
    "description": "Hill fort complex near Shahapur in Thane district.",
    "latitude": 19.45,
    "longitude": 73.33
  },
  {
    "name": "Gorakhgad Fort",
    "description": "Distinctive hill fort near Murbad, known for its steep rock face.",
    "latitude": 19.25,
    "longitude": 73.4
  },
  {
    "name": "Siddhagad Fort",
    "description": "Hill fort in the Murbad region of Thane district.",
    "latitude": 19.2,
    "longitude": 73.45
  },
  {
    "name": "Kohoj Fort",
    "description": "Hill fort near Palghar, recognizable by its rock pinnacles.",
    "latitude": 19.78,
    "longitude": 72.9
  },
  {
    "name": "Asherigad Fort",
    "description": "Hill fort in Palghar district near the Mumbai-Ahmedabad corridor.",
    "latitude": 19.78,
    "longitude": 72.85
  },
  {
    "name": "Tandulwadi Fort",
    "description": "Hill fort near Saphale in Palghar district.",
    "latitude": 19.59,
    "longitude": 72.83
  },
  {
    "name": "Kaldurg Fort",
    "description": "Hill fort in Palghar district rising above the coastal plain.",
    "latitude": 19.75,
    "longitude": 72.9
  },
  {
    "name": "Arnala Fort",
    "description": "Island fort off Virar, built during Portuguese rule and later held by Marathas.",
    "latitude": 19.46595,
    "longitude": 72.732253
  },
  {
    "name": "Kelva Fort",
    "description": "Coastal fort near Kelva Beach in Palghar district.",
    "latitude": 19.6,
    "longitude": 72.73
  },
  {
    "name": "Bandra Fort",
    "description": "Also called Castella de Aguada, a Portuguese-era coastal fort in Mumbai.",
    "latitude": 19.0418,
    "longitude": 72.8186
  },
  {
    "name": "Mahim Fort",
    "description": "Coastal fort at Mahim, Mumbai, associated with medieval regional defenses.",
    "latitude": 19.0398,
    "longitude": 72.8378
  },
  {
    "name": "Sewri Fort",
    "description": "Fort on Mumbai's eastern waterfront, built during the British period.",
    "latitude": 19.0006,
    "longitude": 72.8604
  },
  {
    "name": "Worli Fort",
    "description": "Small coastal fort in Mumbai built by the British in the 17th century.",
    "latitude": 19.0237,
    "longitude": 72.8166
  },
  {
    "name": "Sion Fort",
    "description": "Hillock fort in Mumbai built by the British in the 17th century.",
    "latitude": 19.0466,
    "longitude": 72.8675
  },
  {
    "name": "Bombay Castle",
    "description": "Historic fortification associated with the early English East India Company settlement.",
    "latitude": 18.9311,
    "longitude": 72.8375
  },
  {
    "name": "Karnala Fort",
    "description": "Hill fort near Panvel, overlooking routes through the Konkan.",
    "latitude": 18.885,
    "longitude": 73.117
  },
  {
    "name": "Prabalgad Fort",
    "description": "Hill fort between Matheran and Panvel, near Kalavantin Durg.",
    "latitude": 18.925,
    "longitude": 73.225
  },
  {
    "name": "Kalavantin Durg",
    "description": "Rock pinnacle near Prabalgad, known for its steep steps and views.",
    "latitude": 18.923,
    "longitude": 73.221
  },
  {
    "name": "Irshalgad Fort",
    "description": "Rocky hill fort between Panvel and Matheran.",
    "latitude": 18.9,
    "longitude": 73.25
  },
  {
    "name": "Manikgad Fort (Raigad)",
    "description": "Hill fort near Rasayani in Raigad district.",
    "latitude": 18.85,
    "longitude": 73.2
  },
  {
    "name": "Sankshi Fort",
    "description": "Hill fort in Raigad district near Pen.",
    "latitude": 18.65,
    "longitude": 73.1
  },
  {
    "name": "Avchitgad Fort",
    "description": "Hill fort near Roha in Raigad district, with surviving walls and water tanks.",
    "latitude": 18.45,
    "longitude": 73.12
  },
  {
    "name": "Sudhagad Fort",
    "description": "Also called Bhorapgad, a hill fort near Pali in Raigad district.",
    "latitude": 18.52,
    "longitude": 73.37
  },
  {
    "name": "Sarasgad Fort",
    "description": "Hill fort near Pali in Raigad district, close to Sudhagad.",
    "latitude": 18.52,
    "longitude": 73.28
  },
  {
    "name": "Ghangad Fort",
    "description": "Small hill fort near Ekole in the Lonavala region.",
    "latitude": 18.65,
    "longitude": 73.4
  },
  {
    "name": "Kothaligad Fort",
    "description": "Also called Peth Fort, near Karjat; known for rock-cut steps.",
    "latitude": 19.15,
    "longitude": 73.5
  },
  {
    "name": "Lingana Fort",
    "description": "Steep pinnacle between Raigad and Torna, historically used as a prison fort.",
    "latitude": 18.25,
    "longitude": 73.5
  },
  {
    "name": "Kolaba Fort",
    "description": "Sea fort off Alibag and a significant Maratha naval outpost.",
    "latitude": 18.64,
    "longitude": 72.865
  },
  {
    "name": "Khanderi Fort",
    "description": "Island fort off Alibag, part of the coastal defense system near Underi.",
    "latitude": 18.703889,
    "longitude": 72.813333
  },
  {
    "name": "Underi Fort",
    "description": "Small island fort near Alibag, opposite Khanderi.",
    "latitude": 18.67,
    "longitude": 72.875
  },
  {
    "name": "Padmadurg Fort",
    "description": "Sea fort near Murud, built under Shivaji Maharaj as coastal defense.",
    "latitude": 18.29,
    "longitude": 72.94
  },
  {
    "name": "Bankot Fort",
    "description": "Coastal fort overlooking the Savitri River estuary in Ratnagiri district.",
    "latitude": 17.973531,
    "longitude": 73.042389
  },
  {
    "name": "Suvarnadurg Fort",
    "description": "Sea fort off Harnai in Ratnagiri district.",
    "latitude": 17.815972,
    "longitude": 73.084425
  },
  {
    "name": "Kanakadurga Fort",
    "description": "Coastal fort on the Harnai headland, opposite Suvarnadurg.",
    "latitude": 17.815,
    "longitude": 73.095
  },
  {
    "name": "Jaigad Fort",
    "description": "Coastal fort at the Shastri River mouth in Ratnagiri district.",
    "latitude": 17.300486,
    "longitude": 73.221569
  },
  {
    "name": "Ratnadurg Fort",
    "description": "Coastal fort in Ratnagiri, also known as Bhagwati Fort.",
    "latitude": 16.98,
    "longitude": 73.28
  },
  {
    "name": "Purnagad Fort",
    "description": "Coastal fort near the Muchkundi River mouth in Ratnagiri district.",
    "latitude": 16.65,
    "longitude": 73.35
  },
  {
    "name": "Gowalkot Fort",
    "description": "Fort on a hillock by the Vashishti River near Chiplun.",
    "latitude": 17.53,
    "longitude": 73.52
  },
  {
    "name": "Gopalgad Fort",
    "description": "Coastal fort at Anjanvel near Guhagar in Ratnagiri district.",
    "latitude": 17.45,
    "longitude": 73.2
  },
  {
    "name": "Yashwantgad Fort",
    "description": "Coastal fort near Redi in Sindhudurg district.",
    "latitude": 15.72,
    "longitude": 73.68
  },
  {
    "name": "Nivati Fort",
    "description": "Coastal fort near Nivati beach in Sindhudurg district.",
    "latitude": 15.9,
    "longitude": 73.5
  },
  {
    "name": "Bharatgad Fort",
    "description": "Fort near Masure in Sindhudurg district.",
    "latitude": 16.15,
    "longitude": 73.5
  },
  {
    "name": "Rangana Fort",
    "description": "Hill fort in the Kolhapur-Sindhudurg region, also called Prasiddhagad.",
    "latitude": 16.35,
    "longitude": 73.85
  },
  {
    "name": "Vishalgad Fort",
    "description": "Historic hill fort associated with Shivaji Maharaj's escape in 1660.",
    "latitude": 16.85,
    "longitude": 73.75
  },
  {
    "name": "Bhudargad Fort",
    "description": "Hill fort near Gargoti in Kolhapur district.",
    "latitude": 16.15,
    "longitude": 74.1
  },
  {
    "name": "Pargad Fort",
    "description": "Hill fort near the Maharashtra-Karnataka border in Kolhapur district.",
    "latitude": 15.85,
    "longitude": 74.05
  },
  {
    "name": "Samangad Fort",
    "description": "Hill fort in Kolhapur district, known for its defensive position.",
    "latitude": 16.05,
    "longitude": 74.35
  },
  {
    "name": "Ajinkyatara Fort",
    "description": "Hill fort overlooking Satara city, formerly known as Ajimtara.",
    "latitude": 17.68,
    "longitude": 74.0
  },
  {
    "name": "Sajjangad Fort",
    "description": "Hill fort near Satara associated with the final years of Samarth Ramdas.",
    "latitude": 17.68,
    "longitude": 73.99
  },
  {
    "name": "Vasantgad Fort",
    "description": "Hill fort near Patan in Satara district.",
    "latitude": 17.4,
    "longitude": 73.95
  }
];

export default function App() {
  const [selectedFort, setSelectedFort] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [mapError, setMapError] = useState("");
  const [viewState, setViewState] = useState({
    longitude: 75.0,
    latitude: 19.2,
    zoom: 5.2,
  });

  // Keep AWS Location configuration outside source control.
  const region = import.meta.env.VITE_AWS_LOCATION_REGION || "eu-north-1";
  const mapName = import.meta.env.VITE_AWS_LOCATION_MAP_NAME || "MaharashtraFortsMap";
  const apiKey = import.meta.env.VITE_AWS_LOCATION_API_KEY;
  const mapStyleUrl = apiKey
    ? `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`
    : null;

  const filteredForts = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();
    if (!query) return fortsData;
    return fortsData.filter((fort) =>
      `${fort.name} ${fort.description}`.toLocaleLowerCase().includes(query)
    );
  }, [searchTerm]);

  const flyToFort = (fort) => {
    setSelectedFort(fort);
    setViewState((current) => ({
      ...current,
      longitude: fort.longitude,
      latitude: fort.latitude,
      zoom: 12,
      transitionDuration: 1200,
    }));
  };

  const resetMap = () => {
    setSearchTerm("");
    setSelectedFort(null);
    setViewState({ longitude: 75.0, latitude: 19.2, zoom: 5.2, transitionDuration: 800 });
  };

  return (
    <div className="forts-app">
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root { margin: 0; width: 100%; height: 100%; overflow: hidden; }
        .forts-app { display: flex; width: 100%; height: 100dvh; min-height: 520px; overflow: hidden; background: #0a0a0a; color: #fff; font-family: Inter, 'Segoe UI', Tahoma, sans-serif; }
        .forts-sidebar { width: 370px; min-width: 320px; height: 100%; display: flex; flex-direction: column; background: linear-gradient(180deg,#1a0505 0%,#0a0202 100%); border-right: 3px solid #daa520; z-index: 5; box-shadow: 10px 0 30px rgba(0,0,0,.55); }
        .forts-header { padding: 25px 20px 18px; text-align: center; background: radial-gradient(circle at top left,#3d0e0e,#1a0505); border-bottom: 1px solid rgba(218,165,32,.65); }
        .forts-header h1 { margin: 0; color: #daa520; font-size: 26px; line-height: 1.2; letter-spacing: 1.5px; font-weight: 900; text-transform: uppercase; }
        .forts-header h1 span { color: #ff671f; }
        .forts-header p { margin: 9px 0 0; color: #e6d5b8; font-size: 12px; opacity: .9; }
        .forts-toolbar { padding: 14px 14px 10px; border-bottom: 1px solid rgba(218,165,32,.18); }
        .forts-search-row { display: flex; gap: 8px; }
        .forts-search { min-width: 0; flex: 1; padding: 11px 12px; color: #fff; background: rgba(255,255,255,.08); border: 1px solid rgba(218,165,32,.35); border-radius: 9px; outline: none; font-size: 14px; }
        .forts-search:focus { border-color: #ff671f; box-shadow: 0 0 0 2px rgba(255,103,31,.15); }
        .forts-reset { border: 1px solid rgba(218,165,32,.4); border-radius: 9px; padding: 0 12px; background: rgba(218,165,32,.12); color: #fbd38d; cursor: pointer; }
        .forts-count { display: flex; justify-content: space-between; color: #c7b69a; font-size: 11px; letter-spacing: .5px; margin-top: 10px; }
        .forts-list { flex: 1; overflow-y: auto; padding: 13px 13px 18px; scrollbar-width: thin; scrollbar-color: #daa520 rgba(0,0,0,.3); }
        .forts-list::-webkit-scrollbar { width: 6px; }
        .forts-list::-webkit-scrollbar-thumb { background: #daa520; border-radius: 8px; }
        .fort-card { display: block; width: 100%; text-align: left; padding: 14px; margin: 0 0 10px; background: rgba(45,22,22,.45); border: 1px solid rgba(218,165,32,.28); border-radius: 11px; color: #fff; cursor: pointer; transition: transform .22s ease, background .22s ease, border-color .22s ease; }
        .fort-card:hover, .fort-card.active { transform: translateX(4px); border-color: #ff671f; background: rgba(255,103,31,.13); }
        .fort-card h3 { margin: 0 0 6px; color: #fbd38d; font-size: 15px; font-weight: 750; }
        .fort-card p { margin: 0; color: #aeb6c2; font-size: 12px; line-height: 1.45; }
        .forts-empty { padding: 22px 12px; color: #c7b69a; text-align: center; font-size: 13px; }
        .forts-map-wrap { flex: 1; min-width: 0; min-height: 0; position: relative; background-color: #111; background-image: linear-gradient(rgba(255,103,31,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,103,31,.045) 1px,transparent 1px); background-size: 40px 40px; }
        .forts-map { width: 100%; height: 100%; }
        .forts-map-warning { position: absolute; inset: 0; z-index: 2; display: grid; place-items: center; padding: 24px; background: rgba(10,10,10,.92); text-align: center; }
        .forts-map-warning-card { max-width: 480px; padding: 22px; border: 1px solid rgba(218,165,32,.45); border-radius: 14px; background: #1a1010; }
        .forts-map-warning-card h2 { margin: 0 0 8px; color: #fbd38d; font-size: 19px; }
        .forts-map-warning-card p { margin: 0; color: #c7b69a; font-size: 13px; line-height: 1.6; }
        .forts-watermark { position: absolute; right: 28px; bottom: 28px; pointer-events: none; z-index: 1; text-align: right; }
        .forts-watermark div { color: rgba(255,103,31,.6); font-size: clamp(20px,3.2vw,42px); line-height: 1.05; font-weight: 950; letter-spacing: 3px; text-shadow: 3px 3px 12px #000; }
        .fort-marker { position: relative; cursor: pointer; transition: transform .2s ease; filter: drop-shadow(0 5px 7px rgba(0,0,0,.8)); }
        .fort-marker.selected { transform: scale(1.3); filter: drop-shadow(0 0 9px rgba(255,103,31,.9)); }
        .fort-popup { max-width: 260px; padding: 15px; background: #f4ecd8; border: 2px solid #8b4513; border-radius: 8px; color: #3e2723; box-shadow: 4px 4px 18px rgba(0,0,0,.6); }
        .fort-popup h3 { margin: 0 0 8px; padding-bottom: 7px; border-bottom: 2px solid #daa520; color: #8b0000; font-size: 16px; text-transform: uppercase; }
        .fort-popup p { margin: 0; font-size: 13px; line-height: 1.5; font-weight: 600; }
        .fort-popup small { display: block; margin-top: 10px; padding-top: 8px; border-top: 1px dashed rgba(139,69,19,.35); color: #8b4513; font-size: 10px; }
        @media (max-width: 760px) {
          .forts-app { flex-direction: column; min-height: 0; }
          .forts-sidebar { width: 100%; min-width: 0; height: 43dvh; min-height: 230px; border-right: 0; border-bottom: 3px solid #daa520; }
          .forts-header { padding: 12px 14px 10px; }
          .forts-header h1 { font-size: 20px; }
          .forts-header p { margin-top: 4px; font-size: 10px; }
          .forts-toolbar { padding: 9px 11px 7px; }
          .forts-search { padding: 9px 10px; font-size: 13px; }
          .forts-list { display: flex; gap: 8px; overflow-x: auto; overflow-y: hidden; padding: 9px 11px 12px; }
          .fort-card { min-width: 225px; max-width: 225px; margin: 0; padding: 10px; }
          .fort-card h3 { font-size: 13px; }
          .fort-card p { font-size: 11px; }
          .forts-map-wrap { width: 100%; height: 57dvh; }
          .forts-watermark { right: 12px; bottom: 12px; }
          .forts-watermark div { font-size: 19px; letter-spacing: 1px; }
        }
      `}</style>

      <aside className="forts-sidebar">
        <header className="forts-header">
          <h1>Forts of <span>Swarajya</span></h1>
          <p>Bravery, Valor and the History of Maharashtra</p>
        </header>

        <div className="forts-toolbar">
          <div className="forts-search-row">
            <input
              className="forts-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search forts..."
              aria-label="Search forts"
            />
            <button className="forts-reset" type="button" onClick={resetMap} title="Reset search and map">
              Reset
            </button>
          </div>
          <div className="forts-count">
            <span>{filteredForts.length} of {fortsData.length} forts</span>
            <span>MAHARASHTRA</span>
          </div>
        </div>

        <div className="forts-list">
          {filteredForts.length === 0 ? (
            <div className="forts-empty">No forts match your search.</div>
          ) : filteredForts.map((fort) => (
            <button
              key={fort.name}
              type="button"
              className={`fort-card${selectedFort?.name === fort.name ? " active" : ""}`}
              onClick={() => flyToFort(fort)}
              aria-pressed={selectedFort?.name === fort.name}
            >
              <h3>⚔️ {fort.name}</h3>
              <p>{fort.description}</p>
            </button>
          ))}
        </div>
      </aside>

      <main className="forts-map-wrap">
        {mapStyleUrl ? (
          <Map
            {...viewState}
            onMove={(event) => setViewState(event.viewState)}
            onError={(event) => setMapError(event?.error?.message || "Map could not be loaded. Check the AWS Location configuration.")}
            mapStyle={mapStyleUrl}
            style={{ width: "100%", height: "100%" }}
          >
            <NavigationControl position="top-right" />
            {filteredForts.map((fort) => (
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
                <div className={`fort-marker${selectedFort?.name === fort.name ? " selected" : ""}`}>
                  <svg width="40" height="40" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                    <path d="M20 60V10" stroke="#DAA520" strokeWidth="4" strokeLinecap="round" />
                    <path d="M22 12L58 20L36 28L60 36L22 42V12Z" fill="#FF671F" stroke="#8B0000" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M10 60L10 50L16 50L16 44L24 44L24 50L30 50L30 60Z" fill="#8B4513" stroke="#DAA520" strokeWidth="2" />
                  </svg>
                </div>
              </Marker>
            ))}

            {selectedFort && filteredForts.some((fort) => fort.name === selectedFort.name) && (
              <Popup
                longitude={selectedFort.longitude}
                latitude={selectedFort.latitude}
                anchor="top"
                onClose={() => setSelectedFort(null)}
                closeOnClick={false}
                offset={12}
              >
                <div className="fort-popup">
                  <h3>{selectedFort.name}</h3>
                  <p>{selectedFort.description}</p>
                  <small>
                    LAT: {selectedFort.latitude.toFixed(6)} &nbsp; | &nbsp;
                    LNG: {selectedFort.longitude.toFixed(6)}<br />
                    Map reference point; not a surveyed fort boundary.
                  </small>
                </div>
              </Popup>
            )}
          </Map>
        ) : (
          <div className="forts-map-warning">
            <div className="forts-map-warning-card">
              <h2>AWS Location map key required</h2>
              <p>Add <strong>VITE_AWS_LOCATION_API_KEY</strong> to your local <strong>.env</strong> file. Also confirm the map name, region, and allowed origins in AWS Location Service.</p>
            </div>
          </div>
        )}

        {mapError && (
          <div className="forts-map-warning">
            <div className="forts-map-warning-card">
              <h2>Map loading error</h2>
              <p>{mapError}</p>
            </div>
          </div>
        )}
        <div className="forts-watermark" aria-hidden="true">
          <div>JAI BHAVANI</div>
          <div style={{ color: "rgba(218,165,32,.6)" }}>JAI SHIVAJI</div>
        </div>
      </main>
    </div>
  );
}
