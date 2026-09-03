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
['FAQ','Questions fréquentes','faq.html',['faq','question','aide']],
['Glossaire','Vocabulaire DOFTOOLS','glossaire.html',['glossaire','terme','vocabulaire']],
['Mises à jour','Historique des versions','mises-a-jour.html',['version','mise a jour','mise à jour','changelog']],
['Liens utiles','Accès rapides','liens-utiles.html',['lien','github','ressource']]
];
const isPage=location.pathname.includes('/pages/'),prefix=isPage?'':'pages/';
function target(file){return prefix+file}
function openSearch(value=''){let overlay=document.querySelector('.search-overlay');if(!overlay){overlay=document.createElement('div');overlay.className='search-overlay';overlay.innerHTML='<div class="search-modal"><div class="search-modal-head"><span>⌕</span><input aria-label="Rechercher dans le wiki" placeholder="Rechercher une commande, une fonction…"><button aria-label="Fermer">×</button></div><div class="search-hint">Tape un mot : donjon, craft, support, profil…</div><div class="search-list"></div></div>';document.body.appendChild(overlay);overlay.addEventListener('click',e=>{if(e.target===overlay)closeSearch()});overlay.querySelector('button').onclick=closeSearch;overlay.querySelector('input').addEventListener('input',e=>renderResults(e.target.value));overlay.querySelector('input').addEventListener('keydown',e=>{if(e.key==='Escape')closeSearch();if(e.key==='Enter'){const a=overlay.querySelector('.search-result');if(a)location.href=a.href;}})}overlay.classList.add('open');const input=overlay.querySelector('input');input.value=value;renderResults(value);setTimeout(()=>input.focus(),0)}
function closeSearch(){document.querySelector('.search-overlay')?.classList.remove('open')}
function renderResults(value){const box=document.querySelector('.search-list');if(!box)return;const q=value.trim().toLowerCase();const list=entries.filter(([title,desc,,keys])=>!q||(title+' '+desc+' '+keys.join(' ')).toLowerCase().includes(q)).slice(0,8);box.innerHTML=list.length?list.map(([title,desc,file])=>`<a class="search-result" href="${target(file)}"><b>${title}</b><span>${desc}</span><i>→</i></a>`).join(''):'<div class="search-empty">Aucun résultat.</div>'}
const q=document.querySelector('[data-wiki-search]');if(q){q.addEventListener('focus',()=>openSearch(q.value));q.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();openSearch(q.value)}})}
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}if(e.key==='Escape')closeSearch()});
document.querySelectorAll('.command b').forEach(el=>{el.title='Cliquer pour copier';el.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(el.textContent.trim());const old=el.textContent;el.textContent='✓ Copié';setTimeout(()=>el.textContent=old,900)}catch{}})});
