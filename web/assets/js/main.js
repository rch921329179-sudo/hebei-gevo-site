(function(){
  var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var CONTACT={email:'linda@winpoultry.com',wa:'8617710038900'};

  /* header shadow */
  var hdr=$('.hdr');
  addEventListener('scroll',function(){hdr&&hdr.classList.toggle('scrolled',scrollY>10)},{passive:true});

  /* mobile nav */
  var bg=$('.burger'),nav=$('.nav');
  if(bg){bg.addEventListener('click',function(){var o=nav.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.innerHTML=o?'&#10005;':'&#9776;';document.body.style.overflow=o?'hidden':''});}
  var drop=$('.nav-drop>a');
  if(drop){drop.addEventListener('click',function(e){if(innerWidth<=920){e.preventDefault();drop.parentNode.classList.toggle('open')}});}

  /* reveal */
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    $$('.rv').forEach(function(el){io.observe(el)});
  } else $$('.rv').forEach(function(el){el.classList.add('in')});

  /* hero slider */
  var slides=$$('.hero-slide'),txts=$$('.hero-txt'),dots=$$('.hero-dots button'),cnt=$('.hero-count');
  if(slides.length>1){
    var i=0,t;
    var go=function(n){i=(n+slides.length)%slides.length;
      slides.forEach(function(s,k){s.classList.toggle('on',k===i)});
      txts.forEach(function(s,k){s.classList.toggle('on',k===i)});
      dots.forEach(function(d,k){d.setAttribute('aria-selected',k===i)});
      if(cnt)cnt.textContent='0'+(i+1)+' / 0'+slides.length;
      clearInterval(t);t=setInterval(function(){go(i+1)},7000);};
    dots.forEach(function(d,k){d.addEventListener('click',function(){go(k)})});
    $$('.hero-arr').forEach(function(b){b.addEventListener('click',function(){go(i+(b.dataset.dir==='next'?1:-1))})});
    go(0);
  }

  /* configurator */
  var CFG={
    '5000':{model:'A-type · 3 tiers',perSet:'96 birds / set',sets:'52 sets',shed:'40 m × 10 m',href:'contact.html',note:'3 tiers, 4 doors per tier. Manual or semi-automatic feeding — the usual entry point for a first commercial flock.'},
    '10000':{model:'H-type · 4 tiers',perSet:'128 birds / set',sets:'78 sets',shed:'60 m × 12 m',href:'solutions/10000-bird-layer-farm.html',note:'Automatic feeding, drinking, manure belt and egg collection. The most-ordered configuration across West and East Africa.'},
    '20000':{model:'H-type · 4 tiers',perSet:'160 birds / set',sets:'125 sets',shed:'76 m × 13 m',href:'contact.html',note:'Two parallel rows with a central egg-collection line. Add tunnel ventilation and cooling pads for hot climates.'},
    '50000':{model:'H-type · 8 tiers',perSet:'240 birds / set',sets:'208 sets',shed:'100 m × 15 m',href:'contact.html',note:'Fully automated, climate-controlled house. Requires stable three-phase power or an on-site generator.'}
  };
  var picks=$$('.cfg-pick button');
  if(picks.length){
    var apply=function(k){var d=CFG[k];if(!d)return;
      $('#cfg-model').textContent=d.model;$('#cfg-set').textContent=d.perSet;$('#cfg-sets').textContent=d.sets;$('#cfg-shed').textContent=d.shed;$('#cfg-note').textContent=d.note;
      var l=$('#cfg-link');l.href=d.href;l.firstChild.textContent=d.href.indexOf('solutions')>-1?'View this solution ':'Get this layout ';
      picks.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.cap===k)});
      $$('select[name=size]').forEach(function(s){s.value=k});};
    picks.forEach(function(b){b.addEventListener('click',function(){apply(b.dataset.cap)})});
    apply('10000');
  }

  /* catalogue filter */
  var fb=$$('.filters button');
  if(fb.length){
    var cards=$$('.cat-grid .card');
    var setCat=function(c){fb.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.cat===c)});
      cards.forEach(function(k){k.hidden=!(c==='all'||k.dataset.cat===c)});};
    fb.forEach(function(b){b.addEventListener('click',function(){setCat(b.dataset.cat);history.replaceState(null,'',b.dataset.cat==='all'?location.pathname:'?cat='+b.dataset.cat)})});
    var q=new URLSearchParams(location.search).get('cat');
    setCat(q&&fb.some(function(b){return b.dataset.cat===q})?q:'all');
  }

  /* gallery + lightbox */
  var lb=$('.lb'),lbImg=lb&&$('img',lb),set=[],cur=0;
  var openLb=function(list,k){set=list;cur=k;lbImg.src=set[cur].src;lbImg.alt=set[cur].alt||'';lb.classList.add('on');document.body.style.overflow='hidden'};
  var closeLb=function(){lb.classList.remove('on');document.body.style.overflow=''};
  var step=function(d){cur=(cur+d+set.length)%set.length;lbImg.src=set[cur].src;lbImg.alt=set[cur].alt||''};
  if(lb){
    $('.x',lb).addEventListener('click',closeLb);
    $('.pv',lb).addEventListener('click',function(){step(-1)});
    $('.nx',lb).addEventListener('click',function(){step(1)});
    lb.addEventListener('click',function(e){if(e.target===lb)closeLb()});
    addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
  }
  var main=$('.gal-main img'),ths=$$('.gal-th button');
  if(main){
    var list=ths.length?ths.map(function(b){return {src:b.dataset.src,alt:b.dataset.alt}}):[{src:main.src,alt:main.alt}];
    ths.forEach(function(b,k){b.addEventListener('click',function(){main.src=b.dataset.src;main.alt=b.dataset.alt;cur=k;ths.forEach(function(x){x.setAttribute('aria-current',x===b)})})});
    $('.gal-main').addEventListener('click',function(){var k=Math.max(0,ths.findIndex(function(b){return b.getAttribute('aria-current')==='true'}));openLb(list,k)});
  }
  var zs=$$('[data-zoom]');
  if(zs.length&&lb){var zl=zs.map(function(z){return {src:z.getAttribute('src'),alt:z.alt}});zs.forEach(function(z,k){z.addEventListener('click',function(){openLb(zl,k)})});}

  /* inquiry form — composes the inquiry and hands off to WhatsApp or email */
  $$('form.form').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      if(f.querySelector('[name=bot-field]').value)return;
      var g=function(n){var el=f.querySelector('[name='+n+']');return el?el.value.trim():''};
      var sizeEl=f.querySelector('[name=size]');var size=sizeEl?sizeEl.options[sizeEl.selectedIndex].text:'';
      var body='Hello GEVO team,\n\nName: '+g('name')+'\nCountry: '+g('country')+'\nFlock size: '+size+'\nEmail: '+g('email')+'\nWhatsApp: '+g('whatsapp')+'\n\n'+g('message');
      $('.js-wa',f).href='https://wa.me/'+CONTACT.wa+'?text='+encodeURIComponent(body);
      $('.js-mail',f).href='mailto:'+CONTACT.email+'?subject='+encodeURIComponent('Quotation request — '+size+' — '+g('country'))+'&body='+encodeURIComponent(body);
      f.classList.add('sent');
      f.scrollIntoView({behavior:'smooth',block:'center'});
    });
    var back=$('.js-back',f);if(back)back.addEventListener('click',function(){f.classList.remove('sent')});
  });

  var y=$('#yr');if(y)y.textContent=new Date().getFullYear();
})();
