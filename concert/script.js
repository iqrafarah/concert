document.addEventListener("DOMContentLoaded", function () {
  const searchValue = document.getElementById("searchValue");
  const searchBtn = document.getElementById("searchBtn");
  const result = document.getElementById("result");

  function displayConcerts(concerts) {
    result.innerHTML = "";

    concerts.forEach((concert) => {
      // console.log(concert.genres);
      const concertElement = document.createElement("div");
      concertElement.innerHTML += `

              <div class="item">
                    <a href="artist-detail/artist-detail.html?artist=${
                      concert.id
                    }"><img class='item-img' src="${
        concert.img
      }" alt="artist - ${concert.artist}"></a>
                    <div class="info">
                    <h3>${concert.artist}</h3>
                    <div class="genres">
                     ${concert.genres
                       .map((genre) => `<p class="genre">${genre}<p/>`)
                       .join(" ")}
                       </div>
              </div
              `;

      result.appendChild(concertElement);
    });
  }

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        displayConcerts(response.concerts);
      } else {
        result.textContent = "Error loading data";
      }
    }
  };
  xhr.open("GET", `concertagenda.json`, true);
  xhr.send();

  searchValue.addEventListener("input", function (event) {
    event.preventDefault();
    let searchTerm = searchValue.value.toLowerCase();

    const response = JSON.parse(xhr.responseText);
    const filteredConcerts = response.concerts.filter((concert) => {
      const artistMatches = concert.artist.toLowerCase().includes(searchTerm);
      const genreMatches = concert.genres.some((genre) =>
        genre.toLowerCase().includes(searchTerm)
      );
      return artistMatches || genreMatches;
    });
    if (filteredConcerts.length > 0) {
      result.innerHTML = "";
      displayConcerts(filteredConcerts);
    } else {
      result.textContent = "Geen resultaat";
    }
  });
});
