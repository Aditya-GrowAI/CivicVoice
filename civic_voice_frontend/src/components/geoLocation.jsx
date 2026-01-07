import { useState } from "react";

function LocationInput({ setLat, setLng }) {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLat(latitude);
        setLng(longitude);

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          setAddress(data.display_name || "Location found");
        } catch (err) {
          setAddress("Location detected (address unavailable)");
        }

        setLoading(false);
      },
      () => {
        setError("Permission denied or location unavailable");
        setLoading(false);
      }
    );
  };

  return (
    <div className="mb-3">
      <button className="btn btn-outline-primary" onClick={getLocation}>
        📍 Get Current Location
      </button>

      {loading && <p className="text-muted mt-2">Fetching location...</p>}

      {address && (
        <p className="mt-2">
          <strong>Location:</strong> {address}
        </p>
      )}

      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}

export default LocationInput;