
// script.js — interactions, rendering, and navigation behaviors.

document.addEventListener("DOMContentLoaded", () => {
  const D = window.SITE_DATA;

  // Navbar actions
  const connectBtn = document.getElementById("connectBtn");
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (connectBtn) connectBtn.onclick = () => window.open(D.profile.linkedin, "_blank");
  if (menuBtn) {
    menuBtn.onclick = () => {
      // show with white background for clarity on mobile
      mobileMenu.classList.toggle("hidden");
    };
  }

  // Hero populate
  const heroName = document.getElementById("heroName");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const cvBtn = document.getElementById("cvBtn");
  const emailBtn = document.getElementById("emailBtn");
  const linkBtn = document.getElementById("linkBtn");
  if (heroName) heroName.textContent = D.profile.name;
  if (heroSubtitle) heroSubtitle.textContent = D.profile.subtitle;
  if (cvBtn) cvBtn.href = D.profile.cv_download;
  if (emailBtn) emailBtn.href = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(D.profile.email)}`;
  if (linkBtn) linkBtn.onclick = () => document.getElementById("links").scrollIntoView({behavior:"smooth"});

  // Ticker
  const tickerTrack = document.getElementById("tickerTrack");
  if (tickerTrack) {
    tickerTrack.innerHTML = D.profile.heroBadges.concat(D.profile.heroBadges).map(txt => 
      `<span class="inline-block mx-4 text-sm text-slate-600">${txt}</span>`
    ).join("");
  }

  // Down arrow scroll
  const downBtn = document.getElementById("downBtn");
  if (downBtn) downBtn.onclick = () => document.querySelector("#about").scrollIntoView({behavior:"smooth"});

  // Slideshow (featured projects)
  const slides = document.getElementById("slides");
  const prev = document.getElementById("prevSlide");
  const next = document.getElementById("nextSlide");
  let idx = 0;
  if (slides) {
    const items = D.projects.map(p => 
      `<a href="${p.link || '#'}" class="min-w-full block h-64 md:h-96 relative"><img class="w-full h-full object-cover" src="${p.image}" alt="${p.title}"/>
        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
          <div class="font-semibold">${p.title}</div><div class="text-xs opacity-80">${p.desc}</div>
        </div></a>`
    );
    slides.innerHTML = items.join("");
    const update = () => slides.style.transform = `translateX(-${idx*100}%)`;
    if (prev) prev.onclick = () => { idx = (idx - 1 + items.length) % items.length; update(); };
    if (next) next.onclick = () => { idx = (idx + 1) % items.length; update(); };
    setInterval(() => { if (document.visibilityState==='visible') { idx=(idx+1)%items.length; update(); } }, 5000);
  }

  // About
  const aboutPhoto = document.getElementById("aboutPhoto");
  const aboutBio = document.getElementById("aboutBio");
  const msgBtn = document.getElementById("msgBtn");
  const aboutMailBtn = document.getElementById("aboutMailBtn");
  if (aboutPhoto) aboutPhoto.src = D.about.photo;
  if (aboutBio) aboutBio.textContent = D.about.bio;
  if (msgBtn) msgBtn.onclick = () => window.open(D.profile.linkedin, "_blank");
  if (aboutMailBtn) aboutMailBtn.href = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(D.profile.email)}`;

  // Education
  const eduList = document.getElementById("eduList");
  if (eduList) {
    eduList.innerHTML = D.education.map(e => `
      <a href="${e.link}" target="_blank" class="block rounded-2xl border border-slate-200 p-5 card-hover bg-white">
        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="font-semibold">${e.institution}</div>
            <div class="text-sm text-slate-600">${e.degree}</div>
            <div class="text-xs text-slate-500 mt-1">CGPA: ${e.cgpa}</div>
            <div class="text-xs text-slate-500 mt-1">${e.dates}</div>
            <div class="text-xs text-slate-500">${e.location}</div>
          </div>
          <i data-lucide="arrow-up-right"></i>
        </div>
        ${e.details.length ? `<ul class="mt-3 text-sm list-disc ml-5 text-slate-600">${e.details.map(d=>`<li>${d}</li>`).join("")}</ul>` : ""}
      </a>
    `).join("");
  }

  // Skills
  const hardSkills = document.getElementById("hardSkills");
  const softSkills = document.getElementById("softSkills");
  const chip = (s) => `<span class="px-3 py-1 rounded-full border border-slate-300 bg-white hover:bg-white/70 hover-smart text-sm">${s}</span>`;
  if (hardSkills) hardSkills.innerHTML = D.skills.hard.map(chip).join("");
  if (softSkills) softSkills.innerHTML = D.skills.soft.map(chip).join("");

  // Projects on home
  const projectGrid = document.getElementById("projectGrid");
  if (projectGrid) {
    projectGrid.innerHTML = D.projects.map(p => `
      <div class="rounded-2xl overflow-hidden border border-slate-200 bg-white card-hover">
        <img src="${p.image}" alt="${p.title}" class="w-full h-40 object-cover">
        <div class="p-4">
          <div class="font-semibold">${p.title}</div>
          <div class="text-sm text-slate-600 mt-1">${p.desc}</div>
          <div class="mt-3 flex gap-3">
            ${p.github ? `<a class="text-sm underline hover:opacity-70 hover-smart" href="${p.github}" target="_blank">GitHub</a>` : ""}
            ${p.link ? `<a class="text-sm underline hover:opacity-70 hover-smart" href="${p.link}" target="_blank">Details</a>` : ""}
          </div>
        </div>
      </div>
    `).join("");
  }

  // Experience list home
  const expList = document.getElementById("expList");
  if (expList) {
    expList.innerHTML = D.experience.map(x => `
      <div class="rounded-2xl border border-slate-200 p-5 bg-white card-hover">
        <div class="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div class="font-semibold">${x.role}</div>
            <div class="text-sm text-slate-600">${x.org}</div>
          </div>
          <div class="text-xs text-slate-500">${x.dates} · ${x.location}</div>
        </div>
        <div class="mt-2 text-sm"><span class="font-medium">Project:</span> ${x.project}</div>
        ${x.supervisors?.length ? `<div class="mt-1 text-xs text-slate-600">Supervisors: ${x.supervisors.join("; ")}</div>` : ""}
        ${x.skills?.length ? `<div class="mt-2 text-xs text-slate-600">Skills: ${x.skills.join(", ")}</div>` : ""}
      </div>
    `).join("");
  }

  // Publications recent
  const pubRecent = document.getElementById("pubRecent");
  if (pubRecent) {
    const items = (D.publications.conferences.slice(0,3).concat(D.publications.journals.slice(0,2))).map(p => `
      <a class="block rounded-2xl border border-slate-200 p-4 bg-white card-hover" target="_blank" href="${p.link||'#'}">
        <div class="font-medium">${p.title}</div>
        <div class="text-xs text-slate-600 mt-1">${p.venue||""}</div>
      </a>
    `);
    pubRecent.innerHTML = items.join("");
  }

  // Achievements preview
  const achvPreview = document.getElementById("achvPreview");
  if (achvPreview) {
    achvPreview.innerHTML = `
      <div class="rounded-2xl border border-slate-200 p-5 bg-white">
        <div class="font-semibold mb-2">Awards & Grants</div>
        ${(D.achievements.awards||[]).slice(0,3).map(a=>`<div class="text-sm">${a.title} — <span class="text-slate-600">${a.org}</span></div>`).join("")}
      </div>
      <div class="rounded-2xl border border-slate-200 p-5 bg-white">
        <div class="font-semibold mb-2">Volunteering</div>
        ${(D.achievements.volunteering||[]).slice(0,3).map(v=>`<div class="text-sm">${v.role} — <span class="text-slate-600">${v.org}</span></div>`).join("")}
      </div>`;
  }

  // Footer links
  const footerLinks = document.getElementById("footerLinks");
  if (footerLinks) {
    footerLinks.innerHTML = D.profile.linksFooter.map(l => `<a class="px-3 py-1 rounded-full border border-slate-300 bg-white hover:bg-white/70 hover-smart text-sm" target="_blank" href="${l.href}">${l.label}</a>`).join("");
    const y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
  }

  // Other pages population
  const projectsAll = document.getElementById("projectsAll");
  if (projectsAll) {
    projectsAll.innerHTML = D.projects.map(p => `
      <div class="rounded-2xl overflow-hidden border border-slate-200 bg-white card-hover">
        <img src="${p.image}" alt="${p.title}" class="w-full h-40 object-cover">
        <div class="p-4">
          <div class="font-semibold">${p.title}</div>
          <div class="text-sm text-slate-600 mt-1">${p.desc}</div>
          <div class="mt-3 flex gap-3">
            ${p.github ? `<a class="text-sm underline hover:opacity-70 hover-smart" href="${p.github}" target="_blank">GitHub</a>` : ""}
            ${p.link ? `<a class="text-sm underline hover:opacity-70 hover-smart" href="${p.link}" target="_blank">Details</a>` : ""}
          </div>
        </div>
      </div>
    `).join("");
  }

  const expAll = document.getElementById("expAll");
  if (expAll) {
    expAll.innerHTML = D.experience.map(x => `
      <div class="rounded-2xl border border-slate-200 p-5 bg-white card-hover">
        <div class="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div class="font-semibold">${x.role}</div>
            <div class="text-sm text-slate-600">${x.org}</div>
          </div>
          <div class="text-xs text-slate-500">${x.dates} · ${x.location}</div>
        </div>
        <div class="mt-2 text-sm"><span class="font-medium">Project:</span> ${x.project}</div>
        ${x.supervisors?.length ? `<div class="mt-1 text-xs text-slate-600">Supervisors: ${x.supervisors.join("; ")}</div>` : ""}
        ${x.skills?.length ? `<div class="mt-2 text-xs text-slate-600">Skills: ${x.skills.join(", ")}</div>` : ""}
      </div>
    `).join("");
  }

  const pubConfs = document.getElementById("pubConfs");
  const pubJournals = document.getElementById("pubJournals");
  if (pubConfs) {
    pubConfs.innerHTML = D.publications.conferences.map(p => `
      <a class="block rounded-2xl border border-slate-200 p-4 bg-white card-hover" target="_blank" href="${p.link||'#'}">
        <div class="font-medium">${p.title}</div>
        <div class="text-xs text-slate-600 mt-1">${p.venue||""}</div>
      </a>
    `).join("");
  }
  if (pubJournals) {
    pubJournals.innerHTML = D.publications.journals.length ? D.publications.journals.map(p => `
      <a class="block rounded-2xl border border-slate-200 p-4 bg-white card-hover" target="_blank" href="${p.link||'#'}">
        <div class="font-medium">${p.title}</div>
        <div class="text-xs text-slate-600 mt-1">${p.venue||""}</div>
      </a>
    `).join("") : `<div class="text-sm text-slate-500">No journal articles added yet.</div>`;
  }

  const awardsAll = document.getElementById("awardsAll");
  const licensesAll = document.getElementById("licensesAll");
  const workshopsAll = document.getElementById("workshopsAll");
  const volAll = document.getElementById("volAll");
  if (awardsAll) awardsAll.innerHTML = (D.achievements.awards||[]).map(a=>`
    <div class="rounded-xl border border-slate-200 p-4 bg-white card-hover">
      <div class="font-medium">${a.title}</div>
      <div class="text-xs text-slate-600">${a.org}</div>
      <div class="text-xs text-slate-500">${a.date} · ${a.location||""}</div>
    </div>`).join("");
  if (licensesAll) licensesAll.innerHTML = (D.achievements.licenses||[]).map(a=>`
    <a class="rounded-xl border border-slate-200 p-4 bg-white card-hover block" target="_blank" href="${a.link||'#'}">
      <div class="font-medium">${a.title}</div>
      <div class="text-xs text-slate-600">${a.org}</div>
      <div class="text-xs text-slate-500">${a.date||""}</div>
    </a>`).join("");
  if (workshopsAll) workshopsAll.innerHTML = (D.achievements.workshops||[]).map(a=>`
    <div class="rounded-xl border border-slate-200 p-4 bg-white card-hover">
      <div class="font-medium">${a.title}</div>
      <div class="text-xs text-slate-600">${a.org}</div>
      <div class="text-xs text-slate-500">${a.date||""} · ${a.location||""}</div>
    </div>`).join("");
  if (volAll) volAll.innerHTML = (D.achievements.volunteering||[]).map(a=>`
    <div class="rounded-xl border border-slate-200 p-4 bg-white card-hover">
      <div class="font-medium">${a.role}</div>
      <div class="text-xs text-slate-600">${a.org}</div>
      <div class="text-xs text-slate-500">${a.dates||""} · ${a.location||""}</div>
    </div>`).join("");

  // Render icons
  if (window.lucide) lucide.createIcons();
});
