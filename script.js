const ADMIN_EMAIL="fedybouaziz10@gmail.com";

const defaultGames=[
{
id:"valorant",
name:"Valorant",
price:5,
description:"FPS compétitif avec des matchs rapides et intenses.",
image:"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=85"
},
{
id:"fortnite",
name:"Fortnite",
price:5,
description:"Battle Royale et compétition entre joueurs.",
image:"https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1000&q=85"
},
{
id:"fc",
name:"EA FC",
price:5,
description:"Affrontez vos amis dans vos matchs de football.",
image:"https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=1000&q=85"
},
{
id:"minecraft",
name:"Minecraft",
price:5,
description:"Construisez et explorez votre propre monde.",
image:"https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=1000&q=85"
},
{
id:"gta",
name:"GTA V",
price:5,
description:"Découvrez Los Santos dans une expérience immersive.",
image:"https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=85"
},
{
id:"rocket",
name:"Rocket League",
price:5,
description:"Football + voitures = compétition garantie.",
image:"https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1000&q=85"
}
];

let games=JSON.parse(localStorage.getItem("et_games")||"null")||defaultGames;

function saveGames(){
localStorage.setItem("et_games",JSON.stringify(games));
}


const rewards=[
{
points:100,
icon:"🎮",
name:"1h Gaming gratuite",
description:"Profitez d'une heure de gaming gratuite."
},
{
points:250,
icon:"🥤",
name:"Boisson gratuite",
description:"Une boisson offerte chez Extra Time."
},
{
points:500,
icon:"🔥",
name:"5h Gaming",
description:"Obtenez cinq heures de gaming."
},
{
points:1000,
icon:"👑",
name:"VIP Day Pass",
description:"Profitez d'une journée VIP."
},
{
points:2000,
icon:"💎",
name:"Abonnement mensuel",
description:"Accès privilégié pendant un mois."
}
];


function getCustomers(){
return JSON.parse(
localStorage.getItem("et_customers")||"[]"
);
}

function saveCustomers(data){
localStorage.setItem(
"et_customers",
JSON.stringify(data)
);
}

function getReservations(){
return JSON.parse(
localStorage.getItem("et_reservations")||"[]"
);
}

function saveReservations(data){
localStorage.setItem(
"et_reservations",
JSON.stringify(data)
);
}

function getNotifications(){
return JSON.parse(
localStorage.getItem("et_notifications")||"[]"
);
}

function saveNotifications(data){
localStorage.setItem(
"et_notifications",
JSON.stringify(data)
);
}

function getCurrentUser(){
return JSON.parse(
localStorage.getItem("et_current_user")||"null"
);
}

function saveCurrentUser(user){
localStorage.setItem(
"et_current_user",
JSON.stringify(user)
);
}


document.addEventListener(
"DOMContentLoaded",
()=>{

renderGames();
renderHomeGames();
renderRewards();
fillGameSelect();

setupEvents();

updateUserInterface();
updateNotifications();

router();

}
);


function setupEvents(){

document.addEventListener(
"click",
event=>{

const pageButton=
event.target.closest("[data-page]");

if(pageButton){

const page=
pageButton.dataset.page;

if(page){

event.preventDefault();
goToPage(page);

}

}

}
);


window.addEventListener(
"hashchange",
router
);


document
.getElementById("profileButton")
.addEventListener(
"click",
toggleProfile
);


document
.getElementById("notificationButton")
.addEventListener(
"click",
toggleNotifications
);


document
.getElementById("signOutButton")
.addEventListener(
"click",
signOut
);


document
.getElementById("accountSignOut")
.addEventListener(
"click",
signOut
);


document
.getElementById("loginForm")
.addEventListener(
"submit",
login
);


document
.getElementById("reservationForm")
.addEventListener(
"submit",
createReservation
);


document
.getElementById("gameEditForm")
.addEventListener(
"submit",
saveGameEdit
);


document
.getElementById("clearNotifications")
.addEventListener(
"click",
clearNotifications
);


document
.getElementById("adminExit")
.addEventListener(
"click",
closeAdmin
);


document
.getElementById("adminAccessButton")
.addEventListener(
"click",
openAdmin
);


const adminAddGameButton=
document.getElementById(
"adminAddGameButton"
);

if(adminAddGameButton){

adminAddGameButton.addEventListener(
"click",
openGameAdd
);

}


document
.getElementById("adminCustomerSearch")
.addEventListener(
"input",
renderAdminCustomers
);


document
.querySelectorAll(".admin-link")
.forEach(button=>{

button.addEventListener(
"click",
()=>{
switchAdminPage(
button.dataset.admin
);
}
);

});


document
.querySelectorAll(".modal-close")
.forEach(button=>{

button.addEventListener(
"click",
()=>{
closeModal(
button.dataset.close
);
}
);

});

}


