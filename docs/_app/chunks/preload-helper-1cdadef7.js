const a="modulepreload",o={},u="/svelte-connectables/_app/",h=function(s,n){return!n||n.length===0?s():Promise.all(n.map(e=>{if(e=`${u}${e}`,e in o)return;o[e]=!0;const t=e.endsWith(".css"),l=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${l}`))return;const r=document.createElement("link");if(r.rel=t?"stylesheet":a,t||(r.as="script",r.crossOrigin=""),r.href=e,document.head.appendChild(r),t)return new Promise((i,c)=>{r.addEventListener("load",i),r.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>s())};export{h as _};
