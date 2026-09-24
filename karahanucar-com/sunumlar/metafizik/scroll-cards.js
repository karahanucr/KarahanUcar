/* İkinci sahne: başlık sabit, soru aşağıya açılan rulo içinde. */
(() => {
  const css=document.createElement('style');
  css.textContent=`
  #s2 .cards{align-items:start;gap:24px}
  #s2 .scroll-card{min-width:0;position:relative;padding-bottom:14px}
  #s2 .flip-card{min-height:128px;width:100%;position:relative;z-index:2;border-radius:7px 7px 3px 3px;box-shadow:0 8px 18px #0004}
  #s2 .flip-card:hover{transform:none}
  #s2 .flip-card strong{margin-bottom:8px}
  #s2 .scroll-cue{display:block;margin-top:12px;color:var(--gold);font:10px var(--mono);letter-spacing:.08em}
  #s2 .scroll-space{height:210px;position:relative;margin:0 10px;perspective:700px}
  #s2 .scroll-paper{position:absolute;inset:0 0 auto;height:190px;padding:26px 22px 30px;
    background:linear-gradient(90deg,#0002,transparent 12%,#fff1 48%,transparent 88%,#0002),linear-gradient(180deg,#0003,transparent 22%),color-mix(in srgb,var(--gold) 48%,#f5ecd5);
    color:#29251e;box-shadow:0 12px 24px #0004;transform-origin:top;
    clip-path:inset(0 0 100% 0);opacity:0;transform:rotateX(-12deg);
    transition:clip-path .65s cubic-bezier(.22,.7,.2,1),opacity .2s,transform .65s}
  #s2 .scroll-paper p{color:inherit;font:20px/1.5 var(--serif);margin:0}
  #s2 .scroll-roller{position:absolute;left:-6px;right:-6px;top:0;height:13px;border-radius:9px;
    background:linear-gradient(#eee0b8,#ae8b48 48%,#74562a 70%,#d6b879);box-shadow:0 4px 7px #0005;
    transform:translateY(-7px);transition:transform .65s cubic-bezier(.22,.7,.2,1);pointer-events:none}
  #s2 .scroll-card.open .scroll-paper{clip-path:inset(0);opacity:1;transform:rotateX(0)}
  #s2 .scroll-card.open .scroll-roller{transform:translateY(183px)}
  @media(max-width:800px){#s2 .scroll-space{height:190px}#s2 .scroll-paper{height:170px}#s2 .scroll-card.open .scroll-roller{transform:translateY(163px)}}
  @media(prefers-reduced-motion:reduce){#s2 .scroll-paper,#s2 .scroll-roller{transition:none}}
  body.scroll-motion-off #s2 .scroll-paper,body.scroll-motion-off #s2 .scroll-roller{transition:none}
  `;
  document.head.append(css);
  document.querySelector('#motion').addEventListener('click',()=>document.body.classList.toggle('scroll-motion-off',!motionOn));
  document.querySelectorAll('#s2 .flip-card').forEach((old,i)=>{
    // Clone only the button to remove the earlier text-replacement listener.
    const button=old.cloneNode(true),label=button.querySelector('span');
    const question=label.dataset.back;label.textContent=label.dataset.front;
    const container=document.createElement('div');container.className='scroll-card';
    old.replaceWith(container);container.append(button);
    const cue=document.createElement('small');cue.className='scroll-cue';cue.textContent='SORUYU AÇ ↓';button.append(cue);
    const space=document.createElement('div');space.className='scroll-space';
    const paper=document.createElement('div');paper.className='scroll-paper';paper.id='scroll-question-'+i;paper.inert=true;paper.setAttribute('aria-hidden','true');
    const text=document.createElement('p');text.textContent=question;paper.append(text);
    const roller=document.createElement('div');roller.className='scroll-roller';roller.setAttribute('aria-hidden','true');
    space.append(paper,roller);container.append(space);
    button.removeAttribute('aria-pressed');button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',paper.id);
    button.addEventListener('click',()=>{
      const open=container.classList.toggle('open');
      button.setAttribute('aria-expanded',String(open));paper.inert=!open;paper.setAttribute('aria-hidden',String(!open));
      cue.textContent=open?'RULOYU KAPAT ↑':'SORUYU AÇ ↓';ping('flip');
    });
  });
})();