function router(){

let route=
location.hash.replace("#","")||"home";

const validPages=[
"home",
"games",
"points",
"rewards",
"reservations",
"account",
"contact"
];

if(!validPages.includes(route)){
route="home";
}

document
.querySelectorAll(".page")
.forEach(page=>{
page.classList.toggle(
"active-page",
page.dataset.route===route
);
});


document
.querySelectorAll(
".desktop-nav a,.mobile-nav a"
)
.forEach(link=>{
link.classList.toggle(
"active",
link.dataset.page===route
);
});


closeProfile();
closeNotifications();

window.scrollTo({
top:0,
behavior:"instant"
});


if(route==="points"){
renderPoints();
}

if(route==="rewards"){
renderRewards();
}

if(route==="reservations"){
renderReservations();
}

if(route==="account"){
renderAccount();
}

}


function goToPage(page){
location.hash=page;
}


function login(event){

event.preventDefault();

const name=
document
.getElementById("loginName")
.value
.trim();

const email=
document
.getElementById("loginEmail")
.value
.trim()
.toLowerCase();

if(!name||!email){

toast(
"⚠️",
"Remplissez tous les champs."
);

return;
}


let customers=getCustomers();

let customer=
customers.find(
c=>c.email.toLowerCase()===email
);


if(!customer){

customer={
id:Date.now(),
name,
email,
points:0,
createdAt:
new Date().toISOString()
};

customers.push(customer);

}else{

customer.name=name;

}


saveCustomers(customers);
saveCurrentUser(customer);

closeModal("loginModal");

updateUserInterface();
updateNotifications();

toast(
"✓",
email===ADMIN_EMAIL
?"Bienvenue Admin !"
:"Connexion réussie !"
);


if(email===ADMIN_EMAIL){

setTimeout(
openAdmin,
350
);

}

}


function updateUserInterface(){

const user=getCurrentUser();

const headerName=
document.getElementById("headerName");

const headerRank=
document.getElementById("headerRank");

const headerAvatar=
document.getElementById("headerAvatar");

const dropdownName=
document.getElementById("dropdownName");

const dropdownEmail=
document.getElementById("dropdownEmail");

const dropdownAvatar=
document.getElementById("dropdownAvatar");

const dropdownPoints=
document.getElementById("dropdownPoints");

const adminAccessButton=
document.getElementById("adminAccessButton");


if(!user){

if(adminAccessButton){
adminAccessButton.style.display="none";
}

headerName.textContent="Sign In";
headerRank.textContent="Guest";
headerAvatar.textContent="?";

dropdownName.textContent="Guest";
dropdownEmail.textContent="Non connecté";
dropdownAvatar.textContent="?";
dropdownPoints.textContent="0";

return;

}


const customer=
getCustomers().find(
c=>c.email===user.email
)||user;


if(adminAccessButton){

adminAccessButton.style.display=
isAdmin()
?"flex"
:"none";

}


const level=
getLevel(customer.points);


headerName.textContent=
isAdmin()
?"Admin"
:customer.name.split(" ")[0];

headerRank.textContent=
`${level.icon} ${level.name}`;

headerAvatar.textContent=
isAdmin()
?"A"
:customer.name.charAt(0).toUpperCase();

dropdownName.textContent=
isAdmin()
?"Admin"
:customer.name;

dropdownEmail.textContent=
customer.email;

dropdownAvatar.textContent=
isAdmin()
?"A"
:customer.name.charAt(0).toUpperCase();

dropdownPoints.textContent=
customer.points;


document.getElementById(
"heroRank"
).textContent=
`${level.icon} ${level.name}`;

document.getElementById(
"heroPoints"
).textContent=
`${customer.points} points`;

}


