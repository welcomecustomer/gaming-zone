/* =========================================================
   EXTRA TIME — SCRIPT.JS
   RESERVATION + ADMIN + RANK + REWARDS
========================================================= */


/* =========================================================
   ADMIN EMAIL
========================================================= */

const ADMIN_EMAIL = "fedybouaziz10@gmail.com";


/* =========================================================
   DEFAULT GAMES
========================================================= */

const defaultGames = [

    {
        id: "valorant",
        name: "Valorant",
        price: 5,
        description: "FPS compétitif avec des matchs rapides et intenses.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: "fortnite",
        name: "Fortnite",
        price: 5,
        description: "Battle Royale et compétition entre joueurs.",
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: "fc",
        name: "EA FC",
        price: 5,
        description: "Affrontez vos amis dans vos matchs de football.",
        image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: "minecraft",
        name: "Minecraft",
        price: 5,
        description: "Construisez et explorez votre propre monde.",
        image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: "gta",
        name: "GTA V",
        price: 5,
        description: "Découvrez Los Santos dans une expérience immersive.",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: "rocket",
        name: "Rocket League",
        price: 5,
        description: "Football + voitures = compétition garantie.",
        image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1000&q=85"
    }

];


/* =========================================================
   GAMES STORAGE
========================================================= */

let games =
    JSON.parse(
        localStorage.getItem("et_games") || "null"
    ) || defaultGames;


function saveGames() {

    localStorage.setItem(
        "et_games",
        JSON.stringify(games)
    );

}


/* =========================================================
   REWARDS
========================================================= */

const rewards = [

    {
        points: 100,
        icon: "🎮",
        name: "1h Gaming gratuite",
        description: "Profitez d'une heure de gaming gratuite."
    },

    {
        points: 250,
        icon: "🥤",
        name: "Boisson gratuite",
        description: "Une boisson offerte chez Extra Time."
    },

    {
        points: 500,
        icon: "🔥",
        name: "5h Gaming",
        description: "Obtenez cinq heures de gaming."
    },

    {
        points: 1000,
        icon: "👑",
        name: "VIP Day Pass",
        description: "Profitez d'une journée VIP."
    },

    {
        points: 2000,
        icon: "💎",
        name: "Abonnement mensuel",
        description: "Accès privilégié pendant un mois."
    }

];


/* =========================================================
   CUSTOMERS
========================================================= */

function getCustomers() {

    return JSON.parse(
        localStorage.getItem("et_customers") || "[]"
    );

}


function saveCustomers(data) {

    localStorage.setItem(
        "et_customers",
        JSON.stringify(data)
    );

}


/* =========================================================
   RESERVATIONS
========================================================= */

function getReservations() {

    return JSON.parse(
        localStorage.getItem("et_reservations") || "[]"
    );

}


function saveReservations(data) {

    localStorage.setItem(
        "et_reservations",
        JSON.stringify(data)
    );

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function getNotifications() {

    return JSON.parse(
        localStorage.getItem("et_notifications") || "[]"
    );

}


function saveNotifications(data) {

    localStorage.setItem(
        "et_notifications",
        JSON.stringify(data)
    );

}


/* =========================================================
   CURRENT USER
========================================================= */

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("et_current_user") || "null"
    );

}


function saveCurrentUser(user) {

    localStorage.setItem(
        "et_current_user",
        JSON.stringify(user)
    );

}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderGames();

        renderHomeGames();

        renderRewards();

        fillGameSelect();

        setupEvents();

        updateUserInterface();

        updateNotifications();

        router();

        setupReservationFormSubmit();

        renderLeaderboard();

        setupResetTimer();

    }
);


/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {

    document.addEventListener(
        "click",
        event => {

            const pageButton =
                event.target.closest("[data-page]");


            if (pageButton) {

                const page =
                    pageButton.dataset.page;


                if (page) {

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


    const adminAddGameButton =
        document.getElementById(
            "adminAddGameButton"
        );


    if (adminAddGameButton) {

        adminAddGameButton.addEventListener(
            "click",
            openGameAdd
        );

    }


    const customerSearch =
        document.getElementById(
            "adminCustomerSearch"
        );


    if (customerSearch) {

        customerSearch.addEventListener(
            "input",
            renderAdminCustomers
        );

    }


    document
        .querySelectorAll(".admin-link")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    switchAdminPage(
                        button.dataset.admin
                    );

                }
            );

        });


    document
        .querySelectorAll(".modal-close")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    closeModal(
                        button.dataset.close
                    );

                }
            );

        });

}


/* =========================================================
   ROUTER
========================================================= */

function router() {

    let route =
        location.hash.replace("#", "") || "home";


    const validPages = [
        "home",
        "games",
        "points",
        "rewards",
        "reservations",
        "account",
        "contact"
    ];


    if (!validPages.includes(route)) {

        route = "home";

    }


    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.toggle(
                "active-page",
                page.dataset.route === route
            );

        });


    document
        .querySelectorAll(
            ".desktop-nav a,.mobile-nav a"
        )
        .forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.page === route
            );

        });


    closeProfile();

    closeNotifications();


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });


    if (route === "points") {

        renderPoints();

        renderLeaderboard();

    }


    if (route === "rewards") {

        renderRewards();

    }


    if (route === "reservations") {

        renderReservations();

    }


    if (route === "account") {

        renderAccount();

    }

}


/* =========================================================
   NAVIGATION
========================================================= */

function goToPage(page) {

    location.hash = page;

}


/* =========================================================
   LOGIN
========================================================= */

function login(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("loginName")
            .value
            .trim();


    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();


    if (!name || !email) {

        toast(
            "⚠️",
            "Remplissez tous les champs."
        );

        return;

    }


    let customers = getCustomers();


    let customer =
        customers.find(
            c =>
                c.email.toLowerCase() === email
        );


    if (!customer) {

        customer = {

            id: Date.now(),

            name,

            email,

            points: 0,

            createdAt:
                new Date().toISOString()

        };


        customers.push(customer);

    } else {

        customer.name = name;

    }


    saveCustomers(customers);

    saveCurrentUser(customer);


    closeModal("loginModal");


    updateUserInterface();

    updateNotifications();


    toast(
        "✓",
        email === ADMIN_EMAIL
            ? "Bienvenue Admin !"
            : "Connexion réussie !"
    );


    if (email === ADMIN_EMAIL) {

        setTimeout(
            openAdmin,
            350
        );

    }

}


