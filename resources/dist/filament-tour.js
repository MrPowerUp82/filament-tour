var O={};function z(e={}){O={animate:!0,allowClose:!0,overlayOpacity:.7,smoothScroll:!1,disableActiveInteraction:!1,showProgress:!1,stagePadding:10,stageRadius:5,popoverOffset:10,showButtons:["next","previous","close"],disableButtons:[],overlayColor:"#000",...e}}function d(e){return e?O[e]:O}function M(e,t,i,n){return(e/=n/2)<1?i/2*e*e+t:-i/2*(--e*(e-2)-1)+t}function Q(e){let t='a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';return e.flatMap(i=>{let n=i.matches(t),o=Array.from(i.querySelectorAll(t));return[...n?[i]:[],...o]}).filter(i=>getComputedStyle(i).pointerEvents!=="none"&&le(i))}function V(e){if(!e||se(e))return;let t=d("smoothScroll");e.scrollIntoView({behavior:!t||re(e)?"auto":"smooth",inline:"center",block:"center"})}function re(e){if(!e||!e.parentElement)return;let t=e.parentElement;return t.scrollHeight>t.clientHeight}function se(e){let t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)}function le(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}var W={};function x(e,t){W[e]=t}function a(e){return e?W[e]:W}function j(){W={}}var R={};function I(e,t){R[e]=t}function P(e){var t;(t=R[e])==null||t.call(R)}function de(){R={}}function ae(e,t,i,n){let o=a("__activeStagePosition"),l=o||i.getBoundingClientRect(),p=n.getBoundingClientRect(),h=M(e,l.x,p.x-l.x,t),s=M(e,l.y,p.y-l.y,t),u=M(e,l.width,p.width-l.width,t),r=M(e,l.height,p.height-l.height,t);o={x:h,y:s,width:u,height:r},Y(o),x("__activeStagePosition",o)}function X(e){if(!e)return;let t=e.getBoundingClientRect(),i={x:t.x,y:t.y,width:t.width,height:t.height};x("__activeStagePosition",i),Y(i)}function ce(){let e=a("__activeStagePosition"),t=a("__overlaySvg");if(!e)return;if(!t){console.warn("No stage svg found.");return}let i=window.innerWidth,n=window.innerHeight;t.setAttribute("viewBox",`0 0 ${i} ${n}`)}function pe(e){let t=ve(e);document.body.appendChild(t),U(t,i=>{i.target.tagName==="path"&&P("overlayClick")}),x("__overlaySvg",t)}function Y(e){let t=a("__overlaySvg");if(!t){pe(e);return}let i=t.firstElementChild;if(i?.tagName!=="path")throw new Error("no path element found in stage svg");i.setAttribute("d",Z(e))}function ve(e){let t=window.innerWidth,i=window.innerHeight,n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.classList.add("driver-overlay","driver-overlay-animated"),n.setAttribute("viewBox",`0 0 ${t} ${i}`),n.setAttribute("xmlSpace","preserve"),n.setAttribute("xmlnsXlink","http://www.w3.org/1999/xlink"),n.setAttribute("version","1.1"),n.setAttribute("preserveAspectRatio","xMinYMin slice"),n.style.fillRule="evenodd",n.style.clipRule="evenodd",n.style.strokeLinejoin="round",n.style.strokeMiterlimit="2",n.style.zIndex="10000",n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100%",n.style.height="100%";let o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d",Z(e)),o.style.fill=d("overlayColor")||"rgb(0,0,0)",o.style.opacity=`${d("overlayOpacity")}`,o.style.pointerEvents="auto",o.style.cursor="auto",n.appendChild(o),n}function Z(e){let t=window.innerWidth,i=window.innerHeight,n=d("stagePadding")||0,o=d("stageRadius")||0,l=e.width+n*2,p=e.height+n*2,h=Math.min(o,l/2,p/2),s=Math.floor(Math.max(h,0)),u=e.x-n+s,r=e.y-n,c=l-s*2,v=p-s*2;return`M${t},0L0,0L0,${i}L${t},${i}L${t},0Z
    M${u},${r} h${c} a${s},${s} 0 0 1 ${s},${s} v${v} a${s},${s} 0 0 1 -${s},${s} h-${c} a${s},${s} 0 0 1 -${s},-${s} v-${v} a${s},${s} 0 0 1 ${s},-${s} z`}function ue(){let e=a("__overlaySvg");e&&e.remove()}function me(){let e=document.getElementById("driver-dummy-element");if(e)return e;let t=document.createElement("div");return t.id="driver-dummy-element",t.style.width="0",t.style.height="0",t.style.pointerEvents="none",t.style.opacity="0",t.style.position="fixed",t.style.top="50%",t.style.left="50%",document.body.appendChild(t),t}function q(e){let{element:t}=e,i=typeof t=="string"?document.querySelector(t):t;i||(i=me()),fe(i,e)}function he(){let e=a("__activeElement"),t=a("__activeStep");e&&(X(e),ce(),te(e,t))}function fe(e,t){let i=Date.now(),n=a("__activeStep"),o=a("__activeElement")||e,l=!o||o===e,p=e.id==="driver-dummy-element",h=o.id==="driver-dummy-element",s=d("animate"),u=t.onHighlightStarted||d("onHighlightStarted"),r=t?.onHighlighted||d("onHighlighted"),c=n?.onDeselected||d("onDeselected"),v=d(),f=a();!l&&c&&c(h?void 0:o,n,{config:v,state:f}),u&&u(p?void 0:e,t,{config:v,state:f});let w=!l&&s,g=!1;xe(),x("previousStep",n),x("previousElement",o),x("activeStep",t),x("activeElement",e);let m=()=>{if(a("__transitionCallback")!==m)return;let y=Date.now()-i,k=400-y<=400/2;t.popover&&k&&!g&&w&&(F(e,t),g=!0),d("animate")&&y<400?ae(y,400,o,e):(X(e),r&&r(p?void 0:e,t,{config:d(),state:a()}),x("__transitionCallback",void 0),x("__previousStep",n),x("__previousElement",o),x("__activeStep",t),x("__activeElement",e)),window.requestAnimationFrame(m)};x("__transitionCallback",m),window.requestAnimationFrame(m),V(e),!w&&t.popover&&F(e,t),o.classList.remove("driver-active-element","driver-no-interaction"),o.removeAttribute("aria-haspopup"),o.removeAttribute("aria-expanded"),o.removeAttribute("aria-controls"),d("disableActiveInteraction")&&e.classList.add("driver-no-interaction"),e.classList.add("driver-active-element"),e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","true"),e.setAttribute("aria-controls","driver-popover-content")}function ge(){var e;(e=document.getElementById("driver-dummy-element"))==null||e.remove(),document.querySelectorAll(".driver-active-element").forEach(t=>{t.classList.remove("driver-active-element","driver-no-interaction"),t.removeAttribute("aria-haspopup"),t.removeAttribute("aria-expanded"),t.removeAttribute("aria-controls")})}function $(){let e=a("__resizeTimeout");e&&window.cancelAnimationFrame(e),x("__resizeTimeout",window.requestAnimationFrame(he))}function we(e){var t;if(!a("isInitialized")||!(e.key==="Tab"||e.keyCode===9))return;let i=a("__activeElement"),n=(t=a("popover"))==null?void 0:t.wrapper,o=Q([...n?[n]:[],...i?[i]:[]]),l=o[0],p=o[o.length-1];if(e.preventDefault(),e.shiftKey){let h=o[o.indexOf(document.activeElement)-1]||p;h?.focus()}else{let h=o[o.indexOf(document.activeElement)+1]||l;h?.focus()}}function G(e){(d("allowKeyboardControl")??!0)&&(e.key==="Escape"?P("escapePress"):e.key==="ArrowRight"?P("arrowRightPress"):e.key==="ArrowLeft"&&P("arrowLeftPress"))}function U(e,t,i){let n=(o,l)=>{let p=o.target;e.contains(p)&&((!i||i(p))&&(o.preventDefault(),o.stopPropagation(),o.stopImmediatePropagation()),l?.(o))};document.addEventListener("pointerdown",n,!0),document.addEventListener("mousedown",n,!0),document.addEventListener("pointerup",n,!0),document.addEventListener("mouseup",n,!0),document.addEventListener("click",o=>{n(o,t)},!0)}function ye(){window.addEventListener("keyup",G,!1),window.addEventListener("keydown",we,!1),window.addEventListener("resize",$),window.addEventListener("scroll",$)}function be(){window.removeEventListener("keyup",G),window.removeEventListener("resize",$),window.removeEventListener("scroll",$)}function xe(){let e=a("popover");e&&(e.wrapper.style.display="none")}function F(e,t){var i,n;let o=a("popover");o&&document.body.removeChild(o.wrapper),o=Le(),document.body.appendChild(o.wrapper);let{title:l,description:p,showButtons:h,disableButtons:s,showProgress:u,nextBtnText:r=d("nextBtnText")||"Next &rarr;",prevBtnText:c=d("prevBtnText")||"&larr; Previous",progressText:v=d("progressText")||"{current} of {total}"}=t.popover||{};o.nextButton.innerHTML=r,o.previousButton.innerHTML=c,o.progress.innerHTML=v,l?(o.title.innerText=l,o.title.style.display="block"):o.title.style.display="none",p?(o.description.innerHTML=p,o.description.style.display="block"):o.description.style.display="none";let f=h||d("showButtons"),w=u||d("showProgress")||!1,g=f?.includes("next")||f?.includes("previous")||w;o.closeButton.style.display=f.includes("close")?"block":"none",g?(o.footer.style.display="flex",o.progress.style.display=w?"block":"none",o.nextButton.style.display=f.includes("next")?"block":"none",o.previousButton.style.display=f.includes("previous")?"block":"none"):o.footer.style.display="none";let m=s||d("disableButtons")||[];m!=null&&m.includes("next")&&(o.nextButton.disabled=!0,o.nextButton.classList.add("driver-popover-btn-disabled")),m!=null&&m.includes("previous")&&(o.previousButton.disabled=!0,o.previousButton.classList.add("driver-popover-btn-disabled")),m!=null&&m.includes("close")&&(o.closeButton.disabled=!0,o.closeButton.classList.add("driver-popover-btn-disabled"));let y=o.wrapper;y.style.display="block",y.style.left="",y.style.top="",y.style.bottom="",y.style.right="",y.id="driver-popover-content",y.setAttribute("role","dialog"),y.setAttribute("aria-labelledby","driver-popover-title"),y.setAttribute("aria-describedby","driver-popover-description");let k=o.arrow;k.className="driver-popover-arrow";let S=((i=t.popover)==null?void 0:i.popoverClass)||d("popoverClass")||"";y.className=`driver-popover ${S}`.trim(),U(o.wrapper,_=>{var B,N,A;let E=_.target,H=((B=t.popover)==null?void 0:B.onNextClick)||d("onNextClick"),T=((N=t.popover)==null?void 0:N.onPrevClick)||d("onPrevClick"),D=((A=t.popover)==null?void 0:A.onCloseClick)||d("onCloseClick");if(E.classList.contains("driver-popover-next-btn"))return H?H(e,t,{config:d(),state:a()}):P("nextClick");if(E.classList.contains("driver-popover-prev-btn"))return T?T(e,t,{config:d(),state:a()}):P("prevClick");if(E.classList.contains("driver-popover-close-btn"))return D?D(e,t,{config:d(),state:a()}):P("closeClick")},_=>!(o!=null&&o.description.contains(_))&&!(o!=null&&o.title.contains(_))&&_.className.includes("driver-popover")),x("popover",o);let b=((n=t.popover)==null?void 0:n.onPopoverRender)||d("onPopoverRender");b&&b(o,{config:d(),state:a()}),te(e,t),V(y);let C=e.classList.contains("driver-dummy-element"),L=Q([y,...C?[]:[e]]);L.length>0&&L[0].focus()}function ee(){let e=a("popover");if(!(e!=null&&e.wrapper))return;let t=e.wrapper.getBoundingClientRect(),i=d("stagePadding")||0,n=d("popoverOffset")||0;return{width:t.width+i+n,height:t.height+i+n,realWidth:t.width,realHeight:t.height}}function J(e,t){let{elementDimensions:i,popoverDimensions:n,popoverPadding:o,popoverArrowDimensions:l}=t;return e==="start"?Math.max(Math.min(i.top-o,window.innerHeight-n.realHeight-l.width),l.width):e==="end"?Math.max(Math.min(i.top-n?.realHeight+i.height+o,window.innerHeight-n?.realHeight-l.width),l.width):e==="center"?Math.max(Math.min(i.top+i.height/2-n?.realHeight/2,window.innerHeight-n?.realHeight-l.width),l.width):0}function K(e,t){let{elementDimensions:i,popoverDimensions:n,popoverPadding:o,popoverArrowDimensions:l}=t;return e==="start"?Math.max(Math.min(i.left-o,window.innerWidth-n.realWidth-l.width),l.width):e==="end"?Math.max(Math.min(i.left-n?.realWidth+i.width+o,window.innerWidth-n?.realWidth-l.width),l.width):e==="center"?Math.max(Math.min(i.left+i.width/2-n?.realWidth/2,window.innerWidth-n?.realWidth-l.width),l.width):0}function te(e,t){let i=a("popover");if(!i)return;let{align:n="start",side:o="left"}=t?.popover||{},l=n,p=e.id==="driver-dummy-element"?"over":o,h=d("stagePadding")||0,s=ee(),u=i.arrow.getBoundingClientRect(),r=e.getBoundingClientRect(),c=r.top-s.height,v=c>=0,f=window.innerHeight-(r.bottom+s.height),w=f>=0,g=r.left-s.width,m=g>=0,y=window.innerWidth-(r.right+s.width),k=y>=0,S=!v&&!w&&!m&&!k,b=p;if(p==="top"&&v?k=m=w=!1:p==="bottom"&&w?k=m=v=!1:p==="left"&&m?k=v=w=!1:p==="right"&&k&&(m=v=w=!1),p==="over"){let C=window.innerWidth/2-s.realWidth/2,L=window.innerHeight/2-s.realHeight/2;i.wrapper.style.left=`${C}px`,i.wrapper.style.right="auto",i.wrapper.style.top=`${L}px`,i.wrapper.style.bottom="auto"}else if(S){let C=window.innerWidth/2-s?.realWidth/2,L=10;i.wrapper.style.left=`${C}px`,i.wrapper.style.right="auto",i.wrapper.style.bottom=`${L}px`,i.wrapper.style.top="auto"}else if(m){let C=Math.min(g,window.innerWidth-s?.realWidth-u.width),L=J(l,{elementDimensions:r,popoverDimensions:s,popoverPadding:h,popoverArrowDimensions:u});i.wrapper.style.left=`${C}px`,i.wrapper.style.top=`${L}px`,i.wrapper.style.bottom="auto",i.wrapper.style.right="auto",b="left"}else if(k){let C=Math.min(y,window.innerWidth-s?.realWidth-u.width),L=J(l,{elementDimensions:r,popoverDimensions:s,popoverPadding:h,popoverArrowDimensions:u});i.wrapper.style.right=`${C}px`,i.wrapper.style.top=`${L}px`,i.wrapper.style.bottom="auto",i.wrapper.style.left="auto",b="right"}else if(v){let C=Math.min(c,window.innerHeight-s.realHeight-u.width),L=K(l,{elementDimensions:r,popoverDimensions:s,popoverPadding:h,popoverArrowDimensions:u});i.wrapper.style.top=`${C}px`,i.wrapper.style.left=`${L}px`,i.wrapper.style.bottom="auto",i.wrapper.style.right="auto",b="top"}else if(w){let C=Math.min(f,window.innerHeight-s?.realHeight-u.width),L=K(l,{elementDimensions:r,popoverDimensions:s,popoverPadding:h,popoverArrowDimensions:u});i.wrapper.style.left=`${L}px`,i.wrapper.style.bottom=`${C}px`,i.wrapper.style.top="auto",i.wrapper.style.right="auto",b="bottom"}S?i.arrow.classList.add("driver-popover-arrow-none"):Ce(l,b,e)}function Ce(e,t,i){let n=a("popover");if(!n)return;let o=i.getBoundingClientRect(),l=ee(),p=n.arrow,h=l.width,s=window.innerWidth,u=o.width,r=o.left,c=l.height,v=window.innerHeight,f=o.top,w=o.height;p.className="driver-popover-arrow";let g=t,m=e;t==="top"?(r+u<=0?(g="right",m="end"):r+u-h<=0&&(g="top",m="start"),r>=s?(g="left",m="end"):r+h>=s&&(g="top",m="end")):t==="bottom"?(r+u<=0?(g="right",m="start"):r+u-h<=0&&(g="bottom",m="start"),r>=s?(g="left",m="start"):r+h>=s&&(g="bottom",m="end")):t==="left"?(f+w<=0?(g="bottom",m="end"):f+w-c<=0&&(g="left",m="start"),f>=v?(g="top",m="end"):f+c>=v&&(g="left",m="end")):t==="right"&&(f+w<=0?(g="bottom",m="start"):f+w-c<=0&&(g="right",m="start"),f>=v?(g="top",m="start"):f+c>=v&&(g="right",m="end")),g?(p.classList.add(`driver-popover-arrow-side-${g}`),p.classList.add(`driver-popover-arrow-align-${m}`)):p.classList.add("driver-popover-arrow-none")}function Le(){let e=document.createElement("div");e.classList.add("driver-popover");let t=document.createElement("div");t.classList.add("driver-popover-arrow");let i=document.createElement("header");i.id="driver-popover-title",i.classList.add("driver-popover-title"),i.style.display="none",i.innerText="Popover Title";let n=document.createElement("div");n.id="driver-popover-description",n.classList.add("driver-popover-description"),n.style.display="none",n.innerText="Popover description is here";let o=document.createElement("button");o.type="button",o.classList.add("driver-popover-close-btn"),o.setAttribute("aria-label","Close"),o.innerHTML="&times;";let l=document.createElement("footer");l.classList.add("driver-popover-footer");let p=document.createElement("span");p.classList.add("driver-popover-progress-text"),p.innerText="";let h=document.createElement("span");h.classList.add("driver-popover-navigation-btns");let s=document.createElement("button");s.type="button",s.classList.add("driver-popover-prev-btn"),s.innerHTML="&larr; Previous";let u=document.createElement("button");return u.type="button",u.classList.add("driver-popover-next-btn"),u.innerHTML="Next &rarr;",h.appendChild(s),h.appendChild(u),l.appendChild(p),l.appendChild(h),e.appendChild(o),e.appendChild(t),e.appendChild(i),e.appendChild(n),e.appendChild(l),{wrapper:e,arrow:t,title:i,description:n,footer:l,previousButton:s,nextButton:u,closeButton:o,footerButtons:h,progress:p}}function ke(){var e;let t=a("popover");t&&((e=t.wrapper.parentElement)==null||e.removeChild(t.wrapper))}function oe(e={}){z(e);function t(){d("allowClose")&&u()}function i(){let r=a("activeIndex"),c=d("steps")||[];if(typeof r>"u")return;let v=r+1;c[v]?s(v):u()}function n(){let r=a("activeIndex"),c=d("steps")||[];if(typeof r>"u")return;let v=r-1;c[v]?s(v):u()}function o(r){(d("steps")||[])[r]?s(r):u()}function l(){var r;if(a("__transitionCallback"))return;let c=a("activeIndex"),v=a("__activeStep"),f=a("__activeElement");if(typeof c>"u"||typeof v>"u"||typeof a("activeIndex")>"u")return;let w=((r=v.popover)==null?void 0:r.onPrevClick)||d("onPrevClick");if(w)return w(f,v,{config:d(),state:a()});n()}function p(){var r;if(a("__transitionCallback"))return;let c=a("activeIndex"),v=a("__activeStep"),f=a("__activeElement");if(typeof c>"u"||typeof v>"u")return;let w=((r=v.popover)==null?void 0:r.onNextClick)||d("onNextClick");if(w)return w(f,v,{config:d(),state:a()});i()}function h(){a("isInitialized")||(x("isInitialized",!0),document.body.classList.add("driver-active",d("animate")?"driver-fade":"driver-simple"),ye(),I("overlayClick",t),I("escapePress",t),I("arrowLeftPress",l),I("arrowRightPress",p))}function s(r=0){var c,v,f,w,g,m,y,k;let S=d("steps");if(!S){console.error("No steps to drive through"),u();return}if(!S[r]){u();return}x("__activeOnDestroyed",document.activeElement),x("activeIndex",r);let b=S[r],C=S[r+1],L=S[r-1],_=((c=b.popover)==null?void 0:c.doneBtnText)||d("doneBtnText")||"Done",B=d("allowClose"),N=typeof((v=b.popover)==null?void 0:v.showProgress)<"u"?(f=b.popover)==null?void 0:f.showProgress:d("showProgress"),A=(((w=b.popover)==null?void 0:w.progressText)||d("progressText")||"{{current}} of {{total}}").replace("{{current}}",`${r+1}`).replace("{{total}}",`${S.length}`),E=((g=b.popover)==null?void 0:g.showButtons)||d("showButtons"),H=["next","previous",...B?["close"]:[]].filter(ne=>!(E!=null&&E.length)||E.includes(ne)),T=((m=b.popover)==null?void 0:m.onNextClick)||d("onNextClick"),D=((y=b.popover)==null?void 0:y.onPrevClick)||d("onPrevClick"),ie=((k=b.popover)==null?void 0:k.onCloseClick)||d("onCloseClick");q({...b,popover:{showButtons:H,nextBtnText:C?void 0:_,disableButtons:[...L?[]:["previous"]],showProgress:N,progressText:A,onNextClick:T||(()=>{C?s(r+1):u()}),onPrevClick:D||(()=>{s(r-1)}),onCloseClick:ie||(()=>{u()}),...b?.popover||{}}})}function u(r=!0){let c=a("__activeElement"),v=a("__activeStep"),f=a("__activeOnDestroyed"),w=d("onDestroyStarted");if(r&&w){let y=!c||c?.id==="driver-dummy-element";w(y?void 0:c,v,{config:d(),state:a()});return}let g=v?.onDeselected||d("onDeselected"),m=d("onDestroyed");if(document.body.classList.remove("driver-active","driver-fade","driver-simple"),be(),ke(),ge(),ue(),de(),j(),c&&v){let y=c.id==="driver-dummy-element";g&&g(y?void 0:c,v,{config:d(),state:a()}),m&&m(y?void 0:c,v,{config:d(),state:a()})}f&&f.focus()}return{isActive:()=>a("isInitialized")||!1,refresh:$,drive:(r=0)=>{h(),s(r)},setConfig:z,setSteps:r=>{j(),z({...d(),steps:r})},getConfig:d,getState:a,getActiveIndex:()=>a("activeIndex"),isFirstStep:()=>a("activeIndex")===0,isLastStep:()=>{let r=d("steps")||[],c=a("activeIndex");return c!==void 0&&c===r.length-1},getActiveStep:()=>a("activeStep"),getActiveElement:()=>a("activeElement"),getPreviousElement:()=>a("previousElement"),getPreviousStep:()=>a("previousStep"),moveNext:i,movePrevious:n,moveTo:o,hasNextStep:()=>{let r=d("steps")||[],c=a("activeIndex");return c!==void 0&&r[c+1]},hasPreviousStep:()=>{let r=d("steps")||[],c=a("activeIndex");return c!==void 0&&r[c-1]},highlight:r=>{h(),q({...r,popover:r.popover?{showButtons:[],showProgress:!1,progressText:"",...r.popover}:void 0})},destroy:()=>{u(!1)}}}document.addEventListener("livewire:initialized",async function(){Livewire.dispatch("driverjs::load-tutorials",{request:window.location}),Livewire.on("driverjs::loaded-tutorials",function(t){t[0].tutorials.forEach(i=>{localStorage.getItem("tutorials")||localStorage.setItem("tutorials","[]"),i.open&&!localStorage.getItem("tutorials").includes(i.id)&&e(i)})}),Livewire.on("driverjs::open-tutorial",function(t){e(t[0])});function e(t){if(t.steps.length>0){let i=oe({allowClose:!0,disableActiveInteraction:!0,overlayColor:localStorage.theme==="light"?t.colors.light:t.colors.dark,onDeselected:(n,o,{config:l,state:p})=>{},onCloseClick:(n,o,{config:l,state:p})=>{p.activeStep&&!p.activeStep.popover.unclosable&&i.destroy()},onDestroyStarted:(n,o,{config:l,state:p})=>{p.activeStep&&!p.activeStep.popover.unclosable&&i.destroy()},onDestroyed:(n,o,{config:l,state:p})=>{localStorage.getItem("tutorials").includes(t.id)||localStorage.setItem("tutorials",JSON.stringify([...JSON.parse(localStorage.getItem("tutorials")),t.id]))},onNextClick:(n,o,{config:l,state:p})=>{i.isLastStep()&&i.destroy(),o.popover.onNextNotifiy&&new FilamentNotification().title(o.popover.onNextNotifiy.title).body(o.popover.onNextNotifiy.body).icon(o.popover.onNextNotifiy.icon).iconColor(o.popover.onNextNotifiy.iconColor).color(o.popover.onNextNotifiy.color).duration(o.popover.onNextNotifiy.duration).send(),o.popover.onNextDispatch&&Livewire.dispatch(o.popover.onNextDispatch.name,JSON.parse(o.popover.onNextDispatch.args)),o.popover.onNextClickSelector&&document.querySelector(o.popover.onNextClickSelector).click(),o.redirect&&window.open(o.redirect.url,o.redirect.newTab?"_blank":"_self"),i.moveNext()},onPopoverRender:(n,{config:o,state:l})=>{l.activeStep.popover.unclosable&&document.querySelector(".driver-popover-close-btn").remove(),n.title.innerHTML="",n.title.innerHTML=l.activeStep.popover.title,l.activeStep.popover.description||(n.title.firstChild.style.justifyContent="center");let p="dark:text-white fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 mb-4";n.footer.parentElement.classList.add(...p.split(" ")),n.footer.innerHTML="",n.footer.classList.add("flex","mt-3"),n.footer.style.justifyContent="space-evenly",n.footer.classList.remove("driver-popover-footer");let h=document.createElement("button"),s="fi-btn fi-btn-size-md relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-primary gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-custom-600 text-white hover:bg-custom-500 dark:bg-custom-500 dark:hover:bg-custom-400 focus:ring-custom-500/50 dark:focus:ring-custom-400/50 fi-ac-btn-action";h.classList.add(...s.split(" "),"driver-popover-next-btn"),h.innerText=i.isLastStep()?"Terminer":"Suivant",h.style.setProperty("--c-400","var(--primary-400"),h.style.setProperty("--c-500","var(--primary-500"),h.style.setProperty("--c-600","var(--primary-600");let u=document.createElement("button"),r="fi-btn fi-btn-size-md relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-gray gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-white text-gray-950 hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 ring-1 ring-gray-950/10 dark:ring-white/20 fi-ac-btn-action";u.classList.add(...r.split(" "),"driver-popover-prev-btn"),u.innerText="Pr\xE9c\xE9dent";let c=document.createElement("button"),v="fi-btn fi-btn-size-sm relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-danger gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-custom-600 text-white hover:bg-custom-500 dark:bg-custom-500 dark:hover:bg-custom-400 focus:ring-custom-500/50 dark:focus:ring-custom-400/50 fi-ac-btn-action";c.classList.add(...v.split(" ")),c.innerText="Quitter",c.style.setProperty("--c-400","var(--danger-400)"),c.style.setProperty("--c-500","var(--danger-500"),c.style.setProperty("--c-600","var(--danger-600"),c.addEventListener("click",()=>{i.destroy()}),!i.isLastStep()&&!l.activeStep.popover.unclosable&&n.footer.appendChild(c),i.isFirstStep()||n.footer.appendChild(u),n.footer.appendChild(h)},steps:JSON.parse(t.steps)});i.drive()}}});
