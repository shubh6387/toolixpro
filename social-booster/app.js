// Social Growth Booster & Optimizer - Application Logic

// Initial State
let state = {
  credits: 2500,
  accounts: [
    { id: 'acc_1', platform: 'youtube', username: '@developer_hub_mock', url: 'https://youtube.com/@developer_hub_mock' }
  ],
  campaigns: [
    { id: 'camp_1', platform: 'youtube', service: 'views', url: 'https://youtube.com/watch?v=mock_video_1', target: 1000, progress: 1000, speed: 'gradual', status: 'Completed' },
    { id: 'camp_2', platform: 'instagram', service: 'followers', url: 'https://instagram.com/mock_profile_2', target: 200, progress: 200, speed: 'instant', status: 'Completed' }
  ],
  completedTasks: []
};

// Platforms rates config
const SERVICE_RATES = {
  views: 1, // 1 credit per view
  likes: 2, // 2 credits per like
  subscribers: 5, // 5 credits per subscriber
  followers: 5, // 5 credits per follower
  comments: 3, // 3 credits per comment
  shares: 2 // 2 credits per share
};

// Task exchange definitions
const EXCHANGE_TASKS = [
  { id: 'task_1', platform: 'youtube', service: 'watch', title: 'Watch "React Redux Tutorial for Beginners"', channel: 'CodeAcademy Mock', reward: 120, duration: 10, url: 'https://youtube.com/watch?v=redux_beginners' },
  { id: 'task_2', platform: 'instagram', service: 'follow', title: 'Follow @pixel_adventurer for daily photography', channel: '@pixel_adventurer', reward: 150, duration: 5, url: 'https://instagram.com/pixel_adventurer' },
  { id: 'task_3', platform: 'youtube', service: 'like', title: 'Like video "10 Productivity Hacks for Developers"', channel: 'DevLife', reward: 80, duration: 5, url: 'https://youtube.com/watch?v=prod_hacks' },
  { id: 'task_4', platform: 'instagram', service: 'like', title: 'Like latest post on travel tips in Switzerland', channel: '@wanderlust_global', reward: 90, duration: 6, url: 'https://instagram.com/p/switzerland_vibe' }
];

// Active tabs platform memory
let activeConnectPlatform = 'youtube';
let activeCampPlatform = 'youtube';
let activeSeoPlatform = 'youtube';

// Active Task modal state variables
let currentActiveTask = null;
let countdownTimer = null;
let isInteracted = false;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadStateFromLocalStorage();
  setupTabNavigation();
  initDashboard();
  initCampaigns();
  initEarnCredits();
  initSeoOptimizer();
  initSeoAuditor();
  startCampaignSimulation();
});

// Toast system
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-root');
  const toast = document.createElement('div');
  toast.className = `custom-toast ${type}`;
  
  let icon = 'bi-check-circle-fill';
  if (type === 'error') icon = 'bi-x-circle-fill';
  else if (type === 'info') icon = 'bi-info-circle-fill';
  else if (type === 'warning') icon = 'bi-exclamation-triangle-fill';
  
  toast.innerHTML = `
    <i class="bi ${icon}"></i>
    <div>${message}</div>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Local Storage Handlers
function saveStateToLocalStorage() {
  localStorage.setItem('social_booster_state', JSON.stringify(state));
}

function loadStateFromLocalStorage() {
  const savedState = localStorage.getItem('social_booster_state');
  if (savedState) {
    try {
      state = JSON.parse(savedState);
      updateHeaderCredits();
    } catch (e) {
      console.error('Failed to parse local storage state', e);
    }
  } else {
    saveStateToLocalStorage();
  }
}

function updateHeaderCredits() {
  document.getElementById('header-credit-val').innerText = Number(state.credits).toLocaleString();
  const campWalletVal = document.getElementById('camp-wallet-balance');
  if (campWalletVal) {
    campWalletVal.innerText = `${Number(state.credits).toLocaleString()} Cr`;
  }
}

// Tab Navigation Logic
function setupTabNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');
  const pageTitle = document.getElementById('current-page-title');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-target');
      
      // Update sidebar nav active state
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      // Switch tabs
      tabContents.forEach(tab => tab.classList.remove('active'));
      document.getElementById(targetTab).classList.add('active');
      
      // Update top header title
      if (targetTab === 'dashboard-tab') pageTitle.innerText = 'Dashboard Overview';
      else if (targetTab === 'campaigns-tab') pageTitle.innerText = 'Launch Growth Booster';
      else if (targetTab === 'earn-tab') pageTitle.innerText = 'Earn Traffic Credits';
      else if (targetTab === 'seo-tab') pageTitle.innerText = 'AI SEO Optimizer & Tags';
      else if (targetTab === 'audit-tab') pageTitle.innerText = 'YouTube SEO Auditor';
    });
  });
}

// ================= DASHBOARD CODE =================
function initDashboard() {
  updateDashboardStats();
  renderConnectedAccounts();
  
  const connectForm = document.getElementById('connect-account-form');
  connectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const urlInput = document.getElementById('connect-url-input');
    const value = urlInput.value.trim();
    
    if (!value) return;
    
    let username = value;
    if (value.includes('/') && !value.startsWith('@')) {
      const parts = value.split('/');
      username = parts[parts.length - 1] || parts[parts.length - 2] || '@channel';
      if (!username.startsWith('@')) username = '@' + username;
    } else if (!value.startsWith('@')) {
      username = '@' + value;
    }
    
    // Add to state
    const newAccount = {
      id: 'acc_' + Date.now(),
      platform: activeConnectPlatform,
      username: username,
      url: value.startsWith('http') ? value : `https://${activeConnectPlatform}.com/${username.replace('@', '')}`
    };
    
    state.accounts.push(newAccount);
    saveStateToLocalStorage();
    renderConnectedAccounts();
    updateDashboardStats();
    
    // Reward for connecting account
    state.credits += 200;
    updateHeaderCredits();
    saveStateToLocalStorage();
    
    showToast(`Account ${username} connected successfully! +200 Credits Reward!`, 'success');
    urlInput.value = '';
  });
}