/* =========================================================
   USER INTERFACE
========================================================= */

function updateUserInterface() {

    const user =
        getCurrentUser();


    const headerName =
        document.getElementById(
            "headerName"
        );


    const headerRank =
        document.getElementById(
            "headerRank"
        );


    const headerAvatar =
        document.getElementById(
            "headerAvatar"
        );


    const dropdownName =
        document.getElementById(
            "dropdownName"
        );


    const dropdownEmail =
        document.getElementById(
            "dropdownEmail"
        );


    const dropdownAvatar =
        document.getElementById(
            "dropdownAvatar"
        );


    const dropdownPoints =
        document.getElementById(
            "dropdownPoints"
        );


    const adminAccessButton =
        document.getElementById(
            "adminAccessButton"
        );


    if (!user) {

        if (adminAccessButton) {

            adminAccessButton.style.display =
                "none";

        }


        headerName.textContent =
            "Sign In";

        headerRank.textContent =
            "Guest";

        headerAvatar.textContent =
            "?";


        dropdownName.textContent =
            "Guest";

        dropdownEmail.textContent =
            "Non connecté";

        dropdownAvatar.textContent =
            "?";

        dropdownPoints.textContent =
            "0";


        const heroRank =
            document.getElementById(
                "heroRank"
            );


        const heroPoints =
            document.getElementById(
                "heroPoints"
            );


        if (heroRank) {

            heroRank.textContent =
                "🥉 Bronze";

        }


        if (heroPoints) {

            heroPoints.textContent =
                "0 points";

        }


        return;

    }


    const customer =
        getCustomers().find(
            c => c.email === user.email
        ) || user;


    if (adminAccessButton) {

        adminAccessButton.style.display =
            isAdmin()
                ? "flex"
                : "none";

    }


    const level =
        getLevel(
            Number(customer.points || 0)
        );


    headerName.textContent =
        isAdmin()
            ? "Admin"
            : customer.name.split(" ")[0];


    headerRank.textContent =
        `${level.icon} ${level.name}`;


    headerAvatar.textContent =
        isAdmin()
            ? "A"
            : customer.name
                .charAt(0)
                .toUpperCase();


    dropdownName.textContent =
        isAdmin()
            ? "Admin"
            : customer.name;


    dropdownEmail.textContent =
        customer.email;


    dropdownAvatar.textContent =
        isAdmin()
            ? "A"
            : customer.name
                .charAt(0)
                .toUpperCase();


    dropdownPoints.textContent =
        customer.points;


    const heroRank =
        document.getElementById(
            "heroRank"
        );


    const heroPoints =
        document.getElementById(
            "heroPoints"
        );


    if (heroRank) {

        heroRank.textContent =
            `${level.icon} ${level.name}`;

    }


    if (heroPoints) {

        heroPoints.textContent =
            `${customer.points} points`;

    }

}


/* =========================================================
   PROFILE
========================================================= */

function toggleProfile() {

    const user =
        getCurrentUser();


    if (!user) {

        openModal("loginModal");

        return;

    }


    document
        .getElementById("profileDropdown")
        .classList.toggle("show");

}


function closeProfile() {

    document
        .getElementById("profileDropdown")
        .classList.remove("show");

}


/* =========================================================
   SIGN OUT
========================================================= */

