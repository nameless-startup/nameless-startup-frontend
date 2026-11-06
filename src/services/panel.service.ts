import { localStore, parseStored } from './local-store';
import { commerceService } from './commerce.service';
export type Trip={id:string;name:string;destination:string;date:string};
export type PanelData={name:string;email:string;saved:string[];trips:Trip[];readWelcome:boolean;newsletter:boolean;reminders:boolean};
export const defaultPanelData:PanelData={name:'',email:'',saved:[],trips:[],readWelcome:false,newsletter:false,reminders:true};
const key=(phone:string)=>`gilaneh-panel-${phone}`;
export const panelService={
 subscribe:localStore.subscribe,
 snapshot:(phone:string)=>localStore.read(key(phone)),
 parse(raw:string|null|undefined):PanelData {const data=parseStored<Partial<PanelData>>(raw,{});return {...defaultPanelData,...data,saved:Array.isArray(data.saved)?data.saved:[],trips:Array.isArray(data.trips)?data.trips:[]};},
 update(phone:string,patch:Partial<PanelData>){localStore.write(key(phone),{...this.parse(this.snapshot(phone)),...patch});},
 initialize(phone:string){commerceService.seed(phone);const marker=`gilaneh-demo-v1-${phone}`;if(localStore.read(marker))return;const current=this.parse(this.snapshot(phone));this.update(phone,{saved:current.saved.length?current.saved:['1','4','5'],trips:current.trips.length?current.trips:[{id:'demo-trip-1',name:'آخر هفته در ماسوله',destination:'روستای ماسوله',date:'2026-11-20'},{id:'demo-trip-2',name:'یک روز کنار تالاب',destination:'لاگون انزلی',date:'2026-12-04'}]});for(const id of ["2","3"]){if(localStore.read(`favorite-product-${id}`)===null)localStore.write(`favorite-product-${id}`,true);}localStore.write(marker,true);},
};