function toggleConnectPlatform(platform) {
  activeConnectPlatform = platform;
  const ytBtn = document.getElementById('connect-platform-yt');
  const igBtn = document.getElementById('connect-platform-ig');
  const inputLabel = document.getElementById('connect-label');
  const inputIcon = document.getElementById('connect-icon');
  const inputField = document.getElementById('connect-url-input');
  
  if (platform === 'youtube') {
    ytBtn.classList.add('active');
    igBtn.classList.remove('active');
    inputLabel.innerText = 'Channel URL or Handle';
    inputIcon.className = 'bi bi-youtube text-danger';
    inputField.placeholder = 'e.g. https://youtube.com/@mychannel';
  } else {
    igBtn.classList.add('active');
    ytBtn.classList.remove('active');
    inputLabel.innerText = 'Instagram Username';
    inputIcon.className = 'bi bi-instagram text-instagram';
    inputField.placeholder = 'e.g. @creative_coder';
  }
}

function renderConnectedAccounts() {
  const container = document.getElementById('connected-accounts-list');
  container.innerHTML = '';
  
  if (state.accounts.length === 0) {
    container.innerHTML = `<div class="text-muted fs-sm p-2 text-center">No accounts linked yet.</div>`;
    return;
  }
  
  state.accounts.forEach(acc => {
    const card = document.createElement('div');
    card.className = 'd-flex align-center justify-between p-2 rounded bg-tertiary border border-color';
    
    const isYt = acc.platform === 'youtube';
    const platIcon = isYt ? 'bi-youtube text-danger' : 'bi-instagram text-instagram';
    
    card.innerHTML = `
      <div class="d-flex align-center gap-2">
        <i class="bi ${platIcon} fs-lg"></i>
        <div>
          <div class="fw-semibold fs-sm">${acc.username}</div>
          <a href="${acc.url}" target="_blank" class="text-muted fs-sm text-decoration-underline" style="font-size: 0.75rem;">View Profile</a>
        </div>
      </div>
      <button class="btn btn-secondary py-1 px-2 text-danger" onclick="disconnectAccount('${acc.id}')" style="width: auto; font-size: 0.75rem; border-radius: 6px;">
        <i class="bi bi-trash"></i>
      </button>
    `;
    container.appendChild(card);
  });
}

function disconnectAccount(id) {
  const index = state.accounts.findIndex(acc => acc.id === id);
  if (index !== -1) {
    const acc = state.accounts[index];
    state.accounts.splice(index, 1);
    saveStateToLocalStorage();
    renderConnectedAccounts();
    updateDashboardStats();
    showToast(`Disconnected account ${acc.username}`, 'info');
  }
}

function updateDashboardStats() {
  // Let's sum up simulated stats
  let ytSubs = 1240;
  let ytViews = 45820;
  let igFollowers = 8450;
  
  // Each completed campaign boosts stats
  state.campaigns.forEach(c => {
    if (c.status === 'Completed' || c.status === 'Running') {
      const amount = c.status === 'Completed' ? c.target : c.progress;
      if (c.platform === 'youtube') {
        if (c.service === 'subscribers') ytSubs += amount;
        else if (c.service === 'views') ytViews += amount;
      } else if (c.platform === 'instagram') {
        if (c.service === 'followers') igFollowers += amount;
      }
    }
  });
  
  document.getElementById('stat-yt-subs').innerText = ytSubs.toLocaleString();
  document.getElementById('stat-yt-views').innerText = ytViews.toLocaleString();
  document.getElementById('stat-ig-followers').innerText = igFollowers.toLocaleString();
  document.getElementById('stat-total-reach').innerText = (ytSubs + ytViews + igFollowers).toLocaleString();
}

// ================= CAMPAIGNS CODE =================
function initCampaigns() {
  renderCampaignsTable();
  calculateCost();
  
  const campaignForm = document.getElementById('campaign-form');
  campaignForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const service = document.getElementById('camp-service').value;
    const url = document.getElementById('camp-target-url').value.trim();
    const quantity = parseInt(document.getElementById('camp-quantity').value);
    const speed = document.getElementById('camp-speed').value;
    const cost = quantity * SERVICE_RATES[service];
    
    if (state.credits < cost) {
      showToast('Insufficient Credits. Earn more in the Earn Credits tab!', 'error');
      return;
    }
    
    // Deduct credits
    state.credits -= cost;
    updateHeaderCredits();
    
    // Create new campaign
    const newCamp = {
      id: 'camp_' + Date.now(),
      platform: activeCampPlatform,
      service: service,
      url: url,
      target: quantity,
      progress: 0,
      speed: speed,
      status: 'Running'
    };
    
    state.campaigns.unshift(newCamp);
    saveStateToLocalStorage();
    renderCampaignsTable();
    updateDashboardStats();
    
    showToast(`Campaign launched successfully! Deducted ${cost} Credits.`, 'success');
    
    // Reset form
    document.getElementById('camp-target-url').value = '';
    document.getElementById('camp-quantity').value = 500;
    updateQuantity(500);
    calculateCost();
  });
}

