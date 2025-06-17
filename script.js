const steps = [
    {
        coords: [60.308188, 5.358482],
        text: `Du har funne ein slitt hockeypuck. På undersida står ei gåte:

"Eg står stille, men husar kunnskap,
bokstaven min er som summinga av bier,
Finn staden der lærdommen veks, spiker hamrast, og helse blir bortlert,
det neste hintet ventar deg der."`
    },
    {
        coords: [60.309893, 5.360051],
        text: `Du finn ei gamal bok med ei mystisk side som seier:

"Svoltne magar finn kvile her,
Mellom rettar og smak, hintet ligg nær,
Kanskje finn du svaret i suppe og brød,
Følg lukta, la magen vise deg vei."`
    },
    {
        coords: [60.309328, 5.359731],
        text: `Du finn ein skei med ei inngravering:

"Spegelblank flate, stille vatn så klart,
der fuglane kviler, her hintet vert spart.
Dit må du vandre, ved kanten, ikkje langt,
for under ein stein ligg svar nøye gjøymt."`
    },
    {
        coords: [60.305692, 5.359244],
        text: `Under ein stein finn du eit brev:

"Isen ligg glatt, dit skøyter vert sett,
Skjær gjennom kulda, der gåta ligg tett.
Ved kanten du søker, langs kant eller is,
ei løyndom du finn, i vinterens pris."`
    },
    {
        coords: [60.306565, 5.356178],
        text: `Du finn ein gammal skøyte med teksten:

"Styrke og balanse krev denne plass,
der kroppar vert testa, steg etter steg.
Følg bjelkar og stenger, dei viser deg vei,
til plassen der rørsle er fridom for deg."`
    },
    {
        coords: [60.309517, 5.359172],
        text: `Du finn ei lita, lukka kiste:

"Skuggen frå Fana gøymer sin skatt,
Her ligg sanninga godt verna natt.
Nøkkelen er tida, hugs det vel,
Den som først løyser alt vert sjølv ein del
av løyndommen sin ende."

Når kista vert opna, finn de eit symbol på samhald og fellesskap. De har saman løyst gåta om Skuggen frå Fana.`
    }
];

let currentStep = 0;
let map;
let userMarker;

function showMessage(text) {
    document.getElementById('message').textContent = text;
}

function distance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const phi1 = lat1 * Math.PI / 180;
    const phi2 = lat2 * Math.PI / 180;
    const dPhi = (lat2 - lat1) * Math.PI / 180;
    const dLambda = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dPhi / 2) * Math.sin(dPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(dLambda / 2) * Math.sin(dLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function handlePosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    if (!map) {
        map = L.map('map').setView([lat, lng], 16);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
        userMarker = L.marker([lat, lng]).addTo(map);
        steps.forEach(step => L.circleMarker(step.coords, { radius: 6, color: '#f00' }).addTo(map));
    } else {
        userMarker.setLatLng([lat, lng]);
    }

    const step = steps[currentStep];
    if (step && distance(lat, lng, step.coords[0], step.coords[1]) < 40) {
        showMessage(step.text);
        currentStep++;
    }
}

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(handlePosition, () => {
        showMessage('Klarte ikkje hente posisjon.');
    }, { enableHighAccuracy: true });
} else {
    showMessage('Nettlesaren støttar ikkje geolokasjon.');
}
