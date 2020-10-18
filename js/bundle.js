(()=>{"use strict";(()=>{const e=(e,t,o,n,r)=>{const i=new XMLHttpRequest;i.responseType="json",i.timeout=5e3,i.open(e,t),i.send(o),i.addEventListener("load",(()=>{200===i.status?n(i.response):r(`Статус ответа: ${i.status} ${i.statusText}`)})),i.addEventListener("error",(()=>{r("Произошла ошибка соединения")})),i.addEventListener("timeout",(()=>{r(`Запрос не успел выполниться за ${i.timeout}мс`)}))};window.backend={load(t,o){e("GET","https://21.javascript.pages.academy/keksobooking/data",null,t,o)},save(t,o,n){e("POST","https://21.javascript.pages.academy/keksobooking",t,o,n)}}})(),window.util={isEscEvent:(e,t)=>{"Escape"===e.key&&(e.preventDefault(),t())},isEnterEvent:(e,t)=>{"Enter"===e.key&&t()}},window.debounce=e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},(()=>{const e=document.querySelector(".map"),t=document.querySelector(".map__filters"),o=t.querySelectorAll("select"),n=t.querySelectorAll("input"),r=e=>{e.forEach((e=>{e.setAttribute("disabled","true")}))};window.cityPlan={map:e,mapFilterSelects:o,mapFilterInputs:n,onError:e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center",t.style.width="790px",t.style.height="90px",t.style.paddingTop="20px",t.style.backgroundColor="navy",t.style.color="tomato",t.style.border="5px solid white",t.style.position="absolute",t.style.top="180px",t.style.left=0,t.style.right=0,t.style.fontSize="35px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t),t.addEventListener("click",(()=>{t.remove()})),r(o),r(n)}}})(),(()=>{const e=document.querySelector(".ad-form"),t=e.querySelector("#title");let o=t.minLength,n=t.maxLength;const r=document.querySelector(".map__pins"),i=r.querySelector(".map__pin--main"),a=Math.floor(i.offsetLeft+32.5),s=Math.floor(i.offsetTop+32.5),d=e.querySelector("#address"),l=()=>{d.value=`${a}, ${s}`};l(),d.setAttribute("readonly","true");const c=e.querySelector("#price"),u=()=>{const e={valueMissing:"Обязательное поле",badInput:"Пожалуйста, введите число",rangeUnderflow:"Пожалуйста, не меньше "+c.min,rangeOverflow:"Пожалуйста, не больше "+c.max},t=Object.keys(e).find((e=>c.validity[e]));c.setCustomValidity(t?e[t]:"")},p={bungalow:0,flat:1e3,house:5e3,palace:1e4},m=e=>{c.setAttribute("min",e),c.setAttribute("placeholder",e)},v=e.querySelector("#type");let y=p[v.value];m(y);const h=e.querySelector("#timein"),f=e.querySelector("#timeout"),w=e.querySelector("#room_number"),g=e.querySelector("#capacity"),E={1:["1"],2:["1","2"],3:["1","2","3"],100:["0"]},L=()=>{let e=w.value,t=g.querySelectorAll("option");t.forEach((t=>{t.disabled=-1===E[e].indexOf(t.value)})),t[g.selectedIndex].disabled&&(g.querySelector("option:not([disabled])").selected=!0)};L(),window.validation={MAIN_PIN_WIDTH:65,MAIN_PIN_HEIGHT:65,PIN_TIP_HEIGHT:22,setupAddress:()=>{const e=Math.floor(i.offsetLeft+32.5),t=Math.floor(i.offsetTop+65+22);d.value=`${e}, ${t}`},adForm:e,mapPins:r,mainPin:i,initMainPinPosition:l,inputTitle:t,onInputTitleSetCustomValidity:()=>{let e=t.value.length;e<o?t.setCustomValidity(`Минимальная длина — 30 символов, ещё ${o-e} символов`):e>n?t.setCustomValidity(`Максимальная длина — 100 символов, удалите лишние ${e-n} символов`):t.setCustomValidity(""),t.reportValidity()},inputPrice:c,onInputPriceCheckValidity:()=>{u()},onInputPriceSetCustomValidity:()=>{u()},selectType:v,onSelectTypeChange:()=>{y=p[v.value],m(y)},selectCheckIn:h,onSelectCheckInChange:()=>{var e;e=h.value,f.value=e},selectCheckOut:f,onSelectCheckOutChange:()=>{var e;e=f.value,h.value=e},adFormRoomNumber:w,onAdFormRoomNumberChange:()=>{L()}}})(),(()=>{const{isEscEvent:e}=window.util,{map:t}=window.cityPlan,o=t=>{e(t,n)},n=()=>{const e=t.querySelector(".map__card");e&&(e.remove(),document.removeEventListener("keydown",o))};window.card={open:e=>{n(),(e=>{const o=document.querySelector("#card").content.cloneNode(!0),r=document.createDocumentFragment(),{title:i,address:a,price:s,rooms:d,guests:l,checkin:c,checkout:u,description:p,photos:m,features:v,type:y}=e.offer,{avatar:h}=e.author;o.querySelector(".popup__close").addEventListener("click",(()=>{n()}));const f=o.querySelector(".popup__features");f.innerHTML="";const w=o.querySelector(".popup__type");switch(y){case"flat":w.textContent="квартира";break;case"bungalow":w.textContent="бунгало";break;case"house":w.textContent="дом";break;case"palace":w.textContent="дворец"}o.querySelector(".popup__text--capacity").textContent=`${d} комнат${(e=>{let t=e;return e>20&&(t=e%10),e>=5&&e<=20?"":{0:"",1:"а",2:"ы",3:"ы",4:"ы",5:"",6:"",7:"",8:"",9:""}[t]})(d)} для ${l} гост${(e=>{let t=e;return e>=10&&(t=e%10),1===t?"я":"ей"})(l)}`,o.querySelector(".popup__title").textContent=i,o.querySelector(".popup__text--address").textContent=a,o.querySelector(".popup__text--price").textContent=s+"₽/ночь",o.querySelector(".popup__text--time").textContent=`Заезд после ${c}, выезд до ${u}`,f.appendChild(((e,t)=>(e.forEach((e=>{const o=document.createElement("li");o.className="popup__feature popup__feature--"+e,t.appendChild(o)})),t))(v,r)),o.querySelector(".popup__description").textContent=p,((e,t)=>{const o=e.querySelector(".popup__photos"),n=o.querySelector("img");o.innerHTML="",t.forEach((e=>{const t=n.cloneNode(!0);t.src=e,r.appendChild(t)})),o.appendChild(r)})(o,m),o.querySelector(".popup__avatar").src=h;const g=document.querySelector(".map__filters-container");t.insertBefore(o,g)})(e),document.addEventListener("keydown",o)},close:n}})(),(()=>{const{open:e}=window.card;window.marker={getPins:t=>{const o=document.querySelector("#pin").content.querySelector(".map__pin"),n=document.createDocumentFragment();return t.forEach((t=>{const r=o.cloneNode(!0),i=r.querySelector("img");r.style=`left: ${t.location.x-i.width/2}px; top: ${t.location.y-i.height}px;`,i.src=t.author.avatar,i.alt=t.offer.title,n.append(r),r.addEventListener("click",(()=>{e(t)}))})),n}}})(),(()=>{const e="any",{getPins:t}=window.marker,{map:o}=window.cityPlan,{close:n}=window.card,{mapPins:r}=window.validation,i=document.querySelector(".map__filters"),a=i.querySelector("#housing-type"),s=i.querySelector("#housing-price"),d=i.querySelector("#housing-rooms"),l=i.querySelector("#housing-guests"),c=i.querySelector(".map__features");let u;const p=()=>{o.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>{e.remove()}))},m=window.debounce((e=>{p(),r.append(t(e.slice(0,5)))}));window.filter={onLoad:e=>{u=e,m(e)},removePins:p,filterForm:i,onFiltersSetNewAds:()=>{let t=[];u.forEach((o=>{(t=>a.value===t.offer.type||a.value===e)(o)&&(t=>"low"===s.value&&t.offer.price<1e4||"middle"===s.value&&t.offer.price>=1e4&&t.offer.price<5e4||"high"===s.value&&t.offer.price>=5e4||s.value===t.offer.price||s.value===e)(o)&&(t=>+d.value===t.offer.rooms||d.value===e)(o)&&(t=>+l.value===t.offer.guests||l.value===e)(o)&&(e=>{const t=c.querySelectorAll(".map__checkbox:checked");return Array.from(t).every((t=>e.offer.features.includes(t.value)))})(o)&&t.push(o)})),n(),m(t)}}})(),(()=>{const e=["gif","jpg","jpeg","png"],t={default:{width:"40px",height:"44px",borderRadius:"0",marginLeft:"0"},edited:{width:"70px",height:"70px",borderRadius:"5px",marginLeft:"-15px"}},{adForm:o}=window.validation,n=o.querySelector("#avatar"),r=o.querySelector(".ad-form-header__preview img"),i=o.querySelector("#images"),a=o.querySelector(".ad-form__photo"),s=document.querySelector(".ad-form__photo-container"),d=(t,o)=>{const n=t.name.toLowerCase();e.some((e=>n.endsWith(e)))&&o(t)},l=e=>{const o=t.edited,n=()=>{URL.revokeObjectURL(r.src),r.removeEventListener("load",n)};r.addEventListener("load",n),r.src=URL.createObjectURL(e),r.setAttribute("width",o.width),r.setAttribute("height",o.height),r.style.width=o.width,r.style.height=o.height,r.style.borderRadius=o.borderRadius,r.style.marginLeft=o.marginLeft},c=e=>{const o=document.createElement("div");o.classList.add("ad-form__photo"),s.appendChild(o);const n=document.createElement("img"),r=t.edited,i=()=>{URL.revokeObjectURL(n.src),n.removeEventListener("load",i)};n.addEventListener("load",i),n.src=URL.createObjectURL(e),n.setAttribute("alt","Фотография жилья"),n.setAttribute("width",r.width),n.setAttribute("height",r.height),n.style.width=r.width,n.style.height=r.height,n.style.borderRadius=r.borderRadius,a.remove(),o.appendChild(n)},u=()=>{d(n.files[0],l)},p=()=>{d(i.files[0],c)};window.imageUpload={setDisabled:()=>{const e=t.default;r.style.width=e.width,r.style.height=e.height,r.style.borderRadius=e.borderRadius,r.style.marginLeft=e.marginLeft,r.src="img/muffin-grey.svg",o.querySelectorAll(".ad-form__photo").forEach((e=>{e.remove()}));const a=document.createElement("div");a.classList.add("ad-form__photo"),s.appendChild(a),n.removeEventListener("change",u),i.removeEventListener("change",p)},setEnabled:()=>{n.addEventListener("change",u),i.addEventListener("change",p)}}})(),(()=>{const{MAIN_PIN_WIDTH:e,MAIN_PIN_HEIGHT:t,PIN_TIP_HEIGHT:o,mainPin:n,setupAddress:r}=window.validation,{map:i}=window.cityPlan,a={top:i.offsetTop+130-(t+o),right:1200+Math.ceil(e/2)-n.offsetWidth,bottom:630-(t+o),left:0+Math.ceil(e/2)-n.offsetWidth};window.shift={onMainPinSetAdressMouseMove:e=>{e.preventDefault();let t={x:e.clientX,y:e.clientY};const o=e=>{e.preventDefault();const o=t.x-e.clientX,i=t.y-e.clientY;t={x:e.clientX,y:e.clientY};const s={x:n.offsetLeft-o,y:n.offsetTop-i};s.x<a.left?s.x=a.left:s.x>a.right&&(s.x=a.right),s.y<a.top?s.y=a.top:s.y>a.bottom&&(s.y=a.bottom),n.style.top=s.y+"px",n.style.left=s.x+"px",r()},i=e=>{e.preventDefault(),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",i)};document.addEventListener("mousemove",o),document.addEventListener("mouseup",i)}}})(),(()=>{const{map:e,mapFilterSelects:t,mapFilterInputs:o,onError:n}=window.cityPlan,{setupAddress:r,adForm:i,mainPin:a,initMainPinPosition:s,inputTitle:d,onInputTitleSetCustomValidity:l,inputPrice:c,onInputPriceCheckValidity:u,onInputPriceSetCustomValidity:p,selectType:m,onSelectTypeChange:v,selectCheckIn:y,onSelectCheckInChange:h,selectCheckOut:f,onSelectCheckOutChange:w,adFormRoomNumber:g,onAdFormRoomNumberChange:E}=window.validation,{close:L}=window.card,{load:b,save:_}=window.backend,{onMainPinSetAdressMouseMove:S}=window.shift,{isEscEvent:q}=window.util,{onLoad:x,removePins:k,filterForm:C,onFiltersSetNewAds:A}=window.filter,P=i.querySelectorAll("select"),I=i.querySelectorAll("input"),T=i.querySelector("#description"),M=i.querySelector(".ad-form__element--submit"),N=e=>{e.forEach((e=>{e.setAttribute("disabled","true")}))},R=e=>{e.forEach((e=>{e.removeAttribute("disabled","true")}))};N(t),N(o),N(P),N(I),T.setAttribute("disabled","true"),M.setAttribute("disabled","true");const F=e=>{0===e.button&&B()};a.addEventListener("mousedown",F),a.addEventListener("mousedown",S);const $=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),D=()=>{O()},H=e=>{q(e,O)},O=()=>{$.remove(),$.removeEventListener("click",D),document.removeEventListener("keydown",H)},U=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),j=()=>{e.appendChild(U),U.addEventListener("click",V),document.addEventListener("keydown",G)},V=()=>{W()},G=e=>{q(e,W)},W=()=>{U.remove(),U.removeEventListener("click",V),document.removeEventListener("keydown",G)},X=document.querySelector(".ad-form__reset"),Y=e=>{e.preventDefault(),z()},z=()=>{L(),k(),i.reset(),e.classList.add("map--faded"),i.classList.add("ad-form--disabled"),r(),a.style.left="570px",a.style.top="375px",s(),N(t),N(o),N(P),N(I),T.setAttribute("disabled","true"),M.setAttribute("disabled","true"),a.addEventListener("mousedown",F),X.removeEventListener("click",Y),C.removeEventListener("change",A),d.removeEventListener("input",l),c.removeEventListener("invalid",u),c.removeEventListener("input",p),m.removeEventListener("change",v),y.removeEventListener("change",h),f.removeEventListener("change",w),g.removeEventListener("change",E),window.imageUpload.setDisabled()},B=()=>{i.classList.remove("ad-form--disabled"),e.classList.remove("map--faded"),r(),R(I),R(P),R(t),R(o),T.removeAttribute("disabled","true"),M.removeAttribute("disabled","true"),b(x,n),i.addEventListener("submit",(t=>{t.preventDefault();const o=new FormData(i);_(o,(()=>{z(),e.appendChild($),$.addEventListener("click",D),document.addEventListener("keydown",H)}),j),document.activeElement.blur()})),a.removeEventListener("mousedown",F),X.addEventListener("click",Y),C.addEventListener("change",A),d.addEventListener("input",l),c.addEventListener("invalid",u),c.addEventListener("input",p),m.addEventListener("change",v),y.addEventListener("change",h),f.addEventListener("change",w),g.addEventListener("change",E),window.imageUpload.setEnabled()}})()})();