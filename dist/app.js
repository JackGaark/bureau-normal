const projects = [
 {image:'stairs.png',name:'C&M',number:'03/12',alt:'Escalier courbe en bois, balustres et murs de brique'},
 {image:'facade.png',name:'Projet Sainte-Chose',number:'07/10',alt:'Maison de brique rouge dans un jardin automnal'},
 {image:'residence.png',name:'Résidence XYZ',number:'02/06',alt:'Enfilade de pièces lumineuses, parquet et murs de brique'},
 {image:'maison.png',name:'Maison Casa Home',number:'11/14',alt:'Intérieur avec escalier, colonnes claires et menuiserie en bois'},
 {image:'brick.png',name:'Projet Sainte-Chose',number:'04/10',alt:'Détail d’une façade en briques saillantes'}
];
const slides=document.querySelector('.slides');
projects.forEach((p,i)=>{const img=document.createElement('img');img.className='slide'+(i===0?' active':'');img.src='assets/'+p.image;img.alt=p.alt;img.decoding='async';if(i===0)img.fetchPriority='high';slides.append(img)});
let current=0,timer=null;
function show(i){current=(i+projects.length)%projects.length;document.querySelectorAll('.slide').forEach((el,j)=>{el.classList.toggle('active',j===current);el.setAttribute('aria-hidden',String(j!==current))});document.querySelector('#image-number').textContent=projects[current].number;document.querySelector('#project-name').textContent=projects[current].name;document.querySelector('#position').textContent=String(current+1).padStart(2,'0')+' / 05'}
function stop(){clearInterval(timer);timer=null;document.querySelector('#play').textContent='Lecture';document.querySelector('#play').setAttribute('aria-label','Lancer le diaporama')}
function step(d){stop();show(current+d)}
document.querySelector('#prev').onclick=()=>step(-1);document.querySelector('#next').onclick=()=>step(1);
document.querySelector('#play').onclick=()=>{if(timer)return stop();timer=setInterval(()=>show(current+1),5000);document.querySelector('#play').textContent='Pause';document.querySelector('#play').setAttribute('aria-label','Mettre le diaporama en pause')};
const list=document.querySelector('.project-list');[0,1,2,3].forEach((i,n)=>{const p=projects[i],a=document.createElement('a');a.className='project-row';a.href='#survol';a.innerHTML='<span>0'+(n+1)+'</span><h2>'+p.name+'</h2><span class="type">'+(i===1?'Architecture':'Espaces intérieurs')+'</span><img src="assets/'+p.image+'" alt="'+p.alt+'" loading="lazy">';a.onclick=()=>{stop();show(i)};list.append(a)});
function route(){let page=location.hash.slice(1)||'survol';if(!['survol','index','bureau'].includes(page))page='survol';document.querySelectorAll('main>section').forEach(el=>el.hidden=el.id!==page);document.querySelectorAll('nav a').forEach(a=>{if(a.hash==='#'+page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});stop();window.scrollTo(0,0);document.title=(page==='survol'?'Bureau Normal — Architecture':page.charAt(0).toUpperCase()+page.slice(1)+' — Bureau Normal')}
window.addEventListener('hashchange',route);document.querySelector('.mark').onclick=()=>location.hash=location.hash==='#bureau'?'survol':'bureau';
document.addEventListener('keydown',e=>{if(document.querySelector('#survol').hidden||e.target.closest('button,a'))return;if(e.key==='ArrowRight'){e.preventDefault();step(1)}if(e.key==='ArrowLeft'){e.preventDefault();step(-1)}});
let startX=0,startY=0;slides.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;startY=e.changedTouches[0].clientY},{passive:true});slides.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy))step(dx<0?1:-1)},{passive:true});document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});document.querySelector('#year').textContent=new Date().getFullYear();show(0);route();