function toggleCampPlatform(platform) {
  activeCampPlatform = platform;
  const ytBtn = document.getElementById('camp-platform-yt');
  const igBtn = document.getElementById('camp-platform-ig');
  const serviceSelect = document.getElementById('camp-service');
  const urlLabel = document.getElementById('camp-url-label');
  const urlInput = document.getElementById('camp-target-url');
  
  serviceSelect.innerHTML = '';
  
  if (platform === 'youtube') {
    ytBtn.classList.add('active');
    igBtn.classList.remove('active');
    urlLabel.innerText = 'Video URL';
    urlInput.placeholder = 'https://youtube.com/watch?v=...';
    
    serviceSelect.innerHTML = `
      <option value="views" selected>Organic Views</option>
      <option value="subscribers">Subscribers</option>
      <option value="likes">Video Likes</option>
      <option value="comments">Custom Comments</option>
      <option value="shares">Video Shares</option>
    `;
  } else {
    igBtn.classList.add('active');
    ytBtn.classList.remove('active');
    urlLabel.innerText = 'Instagram Profile or Post Link';
    urlInput.placeholder = 'https://instagram.com/p/... or profile link';
    
    serviceSelect.innerHTML = `
      <option value="followers" selected>Profile Followers</option>
      <option value="likes">Post Likes</option>
      <option value="comments">Post Comments</option>
      <option value="shares">Post Shares</option>
    `;
  }
  
  calculateCost();
}

function updateQuantity(val) {
  document.getElementById('quantity-display').innerText = parseInt(val).toLocaleString();
  calculateCost();
}

function calculateCost() {
  const service = document.getElementById('camp-service').value;
  const quantity = parseInt(document.getElementById('camp-quantity').value);
  const costPerUnit = SERVICE_RATES[service] || 1;
  const totalCost = quantity * costPerUnit;
  
  document.getElementById('camp-total-cost').innerText = totalCost.toLocaleString();
}

