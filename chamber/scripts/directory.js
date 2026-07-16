const url = "data/members.json";
const membersContainer = document.querySelector("#members");

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

const displayMembers = (members) => {
    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership:</strong> ${member.membership}</p>
            <p>${member.description}</p>
        `;

        membersContainer.appendChild(card);
    });
};

getMembers();
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const members = document.querySelector("#members");

gridButton.addEventListener("click", () => {
    members.classList.add("grid");
    members.classList.remove("list");
});

listButton.addEventListener("click", () => {
    members.classList.add("list");
    members.classList.remove("grid");
});