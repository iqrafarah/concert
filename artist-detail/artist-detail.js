const urlSearchParams = new URLSearchParams(window.location.search);
const artistParam = urlSearchParams.get("artist");
const container = document.querySelector(".main");
const result = document.getElementById("result");

function displayArtist(concert) {
  result.innerHTML = "";

  container.innerHTML += `
<div class="container">
        <div class="con1">
          <img
            class="artistImg"
            src="${concert.img}"
            alt=""
          />
        </div>

        <div class="con2">
          <h1 id="artistName">${concert.artist}</h1>
          <p id="artistDescription">
           ${concert.description}
          </p>
          <div class="concertInfo">
            <div class="genresContainer">
              <h3 id="genresTitle">Genres</h3>
              <div class="genres">
                ${concert.genres
                  .map((genre) => `<p class="genre">${genre}</p>`)
                  .join(" ")}
              </div>
            </div>

            <div class="concertsContainer">
              <h3 id="UpcomingTitle">Upcoming Concerts:</h3>
                 <div class="concert">
                <div class="venue-date">
                  <h2>${concert.date}</h2>
                  <h5>${concert.venue}</h5>
                </div>
                <h5>20:00</h5>
            </div>
              </div>
          </div>
        </div>
      </div>

      ${concert.topTracks
        .map(
          (topTrack) =>
            `
         <div class="others">
        <div class="other">
          <div class="trackInfo">
            <img
              src="${topTrack.img}"
              alt=""
            />
            <div class="trackTitle">
              <h2>${topTrack.title}</h2>
              <h5>${topTrack.album}</h5>
            </div>
          </div>
          <h5>${topTrack.duration}</h5>
        </div>
      </div>   


        `
        )
        .join("")}
        
`;
}

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const concert = response.concerts.find(
        (concert) => concert.id == artistParam
      );
      if (concert) {
        console.log(concert.event);
        displayArtist(concert);
      } else {
        result.textContent = "Artist not found";
      }
    } else {
      result.textContent = "Error loading data";
    }
  }
};
xhr.open("GET", `../concertagenda.json`, true);
xhr.send();