function renderCampaignsTable() {
  const tbody = document.getElementById('campaigns-table-body');
  tbody.innerHTML = '';
  
  if (state.campaigns.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-muted">No active campaigns. Configure a boost to get started.</td>
      </tr>
    `;
    return;
  }
  
  state.campaigns.forEach(c => {
    const tr = document.createElement('tr');
    
    const isYt = c.platform === 'youtube';
    const platBadge = isYt 
      ? '<span class="badge badge-youtube"><i class="bi bi-youtube"></i> YouTube</span>'
      : '<span class="badge badge-instagram"><i class="bi bi-instagram"></i> Instagram</span>';
      
    // Format URL to nice clean short name
    let shortUrl = c.url;
    try {
      const parsed = new URL(c.url);
      shortUrl = parsed.pathname.length > 20 ? parsed.pathname.substring(0, 20) + '...' : parsed.pathname;
    } catch(e) {
      if (c.url.length > 20) shortUrl = c.url.substring(0, 20) + '...';
    }
    
    const serviceName = c.service.charAt(0).toUpperCase() + c.service.slice(1);
    
    const progressPercent = Math.min(100, Math.floor((c.progress / c.target) * 100));
    const isDone = c.status === 'Completed';
    const statusBadge = isDone
      ? '<span class="badge badge-success"><i class="bi bi-check-circle"></i> Completed</span>'
      : '<span class="badge badge-warning"><i class="bi bi-hourglass-split"></i> Running</span>';
      
    tr.innerHTML = `
      <td>${platBadge}</td>
      <td><a href="${c.url}" target="_blank" class="text-secondary text-decoration-underline" style="font-size: 0.8rem;">${shortUrl}</a></td>
      <td>${serviceName}</td>
      <td>
        <div class="progress-container">
          <div class="progress-track">
            <div class="progress-fill ${isDone ? 'success' : ''}" style="width: ${progressPercent}%;"></div>
          </div>
          <span class="progress-text">${c.progress.toLocaleString()} / ${c.target.toLocaleString()} (${progressPercent}%)</span>
        </div>
      </td>
      <td>${statusBadge}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Emulate Delivery simulation background loop
function startCampaignSimulation() {
  setInterval(() => {
    let stateChanged = false;
    
    state.campaigns.forEach(c => {
      if (c.status === 'Running') {
        // Increase progress randomly based on speed
        const speedFactor = c.speed === 'instant' ? 0.25 : 0.05;
        const baseIncrement = Math.ceil(c.target * speedFactor);
        const randomAdd = Math.floor(Math.random() * baseIncrement) + 5;
        
        c.progress = Math.min(c.target, c.progress + randomAdd);
        stateChanged = true;
        
        if (c.progress >= c.target) {
          c.status = 'Completed';
          showToast(`Campaign ${c.id.replace('camp_', '#')} finished successfully!`, 'success');
        }
      }
    });
    
    if (stateChanged) {
      saveStateToLocalStorage();
      renderCampaignsTable();
      updateDashboardStats();
    }
  }, 4000);
}

// ================= EARN CREDITS CODE =================
function initEarnCredits() {
  renderTasks();
}

function renderTasks() {
  const container = document.getElementById('tasks-container');
  container.innerHTML = '';
  
  EXCHANGE_TASKS.forEach(t => {
    const isCompleted = state.completedTasks.includes(t.id);
    const card = document.createElement('div');
    card.className = `task-card premium-card`;
    
    const isYt = t.platform === 'youtube';
    const platIcon = isYt ? 'bi-youtube text-danger' : 'bi-instagram text-instagram';
    const actBtnText = isCompleted ? 'Completed' : t.service === 'watch' ? 'Start Watching' : 'Follow Profile';
    const btnClass = isCompleted ? 'btn-secondary' : isYt ? 'btn-youtube' : 'btn-instagram';
    
    card.innerHTML = `
      <div class="task-platform-tag">
        <i class="bi ${platIcon}"></i>
      </div>
      <div class="task-title text-body">${t.title}</div>
      <div class="text-muted fs-sm">Publisher: ${t.channel}</div>
      <div class="d-flex align-center justify-between">
        <div class="task-reward">
          <i class="bi bi-database-fill"></i> +${t.reward} Cr
        </div>
        <div class="text-secondary fs-sm" style="font-size: 0.75rem;"><i class="bi bi-clock"></i> ${t.duration}s timer</div>
      </div>
      <button class="btn ${btnClass} task-action-btn" onclick="startExchangeTask('${t.id}')" ${isCompleted ? 'disabled' : ''}>
        <i class="bi ${isCompleted ? 'bi-check-all' : 'bi-play-circle'}"></i> ${actBtnText}
      </button>
    `;
    container.appendChild(card);
  });
}

function startExchangeTask(taskId) {
  const task = EXCHANGE_TASKS.find(t => t.id === taskId);
  if (!task || state.completedTasks.includes(taskId)) return;
  
  currentActiveTask = task;
  isInteracted = false;
  
  // Set address bar
  document.getElementById('browser-address').innerText = task.url;
  
  // Render emulator frame
  const frame = document.getElementById('emulator-frame');
  frame.innerHTML = '';
  
  if (task.platform === 'youtube') {
    // Render video mockup
    frame.innerHTML = `
      <div class="sandbox-controls" id="youtube-play-btn" onclick="playMockVideo()">
        <i class="bi bi-play-btn-fill play-pulse-icon"></i>
        <span>Click to Play & Start Timer</span>
      </div>
      <div class="sandbox-controls d-none" id="youtube-player-timer">
        <div class="timer-ring"><i class="bi bi-hourglass-split"></i> Timer: <span id="emulator-timer-text">${task.duration}</span>s</div>
        <div class="fs-sm mt-2 text-secondary">Mock Video Playing: ${task.title}...</div>
      </div>
    `;
  } else {
    // Render instagram mockup
    frame.innerHTML = `
      <div class="sandbox-avatar-emulator">
        <i class="bi bi-person-fill text-muted"></i>
      </div>
      <div class="sandbox-profile-details text-center">
        <h5 class="m-0 fw-bold">${task.channel}</h5>
        <p class="fs-sm text-muted m-0">Creative Portfolio & Blogs</p>
      </div>
      <button class="btn btn-primary" id="ig-follow-btn" onclick="followMockProfile()" style="width: auto; padding: 0.5rem 1.5rem; border-radius: 20px;">
        <i class="bi bi-person-plus-fill"></i> Follow @${task.channel.replace('@', '')}
      </button>
    `;
  }
  
  // Disable Verify Button originally
  const verifyBtn = document.getElementById('verify-task-btn');
  verifyBtn.disabled = true;
  verifyBtn.onclick = claimTaskCredits;
  
  document.getElementById('task-modal-title').innerText = task.title;
  
  // Open modal
  document.getElementById('task-modal').classList.add('active');
}

function playMockVideo() {
  if (!currentActiveTask || isInteracted) return;
  isInteracted = true;
  
  document.getElementById('youtube-play-btn').classList.add('d-none');
  document.getElementById('youtube-player-timer').classList.remove('d-none');
  
  let timeRemaining = currentActiveTask.duration;
  const timerText = document.getElementById('emulator-timer-text');
  
  countdownTimer = setInterval(() => {
    timeRemaining--;
    timerText.innerText = timeRemaining;
    
    if (timeRemaining <= 0) {
      clearInterval(countdownTimer);
      // Enable verification
      document.getElementById('verify-task-btn').disabled = false;
      showToast('Interaction completed. Click Verify to claim credits!', 'info');
    }
  }, 1000);
}

function followMockProfile() {
  if (!currentActiveTask || isInteracted) return;
  isInteracted = true;
  
  const followBtn = document.getElementById('ig-follow-btn');
  followBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Verifying connection...';
  followBtn.className = 'btn btn-secondary';
  followBtn.disabled = true;
  
  let timeRemaining = currentActiveTask.duration;
  
  countdownTimer = setInterval(() => {
    timeRemaining--;
    if (timeRemaining <= 0) {
      clearInterval(countdownTimer);
      followBtn.innerHTML = '<i class="bi bi-person-check-fill text-success"></i> Followed';
      document.getElementById('verify-task-btn').disabled = false;
      showToast('Profile followed. Verification active!', 'info');
    }
  }, 1000);
}

function claimTaskCredits() {
  if (!currentActiveTask) return;
  
  // Add credits
  state.credits += currentActiveTask.reward;
  state.completedTasks.push(currentActiveTask.id);
  
  updateHeaderCredits();
  saveStateToLocalStorage();
  renderTasks();
  closeTaskModal();
  
  showToast(`Congratulations! Earned +${currentActiveTask.reward} Credits!`, 'success');
}

function closeTaskModal() {
  clearInterval(countdownTimer);
  document.getElementById('task-modal').classList.remove('active');
  currentActiveTask = null;
}

// ================= AI SEO OPTIMIZER CODE =================
const SEO_DATABASE = {
  youtube: {
    coding: {
      title: "Python Tutorial For Beginners in 2026 (No Experience Needed!)\nMaster Python in 15 Minutes: The ONLY Guide You Need\nWhy 99% of Beginners Fail to Learn Programming (And How to Fix It)",
      desc: "Welcome to the ultimate Python coding tutorial! In this guide, you will master variables, loops, lists, and functions from scratch. Perfect for absolute beginners starting their software engineering career.\n\n📌 Code snippets can be downloaded in the description.\n💡 Don't forget to Like & Subscribe for more tutorials!",
      tags: ["pythontutorial", "learnpython", "pythonforbeginners", "coding2026", "programmingguide", "pythonbasics", "computerscience", "howtocode"]
    },
    vlog: {
      title: "How I Traveled Paris For Under $500! (Full Itinerary)\nParis Travel Vlog: Secret Spots Locals Don't Want You to Know\n10 Paris Travel Mistakes You Are DEFINITELY Making in 2026",
      desc: "Thinking of visiting France? In this vlog, we explore the hidden cafes, budget eats, and stunning view points of the Eiffel Tower, Louvre, and Montmartre. We show you how to experience Paris without breaking the bank!\n\n✈️ Subscribe for budget travel tips around the world!",
      tags: ["travelvlog", "parisbudgettravel", "paristips", "travelguide2026", "exploreparis", "francevlog", "backpackingparis", "paristravel"]
    },
    cooking: {
      title: "The Ultimate 10-Minute Creamy Garlic Pasta recipe\nI Tried Gordon Ramsay's Famous Dish (And Improved It)\n5 Essential Cooking Techniques Every Home Cook Needs to Know",
      desc: "Craving a quick, delicious Italian dinner? This creamy garlic pasta takes only 10 minutes to prepare and uses simple pantry ingredients. Rich, buttery, and packed with flavor, it's the perfect weeknight meal!\n\n🍽️ Support the channel by subscribing for weekly recipes!",
      tags: ["quickrecipes", "pastarecipe", "easycooking", "garlicpasta", "10minutemeals", "homechef", "dinnerideas", "cookingguide"]
    },
    gaming: {
      title: "I Spent 100 Days in Minecraft Hardcore (Here's What I Built)\nIs This New FPS Game Actually A Call Of Duty Killer?\n10 Secrets and Easter Eggs Hidden in the Latest DLC Update",
      desc: "Welcome to another gaming walkthrough! Today, we check out the new patch updates and test out the strongest class in hardcore mode. Watch until the end to see the epic boss battle!\n\n🎮 Subscribe for daily playthroughs, guides, and reviews!",
      tags: ["gamingwalkthrough", "minecraft100days", "fpsgaming", "letsplay", "gameplayguides", "secretboss", "newgamereviews", "gamingclip"]
    }
  },
  instagram: {
    coding: {
      title: "🚀 5 Developer Productivity Tools You Aren't Using Yet!",
      desc: "Double your coding speed with these 5 lightweight VS Code extensions. 💻\nSave this reel for later when setting up your IDE!\n\nDouble-tap if you learned something new today and follow for daily developer tips! 🔥",
      tags: ["programminglife", "codercommunity", "vscodeextensions", "developerhacks", "webdevelopment", "softwareengineering", "learncoding", "techtrends"]
    },
    vlog: {
      title: "📍 Paris, France: Sunset view over the Seine river",
      desc: "Lost in the streets of Montmartre. Paris has a way of stealing your heart in every corner. 🥐✨\n\nDrop a ✈️ if you want to visit this year!\n\nSave this for your next French getaway itinerary.",
      tags: ["paristravel", "sunsetoverparis", "wanderlustvlog", "explorefrance", "bucketlisttravel", "instavlog", "parisianlife", "travelaesthetic"]
    },
    cooking: {
      title: "🍝 The only creamy pasta recipe you will ever need",
      desc: "Garlic, butter, parmesan, and 10 minutes. That's all it takes to make the ultimate comfort food! 🧀🔥\n\nFull ingredient quantities written in the comments below.\n\nFollow @cook_master for easy dinner inspiration!",
      tags: ["dinnerinspo", "pastaporn", "10minuterecipes", "comfortfood", "cooksofinstagram", "garlicpasta", "easyrecipes", "foodaesthetic"]
    },
    gaming: {
      title: "🎮 Rate this Minecraft base build from 1 to 10!",
      desc: "Spent 48 hours designing this cyberpunk castle. Let me know what you think in the comments! 🏰🕹️\n\nTag your gaming squad!\n\nFollow for more daily builds and setups.",
      tags: ["minecraftbuilds", "cyberpunksetup", "gamingreels", "survivalbuild", "gamersunite", "minecraftcastle", "gamingsetups", "virtualart"]
    }
  }
};

function initSeoOptimizer() {
  const form = document.getElementById('seo-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const topic = document.getElementById('seo-topic').value.toLowerCase().trim();
    const location = document.getElementById('seo-location').value;
    
    // Hide empty state and show results panel
    document.getElementById('seo-empty-state').classList.add('d-none');
    const container = document.getElementById('seo-results-container');
    container.className = 'd-flex flex-column gap-3';
    
    // Find matching topic or fallback
    let matchKey = 'coding';
    if (topic.includes('travel') || topic.includes('paris') || topic.includes('vlog') || topic.includes('trip')) {
      matchKey = 'vlog';
    } else if (topic.includes('cook') || topic.includes('recipe') || topic.includes('food') || topic.includes('pasta')) {
      matchKey = 'cooking';
    } else if (topic.includes('game') || topic.includes('gaming') || topic.includes('play') || topic.includes('minecraft')) {
      matchKey = 'gaming';
    } else if (topic.includes('code') || topic.includes('dev') || topic.includes('program') || topic.includes('python')) {
      matchKey = 'coding';
    } else {
      // Create fallback dynamically
      generateDynamicSeo(topic, activeSeoPlatform, location);
      return;
    }
    
    // Populate template data
    const data = SEO_DATABASE[activeSeoPlatform][matchKey];
    let titles = data.title;
    let description = data.desc;
    
    // Modify based on location
    if (location === 'india') {
      titles = titles.split('\n').map(t => t + ' (Hindi Explainer)').join('\n');
      description = "🇮🇳 Namaste! In this video... \n" + description;
    } else if (location === 'us') {
      titles = titles.split('\n').map(t => t + ' [US Special]').join('\n');
    }
    
    document.getElementById('seo-title-val').innerText = titles;
    document.getElementById('seo-desc-val').innerText = description;
    
    const tagsContainer = document.getElementById('seo-tags-val');
    tagsContainer.innerHTML = '';
    
    data.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag-item';
      span.innerText = activeSeoPlatform === 'instagram' ? `#${tag}` : tag;
      tagsContainer.appendChild(span);
    });
    
    showToast('AI SEO Suggestions generated!', 'success');
  });
}

