/* Tek sahne gezinmesi: klavye, düğme, tekerlek; ortak hareket süresi. */
(() => {
  observer.disconnect();
  // Seçili metne, sayfanın yapısını bozmadan yerel biçimlendirme uygula.
  const selectionStyle=document.createElement('style');
  selectionStyle.textContent=`::selection{background:#e8bd6240;color:inherit}
    .text-tools{position:fixed;z-index:100;display:flex;gap:6px;padding:7px;border:1px solid #e8bd6280;border-radius:12px;background:#17251f;box-shadow:0 8px 28px #0006}
    .text-tools[hidden]{display:none}.text-tools button{padding:7px 11px;border-radius:7px;color:#f0ead6;font-size:13px}
    .text-tools button:hover{background:#e8bd6228}.user-highlight{background:#e8bd624d;color:inherit;border-radius:3px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
    .user-bold{font-weight:800!important}`;
  document.head.append(selectionStyle);
  const textTools=document.createElement('div');
  textTools.className='text-tools';textTools.hidden=true;textTools.setAttribute('role','toolbar');textTools.setAttribute('aria-label','Seçili metni biçimlendir');
  textTools.innerHTML='<button type="button" data-format="bold"><b>Kalın</b></button><button type="button" data-format="highlight">Vurgula</button><button type="button" data-format="clear">Biçimi temizle</button>';
  textTools.style.maxWidth='calc(100vw - 16px)';textTools.style.flexWrap='wrap';
  const formatHistory=[];
  const undoFormat=document.createElement('button');
  undoFormat.type='button';undoFormat.textContent='Geri al';undoFormat.title='Son metin biçimlendirmesini geri al · Ctrl+Z';undoFormat.disabled=true;
  document.querySelector('.top-actions').append(undoFormat);
  function undoTextFormat(){
    const action=formatHistory.pop();if(!action)return;
    for(const saved of action)saved.node.parentNode?.replaceChild(saved.before,saved.node);
    undoFormat.disabled=!formatHistory.length;textTools.hidden=true;selectedRange=null;window.getSelection().removeAllRanges();
  }
  undoFormat.onclick=undoTextFormat;
  document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'&&!e.shiftKey&&!e.target.closest('input,textarea,[contenteditable="true"]')&&formatHistory.length){e.preventDefault();undoTextFormat()}});
  document.body.append(textTools);
  let selectedRange=null;
  function showTextTools(){
    const selection=window.getSelection();
    if(!selection.rangeCount||selection.isCollapsed||!selection.toString().trim()){textTools.hidden=true;return}
    const range=selection.getRangeAt(0),scene=range.startContainer.parentElement?.closest('.scene');
    if(!scene||!scene.contains(range.endContainer)){textTools.hidden=true;return}
    selectedRange=range.cloneRange();textTools.hidden=false;
    const rect=range.getBoundingClientRect();
    textTools.style.left=Math.max(8,Math.min(innerWidth-textTools.offsetWidth-8,rect.left+rect.width/2-textTools.offsetWidth/2))+'px';
    textTools.style.top=Math.max(8,Math.min(innerHeight-textTools.offsetHeight-8,rect.top-textTools.offsetHeight-10))+'px';
  }
  document.addEventListener('pointerup',e=>{if(!textTools.contains(e.target))showTextTools()});
  document.addEventListener('keyup',e=>{if(e.key==='Escape'){textTools.hidden=true;return}if(e.shiftKey)showTextTools()});
  textTools.addEventListener('pointerdown',e=>e.preventDefault());
  textTools.addEventListener('click',e=>{
    const button=e.target.closest('[data-format]');if(!button||!selectedRange)return;
    const range=selectedRange,root=range.commonAncestorContainer;
    const walker=document.createTreeWalker(root.nodeType===Node.TEXT_NODE?root.parentNode:root,NodeFilter.SHOW_TEXT);
    const segments=[];let node;
    while(node=walker.nextNode()){
      if(!range.intersectsNode(node)||!node.textContent.trim()||node.parentElement.closest('button,script,style'))continue;
      const start=node===range.startContainer?range.startOffset:0,end=node===range.endContainer?range.endOffset:node.length;
      if(end>start)segments.push({node,start,end});
    }
    const action=[];
    // Save text leaves or their outermost user-format wrapper, preserving controls/listeners.
    const roots=new Set();
    for(const segment of segments){let root=segment.node;for(let p=root.parentElement;p&&p.closest('.scene');p=p.parentElement){if(p.matches('.user-bold,.user-highlight'))root=p}roots.add(root)}
    for(const root of roots){const holder=document.createElement('span');root.replaceWith(holder);holder.append(root);action.push({node:holder,before:root.cloneNode(true)})}
    for(const segment of segments.reverse()){
      if(button.dataset.format==='clear'){
        // Split formatting ancestors at selection boundaries; untouched text keeps its style.
        let leaf=segment.node;
        if(segment.end<leaf.length)leaf.splitText(segment.end);
        if(segment.start>0)leaf=leaf.splitText(segment.start);
        let target=leaf.parentElement.closest('.user-bold,.user-highlight');
        while(target){
          const before=document.createRange();before.selectNodeContents(target);before.setEndBefore(leaf);
          const left=before.extractContents();
          const after=document.createRange();after.selectNodeContents(target);after.setStartAfter(leaf);
          const right=after.extractContents();
          const l=target.cloneNode(false),r=target.cloneNode(false);l.append(left);r.append(right);
          target.replaceWith(l,leaf,r);
          if(!l.textContent)l.remove();if(!r.textContent)r.remove();
          target=leaf.parentElement.closest('.user-bold,.user-highlight');
        }
        continue;
      }
      const part=document.createRange();part.setStart(segment.node,segment.start);part.setEnd(segment.node,segment.end);
      const wrapper=document.createElement(button.dataset.format==='bold'?'strong':'mark');
      wrapper.className=button.dataset.format==='bold'?'user-bold':'user-highlight';part.surroundContents(wrapper);
    }
    if(action.length){formatHistory.push(action);undoFormat.disabled=false}
    window.getSelection().removeAllRanges();selectedRange=null;textTools.hidden=true;
  });
  document.addEventListener('pointerdown',e=>{if(!textTools.contains(e.target))textTools.hidden=true});
  document.addEventListener('scroll',()=>textTools.hidden=true,true);
  const style = document.createElement('style');
  style.textContent = `html,body{height:100%;overflow:hidden!important;scroll-behavior:auto!important}
  #deck{position:fixed;inset:132px 0 48px;overflow:hidden}
  #deck .scene{position:absolute;inset:0;height:100%;min-height:0;padding:24px 7vw;overflow-y:auto;visibility:hidden;pointer-events:none;opacity:0}
  #deck .scene.present{visibility:visible;pointer-events:auto;opacity:1}
  .chapters{padding-right:125px;scrollbar-width:none;overflow-y:hidden}
  .page-arrows{position:fixed;right:12px;top:83px;z-index:25;display:flex;gap:6px;background:var(--bg)}
  .page-arrows button{width:44px;height:36px;border-radius:20px;font-size:21px}
  .page-arrows button:disabled{opacity:.3;cursor:default}
  @media(max-width:800px){#deck{top:120px}.page-arrows{top:70px}#deck .scene{padding:22px}.scene-inner{margin:auto}}
  /* Kimlik bandı: simetrik altın çizgiler, ortada logo ve kanal adı. */
  :root{--identity-height:128px;--navigation-top:138px;--scene-top:196px}
  .topbar{height:var(--identity-height);padding:0 26px;justify-content:center;isolation:isolate;
    background:radial-gradient(ellipse at 50% 0%,#c6a66416,transparent 65%),var(--bg);
    border-bottom:1px solid var(--line);box-shadow:0 8px 24px #0003}
  .brand{flex-direction:column;gap:9px;text-align:center;z-index:1;width:235px;font-size:10px;letter-spacing:.22em}
  .brand img{width:46px;height:46px;margin:0;object-fit:contain}
  .brand span{max-width:220px;line-height:1.65}
  .topbar::before,.topbar::after{content:'';position:absolute;top:38px;height:49px;
    width:calc(50% - 145px);pointer-events:none;opacity:.65;
    background:linear-gradient(var(--gold),var(--gold)) center/100% 1px no-repeat,
    linear-gradient(45deg,transparent 48%,var(--gold) 49%,var(--gold) 51%,transparent 52%) right center/48px 48px no-repeat,
    linear-gradient(-45deg,transparent 48%,var(--gold) 49%,var(--gold) 51%,transparent 52%) right center/48px 48px no-repeat,
    linear-gradient(var(--gold),var(--gold)) center 12px/calc(100% - 55px) 1px no-repeat,
    linear-gradient(var(--gold),var(--gold)) center 36px/calc(100% - 55px) 1px no-repeat;
    mask-image:linear-gradient(to right,transparent,#000 30%)}
  .topbar::before{left:18px}.topbar::after{right:18px;transform:scaleX(-1)}
  .top-actions{position:absolute;right:22px;bottom:9px;gap:6px;z-index:2}
  .top-actions button{background:var(--bg);font-size:10px;padding:5px 9px}
  .chapters{top:var(--navigation-top);height:58px;background:var(--surface);border-top:1px solid var(--line)}
  #deck{top:var(--scene-top)}
  .page-arrows{top:calc(var(--navigation-top) + 11px);background:var(--surface)}
  @media(max-width:800px){
    :root{--identity-height:147px;--navigation-top:157px;--scene-top:215px}
    .brand{align-self:flex-start;margin-top:15px;width:200px;font-size:9px}
    .brand img{width:40px;height:40px}
    .top-actions{left:0;right:0;bottom:12px;justify-content:center}
    .topbar::before,.topbar::after{width:calc(50% - 106px);top:32px;height:40px}
    .topbar::before{left:8px}.topbar::after{right:8px}
    #deck{top:var(--scene-top)}.page-arrows{top:calc(var(--navigation-top) + 11px)}
  }
  `;
  document.head.append(style);
  // Kanalın özgün, yalnız altın path içeren şeffaf SVG logosu.
  document.querySelector('.brand img').src='assets/logo.svg';
  const ornamentStyle=document.createElement('style');
  ornamentStyle.textContent=`.topbar::before,.topbar::after{display:none}
    .identity-curve{position:absolute;top:23px;width:calc(50% - 143px);height:70px;color:#E8BD62;pointer-events:none;opacity:.68}
    .identity-curve.left{left:18px}.identity-curve.right{right:18px;transform:scaleX(-1)}
    @media(max-width:800px){.identity-curve{top:23px;width:calc(50% - 108px);height:58px}.identity-curve.left{left:7px}.identity-curve.right{right:7px}}`;
  document.head.append(ornamentStyle);
  const paletteLayout=document.createElement('style');
  paletteLayout.textContent=`
    :root{--line:color-mix(in srgb,var(--gold) 25%,transparent)}
    .flip-card,.flow-step{background:var(--surface);border-color:var(--line)}
    .flip-card:hover{background:var(--surface-2)}
    .flip-card[aria-pressed=true],.flow-step.active,.ring.active,.answer{background:color-mix(in srgb,var(--gold) 12%,var(--surface))}
    .source,.chapter{color:var(--muted)}
    .note-drawer,.text-tools{background:var(--surface);color:var(--ink)}
    .scope-core{background:var(--gold);color:var(--bg)}
    .footer{height:76px;padding:0 5vw;background:var(--surface);border-top:1px solid var(--line);color:var(--muted);align-items:center;justify-content:center}
    .footer>span{position:absolute;left:50%;transform:translateX(-50%);white-space:nowrap;text-align:center}
    .footer #sceneCount{position:absolute;right:5vw;top:10px;width:82px;text-align:center;line-height:15px}
    .page-arrows{top:auto!important;bottom:9px;right:5vw;gap:6px;background:transparent}
    .page-arrows button{width:38px;height:32px;padding:0;border-radius:16px;font-size:20px;line-height:1;display:grid;place-items:center;background:var(--bg)}
    .page-arrows button:hover:not(:disabled){border-color:var(--gold);color:var(--gold)}
    .chapters{padding-right:5vw}
    #deck{bottom:76px}
    .theme-picker{bottom:90px}
    @media(max-width:800px){.footer{padding:0 12px}.footer>span{font-size:8px;letter-spacing:.04em}.footer #sceneCount,.page-arrows{right:12px}.chapters{padding-right:12px}.theme-picker{bottom:90px}}
  `;
  document.head.append(paletteLayout);
  const ornament=`<svg viewBox="0 0 500 90" preserveAspectRatio="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M0 45 C80 45 95 12 170 20 S270 80 350 55 S437 5 480 45 C450 83 414 65 422 42 C430 19 467 28 480 45"/><path opacity=".5" d="M0 53 C90 53 105 26 170 30 S281 70 350 45 S433 20 480 45"/><path opacity=".35" d="M60 64 C130 82 203 12 284 28 S396 84 460 60"/><ellipse cx="315" cy="46" rx="44" ry="20" transform="rotate(-14 315 46)" opacity=".45"/></g><circle cx="480" cy="45" r="3" fill="currentColor"/></svg>`;
  for(const side of ['left','right']){const node=document.createElement('div');node.className='identity-curve '+side;node.setAttribute('aria-hidden','true');node.innerHTML=ornament;node.firstChild.style.cssText='width:100%;height:100%';document.querySelector('.topbar').append(node)}
  const arrows=document.createElement('div');
  arrows.className='page-arrows';
  arrows.innerHTML='<button aria-label="Önceki sayfa (sol ok)" title="Önceki · ←">←</button><button aria-label="Sonraki sayfa (sağ ok)" title="Sonraki · →">→</button>';
  document.body.append(arrows);
  const [prev,next]=arrows.children;
  let index=0,busy=false,lastWheel=0;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  function update(){
    chapters.forEach((b,i)=>{b.classList.toggle('active',i===index);if(i===index)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
    count.textContent=String(index+1).padStart(2,'0')+' / '+String(scenes.length).padStart(2,'0');
    prev.disabled=index===0;next.disabled=index===scenes.length-1;
  }
  scenes.forEach((s,i)=>{s.classList.toggle('present',i===0);s.inert=i!==0});
  progress.style.transition='none';progress.style.width=100/scenes.length+'%';
  function move(to){
    if(busy||to===index||to<0||to>=scenes.length)return;
    const old=scenes[index],fresh=scenes[to],direction=Math.sign(to-index);
    const duration=motionOn&&!reduced.matches?650:0;
    const easing='cubic-bezier(.22,.7,.2,1)';
    busy=true;old.inert=true;fresh.inert=false;fresh.scrollTop=0;
    fresh.classList.add('present');index=to;update();
    progress.style.transition=`width ${duration}ms ${easing}`;
    progress.style.width=(index+1)/scenes.length*100+'%';
    const outgoing=old.animate([{transform:'translateY(0)',opacity:1},{transform:`translateY(${-direction*100}%)`,opacity:0}],{duration,easing,fill:'forwards'});
    const incoming=fresh.animate([{transform:`translateY(${direction*100}%)`,opacity:0},{transform:'translateY(0)',opacity:1}],{duration,easing,fill:'forwards'});
    Promise.all([outgoing.finished,incoming.finished]).then(()=>{old.classList.remove('present');outgoing.cancel();incoming.cancel();busy=false});
    if(old.contains(document.activeElement))document.activeElement.blur();
    ping('step');
  }
  // Capture replaces earlier duplicated section click handlers.
  document.addEventListener('click',e=>{const b=e.target.closest('[data-target]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();move(scenes.findIndex(s=>s.id===b.dataset.target))},true);
  prev.onclick=()=>move(index-1);next.onclick=()=>move(index+1);
  document.addEventListener('keydown',e=>{
    if(e.defaultPrevented||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.target.closest('input,textarea,select,[contenteditable="true"]')||$('#drawer').classList.contains('open'))return;
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();if(!e.repeat)move(index+(e.key==='ArrowRight'?1:-1))}
  });
  $('#deck').addEventListener('wheel',e=>{
    if(e.ctrlKey||Math.abs(e.deltaY)<Math.abs(e.deltaX))return;
    const s=scenes[index],down=e.deltaY>0;
    if(s.scrollHeight>s.clientHeight+2&&((down&&s.scrollTop+s.clientHeight<s.scrollHeight-2)||(!down&&s.scrollTop>2)))return;
    e.preventDefault();const now=performance.now(),quiet=now-lastWheel>220;lastWheel=now;
    if(quiet&&Math.abs(e.deltaY)>5)move(index+(down?1:-1));
  },{passive:false});
  update();
})();
