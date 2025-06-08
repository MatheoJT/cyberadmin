const app = document.getElementById('app');

function showInstallStep1() {
    app.innerHTML = `
        <div id="install">
            <h1>Installation - Code d'activation</h1>
            <input id="code" placeholder="Code" type="password" />
            <button onclick="checkCode()">Valider</button>
        </div>
    `;
}

function checkCode() {
    const val = document.getElementById('code').value;
    if (val === '000000') {
        showInstallStep2();
    } else {
        alert('Code incorrect');
    }
}

function showInstallStep2() {
    app.innerHTML = `
        <div id="install">
            <h1>Créer un compte administrateur</h1>
            <input id="adminUser" placeholder="Nom d'utilisateur" />
            <input id="adminPass" placeholder="Mot de passe" type="password" />
            <button onclick="saveAdmin()">Continuer</button>
        </div>
    `;
}

function saveAdmin() {
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;
    if (!user || !pass) {
        alert('Remplissez tous les champs');
        return;
    }
    localStorage.setItem('adminUser', user);
    localStorage.setItem('adminPass', pass);
    showInstallStep3();
}

function showInstallStep3() {
    app.innerHTML = `
        <div id="install">
            <h1>Connexion SQL (optionnel)</h1>
            <input id="sql" placeholder="Chaîne de connexion" />
            <button onclick="finishInstall()">Terminer</button>
        </div>
    `;
}

function finishInstall() {
    const sql = document.getElementById('sql').value;
    if (sql) {
        localStorage.setItem('sqlConn', sql);
    }
    localStorage.setItem('installed', 'true');
    showLogin();
}

function showLogin() {
    app.innerHTML = `
        <div id="login">
            <h1>Connexion administrateur</h1>
            <input id="loginUser" placeholder="Nom d'utilisateur" />
            <input id="loginPass" type="password" placeholder="Mot de passe" />
            <button onclick="login()">Se connecter</button>
        </div>
    `;
}

function login() {
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;
    const aUser = localStorage.getItem('adminUser');
    const aPass = localStorage.getItem('adminPass');
    if (user === aUser && pass === aPass) {
        sessionStorage.setItem('loggedIn', 'true');
        showDashboard();
    } else {
        alert('Identifiants invalides');
    }
}

function logout() {
    sessionStorage.removeItem('loggedIn');
    showLogin();
}

function showDashboard() {
    app.innerHTML = `
        <div id="dashboard">
            <div class="sidebar">
                <a href="#" onclick="showSection('home')">Accueil</a>
                <a href="#" onclick="showSection('terminal')">Terminal</a>
                <a href="#" onclick="showSection('logs')">Logs</a>
                <a href="#" onclick="showSection('players')">Joueurs</a>
                <a href="#" onclick="showSection('plugins')">Plugins</a>
                <a href="#" onclick="showSection('whitelist')">Whitelist</a>
                <a href="#" onclick="showSection('settings')">Paramètres</a>
                <a href="#" onclick="showSection('cpu')">Usage CPU</a>
                <a href="#" onclick="showSection('ram')">Usage RAM</a>
                <a href="#" onclick="showSection('net')">Usage Réseau</a>
                <a href="#" onclick="logout()">Déconnexion</a>
            </div>
            <div class="content" id="content"></div>
        </div>
    `;
    showSection('home');
}

function showSection(sec) {
    const content = document.getElementById('content');
    switch(sec) {
        case 'home':
            content.innerHTML = getHome();
            break;
        case 'terminal':
            content.innerHTML = '<h2>Terminal</h2><pre>>_ ready</pre>';
            break;
        case 'logs':
            content.innerHTML = '<h2>Logs</h2><p>Aucune donnée.</p>';
            break;
        case 'players':
            content.innerHTML = '<h2>Joueurs connectés</h2><ul><li>V (Level 10)</li><li>Johnny Silverhand (Level 50)</li></ul>';
            break;
        case 'plugins':
            content.innerHTML = '<h2>Plugins</h2><p>Liste fictive...</p>';
            break;
        case 'whitelist':
            content.innerHTML = '<h2>Whitelist</h2><p>Personne pour le moment.</p>';
            break;
        case 'settings':
            content.innerHTML = '<h2>Paramètres</h2><p>À configurer...</p>';
            break;
        case 'cpu':
            content.innerHTML = `<h2>Usage CPU</h2><p>${fakePercent()}%</p>`;
            break;
        case 'ram':
            content.innerHTML = `<h2>Usage RAM</h2><p>${fakePercent()}%</p>`;
            break;
        case 'net':
            content.innerHTML = `<h2>Usage Réseau</h2><p>${fakePercent()}%</p>`;
            break;
    }
}

function getHome() {
    return `
        <h2>Statut du serveur</h2>
        <div class="stats">
            <div class="stat"><h3>Statut</h3><p>En ligne</p></div>
            <div class="stat"><h3>Joueurs</h3><p>12 connectés</p></div>
            <div class="stat"><h3>Version</h3><p>1.0</p></div>
        </div>
    `;
}

function fakePercent() {
    return Math.floor(Math.random() * 100);
}

(function init() {
    if (!localStorage.getItem('installed')) {
        showInstallStep1();
    } else if (sessionStorage.getItem('loggedIn') === 'true') {
        showDashboard();
    } else {
        showLogin();
    }
})();