function generateDynamicSeo(topic, platform, location) {
  // Cleans the topic word
  const words = topic.split(' ');
  const capitalizedWord = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  let titles = "";
  let desc = "";
  let tags = [];
  
  if (platform === 'youtube') {
    titles = `The Ultimate Guide to ${capitalizedWord} in 2026!\nHow to Master ${capitalizedWord} (Step-by-Step Tutorial)\nI Tried ${capitalizedWord} For 30 Days (Real Results!)`;
    desc = `Welcome back! In today's video, we are breaking down everything you need to know about ${capitalizedWord}. This guide covers the basics, secret strategies, and advanced setups to get you ahead.\n\n🔔 Subscribe to watch weekly updates on ${capitalizedWord}.`;
    tags = [topic.replace(/\s+/g, ''), `${topic.replace(/\s+/g, '')}tutorial`, `${topic.replace(/\s+/g, '')}guide`, `learn${topic.replace(/\s+/g, '')}`, `best${topic.replace(/\s+/g, '')}tips`, 'trending2026'];
  } else {
    titles = `🔥 Level up your ${capitalizedWord} skills today!`;
    desc = `Sharing my secret workflow for ${capitalizedWord}! This single tip saved me 3 hours daily. 🚀\n\n📌 Save this reel so you don't forget it later!\n\nFollow for more ${capitalizedWord} daily insights.`;
    tags = [topic.replace(/\s+/g, ''), `${topic.replace(/\s+/g, '')}hacks`, `${topic.replace(/\s+/g, '')}aesthetic`, `explore${topic.replace(/\s+/g, '')}`, 'instatrending', 'postoftheday'];
  }
  
  if (location === 'india') {
    titles = titles.split('\n').map(t => t + ' (Hindi)').join('\n');
    desc = "🇮🇳 Welcome India! \n" + desc;
  }
  
  document.getElementById('seo-title-val').innerText = titles;
  document.getElementById('seo-desc-val').innerText = desc;
  
  const tagsContainer = document.getElementById('seo-tags-val');
  tagsContainer.innerHTML = '';
  
  tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'tag-item';
    span.innerText = platform === 'instagram' ? `#${tag}` : tag;
    tagsContainer.appendChild(span);
  });
  
  showToast('Dynamic SEO suggestions created!', 'success');
}

