document.getElementById("video").addEventListener("click", function() {
  import("./demo01.js").then(function(video) {
    let name = video.getName();
    console.log(name);
  });
});