function signOut() {

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


/* =========================================================
   MODALS
========================================================= */

function openLogin() {

    openModal("loginModal");

}


function openModal(id) {

    const modal =
        document.getElementById(id);


    if (!modal) return;


    modal.classList.add("show");


    document.body.style.overflow =
        "hidden";

}


function closeModal(id) {

    const modal =
        document.getElementById(id);


    if (!modal) return;


    modal.classList.remove("show");


    document.body.style.overflow =
        "";

}


/* =========================================================
   RENDER GAMES
========================================================= */

function renderGames() {

    const grid =
        document.getElementById(
            "gamesGrid"
        );


    if (!grid) return;


    grid.innerHTML =
        games
            .map(
                game =>
                    gameHTML(game)
            )
            .join("");

}


/* =========================================================
   HOME GAMES
========================================================= */

function renderHomeGames() {

    const container =
        document.getElementById(
            "homeGamesPreview"
        );


    if (!container) return;


    container.innerHTML =
        games
            .slice(0, 3)
            .map(
                game =>
                    gameHTML(game)
            )
            .join("");

}


/* =========================================================
   GAME CARD
========================================================= */

function gameHTML(game) {

    return `

        <article class="game-card">

            <div
                class="game-image"
                style="
                    background-image:
                    url('${escapeAttribute(game.image)}')
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
                            bookGame('${escapeAttribute(game.id)}')
                        "
                    >
                        Réserver
                    </button>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   BOOK GAME
========================================================= */

function bookGame(gameId) {

    const user =
        getCurrentUser();


    if (!user) {

        toast(
            "🔐",
            "Connectez-vous pour réserver."
        );


        openLogin();

        return;

    }


    goToPage("reservations");


    setTimeout(
        () => {

            const select =
                document.getElementById(
                    "reservationGame"
                );


            if (select) {

                select.value =
                    gameId;

            }

        },
        50
    );

}


/* =========================================================
   GAME SELECT
========================================================= */

function fillGameSelect() {

    const select =
        document.getElementById(
            "reservationGame"
        );


    if (!select) return;


    select.innerHTML =
        `<option value="">Choisir un jeu</option>`;


    games.forEach(game => {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            game.id;


        option.textContent =
            `${game.name} — ${game.price} DT/h`;


        select.appendChild(option);

    });

}


/* =========================================================
   RANK SYSTEM
========================================================= */

function getLevel(points) {

    points =
        Number(points || 0);


    if (points >= 1000) {

        return {

            name: "Diamond",

            icon: "💎",

            min: 1000,

            next: null

        };

    }


    if (points >= 500) {

        return {

            name: "Gold",

            icon: "🥇",

            min: 500,

            next: 1000

        };

    }


    if (points >= 100) {

        return {

            name: "Silver",

            icon: "🥈",

            min: 100,

            next: 500

        };

    }


    return {

        name: "Bronze",

        icon: "🥉",

        min: 0,

        next: 100

    };

}


/* =========================================================
   POINTS PAGE
========================================================= */

function renderPoints() {

    const user =
        getCurrentUser();


    let points = 0;


    if (user) {

        const customer =
            getCustomers().find(
                c => c.email === user.email
            );


        points =
            customer
                ? Number(customer.points || 0)
                : 0;

    }


    const level =
        getLevel(points);


    const rankIcon =
        document.getElementById(
            "rankIcon"
        );


    const rankName =
        document.getElementById(
            "rankName"
        );


    const pointsNumber =
        document.getElementById(
            "pointsNumber"
        );


    const accountRankIcon =
        document.getElementById(
            "accountRankIcon"
        );


    const accountRankName =
        document.getElementById(
            "accountRankName"
        );


    const heroRank =
        document.getElementById(
            "heroRank"
        );


    const heroPoints =
        document.getElementById(
            "heroPoints"
        );


    if (rankIcon) {

        rankIcon.textContent =
            level.icon;

    }


    if (rankName) {

        rankName.textContent =
            level.name;

    }


    if (pointsNumber) {

        pointsNumber.textContent =
            points;

    }


    if (accountRankIcon) {

        accountRankIcon.textContent =
            level.icon;

    }


    if (accountRankName) {

        accountRankName.textContent =
            level.name;

    }


    if (heroRank) {

        heroRank.textContent =
            `${level.icon} ${level.name}`;

    }


    if (heroPoints) {

        heroPoints.textContent =
            `${points} points`;

    }


    const progressFill =
        document.getElementById(
            "progressFill"
        );


    const progressText =
        document.getElementById(
            "progressText"
        );


    const nextRank =
        document.getElementById(
            "nextRank"
        );


    if (level.next === null) {

        if (progressFill) {

            progressFill.style.width =
                "100%";

        }


        if (progressText) {

            progressText.textContent =
                `${points} / MAX`;

        }


        if (nextRank) {

            nextRank.textContent =
                "💎 Diamond MAX";

        }


        return;

    }


    const range =
        level.next - level.min;


    const current =
        points - level.min;


    const percent =
        Math.max(
            0,
            Math.min(
                100,
                (current / range) * 100
            )
        );


    if (progressFill) {

        progressFill.style.width =
            `${percent}%`;

    }


    if (progressText) {

        progressText.textContent =
            `${points} / ${level.next}`;

    }


    const next =
        getLevel(level.next);


    if (nextRank) {

        nextRank.textContent =
            `${next.icon} ${next.name}`;

    }

}


/* =========================================================
   LEADERBOARD — TOP 3
   IMPORTANT:
   Classement basé sur les points actuels
   de tous les clients enregistrés.
   Le Top 1 gagne une récompense secrète.
========================================================= */

function renderLeaderboard() {

    const container =
        document.getElementById(
            "leaderboardList"
        );


    if (!container) return;


    const top =
        getCustomers()
            .slice()
            .sort(
                (a, b) =>
                    Number(b.points || 0) -
                    Number(a.points || 0)
            )
            .filter(
                c =>
                    Number(c.points || 0) > 0
            )
            .slice(0, 3);


    if (!top.length) {

        container.innerHTML = `

            <div class="empty-state">
                Aucun joueur classé pour le moment.
            </div>

        `;

        return;

    }


    const medals =
        ["🥇", "🥈", "🥉"];


    container.innerHTML =
        top
            .map(
                (customer, index) => `

                    <div class="leaderboard-item rank-${index + 1}">

                        <div class="leaderboard-rank">
                            ${medals[index]}
                        </div>

                        <div class="leaderboard-avatar">
                            ${escapeHTML(
                                customer.name
                                    .charAt(0)
                                    .toUpperCase()
                            )}
                        </div>

                        <div class="leaderboard-info">

                            <strong>
                                ${escapeHTML(customer.name)}
                            </strong>

                            <small>
                                ${
                                    index === 0
                                        ? "🎁 Récompense secrète en jeu"
                                        : `Top ${index + 1} du classement`
                                }
                            </small>

                        </div>

                        <div class="leaderboard-points">

                            ${Number(customer.points || 0)}

                            <small>PTS</small>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   REWARDS
========================================================= */

function renderRewards() {

    const user =
        getCurrentUser();


    let points = 0;


    if (user) {

        const customer =
            getCustomers().find(
                c => c.email === user.email
            );


        if (customer) {

            points =
                Number(customer.points || 0);

        }

    }


    const balance =
        document.getElementById(
            "rewardsBalance"
        );


    if (balance) {

        balance.textContent =
            `${points} points`;

    }


    const grid =
        document.getElementById(
            "rewardsGrid"
        );


    if (!grid) return;


    grid.innerHTML =
        rewards
            .map(
                reward => `

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
                            ${points < reward.points ? "disabled" : ""}
                            onclick="
                                claimReward(
                                    ${reward.points},
                                    '${escapeAttribute(reward.name)}'
                                )
                            "
                        >
                            ${
                                points >= reward.points
                                    ? "Réclamer"
                                    : "Points insuffisants"
                            }
                        </button>

                    </article>

                `
            )
            .join("");

}


/* =========================================================
   CLAIM REWARD
========================================================= */

function claimReward(cost, name) {

    const user =
        getCurrentUser();


    if (!user) {

        openLogin();

        return;

    }


    const customers =
        getCustomers();


    const customer =
        customers.find(
            c => c.email === user.email
        );


    if (!customer) return;


    if (
        Number(customer.points) < cost
    ) {

        toast(
            "⚠️",
            "Vous n'avez pas assez de points."
        );

        return;

    }


    customer.points =
        Number(customer.points) - cost;


    saveCustomers(customers);

    saveCurrentUser(customer);


    addNotification(
        customer.email,
        `🏆 Reward réclamé : ${name}. -${cost} points.`
    );


    updateUserInterface();

    renderRewards();

    renderPoints();

    renderLeaderboard();


    toast(
        "🏆",
        `${name} réclamé !`
    );

}


/* =========================================================
   MONTHLY POINTS RESET
   IMPORTANT:
   Le compte à rebours pointe toujours vers
   le 1er jour du mois suivant à 00:00:00,
   ce qui gère automatiquement les mois de
   28, 29, 30 ou 31 jours (Février compris).
========================================================= */

function getResetTarget() {

    const now =
        new Date();


    return new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        1,
        0,
        0,
        0,
        0
    );

}


function formatCountdown(ms) {

    if (ms < 0) {

        ms = 0;

    }


    const totalSeconds =
        Math.floor(ms / 1000);


    const days =
        Math.floor(totalSeconds / 86400);


    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    return (

        String(days).padStart(2, "0") +

        ":" +

        String(hours).padStart(2, "0") +

        ":" +

        String(minutes).padStart(2, "0") +

        ":" +

        String(seconds).padStart(2, "0")

    );

}


function updateResetTimer() {

    const valueElement =
        document.getElementById(
            "resetTimerValue"
        );


    if (!valueElement) return;


    const target =
        getResetTarget();


    const msLeft =
        target - new Date();


    if (msLeft <= 0) {

        checkMonthlyReset();

    }


    valueElement.textContent =
        formatCountdown(
            getResetTarget() - new Date()
        );

}


/*
   Vérifie si on est entré dans un nouveau
   mois depuis le dernier reset connu.
   Fonctionne même si personne n'était sur
   le site pile au moment du changement de mois.
*/

function checkMonthlyReset() {

    const now =
        new Date();


    const currentPeriod =
        `${now.getFullYear()}-${
            String(now.getMonth() + 1).padStart(2, "0")
        }`;


    const lastPeriod =
        localStorage.getItem(
            "et_last_reset_period"
        );


    if (lastPeriod !== currentPeriod) {

        if (lastPeriod) {

            resetAllPoints();

        }


        localStorage.setItem(
            "et_last_reset_period",
            currentPeriod
        );

    }

}


function resetAllPoints() {

    const customers =
        getCustomers();


    if (!customers.length) return;


    customers.forEach(
        customer => {

            customer.points =
                0;

        }
    );


    saveCustomers(
        customers
    );


    const currentUser =
        getCurrentUser();


    if (currentUser) {

        const updated =
            customers.find(
                c =>
                    c.email === currentUser.email
            );


        if (updated) {

            saveCurrentUser(
                updated
            );

        }

    }


    customers.forEach(
        customer => {

            addNotification(
                customer.email,
                "🔄 Nouveau mois : les points ont été réinitialisés à 0. Le classement repart de zéro, à vous de jouer pour le Top 1 !"
            );

        }
    );


    renderPoints();

    renderRewards();

    renderLeaderboard();

    updateUserInterface();

    updateNotifications();


    toast(
        "🔄",
        "Nouveau mois : les points de tous les joueurs ont été réinitialisés."
    );

}


function setupResetTimer() {

    checkMonthlyReset();

    updateResetTimer();


    setInterval(
        updateResetTimer,
        1000
    );

}


/* =========================================================
   RESERVATION FORM SETUP
========================================================= */

function setupReservationFormSubmit() {

    const form =
        document.getElementById(
            "hiddenReservationForm"
        );


    if (!form) {

        console.warn(
            "FormSubmit : hiddenReservationForm introuvable."
        );

        return;

    }


    form.action =
        `https://formsubmit.co/${ADMIN_EMAIL}`;


    form.method =
        "POST";


    let iframe =
        document.getElementById(
            "formSubmitTarget"
        );


    if (!iframe) {

        iframe =
            document.createElement(
                "iframe"
            );


        iframe.id =
            "formSubmitTarget";


        iframe.name =
            "formSubmitTarget";


        iframe.style.display =
            "none";


        document.body.appendChild(
            iframe
        );

    }


    form.target =
        "formSubmitTarget";


    let subject =
        form.querySelector(
            'input[name="_subject"]'
        );


    if (!subject) {

        subject =
            document.createElement(
                "input"
            );


        subject.type =
            "hidden";


        subject.name =
            "_subject";


        form.appendChild(
            subject
        );

    }


    subject.value =
        "🎮 Nouvelle réservation Extra Time";


    let captcha =
        form.querySelector(
            'input[name="_captcha"]'
        );


    if (!captcha) {

        captcha =
            document.createElement(
                "input"
            );


        captcha.type =
            "hidden";


        captcha.name =
            "_captcha";


        form.appendChild(
            captcha
        );

    }


    captcha.value =
        "false";


    let template =
        form.querySelector(
            'input[name="_template"]'
        );


    if (!template) {

        template =
            document.createElement(
                "input"
            );


        template.type =
            "hidden";


        template.name =
            "_template";


        form.appendChild(
            template
        );

    }


    template.value =
        "table";


    let emailField =
        form.querySelector(
            'input[name="email"]'
        );


    if (!emailField) {

        emailField =
            document.createElement(
                "input"
            );


        emailField.type =
            "hidden";


        emailField.name =
            "email";


        form.appendChild(
            emailField
        );

    }

}


/* =========================================================
   CREATE RESERVATION
========================================================= */

function createReservation(event) {

    event.preventDefault();


    const user =
        getCurrentUser();


    if (!user) {

        openLogin();

        return;

    }


    const gameId =
        document
            .getElementById(
                "reservationGame"
            )
            .value;


    const date =
        document
            .getElementById(
                "reservationDate"
            )
            .value;


    const time =
        document
            .getElementById(
                "reservationTime"
            )
            .value;


    const duration =
        Number(
            document
                .getElementById(
                    "reservationDuration"
                )
                .value
        );


    const game =
        games.find(
            g => g.id === gameId
        );


    if (!game) {

        toast(
            "⚠️",
            "Choisissez un jeu."
        );

        return;

    }


    if (!date || !time || !duration) {

        toast(
            "⚠️",
            "Remplissez tous les champs."
        );

        return;

    }


    const reservation = {

        id: Date.now(),

        email: user.email,

        customerName: user.name,

        gameName: game.name,

        date: date,

        time: time,

        duration: duration,

        price:
            Number(game.price) * duration,

        createdAt:
            new Date().toISOString(),

        deletedByAdmin: false

    };


    const reservations =
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
        `📅 Réservation créée : ${game.name} le ${date} à ${time}.`
    );


    renderReservations();

    renderAccount();

    updateUserInterface();

    updateNotifications();


    const reservationForm =
        document.getElementById(
            "reservationForm"
        );


    if (reservationForm) {

        reservationForm.reset();

    }


    toast(
        "✓",
        "Réservation effectuée avec succès !"
    );

}