function toggleSeoPlatform(platform) {
  activeSeoPlatform = platform;
  const ytBtn = document.getElementById('seo-platform-yt');
  const igBtn = document.getElementById('seo-platform-ig');
  const topicLabel = document.getElementById('seo-topic-label');
  const tagLabel = document.getElementById('seo-tag-label');
  const topicInput = document.getElementById('seo-topic');
  
  if (platform === 'youtube') {
    ytBtn.classList.add('active');
    igBtn.classList.remove('active');
    topicLabel.innerText = 'Video Core Topic / Keywords';
    tagLabel.innerText = 'Algorithmic Search Keywords';
    topicInput.placeholder = 'e.g. Python tutorial, travel vlog';
  } else {
    igBtn.classList.add('active');
    ytBtn.classList.remove('active');
    topicLabel.innerText = 'Instagram Content Category';
    tagLabel.innerText = 'Viral Post Hashtags';
    topicInput.placeholder = 'e.g. fashion aesthetic, workout daily';
  }
}

// Copy to Clipboard Helpers
function copyToClipboard(elementId, isTags = false) {
  const element = document.getElementById(elementId);
  let text = "";
  
  if (isTags) {
    const tags = Array.from(element.children).map(span => span.innerText);
    text = tags.join(activeSeoPlatform === 'instagram' ? ' ' : ', ');
  } else {
    text = element.innerText;
  }
  
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied content to clipboard!', 'info');
  }).catch(err => {
    console.error('Failed to copy', err);
    showToast('Copy failed. Please copy manually.', 'error');
  });
}

// ================= SEO AUDITOR LOGIC =================
let activeAuditType = 'channel';

function toggleAuditType(type) {
  activeAuditType = type;
  const channelBtn = document.getElementById('audit-type-channel');
  const videoBtn = document.getElementById('audit-type-video');
  const channelForm = document.getElementById('channel-audit-form');
  const videoForm = document.getElementById('video-audit-form');
  
  if (type === 'channel') {
    channelBtn.classList.add('active');
    videoBtn.classList.remove('active');
    channelForm.classList.remove('d-none');
    videoForm.classList.add('d-none');
  } else {
    videoBtn.classList.add('active');
    channelBtn.classList.remove('active');
    videoForm.classList.remove('d-none');
    channelForm.classList.add('d-none');
  }
}

function initSeoAuditor() {
  const channelForm = document.getElementById('channel-audit-form');
  const videoForm = document.getElementById('video-audit-form');
  
  if (channelForm) {
    channelForm.addEventListener('submit', (e) => {
      e.preventDefault();
      executeChannelAudit();
    });
  }
  
  if (videoForm) {
    videoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      executeVideoAudit();
    });
  }
}

