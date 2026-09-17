const canvas=document.getElementById("stars"),ctx=canvas.getContext("2d");
let W,H,particles=[];
function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight;makeStars()}
function makeStars(){particles=Array.from({length:180},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.8+.2,a:Math.random(),s:Math.random()*.012+.003}))}
function draw(){
 ctx.clearRect(0,0,W,H);
 const g=ctx.createRadialGradient(W/2,H*.5,0,W/2,H*.5,Math.max(W,H)*.55);
 g.addColorStop(0,"rgba(218,190,0,.22)");g.addColorStop(.35,"rgba(80,70,0,.10)");g.addColorStop(1,"rgba(0,0,0,0)");
 ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 particles.forEach(p=>{p.a+=p.s;if(p.a>1||p.a<.1)p.s*=-1;ctx.beginPath();ctx.fillStyle=`rgba(255,235,72,${p.a})`;ctx.shadowBlur=9;ctx.shadowColor="#ffe600";ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()});
 requestAnimationFrame(draw)
}
resize();addEventListener("resize",resize);draw();

const heart=document.getElementById("heart");
for(let i=0;i<170;i++){
 const t=Math.random()*Math.PI*2;
 const x=16*Math.pow(Math.sin(t),3);
 const y=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);
 const s=document.createElement("i");s.className="spark";
 s.style.left=(85+x*4.6+(Math.random()-.5)*7)+"px";
 s.style.top=(72-y*4.2+(Math.random()-.5)*7)+"px";
 s.style.animationDelay=(Math.random()*1.5)+"s";heart.appendChild(s)
}
function rain(n=35){
 for(let i=0;i<n;i++){const e=document.createElement("span");e.className="falling";e.textContent=Math.random()>.5?"🌻":"✨";e.style.left=Math.random()*100+"vw";e.style.fontSize=(9+Math.random()*18)+"px";e.style.animationDuration=(4+Math.random()*5)+"s";e.style.animationDelay=Math.random()+"s";e.style.setProperty("--drift",(-90+Math.random()*180)+"px");document.body.appendChild(e);setTimeout(()=>e.remove(),10000)}
}
const modal=document.getElementById("modal");
document.getElementById("surprise").onclick=()=>{modal.classList.add("show");rain(55)};
document.getElementById("close").onclick=()=>modal.classList.remove("show");
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};
setInterval(()=>rain(4),5000);rain(15);