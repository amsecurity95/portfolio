/**
 * Tropical Map — Admin Sidebar Component
 * Single source of truth for the admin sidebar.
 *
 * Usage: include this script AFTER app.js, config.js, api.js.
 *   <script src="../assets/admin-sidebar.js"></script>
 *
 * The script auto-renders the sidebar + topbar + overlay into:
 *   <aside id="adminSidebarMount"></aside>
 *
 * It reads data-active="pageName" from <body> to highlight the current nav item.
 * Supported values: admin, users, places, incidents, listings, qr-scanner, account-requests
 *
 * It reads data-role="admin" from <body> to choose sidebar variant.
 *   - "admin" shows all admin links (default)
 */
(function () {
  "use strict";

  // ── Config ──
  const BRAND_IMG = "../assets/brand.png";
  const BRAND_LINK = "../index.html?public=true";

  // Nav items for admin sidebar
  const ADMIN_NAV = [
    { href: "../admin/index.html",       icon: "dashboard",        label: "Admin",         key: "admin" },
    { href: "../admin/users.html",       icon: "people",           label: "Utilisateurs",  key: "users" },
    { href: "../admin/account-requests.html", icon: "person_add",    label: "Demandes",      key: "account-requests" },
    { href: "../admin/places.html",      icon: "place",            label: "Lieux",         key: "places" },
    { href: "../admin/incidents.html",   icon: "warning",          label: "Signalements",  key: "incidents" },
    { href: "../admin/listings.html",    icon: "home_work",        label: "Immobilier",    key: "listings" },
    { href: "../admin/qr-scanner.html",  icon: "qr_code_scanner",  label: "Scanner QR",   key: "qr-scanner" },
    { href: "../admin/ads.html",          icon: "collections",      label: "Publicités",    key: "ads" },
  ];

  // Nav items for resident/business dashboard
  const DASHBOARD_NAV = [
    { href: "../dashboard/index.html",     icon: "dashboard",        label: "Tableau de bord", key: "dashboard" },
    { href: "../dashboard/my-places.html", icon: "place",            label: "Mes lieux",       key: "my-places" },
    { href: "../dashboard/new-place.html", icon: "add_location",     label: "Ajouter un lieu", key: "new-place" },
    { href: "../report-incident.html",     icon: "campaign",         label: "Signaler",       key: "report" },
  ];

  // General nav (shared by all)
  const GENERAL_NAV = [
    { href: "../map.html",            icon: "map",      label: "Voir la carte" },
    { href: "../search.html",         icon: "search",   label: "Recherche" },
    { href: "../settings.html",       icon: "settings",  label: "Paramètres" },
    { href: "../index.html?public=true", icon: "home",  label: "Page principale" },
  ];

  function getAdminLevel() {
    try {
      const session = JSON.parse(localStorage.getItem("tm_session_v1") || "{}");
      return session.adminLevel || null;
    } catch { return null; }
  }

  function buildSidebar() {
    const body = document.body;
    const activeKey = body.dataset.active || "";
    const role = body.dataset.role || "admin";
    const adminLevel = getAdminLevel();

    let navItems;
    if (role === "resident" || role === "business" || role === "dashboard") {
      navItems = DASHBOARD_NAV;
    } else {
      // Admin level 1: hide account-requests
      navItems = adminLevel >= 2 ? ADMIN_NAV : ADMIN_NAV.filter(item => item.key !== "account-requests");
    }

    // Build overlay
    let overlay = document.getElementById("adminSidebarOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "admin-sidebar-overlay";
      overlay.id = "adminSidebarOverlay";
      overlay.setAttribute("aria-hidden", "true");
      body.insertBefore(overlay, body.firstChild);
    }

    // Build sidebar
    let aside = document.querySelector("aside.admin-sidebar");
    if (!aside) {
      aside = document.createElement("aside");
      aside.className = "admin-sidebar";
      overlay.insertAdjacentElement("afterend", aside);
    }

    // Brand
    let brandHtml = `
      <div class="admin-brand">
        <a href="${BRAND_LINK}" style="display:flex; align-items:center; gap:12px; text-decoration:none; color:inherit">
          <img src="${BRAND_IMG}" alt="Tropical Map" />
          <span>Tropical Map</span>
        </a>
      </div>`;

    // Main nav
    let navHtml = '<nav class="admin-sidebar-nav"><div class="admin-nav-label">Menu</div>';
    navItems.forEach(item => {
      const isActive = item.key === activeKey ? " active" : "";
      const badgeHtml = item.key === "places" ? '<span class="admin-nav-badge" id="navPendingBadge" style="display:none">0</span>' : "";
      navHtml += `<a href="${item.href}" class="admin-nav-item${isActive}">
        <span class="material-icons">${item.icon}</span>
        <span>${item.label}</span>
        ${badgeHtml}
      </a>`;
    });

    // General section
    navHtml += '<div class="admin-nav-label" style="margin-top:20px">Général</div>';
    GENERAL_NAV.forEach(item => {
      navHtml += `<a href="${item.href}" class="admin-nav-item">
        <span class="material-icons">${item.icon}</span>
        <span>${item.label}</span>
      </a>`;
    });

    // Logout
    navHtml += `<a href="#" class="admin-nav-item" id="navLogout">
      <span class="material-icons">logout</span>
      <span>Déconnexion</span>
    </a>`;
    navHtml += '</nav>';

    aside.innerHTML = brandHtml + navHtml;

    // ── Wire up sidebar toggle (mobile) ──
    const sidebarToggle = document.getElementById("adminSidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => body.classList.toggle("admin-sidebar-open"));
    }
    overlay.addEventListener("click", () => body.classList.remove("admin-sidebar-open"));

    // ── Wire up logout ──
    const logoutBtn = document.getElementById("navLogout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Déconnexion ?")) {
          if (window.TMAPI && window.TMAPI.USE_BACKEND && window.TMAPI.Auth) window.TMAPI.Auth.logout();
          else if (window.TM) window.TM.logout();
          window.location.href = "../index.html";
        }
      });
    }
  }

  // ── Wire up topbar user info ──
  function fillTopbar(user) {
    if (!user) return;
    const nameEl = document.getElementById("adminUserName");
    const emailEl = document.getElementById("adminUserEmail");
    const adminLevel = user.adminLevel || getAdminLevel();
    const levelLabel = adminLevel >= 2 ? "Super Admin" : "Admin";
    if (nameEl) nameEl.textContent = user.email ? user.email.split("@")[0] : levelLabel;
    if (emailEl) emailEl.textContent = user.email || "—";

    const searchInput = document.getElementById("adminSearchInput");
    if (searchInput) {
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const q = searchInput.value.trim();
          window.location.href = q ? `../search.html?q=${encodeURIComponent(q)}` : "../search.html";
        }
      });
    }
  }

  // Expose
  window.TMAdminSidebar = { build: buildSidebar, fillTopbar: fillTopbar };

  // Auto-build on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildSidebar);
  } else {
    buildSidebar();
  }
})();
