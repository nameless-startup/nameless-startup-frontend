/** Browser persistence adapter. UI components use services, never storage directly. */
export const localStore = {
 read(key:string):string|null { if(typeof window==='undefined')return null;return localStorage.getItem(key); },
 write(key:string,value:unknown) { localStorage.setItem(key,JSON.stringify(value));window.dispatchEvent(new Event('gilaneh-data')); },
 subscribe(notify:()=>void) {window.addEventListener('storage',notify);window.addEventListener('gilaneh-data',notify);return()=>{window.removeEventListener('storage',notify);window.removeEventListener('gilaneh-data',notify);};},
};
export function parseStored<T>(raw:string|null|undefined,fallback:T):T {try{return raw?(JSON.parse(raw)??fallback):fallback;}catch{return fallback;}}
