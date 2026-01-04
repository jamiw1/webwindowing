const songs = [
    {
        name: "Whiplash",
        artist: "yungatita",
        img: "",
        content: `I LOVE THIS SONG!!!! it is absolutely my favorite song of all time, i genuinely can't get enough of it. they perform really well live too! they have a lot of other music, absolutely go check them out!!!`
    }
]


const songlist = document.getElementById("songlist");
for (let index = 0; index < songs.length; index++) {
    const song = songs[index];
    const songElement = document.createElement("div");
    songElement.className = "songitem";
    songElement.innerHTML = `
        <img src="${song.img}">
        <h3>${song.name}</h3>
        <p>${song.artist}</p>
        <span class="tooltip">${song.content}</span>
    `;
    songlist.appendChild(songElement);
}