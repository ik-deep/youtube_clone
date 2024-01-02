var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");

menuIcon.onclick = function () {
  sidebar.classList.toggle("small-sidebar");
  container.classList.toggle("large-container");
};
// ======================================================================
const videoContainer = document.querySelector(".list-container");

let apiKey = "AIzaSyB04gVkNKTbIGsmqlYFmDDhaEjdDXwlajU";
let videoUrl = "https://www.googleapis.com/youtube/v3/videos?";
let channelUrl = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
  videoUrl +
    new URLSearchParams({
      key: apiKey,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 75,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));

const getChannelIcon = (video_data) => {
  fetch(
    channelUrl +
      new URLSearchParams({
        key: apiKey,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
        console.log(video_data)
      makeVideoCard(video_data);
    });
};

const makeVideoCard = (data) => {
  videoContainer.innerHTML += `
  <div class="vid-list" onclick ="location.href = 'https://youtube.com/watch?v=${data.id}'">
      <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
     <div class="flex-div">
               <img src="${data.channelThumbnail}" alt="">
        <div class="vid-info">
               <a href="">${data.snippet.title}</a>
               <p>${data.snippet.channelTitle}</p>
        </div>
      </div>
   </div> `;
};

const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#search-button");
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener("click", () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
});
