const menu=document.querySelector('.menu'),side=document.querySelector('.sidebar');if(menu&&side)menu.addEventListener('click',()=>side.classList.toggle('open'));document.querySelectorAll('.sidebar a').forEach(a=>a.addEventListener('click',()=>side?.classList.remove('open')));
const entries=[
['Bien démarrer','Installation, setup, diagnostic','demarrage.html',['demarrage','démarrage','setup','installation','diagnostic']],
['Commandes Slash','33 commandes documentées','commandes.html',['commande','slash','ping','version','warn','timeout']],
['Profil & progression','Classe, serveur, XP et objectifs','profil.html',['profil','progression','xp','objectif','classe']],
['Quêtes & succès','Objectifs et entraide','quetes.html',['quete','quête','succes','succès']],
['Groupes & donjons','Recherche de groupe','groupes.html',['groupe','donjon','recrutement']],
['Métiers & craft','Métiers et recettes','metiers.html',['metier','métier','craft','recette']],
['Économie','Ressources et favoris','economie.html',['economie','économie','kama','ressource']],
['Almanax','Informations journalières','almanax.html',['almanax','offrande']],
['Encyclopédie','Recherche d’objets','encyclopedie.html',['encyclopedie','encyclopédie','objet','item']],
['Communauté','Événements, giveaways et annonces','communaute.html',['communaute','communauté','giveaway','evenement','événement','annonce']],
['Support & tickets','Aide privée','support.html',['support','ticket','bug','signalement']],
['Administration','Sécurité, modules et modération','administration.html',['admin','administration','moderation','modération','intelligence']],
['Statut du projet','État du wiki et couverture documentaire','statut.html',['statut','projet','couverture','stable']],
['Permissions Discord','Droits utiles et hiérarchie','permissions.html',['permission','permissions','role','rôle','hierarchie','hiérarchie']],
['FAQ','Questions fréquentes','faq.html',['faq','question','aide']],
['Glossaire','Vocabulaire DOFTOOLS','glossaire.html',['glossaire','terme','vocabulaire']],
['Mises à jour','Historique des versions','mises-a-jour.html',['version','mise a jour','mise à jour','changelog']],
['Liens utiles','Accès rapides','liens-utiles.html',['lien','github','ressource']]
];
const isPage=location.pathname.includes('/pages/'),prefix=isPage?'':'pages/';
function target(file){return prefix+file}
let activeIndex=0;
function openSearch(value=''){let overlay=document.querySelector('.search-overlay');if(!overlay){overlay=document.createElement('div');overlay.className='search-overlay';overlay.innerHTML='<div class="search-modal"><div class="search-modal-head"><span>⌕</span><input aria-label="Rechercher dans le wiki" placeholder="Rechercher une commande, une fonction…"><button aria-label="Fermer">×</button></div><div class="search-hint">↑ ↓ pour naviguer • Entrée pour ouvrir • Échap pour fermer</div><div class="search-list"></div></div>';document.body.appendChild(overlay);overlay.addEventListener('click',e=>{if(e.target===overlay)closeSearch()});overlay.querySelector('button').onclick=closeSearch;overlay.querySelector('input').addEventListener('input',e=>{activeIndex=0;renderResults(e.target.value)});overlay.querySelector('input').addEventListener('keydown',e=>{const results=[...overlay.querySelectorAll('.search-result')];if(e.key==='Escape')closeSearch();if(e.key==='ArrowDown'){e.preventDefault();activeIndex=Math.min(activeIndex+1,results.length-1);markActive(results)}if(e.key==='ArrowUp'){e.preventDefault();activeIndex=Math.max(activeIndex-1,0);markActive(results)}if(e.key==='Enter'&&results[activeIndex]){e.preventDefault();location.href=results[activeIndex].href}})}overlay.classList.add('open');const input=overlay.querySelector('input');input.value=value;activeIndex=0;renderResults(value);setTimeout(()=>input.focus(),0)}
function closeSearch(){document.querySelector('.search-overlay')?.classList.remove('open')}
function markActive(results){results.forEach((el,i)=>el.classList.toggle('active',i===activeIndex));results[activeIndex]?.scrollIntoView({block:'nearest'})}
function renderResults(value){const box=document.querySelector('.search-list');if(!box)return;const q=value.trim().toLowerCase();const list=entries.filter(([title,desc,,keys])=>!q||(title+' '+desc+' '+keys.join(' ')).toLowerCase().includes(q)).slice(0,10);box.innerHTML=list.length?list.map(([title,desc,file],i)=>`<a class="search-result${i===0?' active':''}" href="${target(file)}"><b>${title}</b><span>${desc}</span><i>→</i></a>`).join(''):'<div class="search-empty">Aucun résultat.</div>'}
const q=document.querySelector('[data-wiki-search]');if(q){q.addEventListener('focus',()=>openSearch(q.value));q.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();openSearch(q.value)}})}
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}if(e.key==='Escape')closeSearch()});
document.querySelectorAll('.command b').forEach(el=>{el.title='Cliquer pour copier';el.tabIndex=0;const copy=async()=>{try{await navigator.clipboard.writeText(el.textContent.trim());const old=el.textContent;el.textContent='✓ Copié';setTimeout(()=>el.textContent=old,900)}catch{}};el.addEventListener('click',copy);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();copy()}})});
