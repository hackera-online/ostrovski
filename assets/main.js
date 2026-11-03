(function(){var h=document.getElementById('top'),m=document.getElementById('menu'),b=document.getElementById('burger');
function s(){h.classList.toggle('scrolled',window.scrollY>40)}s();window.addEventListener('scroll',s,{passive:true});
b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){m.classList.remove('open');b.setAttribute('aria-expanded','false')})});
var els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});els.forEach(function(e,i){e.style.transitionDelay=(i%4)*60+'ms';io.observe(e)})}else{els.forEach(function(e){e.classList.add('in')})}
var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
var f=document.getElementById('contactForm');
if(f)f.addEventListener('submit',function(e){
 e.preventDefault();
 var ok=document.getElementById('formOk'),er=document.getElementById('formErr'),btn=f.querySelector('button[type=submit]');
 ok.style.display='none';er.style.display='none';
 var hp=f.querySelector('[name=_honey]');if(hp&&hp.value)return;
 var d={};new FormData(f).forEach(function(v,k){if(k!=='_honey')d[k]=v});
 d._subject='Ново запитване от сайта – '+(d.service||'');d._template='table';d._captcha='false';
 btn.disabled=true;
 fetch('https://formsubmit.co/ajax/ostrovski_n@abv.bg',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(d)})
 .then(function(r){return r.json()})
 .then(function(j){if(j.success===true||j.success==='true'){ok.style.display='block';f.reset()}else{throw new Error('fail')}})
 .catch(function(){
  var body='Име: '+(d.name||'')+' '+(d.surname||'')+'\nИмейл: '+(d.email||'')+'\nТелефон: '+(d.phone||'')+'\nОбласт: '+(d.service||'')+'\n\n'+(d.message||'');
  var a=er.querySelector('a');if(a)a.href='mailto:ostrovski_n@abv.bg?subject='+encodeURIComponent(d._subject)+'&body='+encodeURIComponent(body);
  er.style.display='block';
 })
 .then(function(){btn.disabled=false});
});
})();