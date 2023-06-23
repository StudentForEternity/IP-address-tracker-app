import React from "react"
import imgArrow from "./assets/icon-arrow.svg"
function App() {
  const [address, setAddress] = React.useState({
    userInput: "",
  })
  const [place, setPlace] = React.useState()

  console.log(place)

  function handleChange(event) {
    const { name, value } = event.target
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }))
  }
  async function getLocation() {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_4whljETeKMsWq4zu1eyh0UhxJBGI7&ipAddress=${address.userInput}
      `
    )
    const data = await res.json()
    setPlace(data)
  }

  React.useEffect(() => {
    let lat = place ? place.location.lat : 40.7484
    let lng = place ? place.location.lng : -73.9857

    const map = L.map("map").setView([lat, lng], 13)

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    var marker = L.marker([lat, lng]).addTo(map)
    return () => {
      map.remove()
    }
  }, [place])

  return (
    <main className="main-container">
      <header className="header-container">
        <h1 className="header-title">IP Address Tracker</h1>
        <div className="input-btn-container">
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            className="input-field"
            name="userInput"
            value={address.userInput}
            onChange={handleChange}
          />
          <button className="submit-btn" onClick={getLocation}>
            <i className="icon">
              <img src={imgArrow} alt="SVG Image" />
            </i>
          </button>
        </div>
        <div className="info-container">
          <div>
            <p className="info-container-p">id address</p>
            <h1 className="info-container-h">{place ? place.ip : "n/a"}</h1>
          </div>
          <div>
            <p className="info-container-p">Location</p>
            <h1 className="info-container-h">
              {place ? place.location.region : "n/a"}
            </h1>
          </div>
          <div>
            <p className="info-container-p">timezone</p>
            <h1 className="info-container-h">
              {place ? "UTC" + place.location.timezone : "n/a"}
            </h1>
          </div>
          <div>
            <p className="info-container-p">isp</p>
            <h1 className="info-container-h last">
              {place ? place.isp : "n/a"}
            </h1>
          </div>
        </div>
      </header>
      <section className="map-section">
        <div id="map"></div>
      </section>
    </main>
  )
}

export default App
