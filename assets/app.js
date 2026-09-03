const commands=[
['/ping','Tous','Vérifie que DOFTOOLS fonctionne.'],['/version','Tous','Affiche la version de DOFTOOLS.'],['/maj','Direction','Met à jour la structure DOFTOOLS du serveur.'],['/panels','Direction','Répare et republie les panels permanents manquants.'],['/setup-doftools','Direction','Installe ou synchronise DOFTOOLS sur le serveur.'],['/xp','Tous','Affiche ton XP ou celui d’un membre.'],['/classement-xp','Tous','Affiche le classement XP.'],['/reglement','Direction','Synchronise le règlement permanent.'],['/ticket-panel','Direction','Synchronise le centre de support permanent.'],['/roles-panel','Direction','Synchronise le panneau Profil/Rôles.'],['/profil','Tous','Affiche ton profil ou celui d’un membre.'],['/profil-config','Tous','Configure ton profil DOFTOOLS.'],['/objectifs','Tous','Affiche et gère tes objectifs personnels.'],['/metiers','Tous','Configure et affiche tes métiers Dofus.'],['/diagnostic','Direction','Vérifie permissions, modules et installation.'],['/intelligence','Direction','Ouvre le DOFTOOLS Intelligence Center.'],['/doftools-config','Direction','Active, désactive ou consulte les modules.'],['/annonce','Direction','Ouvre l’éditeur d’annonce multiligne.'],['/warn','Staff','Ajoute un avertissement à un membre.'],['/warnings','Staff','Affiche les avertissements d’un membre.'],['/timeout','Staff','Met temporairement un membre en sourdine.'],['/kick','Staff','Expulse un membre du serveur.'],['/purge','Staff','Supprime de 1 à 100 messages récents.'],['/giveaway','Staff','Lance un giveaway DOFTOOLS.'],['/groupe','Tous','Crée une recherche de groupe interactive.'],['/donjon','Tous','Recherche un donjon et ouvre les outils associés.'],['/craft','Tous','Recherche une recette et ouvre les outils Craft.'],['/encyclopedie','Tous','Recherche un objet dans l’encyclopédie Dofus 3.'],['/conseil','Tous','Propose la prochaine action utile selon ta progression.'],['/build','Tous','Prépare une demande de build avec ton profil.'],['/evenement','Direction','Crée un événement communautaire interactif.'],['/vocal','Tous','Configure ton salon vocal temporaire.'],['/clear','Staff','Efface les messages du salon après confirmation.']
];
const grid=document.querySelector('#commandsGrid'),count=document.querySelector('#commandCount'),empty=document.querySelector('#empty');
let filter='Tous';
function renderCommands(query=''){
 const q=query.toLowerCase().trim();
 const list=commands.filter(([name,role,desc])=>(filter==='Tous'||role===filter)&&(!q||`${name} ${role} ${desc}`.toLowerCase().includes(q)));
 grid.innerHTML=list.map(([name,role,desc])=>`<article class="cmd"><div class="cmd-head"><code>${name}</code><span class="pill ${role.toLowerCase()}">${role}</span></div><p>${desc}</p></article>`).join('');
 count.textContent=`${list.length} commande${list.length>1?'s':''}`;empty.hidden=list.length!==0;
}
renderCommands();
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');filter=btn.dataset.filter;renderCommands();}));

const input=document.querySelector('#search'),overlay=document.querySelector('#searchOverlay'),results=document.querySelector('#searchResults'),closeSearch=document.querySelector('#closeSearch');
const pages=[...document.querySelectorAll('.feature-card')].map(el=>({title:el.querySelector('h3').textContent,desc:el.querySelector('p').textContent,href:el.getAttribute('href'),search:el.dataset.search||''}));
function openSearch(q){
 q=q.trim().toLowerCase();if(!q){overlay.hidden=true;return}
 const commandHits=commands.filter(x=>x.join(' ').toLowerCase().includes(q)).slice(0,8).map(x=>({title:x[0],desc:x[2],href:'#commandes'}));
 const pageHits=pages.filter(x=>`${x.title} ${x.desc} ${x.search}`.toLowerCase().includes(q)).slice(0,6);
 const hits=[...pageHits,...commandHits];
 results.innerHTML=hits.length?hits.map(x=>`<a class="result-item" href="${x.href}"><b>${x.title}</b><span>${x.desc}</span></a>`).join(''):'<p class="empty">Aucun résultat.</p>';
 overlay.hidden=false;
}
input.addEventListener('input',e=>openSearch(e.target.value));
closeSearch.addEventListener('click',()=>overlay.hidden=true);
overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.hidden=true});
results.addEventListener('click',()=>{overlay.hidden=true;input.value=''});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();input.focus()}if(e.key==='Escape')overlay.hidden=true});

const sidebar=document.querySelector('#sidebar'),menuButton=document.querySelector('#menuButton');
menuButton.addEventListener('click',()=>sidebar.classList.toggle('open'));
document.querySelectorAll('.sidebar a').forEach(a=>a.addEventListener('click',()=>{document.querySelectorAll('.sidebar nav a').forEach(n=>n.classList.remove('active'));if(a.closest('nav'))a.classList.add('active');sidebar.classList.remove('open')}));

const sections=[...document.querySelectorAll('main [id]')];
const navLinks=[...document.querySelectorAll('.sidebar nav a')];
const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!visible)return;navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${visible.target.id}`));},{rootMargin:'-15% 0px -70% 0px',threshold:[0,.2,.5]});
sections.forEach(s=>observer.observe(s));