/* =========================================================
   SEND RESERVATION EMAIL
========================================================= */

function sendReservationEmail(
    reservation
) {

    const form =
        document.getElementById(
            "hiddenReservationForm"
        );


    if (!form) {

        console.error(
            "FormSubmit : formulaire introuvable."
        );


        toast(
            "⚠️",
            "Erreur : formulaire email introuvable."
        );


        return;

    }


    form.action =
        `https://formsubmit.co/${ADMIN_EMAIL}`;


    form.method =
        "POST";


    form.target =
        "formSubmitTarget";


    const client =
        document.getElementById(
            "hfClient"
        );


    if (client) {

        client.value =
            reservation.customerName;

    }


    const email =
        document.getElementById(
            "hfEmail"
        );


    if (email) {

        email.value =
            reservation.email;

    }


    let emailField =
        form.querySelector(
            'input[name="email"]'
        );


    if (!emailField) {

        emailField =
            document.createElement(
                "input"
            );


        emailField.type =
            "hidden";


        emailField.name =
            "email";


        form.appendChild(
            emailField
        );

    }


    emailField.value =
        reservation.email;


    const game =
        document.getElementById(
            "hfGame"
        );


    if (game) {

        game.value =
            reservation.gameName;

    }


    const date =
        document.getElementById(
            "hfDate"
        );


    if (date) {

        date.value =
            reservation.date;

    }


    const time =
        document.getElementById(
            "hfTime"
        );


    if (time) {

        time.value =
            reservation.time;

    }


    const duration =
        document.getElementById(
            "hfDuration"
        );


    if (duration) {

        duration.value =
            `${reservation.duration} heure(s)`;

    }


    const price =
        document.getElementById(
            "hfPrice"
        );


    if (price) {

        price.value =
            `${reservation.price} DT`;

    }


    let subject =
        form.querySelector(
            'input[name="_subject"]'
        );


    if (!subject) {

        subject =
            document.createElement(
                "input"
            );


        subject.type =
            "hidden";


        subject.name =
            "_subject";


        form.appendChild(
            subject
        );

    }


    subject.value =
        `🎮 Nouvelle réservation Extra Time — ${reservation.gameName}`;


    let captcha =
        form.querySelector(
            'input[name="_captcha"]'
        );


    if (!captcha) {

        captcha =
            document.createElement(
                "input"
            );


        captcha.type =
            "hidden";


        captcha.name =
            "_captcha";


        form.appendChild(
            captcha
        );

    }


    captcha.value =
        "false";


    let template =
        form.querySelector(
            'input[name="_template"]'
        );


    if (!template) {

        template =
            document.createElement(
                "input"
            );


        template.type =
            "hidden";


        template.name =
            "_template";


        form.appendChild(
            template
        );

    }


    template.value =
        "table";


    let autoresponse =
        form.querySelector(
            'textarea[name="_autoresponse"]'
        );


    if (!autoresponse) {

        autoresponse =
            document.createElement(
                "textarea"
            );


        autoresponse.name =
            "_autoresponse";


        autoresponse.style.display =
            "none";


        form.appendChild(
            autoresponse
        );

    }


    autoresponse.value =
        `Bonjour ${reservation.customerName},

Votre réservation chez Extra Time a bien été enregistrée.

🎮 Jeu : ${reservation.gameName}
📅 Date : ${reservation.date}
🕐 Heure : ${reservation.time}
⏱️ Durée : ${reservation.duration} heure(s)
💰 Prix : ${reservation.price} DT

Merci pour votre réservation.

Extra Time
Gaming Lounge`;


    try {

        HTMLFormElement.prototype.submit.call(
            form
        );


        console.log(
            "✓ Réservation envoyée à " +
            ADMIN_EMAIL
        );


    } catch (error) {

        console.error(
            "Erreur FormSubmit :",
            error
        );


        toast(
            "⚠️",
            "Réservation enregistrée, mais erreur lors de l'envoi de l'email."
        );

    }

}