function toggleProfile(){

const user=getCurrentUser();

if(!user){

openModal("loginModal");
return;

}

document
.getElementById("profileDropdown")
.classList.toggle("show");

}


function closeProfile(){

document
.getElementById("profileDropdown")
.classList.remove("show");

}


function signOut(){

localStorage.removeItem(
"et_current_user"
);

closeProfile();
closeAdmin();

updateUserInterface();
updateNotifications();

toast(
"✓",
"Vous êtes déconnecté."
);

goToPage("home");

}


function openLogin(){
openModal("loginModal");
}


function openModal(id){

document
.getElementById(id)
.classList.add("show");

document.body.style.overflow=
"hidden";

}


function closeModal(id){

document
.getElementById(id)
.classList.remove("show");

document.body.style.overflow=
"";

}


function renderGames(){

const grid=
document.getElementById("gamesGrid");

grid.innerHTML=
games.map(
game=>gameHTML(game)
).join("");

}


function renderHomeGames(){

const container=
document.getElementById(
"homeGamesPreview"
);

if(!container)return;

container.innerHTML=
games
.slice(0,3)
.map(
game=>gameHTML(game)
)
.join("");

}


function gameHTML(game){

return `

<article class="game-card">

<div
class="game-image"
style="
background-image:
url('${game.image}')
"
></div>

<div class="game-info">

<h3>
${escapeHTML(game.name)}
</h3>

<p>
${escapeHTML(game.description)}
</p>

<div class="game-bottom">

<span class="game-price">
${game.price} DT / heure
</span>

<button
class="game-book"
onclick="
bookGame('${game.id}')
"
>
Réserver
</button>

</div>

</div>

</article>

`;

}


function bookGame(gameId){

const user=getCurrentUser();

if(!user){

toast(
"🔐",
"Connectez-vous pour réserver."
);

openLogin();
return;

}


goToPage("reservations");


setTimeout(()=>{

document
.getElementById("reservationGame")
.value=gameId;

},50);

}


function fillGameSelect(){

const select=
document.getElementById(
"reservationGame"
);

select.innerHTML=
`<option value="">Choisir un jeu</option>`;

games.forEach(game=>{

const option=
document.createElement("option");

option.value=game.id;

option.textContent=
`${game.name} — ${game.price} DT/h`;

select.appendChild(option);

});

}


function getLevel(points){

if(points>=1000){

return{
name:"Diamond",
icon:"💎",
min:1000,
next:null
};

}


if(points>=500){

return{
name:"Gold",
icon:"🥇",
min:500,
next:1000
};

}


if(points>=100){

return{
name:"Silver",
icon:"🥈",
min:100,
next:500
};

}


return{
name:"Bronze",
icon:"🥉",
min:0,
next:100
};

}


function renderPoints(){

const user=
getCurrentUser();

let points=0;

if(user){

const customer=
getCustomers().find(
c=>c.email===user.email
);

points=
customer
?customer.points
:0;

}


const level=
getLevel(points);


document.getElementById(
"rankIcon"
).textContent=
level.icon;

document.getElementById(
"rankName"
).textContent=
level.name;

document.getElementById(
"pointsNumber"
).textContent=
points;

document.getElementById(
"accountRankIcon"
).textContent=
level.icon;

document.getElementById(
"accountRankName"
).textContent=
level.name;

document.getElementById(
"heroRank"
).textContent=
`${level.icon} ${level.name}`;

document.getElementById(
"heroPoints"
).textContent=
`${points} points`;


if(level.next===null){

document.getElementById(
"progressFill"
).style.width="100%";

document.getElementById(
"progressText"
).textContent=
`${points} / MAX`;

document.getElementById(
"nextRank"
).textContent=
"💎 Diamond MAX";

return;

}


const range=
level.next-level.min;

const current=
points-level.min;

const percent=
Math.max(
0,
Math.min(
100,
(current/range)*100
)
);

document.getElementById(
"progressFill"
).style.width=
`${percent}%`;

document.getElementById(
"progressText"
).textContent=
`${points} / ${level.next}`;

const next=
getLevel(level.next);

document.getElementById(
"nextRank"
).textContent=
`${next.icon} ${next.name}`;

}


