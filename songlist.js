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
    }, {
        name: "About 10 Hours Looking at the Ceiling",
        artist: "watson",
        img: "assets/songcovers/watson - About 10 Hours Looking at the Ceiling.png",
        content: "originally found through a remix, i absolutely adore this song. something about how calm, yet eerie it is is just so good. i've known about this song for about 3 years now, and i really did like it back then but after recently rediscovering it, i just can't get enough of it. there's a specific feeling this conveys that i don't know, yet relate with. probably one of my top 3 songs. i could write more about this song, but this is getting long enough"
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