function executeChannelAudit() {
  const channelVal = document.getElementById('audit-channel-url').value.trim();
  const niche = document.getElementById('audit-channel-niche').value;
  
  if (!channelVal) return;
  
  document.getElementById('audit-empty-state').classList.add('d-none');
  document.getElementById('audit-results-container').classList.remove('d-none');
  document.getElementById('audit-thumbnail-preview').classList.add('d-none'); // Hide thumbnail for channel audit
  
  let score = 85;
  const checklist = [];
  let advice = "";
  
  // 1. Handle Check
  const hasHandle = channelVal.startsWith('@') || channelVal.includes('/@');
  if (hasHandle) {
    checklist.push({
      status: 'success',
      text: 'Custom Channel Handle Detected: Clean URL structure helps shareability.'
    });
    score += 5;
  } else {
    checklist.push({
      status: 'warning',
      text: 'No clear handle found in URL. Make sure to claim a unique @handle in YouTube Studio.'
    });
    score -= 10;
  }
  
  // 2. Niche Keywords Alignment
  const lowCaseChannel = channelVal.toLowerCase();
  if (niche === 'cartoons') {
    const hasKidKeywords = lowCaseChannel.includes('kids') || lowCaseChannel.includes('cartoon') || lowCaseChannel.includes('toy') || lowCaseChannel.includes('toon') || lowCaseChannel.includes('baby') || lowCaseChannel.includes('dragon') || lowCaseChannel.includes('rabbit');
    if (hasKidKeywords) {
      checklist.push({
        status: 'success',
        text: 'Niche keywords aligned: Channel handle contains terms friendly to children recommendations.'
      });
      score += 5;
    } else {
      checklist.push({
        status: 'info',
        text: 'SEO Suggestion: Consider adding child-friendly terms (e.g. "Toons", "Cartoons", "Kids") to your handle to index faster.'
      });
    }
    advice = "Kids animation relies heavily on autoplay and sidebar recommendations. Ensure your channel banner uses bright cartoon characters (like your Rabbit & Baby Dragon) and states your upload days (e.g., 'New Video Every Saturday!'). Group your cartoon stories into distinct playlists so children watch multiple videos back-to-back, boosting session duration.";
  } else if (niche === 'gaming') {
    checklist.push({
      status: 'warning',
      text: 'Playlist layout optimization needed. Gamers must organize videos by Game Titles/Seasons.'
    });
    score -= 10;
    advice = "For gaming, organize your content by games. Make separate playlists for 'Minecraft', 'Call of Duty', etc. Keep your banner clean showing your PC setup or logo, and list your streaming schedule.";
  } else {
    checklist.push({
      status: 'success',
      text: 'Standard niche guidelines matched. Ensure links to social profiles are in the About tab.'
    });
    advice = "Ensure your about page describes what value viewers get. Write 200+ words about your video schedule and topic area, repeating core keywords inside the first sentence.";
  }
  
  // 3. Upload Frequency Audit
  checklist.push({
    status: 'warning',
    text: 'Upload frequency flag: Consistent scheduling (e.g., 2 videos/week) is critical for training YouTube Recommendation models.'
  });
  score -= 10;
  
  // Cap score
  score = Math.min(100, Math.max(30, score));
  renderAuditResults(score, checklist, advice);
  showToast('Channel branding audit completed!', 'success');
}