function renderRewards(){

const user=getCurrentUser();

let points=0;

if(user){

const customer=
getCustomers().find(
c=>c.email===user.email
);

if(customer){
points=customer.points;
}

}


document.getElementById(
"rewardsBalance"
).textContent=
`${points} points`;


const grid=
document.getElementById(
"rewardsGrid"
);

grid.innerHTML=
rewards.map(
reward=>`

<article class="reward-card">

<div class="reward-icon">
${reward.icon}
</div>

<h3>
${escapeHTML(reward.name)}
</h3>

<p>
${escapeHTML(reward.description)}
</p>

<span class="reward-cost">
⭐ ${reward.points} POINTS
</span>

<button
class="reward-claim"
${points<reward.points?"disabled":""}
onclick="
claimReward(
${reward.points},
'${escapeAttribute(reward.name)}'
)
"
>
${
points>=reward.points
?"Réclamer"
:"Points insuffisants"
}
</button>

</article>

`
).join("");

}


function claimReward(cost,name){

const user=getCurrentUser();

if(!user){

openLogin();
return;

}


const customers=getCustomers();

const customer=
customers.find(
c=>c.email===user.email
);

if(!customer)return;

if(customer.points<cost){

toast(
"⚠️",
"Vous n'avez pas assez de points."
);

return;

}


customer.points-=cost;

saveCustomers(customers);
saveCurrentUser(customer);

addNotification(
customer.email,
`🏆 Reward réclamé : ${name}. -${cost} points.`
);

updateUserInterface();
renderRewards();
renderPoints();

toast(
"🏆",
`${name} réclamé !`
);

}


function createReservation(event){

event.preventDefault();

const user=getCurrentUser();

if(!user){

openLogin();
return;

}


const gameId=
document.getElementById(
"reservationGame"
).value;

const date=
document.getElementById(
"reservationDate"
).value;

const time=
document.getElementById(
"reservationTime"
).value;

const duration=
Number(
document.getElementById(
"reservationDuration"
).value
);


const game=
games.find(
g=>g.id===gameId
);

if(!game){

toast(
"⚠️",
"Choisissez un jeu."
);

return;

}


const reservation={

id:Date.now(),

email:user.email,

customerName:user.name,

gameName:game.name,

date,

time,

duration,

price:
game.price*duration,

createdAt:
new Date().toISOString()

};


const reservations=
getReservations();

reservations.push(
reservation
);

saveReservations(
reservations
);


sendReservationEmail(
reservation
);


addNotification(
user.email,
`🎮 Votre réservation ${game.name} du ${date} à ${time} est enregistrée.`
);


document
.getElementById(
"reservationForm"
)
.reset();


renderReservations();
renderAdmin();

toast(
"✓",
"Réservation enregistrée."
);

}


function sendReservationEmail(reservation){

const subject=
encodeURIComponent(
`Nouvelle réservation Extra Time — ${reservation.gameName}`
);

const body=
encodeURIComponent(
`Nouvelle réservation Extra Time

Client : ${reservation.customerName}
Email : ${reservation.email}
Jeu : ${reservation.gameName}
Date : ${reservation.date}
Heure : ${reservation.time}
Durée : ${reservation.duration} heure(s)
Prix : ${reservation.price} DT
`
);

const gmailUrl=
`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(ADMIN_EMAIL)}&su=${subject}&body=${body}`;

window.open(
gmailUrl,
"_blank",
"noopener,noreferrer"
);

}


function renderReservations(){

const container=
document.getElementById(
"reservationsList"
);

if(!container)return;

const user=
getCurrentUser();

if(!user){

container.innerHTML=`
<div class="empty-state">
Connectez-vous pour voir
vos réservations.
</div>
`;

return;

}


const reservations=
getReservations()
.filter(
r=>r.email===user.email
)
.reverse();


if(!reservations.length){

container.innerHTML=`
<div class="empty-state">
Aucune réservation pour le moment.
</div>
`;

return;

}


container.innerHTML=
reservations
.map(
r=>`

<div class="reservation-item">

<strong>
🎮 ${escapeHTML(r.gameName)}
</strong>

<span>
📅 ${escapeHTML(r.date)}
•
🕐 ${escapeHTML(r.time)}
•
${r.duration}h
</span>

<span>
💰 ${r.price} DT
</span>

<small class="reservation-status">
Confirmée
</small>

</div>

`
)
.join("");

}


