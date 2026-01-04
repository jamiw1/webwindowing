const songs = [
    {
        name: "Whiplash",
        artist: "yungatita",
        img: "assets/songcovers/yungatita - Whiplash.png",
        content: `I LOVE THIS SONG!!!! it is absolutely my favorite song of all time, i genuinely can't get enough of it. they perform really well live too! they have a lot of other music, absolutely go check them out!!!`
    }, {
        name: "Our Murderous Descent",
        artist: "the scary jokes",
        img: "assets/songcovers/the scary jokes - Our Murderous Descent.png",
        content: "i don't know what about this song makes it like this but it is absolutely some form of crack, the sound design is amazing"
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
    songElement.addEventListener("mouseover", (event) => {
        const tooltip = songElement.getElementsByClassName("tooltip")[0];
        tooltip.style.top = `${event.clientY}px`;
        tooltip.style.left = `${event.clientX}px`;
    });
    songlist.appendChild(songElement);
}