function executeVideoAudit() {
  const urlVal = document.getElementById('audit-video-url').value.trim();
  const titleVal = document.getElementById('audit-video-title').value.trim();
  const descVal = document.getElementById('audit-video-desc').value.trim();
  const tagsVal = document.getElementById('audit-video-tags').value.trim();
  
  if (!urlVal || !titleVal || !descVal) return;
  
  document.getElementById('audit-empty-state').classList.add('d-none');
  document.getElementById('audit-results-container').classList.remove('d-none');
  
  // Extract YouTube ID for preview thumbnail
  const ytRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = urlVal.match(ytRegex);
  const thumbPreview = document.getElementById('audit-thumbnail-preview');
  
  if (match && match[1]) {
    const videoId = match[1];
    thumbPreview.innerHTML = `<img src="https://img.youtube.com/vi/${videoId}/mqdefault.jpg" alt="Video Thumbnail" class="w-full" style="display: block;">`;
    thumbPreview.classList.remove('d-none');
  } else {
    thumbPreview.classList.add('d-none');
  }
  
  let score = 100;
  const checklist = [];
  
  // 1. Title Length Audit
  const titleLen = titleVal.length;
  if (titleLen < 35) {
    checklist.push({
      status: 'error',
      text: `Title too short (${titleLen} chars): A short title misses out on valuable search ranking keywords. Aim for 45-65 characters.`
    });
    score -= 15;
  } else if (titleLen > 75) {
    checklist.push({
      status: 'warning',
      text: `Title too long (${titleLen} chars): Longer titles are truncated (cut off) on mobile screens. Kids won't read it. Keep under 65 chars.`
    });
    score -= 10;
  } else {
    checklist.push({
      status: 'success',
      text: `Optimized Title Length (${titleLen} chars): Fits mobile and desktop screens perfectly.`
    });
  }
  
  // 2. Click-Through-Rate Hook Check
  const hasEmoji = /\p{Emoji}/u.test(titleVal);
  const hasHookBrackets = /[\(\[\)\]]/.test(titleVal);
  
  if (hasEmoji) {
    checklist.push({
      status: 'success',
      text: 'Visual CTR Hook: Emojis detected in title. Emojis increase child-interest click-through rate.'
    });
  } else {
    checklist.push({
      status: 'warning',
      text: 'No Emojis found in title: For animation/cartoons, adding eye-catching emojis (like 🐰, 🐲, ✨) boosts click rates.'
    });
    score -= 10;
  }
  
  if (hasHookBrackets) {
    checklist.push({
      status: 'success',
      text: 'Algorithmic Bracket Hook: Parentheses or brackets found (e.g. "[Episode 1]" or "(Funny Cartoon)").'
    });
  } else {
    checklist.push({
      status: 'info',
      text: 'SEO Suggestion: Add explanatory brackets (e.g., "(Hindi Animation)" or "[Funny Cartoon]") to give context.'
    });
  }
  
  // 3. Description Audit
  const descLen = descVal.length;
  if (descLen < 100) {
    checklist.push({
      status: 'error',
      text: `Description too thin (${descLen} chars): Add at least 150-200 words explaining the story to help YouTube search models index the topic.`
    });
    score -= 15;
  } else {
    // Check if title words are in description
    const titleWords = titleVal.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const descLower = descVal.toLowerCase();
    let matchCount = 0;
    titleWords.forEach(w => {
      if (descLower.includes(w)) matchCount++;
    });
    
    if (matchCount >= 2) {
      checklist.push({
        status: 'success',
        text: 'Keyword density: Title keywords are repeated in the description text.'
      });
    } else {
      checklist.push({
        status: 'warning',
        text: 'Missing keyword repetition: Repeat key words from your title in the first 2 lines of your description to boost SEO rank.'
      });
      score -= 10;
    }
  }
  
  const hasLinks = descVal.includes('http://') || descVal.includes('https://');
  if (hasLinks) {
    checklist.push({
      status: 'success',
      text: 'Retention links: Playlist links or Subscription links found in description.'
    });
  } else {
    checklist.push({
      status: 'info',
      text: 'SEO Suggestion: Paste a link to your channel\'s playlist or social handle to increase audience watch time.'
    });
  }
  
  // 4. Tags Audit
  if (!tagsVal) {
    checklist.push({
      status: 'warning',
      text: 'No tags detected. Tags help categorise your video in related recommendation sidebars.'
    });
    score -= 10;
  } else {
    const tagsCount = tagsVal.split(',').length;
    if (tagsCount < 6) {
      checklist.push({
        status: 'warning',
        text: `Low tag density (${tagsCount} tags): Add 8-12 tags covering main characters and genre (e.g., 'rabbit cartoon, dragon kids story').`
      });
      score -= 5;
    } else {
      checklist.push({
        status: 'success',
        text: `Optimal tag density (${tagsCount} tags detected).`
      });
    }
  }
  
  // Custom Actionable Advice
  let advice = "To make your rabbit and baby dragon cartoon go viral: Keep titles short and visual (e.g., 'Rabbit & Baby Dragon Get Lost! 🐰🐲'). Put the primary keywords in the first sentence of the description. When uploading, categorize the video under 'Film & Animation' or 'Education' and check the 'Made for Kids' box in YouTube Studio. Make sure to use high contrast yellow/blue thumbnails to stand out in recommended loops!";
  
  if (titleVal.toLowerCase().includes('rabbit') || titleVal.toLowerCase().includes('dragon')) {
    advice = "Your characters (Rabbit 🐰 & Dragon 🐲) have huge click potential! Make sure your title reads like a kids book headline, for example: 'Rabbit vs Dragon: The Big Race 🐰🐲'. Always add your channel name at the end of the tags list. In the first paragraph of your description, write: 'Watch this funny animated story of a cute rabbit and a playful baby dragon. Perfect cartoon for toddlers and children!' This guarantees keywords get matched by YouTube search.";
  }
  
  score = Math.min(100, Math.max(30, score));
  renderAuditResults(score, checklist, advice);
  showToast('Video metadata audit completed!', 'success');
}

function renderAuditResults(score, checklist, advice) {
  document.getElementById('audit-score-val').innerText = score;
  
  // Grade calculation
  let grade = "C (Needs Work)";
  let gradeClass = "text-danger";
  if (score >= 90) {
    grade = "A+ (Excellent)";
    gradeClass = "text-success";
  } else if (score >= 80) {
    grade = "B+ (Very Good)";
    gradeClass = "text-success";
  } else if (score >= 70) {
    grade = "B (Good)";
    gradeClass = "text-info";
  } else if (score >= 55) {
    grade = "C+ (Average)";
    gradeClass = "text-warning";
  }
  
  const gradeText = document.getElementById('audit-grade-text');
  gradeText.innerText = `Grade: ${grade}`;
  gradeText.className = `fs-sm ${gradeClass}`;
  
  // Render checklist
  const listContainer = document.getElementById('audit-checklist-list');
  listContainer.innerHTML = '';
  
  checklist.forEach(item => {
    const div = document.createElement('div');
    div.className = 'd-flex gap-2 align-center fs-sm';
    
    let iconClass = 'bi-check-circle-fill text-success';
    if (item.status === 'error') iconClass = 'bi-x-circle-fill text-danger';
    else if (item.status === 'warning') iconClass = 'bi-exclamation-triangle-fill text-warning';
    else if (item.status === 'info') iconClass = 'bi-info-circle-fill text-info';
    
    div.innerHTML = `
      <i class="bi ${iconClass}" style="flex-shrink: 0; font-size: 1.1rem;"></i>
      <span class="text-secondary">${item.text}</span>
    `;
    listContainer.appendChild(div);
  });
  
  // Render Advice
  document.getElementById('audit-advice-text').innerText = advice;
}