function renderAccount(){

const user=
getCurrentUser();

if(!user){

document.getElementById(
"accountName"
).textContent=
"Guest";

document.getElementById(
"accountEmail"
).textContent=
"Non connecté";

document.getElementById(
"accountPoints"
).textContent=
"0";

document.getElementById(
"accountRank"
).textContent=
"Guest";

document.getElementById(
"accountReservations"
).textContent=
"0";

return;

}


const customer=
getCustomers().find(
c=>c.email===user.email
)||user;

const level=
getLevel(customer.points);


document.getElementById(
"accountAvatar"
).textContent=
isAdmin()
?"A"
:customer.name.charAt(0).toUpperCase();

document.getElementById(
"accountName"
).textContent=
isAdmin()
?"Admin"
:customer.name;

document.getElementById(
"accountEmail"
).textContent=
customer.email;

document.getElementById(
"accountPoints"
).textContent=
customer.points;

document.getElementById(
"accountRank"
).textContent=
level.name;

document.getElementById(
"accountRankIcon"
).textContent=
level.icon;


const reservations=
getReservations()
.filter(
r=>r.email===customer.email
);

document.getElementById(
"accountReservations"
).textContent=
reservations.length;

}


function addNotification(
email,
message
){

const notifications=
getNotifications();

notifications.push({

id:Date.now(),

email,

message,

read:false,

date:
new Date().toISOString()

});

saveNotifications(
notifications
);

updateNotifications();

}


function updateNotifications(){

const user=
getCurrentUser();

const badge=
document.getElementById(
"notificationBadge"
);

const list=
document.getElementById(
"notificationsList"
);


if(!user){

badge.textContent="0";

list.innerHTML=
`<div class="empty-state">
Connectez-vous pour voir vos notifications.
</div>`;

return;

}


const notifications=
getNotifications()
.filter(
n=>n.email===user.email
)
.reverse();


const unread=
notifications.filter(
n=>!n.read
).length;

badge.textContent=
unread>99
?"99+"
:unread;


if(!notifications.length){

list.innerHTML=
`<div class="empty-state">
Aucune notification
</div>`;

return;

}


list.innerHTML=
notifications
.slice(0,15)
.map(
n=>`

<div
class="notification-item"
onclick="
readNotification(
${n.id}
)
"
>

<p>
${escapeHTML(n.message)}
</p>

<small>
${formatDate(n.date)}
</small>

</div>

`
)
.join("");

}


function readNotification(id){

const notifications=
getNotifications();

const notification=
notifications.find(
n=>n.id===id
);

if(notification){
notification.read=true;
}

saveNotifications(
notifications
);

updateNotifications();

}


function clearNotifications(){

const user=
getCurrentUser();

if(!user)return;

const notifications=
getNotifications()
.filter(
n=>n.email!==user.email
);

saveNotifications(
notifications
);

updateNotifications();

}


function toggleNotifications(){

const user=
getCurrentUser();

if(!user){

openLogin();
return;

}

document
.getElementById(
"notificationsPanel"
)
.classList.toggle("show");

closeProfile();

}


function closeNotifications(){

document
.getElementById(
"notificationsPanel"
)
.classList.remove("show");

}


function isAdmin(){

const user=
getCurrentUser();

return(
user&&
user.email.toLowerCase()
===
ADMIN_EMAIL.toLowerCase()
);

}


function openAdmin(){

if(!isAdmin()){

toast(
"🔒",
"Accès Admin refusé."
);

return;

}


document
.getElementById(
"adminOverlay"
)
.classList.add("show");

document.body.style.overflow=
"hidden";

renderAdmin();

}


function closeAdmin(){

document
.getElementById(
"adminOverlay"
)
.classList.remove("show");

document.body.style.overflow=
"";

updateUserInterface();

}


function switchAdminPage(page){

document
.querySelectorAll(".admin-link")
.forEach(button=>{

button.classList.toggle(
"active",
button.dataset.admin===page
);

});


document
.querySelectorAll(".admin-page")
.forEach(section=>{

section.classList.toggle(
"active",
section.dataset.adminPage===page
);

});


const titles={

dashboard:"Dashboard",

customers:"Clients",

reservations:"Réservations",

rewards:"Rewards",

games:"Gestion des jeux"

};


document.getElementById(
"adminTitle"
).textContent=
titles[page]||"Dashboard";

renderAdmin();

}