/* =========================================================
   RENDER RESERVATIONS — CLIENT
   IMPORTANT:
   Toutes les réservations restent visibles
   dans l'historique du client.
========================================================= */

function renderReservations() {

    const container =
        document.getElementById(
            "reservationsList"
        );


    if (!container) return;


    const user =
        getCurrentUser();


    if (!user) {

        container.innerHTML = `

            <div class="empty-state">
                Connectez-vous pour voir
                vos réservations.
            </div>

        `;

        return;

    }


    const reservations =
        getReservations()
            .filter(
                r =>
                    r.email === user.email
            )
            .sort(
                (a, b) =>
                    Number(b.id) - Number(a.id)
            );


    if (!reservations.length) {

        container.innerHTML = `

            <div class="empty-state">
                Aucune réservation pour le moment.
            </div>

        `;

        return;

    }


    container.innerHTML =
        reservations
            .map(
                r => {

                    const wasDeletedByAdmin =
                        r.deletedByAdmin === true;


                    return `

                        <div class="reservation-item">

                            <strong>
                                🎮 ${escapeHTML(r.gameName)}
                            </strong>

                            <span>
                                📅 ${escapeHTML(r.date)}
                                •
                                🕐 ${escapeHTML(r.time)}
                                •
                                ${Number(r.duration)}h
                            </span>

                            <span>
                                💰 ${Number(r.price)} DT
                            </span>

                            ${
                                wasDeletedByAdmin
                                    ?

                                `
                                    <small
                                        class="reservation-status reservation-deleted-status"
                                    >
                                        🗑️ Retirée de la liste Admin
                                    </small>
                                `

                                    :

                                `
                                    <small class="reservation-status">
                                        Confirmée
                                    </small>
                                `
                            }

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   ACCOUNT
========================================================= */

function renderAccount() {

    const user =
        getCurrentUser();


    if (!user) {

        const accountName =
            document.getElementById(
                "accountName"
            );


        const accountEmail =
            document.getElementById(
                "accountEmail"
            );


        const accountPoints =
            document.getElementById(
                "accountPoints"
            );


        const accountRank =
            document.getElementById(
                "accountRank"
            );


        const accountReservations =
            document.getElementById(
                "accountReservations"
            );


        if (accountName)
            accountName.textContent =
                "Guest";


        if (accountEmail)
            accountEmail.textContent =
                "Non connecté";


        if (accountPoints)
            accountPoints.textContent =
                "0";


        if (accountRank)
            accountRank.textContent =
                "Guest";


        if (accountReservations)
            accountReservations.textContent =
                "0";


        return;

    }


    const customer =
        getCustomers().find(
            c =>
                c.email === user.email
        ) || user;


    const level =
        getLevel(
            customer.points
        );


    const accountAvatar =
        document.getElementById(
            "accountAvatar"
        );


    if (accountAvatar) {

        accountAvatar.textContent =
            isAdmin()
                ? "A"
                : customer.name
                    .charAt(0)
                    .toUpperCase();

    }


    const accountName =
        document.getElementById(
            "accountName"
        );


    if (accountName) {

        accountName.textContent =
            isAdmin()
                ? "Admin"
                : customer.name;

    }


    const accountEmail =
        document.getElementById(
            "accountEmail"
        );


    if (accountEmail) {

        accountEmail.textContent =
            customer.email;

    }


    const accountPoints =
        document.getElementById(
            "accountPoints"
        );


    if (accountPoints) {

        accountPoints.textContent =
            customer.points;

    }


    const accountRank =
        document.getElementById(
            "accountRank"
        );


    if (accountRank) {

        accountRank.textContent =
            level.name;

    }


    const accountRankIcon =
        document.getElementById(
            "accountRankIcon"
        );


    if (accountRankIcon) {

        accountRankIcon.textContent =
            level.icon;

    }


    /*
       IMPORTANT:
       Même les réservations retirées
       de l'Admin restent comptées
       dans l'historique du client.
    */

    const reservations =
        getReservations()
            .filter(
                r =>
                    r.email === customer.email
            );


    const accountReservations =
        document.getElementById(
            "accountReservations"
        );


    if (accountReservations) {

        accountReservations.textContent =
            reservations.length;

    }

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function addNotification(
    email,
    message
) {

    const notifications =
        getNotifications();


    notifications.push({

        id: Date.now(),

        email: email,

        message: message,

        read: false,

        date:
            new Date().toISOString()

    });


    saveNotifications(
        notifications
    );


    updateNotifications();

}


/* =========================================================
   UPDATE NOTIFICATIONS
========================================================= */

function updateNotifications() {

    const user =
        getCurrentUser();


    const badge =
        document.getElementById(
            "notificationBadge"
        );


    const list =
        document.getElementById(
            "notificationsList"
        );


    if (!badge || !list) return;


    if (!user) {

        badge.textContent =
            "0";


        list.innerHTML = `

            <div class="empty-state">
                Connectez-vous pour voir vos notifications.
            </div>

        `;


        return;

    }


    const notifications =
        getNotifications()
            .filter(
                n =>
                    n.email === user.email
            )
            .reverse();


    const unread =
        notifications.filter(
            n =>
                !n.read
        ).length;


    badge.textContent =
        unread > 99
            ? "99+"
            : unread;


    if (!notifications.length) {

        list.innerHTML = `

            <div class="empty-state">
                Aucune notification
            </div>

        `;

        return;

    }


    list.innerHTML =
        notifications
            .slice(0, 15)
            .map(
                n => `

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


/* =========================================================
   READ NOTIFICATION
========================================================= */

function readNotification(id) {

    const notifications =
        getNotifications();


    const notification =
        notifications.find(
            n =>
                n.id === id
        );


    if (notification) {

        notification.read =
            true;

    }


    saveNotifications(
        notifications
    );


    updateNotifications();

}


/* =========================================================
   CLEAR NOTIFICATIONS
========================================================= */

function clearNotifications() {

    const user =
        getCurrentUser();


    if (!user) return;


    const notifications =
        getNotifications()
            .filter(
                n =>
                    n.email !== user.email
            );


    saveNotifications(
        notifications
    );


    updateNotifications();

}


/* =========================================================
   NOTIFICATION PANEL
========================================================= */

function toggleNotifications() {

    const user =
        getCurrentUser();


    if (!user) {

        openLogin();

        return;

    }


    document
        .getElementById(
            "notificationsPanel"
        )
        .classList.toggle(
            "show"
        );


    closeProfile();

}


function closeNotifications() {

    document
        .getElementById(
            "notificationsPanel"
        )
        .classList.remove(
            "show"
        );

}


/* =========================================================
   ADMIN CHECK
========================================================= */

function isAdmin() {

    const user =
        getCurrentUser();


    return (

        user &&

        user.email
            .toLowerCase() ===
        ADMIN_EMAIL
            .toLowerCase()

    );

}


/* =========================================================
   OPEN ADMIN
========================================================= */

function openAdmin() {

    if (!isAdmin()) {

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
        .classList.add(
            "show"
        );


    document.body.style.overflow =
        "hidden";


    renderAdmin();

}


/* =========================================================
   CLOSE ADMIN
========================================================= */

function closeAdmin() {

    const overlay =
        document.getElementById(
            "adminOverlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "show"
        );

    }


    document.body.style.overflow =
        "";


    updateUserInterface();

}


/* =========================================================
   ADMIN NAVIGATION
========================================================= */

function switchAdminPage(page) {

    document
        .querySelectorAll(
            ".admin-link"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.admin === page
            );

        });


    document
        .querySelectorAll(
            ".admin-page"
        )
        .forEach(section => {

            section.classList.toggle(
                "active",
                section.dataset.adminPage === page
            );

        });


    const titles = {

        dashboard:
            "Dashboard",

        customers:
            "Clients",

        reservations:
            "Réservations",

        rewards:
            "Rewards",

        games:
            "Gestion des jeux"

    };


    const adminTitle =
        document.getElementById(
            "adminTitle"
        );


    if (adminTitle) {

        adminTitle.textContent =
            titles[page] ||
            "Dashboard";

    }


    renderAdmin();

}


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function renderAdmin() {

    const customers =
        getCustomers();


    /*
       IMPORTANT:
       Le Dashboard compte uniquement
       les réservations encore visibles
       dans l'Admin.
    */

    const reservations =
        getReservations()
            .filter(
                r =>
                    !r.deletedByAdmin
            );


    const points =
        customers.reduce(
            (sum, c) =>
                sum +
                Number(
                    c.points || 0
                ),
            0
        );


    const revenue =
        reservations.reduce(
            (sum, r) =>
                sum +
                Number(
                    r.price || 0
                ),
            0
        );


    const customersCount =
        document.getElementById(
            "adminCustomersCount"
        );


    const reservationsCount =
        document.getElementById(
            "adminReservationsCount"
        );


    const pointsCount =
        document.getElementById(
            "adminPointsCount"
        );


    const revenueElement =
        document.getElementById(
            "adminRevenue"
        );


    if (customersCount) {

        customersCount.textContent =
            customers.length;

    }


    if (reservationsCount) {

        reservationsCount.textContent =
            reservations.length;

    }


    if (pointsCount) {

        pointsCount.textContent =
            points;

    }


    if (revenueElement) {

        revenueElement.textContent =
            `${revenue} DT`;

    }


    renderAdminCustomers();

    renderAdminReservations();

    renderAdminGames();

}


/* =========================================================
   ADMIN GAMES
========================================================= */

function renderAdminGames() {

    const container =
        document.getElementById(
            "adminGamesList"
        );


    if (!container) return;


    container.innerHTML =
        games
            .map(
                game => `

                    <div class="admin-game-row">

                        <div
                            class="admin-game-preview"
                            style="
                                background-image:
                                url('${escapeAttribute(game.image)}')
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
                                openGameEdit(
                                    '${escapeAttribute(game.id)}'
                                )
                            "
                        >
                            ✏️ Modifier
                        </button>

                    </div>

                `
            )
            .join("")
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


/* =========================================================
   EDIT GAME
========================================================= */

function openGameEdit(gameId) {

    if (!isAdmin()) return;


    const game =
        games.find(
            g =>
                g.id === gameId
        );


    if (!game) return;


    document.getElementById(
        "editGameId"
    ).value =
        game.id;


    document.getElementById(
        "editGameName"
    ).value =
        game.name;


    document.getElementById(
        "editGameImage"
    ).value =
        game.image;


    document.getElementById(
        "editGamePrice"
    ).value =
        game.price;


    document.getElementById(
        "editGameDescription"
    ).value =
        game.description;


    const modalAction =
        document.getElementById(
            "gameModalAction"
        );


    if (modalAction) {

        modalAction.textContent =
            "Modifier le";

    }


    openModal(
        "gameEditModal"
    );

}


/* =========================================================
   ADD GAME
========================================================= */

function openGameAdd() {

    if (!isAdmin()) return;


    const form =
        document.getElementById(
            "gameEditForm"
        );


    if (form) {

        form.reset();

    }


    document.getElementById(
        "editGameId"
    ).value =
        "";


    const modalAction =
        document.getElementById(
            "gameModalAction"
        );


    if (modalAction) {

        modalAction.textContent =
            "Ajouter un";

    }


    openModal(
        "gameEditModal"
    );

}


/* =========================================================
   GENERATE GAME ID
========================================================= */

function generateGameId(name) {

    const base =
        String(name)
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .replace(
                /[^a-z0-9]+/g,
                "-"
            )
            .replace(
                /(^-|-$)/g,
                ""
            )
            || "jeu";


    let id =
        base;


    let suffix =
        1;


    while (
        games.some(
            g =>
                g.id === id
        )
    ) {

        suffix += 1;


        id =
            `${base}-${suffix}`;

    }


    return id;

}


/* =========================================================
   SAVE GAME
========================================================= */

function saveGameEdit(event) {

    event.preventDefault();


    if (!isAdmin()) return;


    const id =
        document.getElementById(
            "editGameId"
        ).value;


    const name =
        document.getElementById(
            "editGameName"
        ).value
        .trim();


    const image =
        document.getElementById(
            "editGameImage"
        ).value
        .trim();


    const description =
        document.getElementById(
            "editGameDescription"
        ).value
        .trim();


    const price =
        Number(
            document.getElementById(
                "editGamePrice"
            ).value
        );


    if (

        !name ||

        !image ||

        !description ||

        !Number.isFinite(price) ||

        price < 0

    ) {

        toast(
            "⚠️",
            "Remplissez correctement tous les champs du jeu."
        );


        return;

    }


    if (id) {

        const game =
            games.find(
                g =>
                    g.id === id
            );


        if (!game) return;


        game.name =
            name;


        game.image =
            image;


        game.description =
            description;


        game.price =
            price;

    } else {

        const newGame = {

            id:
                generateGameId(name),

            name:
                name,

            image:
                image,

            description:
                description,

            price:
                price

        };


        games.push(
            newGame
        );

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
            ? `${name} a été modifié.`
            : `${name} a été ajouté.`
    );

}


/* =========================================================
   ADMIN CUSTOMERS
========================================================= */

function renderAdminCustomers() {

    const container =
        document.getElementById(
            "adminCustomersList"
        );


    if (!container) return;


    const searchInput =
        document.getElementById(
            "adminCustomerSearch"
        );


    const search =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const customers =
        getCustomers()
            .filter(
                c =>

                    c.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    c.email
                        .toLowerCase()
                        .includes(search)
            );


    if (!customers.length) {

        container.innerHTML = `

            <div class="empty-state">
                Aucun client trouvé.
            </div>

        `;


        return;

    }


    container.innerHTML =
        customers
            .map(
                customer => {

                    const level =
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


/* =========================================================
   CHANGE POINTS
========================================================= */

function changePoints(
    email,
    amount
) {

    if (!isAdmin()) return;


    const customers =
        getCustomers();


    const customer =
        customers.find(
            c =>
                c.email === email
        );


    if (!customer) return;


    customer.points =
        Math.max(
            0,
            Number(customer.points) +
            amount
        );


    saveCustomers(
        customers
    );


    const currentUser =
        getCurrentUser();


    if (

        currentUser &&

        currentUser.email === email

    ) {

        saveCurrentUser(
            customer
        );

    }


    addNotification(

        email,

        amount > 0

            ?

            `⭐ L'Admin vous a ajouté ${amount} points. Nouveau solde : ${customer.points} points.`

            :

            `⚠️ L'Admin vous a retiré ${Math.abs(amount)} points. Nouveau solde : ${customer.points} points.`

    );


    renderAdmin();

    updateUserInterface();

    updateNotifications();

    renderLeaderboard();


    toast(

        amount > 0
            ? "⭐"
            : "⚠️",

        amount > 0

            ?

            `+${amount} points pour ${customer.name}`

            :

            `${amount} points retirés de ${customer.name}`

    );

}


/* =========================================================
   ADMIN RESERVATIONS
   IMPORTANT:
   Deleted reservations stay in storage.
   They are simply hidden from Admin.
========================================================= */

function renderAdminReservations() {

    const container =
        document.getElementById(
            "adminReservationsList"
        );


    if (!container) return;


    const reservations =
        getReservations()
            .filter(
                r =>
                    !r.deletedByAdmin
            )
            .slice()
            .reverse();


    if (!reservations.length) {

        container.innerHTML = `

            <div class="empty-state">
                Aucune réservation.
            </div>

        `;


        return;

    }


    container.innerHTML =
        reservations
            .map(
                r => `

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

                            ${Number(r.duration)}h

                            <br>

                            ${Number(r.price)} DT

                        </div>

                        <button
                            type="button"
                            class="admin-delete-reservation"
                            onclick="
                                deleteReservation(${Number(r.id)})
                            "
                        >
                            🗑️ Delete
                        </button>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   DELETE RESERVATION — ADMIN ONLY
   IMPORTANT:
   DO NOT DELETE FROM STORAGE.
   Only mark as deletedByAdmin.
========================================================= */

function deleteReservation(
    reservationId
) {

    if (!isAdmin()) {

        toast(
            "🔒",
            "Accès Admin refusé."
        );

        return;

    }


    const reservations =
        getReservations();


    const reservation =
        reservations.find(
            r =>
                Number(r.id) ===
                Number(reservationId)
        );


    if (!reservation) {

        toast(
            "⚠️",
            "Réservation introuvable."
        );

        return;

    }


    /*
       Protection :
       si le reservation est déjà retiré
       de l'Admin, on ne refait rien.
    */

    if (reservation.deletedByAdmin === true) {

        toast(
            "⚠️",
            "Cette réservation a déjà été retirée."
        );

        return;

    }


    const confirmed =
        window.confirm(
            `Voulez-vous retirer cette réservation de la liste Admin ?\n\nClient : ${reservation.customerName}\nJeu : ${reservation.gameName}\nDate : ${reservation.date}\nHeure : ${reservation.time}`
        );


    if (!confirmed) {

        return;

    }


    /*
       IMPORTANT :
       La réservation reste dans localStorage.

       On ajoute seulement :
       deletedByAdmin = true

       Donc :
       - Admin ne la voit plus.
       - Client la garde dans son historique.
    */

    reservation.deletedByAdmin =
        true;


    reservation.deletedAt =
        new Date().toISOString();


    saveReservations(
        reservations
    );


    /*
       Refresh Admin
    */

    renderAdmin();


    /*
       Refresh client history
    */

    renderReservations();


    /*
       Refresh account statistics
    */

    renderAccount();


    toast(
        "🗑️",
        "Réservation retirée de la liste Admin."
    );

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function toast(
    icon,
    message
) {

    const element =
        document.getElementById(
            "toast"
        );


    if (!element) return;


    const toastIcon =
        document.getElementById(
            "toastIcon"
        );


    const toastText =
        document.getElementById(
            "toastText"
        );


    if (toastIcon) {

        toastIcon.textContent =
            icon;

    }


    if (toastText) {

        toastText.textContent =
            message;

    }


    element.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                element.classList.remove(
                    "show"
                );

            },
            3200
        );

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(date) {

    return new Date(date)
        .toLocaleString(
            "fr-FR",
            {

                day:
                    "2-digit",

                month:
                    "2-digit",

                year:
                    "numeric",

                hour:
                    "2-digit",

                minute:
                    "2-digit"

            }
        );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   ESCAPE ATTRIBUTE
========================================================= */

function escapeAttribute(value) {

    return String(value)

        .replaceAll(
            "\\",
            "\\\\"
        )

        .replaceAll(
            "'",
            "\\'"
        );

}


/* =========================================================
   MIN RESERVATION DATE
========================================================= */

const today =
    new Date()
        .toISOString()
        .split("T")[0];


const reservationDate =
    document.getElementById(
        "reservationDate"
    );


if (reservationDate) {

    reservationDate.min =
        today;

}


/* =========================================================
   CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {


        if (

            !event.target.closest(
                ".profile-button"
            )

            &&

            !event.target.closest(
                ".profile-dropdown"
            )

        ) {

            closeProfile();

        }


        if (

            !event.target.closest(
                ".notification-button"
            )

            &&

            !event.target.closest(
                ".notifications-panel"
            )

        ) {

            closeNotifications();

        }

    }
);