function renderAdmin(){

const customers=
getCustomers();

const reservations=
getReservations();

const points=
customers.reduce(
(sum,c)=>
sum+Number(c.points||0),
0
);

const revenue=
reservations.reduce(
(sum,r)=>
sum+Number(r.price||0),
0
);


document.getElementById(
"adminCustomersCount"
).textContent=
customers.length;

document.getElementById(
"adminReservationsCount"
).textContent=
reservations.length;

document.getElementById(
"adminPointsCount"
).textContent=
points;

document.getElementById(
"adminRevenue"
).textContent=
`${revenue} DT`;

renderAdminCustomers();
renderAdminReservations();
renderAdminGames();

}


function renderAdminGames(){

const container=
document.getElementById(
"adminGamesList"
);

if(!container)return;

container.innerHTML=
games.map(
game=>`

<div class="admin-game-row">

<div
class="admin-game-preview"
style="
background-image:url('${escapeAttribute(game.image)}')
"
>
</div>

<div class="admin-game-info">

<strong>
${escapeHTML(game.name)}
</strong>

<small>
${escapeHTML(game.description)}
</small>

</div>

<div class="admin-game-price">
${Number(game.price)} DT/h
</div>

<button
class="admin-edit-game"
onclick="
openGameEdit('${escapeAttribute(game.id)}')
"
>
✏️ Modifier
</button>

</div>

`
).join("")
+
`

<div
class="admin-game-row admin-game-add"
onclick="openGameAdd()"
>
➕ Ajouter un nouveau jeu
</div>

`;

}


function openGameEdit(gameId){

if(!isAdmin())return;

const game=
games.find(
g=>g.id===gameId
);

if(!game)return;


document.getElementById(
"editGameId"
).value=
game.id;

document.getElementById(
"editGameName"
).value=
game.name;

document.getElementById(
"editGameImage"
).value=
game.image;

document.getElementById(
"editGamePrice"
).value=
game.price;

document.getElementById(
"editGameDescription"
).value=
game.description;

const modalAction=
document.getElementById(
"gameModalAction"
);

if(modalAction){
modalAction.textContent=
"Modifier le";
}

openModal(
"gameEditModal"
);

}


function openGameAdd(){

if(!isAdmin())return;

document.getElementById(
"gameEditForm"
).reset();

document.getElementById(
"editGameId"
).value=
"";

const modalAction=
document.getElementById(
"gameModalAction"
);

if(modalAction){
modalAction.textContent=
"Ajouter un";
}

openModal(
"gameEditModal"
);

}


function generateGameId(name){

const base=
String(name)
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g,"")
.replace(/[^a-z0-9]+/g,"-")
.replace(/(^-|-$)/g,"")
||"jeu";

let id=base;
let suffix=1;

while(
games.some(
g=>g.id===id
)
){

suffix+=1;
id=`${base}-${suffix}`;

}

return id;

}


function saveGameEdit(event){

event.preventDefault();

if(!isAdmin())return;

const id=
document.getElementById(
"editGameId"
).value;

const name=
document.getElementById(
"editGameName"
).value.trim();

const image=
document.getElementById(
"editGameImage"
).value.trim();

const description=
document.getElementById(
"editGameDescription"
).value.trim();

const price=
Number(
document.getElementById(
"editGamePrice"
).value
);


if(
!name||
!image||
!description||
!Number.isFinite(price)||
price<0
){

toast(
"⚠️",
"Remplissez correctement tous les champs du jeu."
);

return;

}


if(id){

const game=
games.find(
g=>g.id===id
);

if(!game)return;

game.name=name;
game.image=image;
game.description=description;
game.price=price;

}else{

const newGame={

id:generateGameId(name),

name,

image,

description,

price

};

games.push(newGame);

}


saveGames();

renderGames();
renderHomeGames();
fillGameSelect();
renderAdminGames();

closeModal(
"gameEditModal"
);

toast(
"✓",
id
?`${name} a été modifié.`
:`${name} a été ajouté.`
);

}


function renderAdminCustomers(){

const container=
document.getElementById(
"adminCustomersList"
);

const search=
document
.getElementById(
"adminCustomerSearch"
)
.value
.toLowerCase()
.trim();

const customers=
getCustomers()
.filter(
c=>
c.name
.toLowerCase()
.includes(search)
||
c.email
.toLowerCase()
.includes(search)
);


if(!customers.length){

container.innerHTML=
`<div class="empty-state">
Aucun client trouvé.
</div>`;

return;

}


container.innerHTML=
customers
.map(
customer=>{

const level=
getLevel(
customer.points
);

return `

<div class="admin-customer">

<div class="admin-customer-name">

<strong>
${escapeHTML(customer.name)}
</strong>

<small>
${escapeHTML(customer.email)}
</small>

</div>

<div class="admin-points">
⭐ ${customer.points}
</div>

<div class="admin-rank">
${level.icon}
${level.name}
</div>

<div class="point-actions">

<button
class="add"
onclick="
changePoints(
'${escapeAttribute(customer.email)}',
10
)
"
>
+10
</button>

<button
class="add"
onclick="
changePoints(
'${escapeAttribute(customer.email)}',
50
)
"
>
+50
</button>

<button
class="remove"
onclick="
changePoints(
'${escapeAttribute(customer.email)}',
-10
)
"
>
-10
</button>

</div>

</div>

`;

}
)
.join("");

}


function changePoints(
email,
amount
){

if(!isAdmin())return;

const customers=
getCustomers();

const customer=
customers.find(
c=>c.email===email
);

if(!customer)return;

customer.points=
Math.max(
0,
Number(customer.points)+amount
);

saveCustomers(
customers
);

const currentUser=
getCurrentUser();

if(
currentUser&&
currentUser.email===email
){

saveCurrentUser(
customer
);

}


addNotification(
email,

amount>0
?`⭐ L'Admin vous a ajouté ${amount} points. Nouveau solde : ${customer.points} points.`
:`⚠️ L'Admin vous a retiré ${Math.abs(amount)} points. Nouveau solde : ${customer.points} points.`
);


renderAdmin();
updateUserInterface();
updateNotifications();

toast(
amount>0
?"⭐"
:"⚠️",

amount>0
?`+${amount} points pour ${customer.name}`
:`${amount} points retirés de ${customer.name}`
);

}


function renderAdminReservations(){

const container=
document.getElementById(
"adminReservationsList"
);

const reservations=
getReservations()
.slice()
.reverse();


if(!reservations.length){

container.innerHTML=
`<div class="empty-state">
Aucune réservation.
</div>`;

return;

}


container.innerHTML=
reservations
.map(
r=>`

<div class="admin-reservation">

<div>

<strong>
${escapeHTML(r.customerName)}
</strong>

<small>
${escapeHTML(r.email)}
</small>

</div>

<div>
🎮
${escapeHTML(r.gameName)}
</div>

<div>
📅 ${escapeHTML(r.date)}
<br>
🕐 ${escapeHTML(r.time)}
</div>

<div>
${r.duration}h
<br>
${r.price} DT
</div>

</div>

`
)
.join("");

}


let toastTimer;


function toast(
icon,
message
){

const element=
document.getElementById(
"toast"
);

document.getElementById(
"toastIcon"
).textContent=
icon;

document.getElementById(
"toastText"
).textContent=
message;

element.classList.add(
"show"
);

clearTimeout(
toastTimer
);

toastTimer=
setTimeout(
()=>{
element.classList.remove(
"show"
);
},
3200
);

}


function formatDate(date){

return new Date(date)
.toLocaleString(
"fr-FR",
{
day:"2-digit",
month:"2-digit",
year:"numeric",
hour:"2-digit",
minute:"2-digit"
}
);

}


function escapeHTML(value){

return String(value)
.replaceAll("&","&amp;")
.replaceAll("<","&lt;")
.replaceAll(">","&gt;")
.replaceAll('"',"&quot;")
.replaceAll("'","&#039;");

}


function escapeAttribute(value){

return String(value)
.replaceAll("\\","\\\\")
.replaceAll("'","\\'");

}


const today=
new Date()
.toISOString()
.split("T")[0];

document.getElementById(
"reservationDate"
).min=today;


document.addEventListener(
"click",
event=>{

if(
!event.target.closest(
".profile-button"
)
&&
!event.target.closest(
".profile-dropdown"
)
){

closeProfile();

}


if(
!event.target.closest(
".notification-button"
)
&&
!event.target.closest(
".notifications-panel"
)
){

closeNotifications();

}

}
);