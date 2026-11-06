import { products } from '../data/products';
import {catalogService} from './catalog.service';
import { localStore, parseStored } from './local-store';

export type CartLine={id:string;variant:string;quantity:number};
export type OrderItem=CartLine&{name:string;image:string;unitPrice:number;variantLabel:string};
export type Address={recipient:string;phone:string;city:string;address:string;postalCode:string};
export type Order={id:string;createdAt:string;status:'processing'|'shipped'|'delivered'|'cancelled';items:OrderItem[];subtotal:number;shipping:number;discount:number;total:number;address:Address;demo:boolean;coupon:string};
type CommerceData={version:1;orders:Order[];lastAddress:Address|null};
export const formatPrice=(amount:number)=>`${new Intl.NumberFormat('fa-IR',{maximumFractionDigits:2}).format(amount)} دلار`;
const round=(n:number)=>Math.round(n*100)/100;
export const catalogOptions:Record<string,{label:string;variants:{id:string;label:string;extra:number;stock:number}[]}>= {
 '1':{label:'رنگ دوخت',variants:[{id:'natural',label:'طبیعی',extra:0,stock:8},{id:'violet',label:'بنفش',extra:5,stock:4}]},
 '2':{label:'وزن',variants:[{id:'250g',label:'۲۵۰ گرم',extra:0,stock:20},{id:'500g',label:'۵۰۰ گرم',extra:14,stock:12}]},
 '3':{label:'رنگ لعاب',variants:[{id:'green',label:'سبز',extra:0,stock:10},{id:'blue',label:'آبی',extra:0,stock:6}]},
 '4':{label:'بسته‌بندی',variants:[{id:'standard',label:'استاندارد',extra:0,stock:10},{id:'gift',label:'هدیه',extra:8,stock:5}]},
};
export function resolveLine(line:CartLine):OrderItem|null {const product=catalogService.get(line.id);const option=catalogOptions[line.id]?.variants.find(v=>v.id===line.variant);if(!product||!option)return null;return {...line,name:product.name,image:product.image,unitPrice:round(product.price+option.extra),variantLabel:option.label};}
export function stockFor(id:string,variant:string){return catalogService.get(id)?.stock[variant]??catalogOptions[id]?.variants.find(v=>v.id===variant)?.stock??0;}
export function normalizeCart(raw:unknown):CartLine[]{if(!Array.isArray(raw))return [];const result:CartLine[]=[];for(const candidate of raw){if(!candidate||typeof candidate.id!=='string')continue;const variant=catalogOptions[candidate.id]?.variants.find(v=>v.id===candidate.variant)||catalogOptions[candidate.id]?.variants[0];if(candidate.variant&&variant?.id!==candidate.variant)continue;if(!variant||!Number.isInteger(candidate.quantity)||candidate.quantity<1)continue;const existing=result.find(l=>l.id===candidate.id&&l.variant===variant.id);if(existing)existing.quantity=Math.min(stockFor(candidate.id,variant.id),existing.quantity+candidate.quantity);else result.push({id:candidate.id,variant:variant.id,quantity:Math.min(candidate.quantity,stockFor(candidate.id,variant.id))});}return result.filter(item=>item.quantity>0);}
const orderKey=(phone:string)=>`gilaneh-orders-v1-${phone}`;
export const commerceService={
 subscribe:localStore.subscribe,
 favoriteSnapshot:(id:string)=>localStore.read(`favorite-product-${id}`)==="true",
 savedProductsSnapshot:()=>products.filter(p=>localStore.read(`favorite-product-${p.id}`)==="true").map(p=>p.id).join(","),
 toggleFavorite(id:string){localStore.write(`favorite-product-${id}`,!this.favoriteSnapshot(id));},
 couponSnapshot:()=>localStore.read("gilaneh-coupon"),
 setCoupon(code:string){if(code&&code!=="GILAN10")throw Error("کد تخفیف معتبر نیست.");localStore.write("gilaneh-coupon",code);},
 cartSnapshot:()=>localStore.read('gilaneh-cart'),
 cart:():CartLine[]=>normalizeCart(parseStored<unknown>(localStore.read('gilaneh-cart'),[])),
 add(id:string,variant:string,quantity:number){const option=catalogOptions[id]?.variants.find(v=>v.id===variant);if(!option||!Number.isInteger(quantity)||quantity<1)throw Error('گزینه یا تعداد محصول معتبر نیست.');const cart=this.cart();const item=cart.find(l=>l.id===id&&l.variant===variant);if(!catalogService.get(id)?.active)throw Error("این محصول فعلاً قابل خرید نیست.");if(quantity+(item?.quantity||0)>stockFor(id,variant))throw Error(`حداکثر موجودی این گزینه ${stockFor(id,variant).toLocaleString('fa-IR')} عدد است.`);if(item)item.quantity+=quantity;else cart.push({id,variant,quantity});localStore.write('gilaneh-cart',cart);},
 setQuantity(id:string,variant:string,quantity:number){const option=catalogOptions[id]?.variants.find(v=>v.id===variant);if(!option||!Number.isInteger(quantity)||quantity<1||quantity>stockFor(id,variant))throw Error('تعداد انتخاب‌شده خارج از موجودی است.');localStore.write('gilaneh-cart',this.cart().map(l=>l.id===id&&l.variant===variant?{...l,quantity}:l));},
 remove(id:string,variant:string){localStore.write('gilaneh-cart',this.cart().filter(l=>l.id!==id||l.variant!==variant));},
 ordersSnapshot:(phone:string)=>localStore.read(orderKey(phone)),
 parseAccount(raw:string|null|undefined):CommerceData{const value=parseStored<Partial<CommerceData>>(raw,{});return {version:1,orders:Array.isArray(value.orders)?value.orders:[],lastAddress:value.lastAddress||null};},
 account(phone:string):CommerceData{return this.parseAccount(localStore.read(orderKey(phone)));},
 totals(items:OrderItem[],coupon=''){const subtotal=round(items.reduce((sum,item)=>sum+item.unitPrice*item.quantity,0));const discount=coupon==='GILAN10'?round(subtotal*.1):0;const shipping=subtotal===0||subtotal>=100?0:5;return {subtotal,discount,shipping,total:round(subtotal-discount+shipping)};},
 checkout(phone:string,address:Address,coupon:string):Order {if(!phone)throw Error('برای ثبت سفارش وارد حساب شوید.');if(!address.recipient.trim()||!address.city.trim()||address.address.trim().length<10||!/^\d{10}$/.test(address.postalCode)||!/^0?9\d{9}$/.test(address.phone.replace(/\s/g,'')))throw Error('نام، شماره موبایل، شهر، آدرس کامل و کد پستی ۱۰ رقمی را بررسی کنید.');if(coupon&&coupon!=='GILAN10')throw Error('کد تخفیف معتبر نیست.');const lines=this.cart();if(lines.some(line=>!catalogService.get(line.id)?.active))throw Error('یکی از کالاهای سبد غیرفعال شده است. آن را از سبد حذف کنید.');const items=lines.map(resolveLine).filter((l):l is OrderItem=>!!l);if(!items.length)throw Error('سبد خرید خالی است.');const data=this.account(phone);const order:Order={id:`GL-${crypto.randomUUID().slice(0,8).toUpperCase()}`,createdAt:new Date().toISOString(),status:'processing',items,...this.totals(items,coupon),address,demo:true,coupon};
 // Keep a rollback snapshot so an account-storage failure does not lose the basket.
 const previousCart=localStore.read('gilaneh-cart');
 try{localStore.write('gilaneh-cart',[]);localStore.write(orderKey(phone),{...data,orders:[order,...data.orders],lastAddress:address});}catch(error){if(previousCart)localStorage.setItem('gilaneh-cart',previousCart);window.dispatchEvent(new Event('gilaneh-data'));throw error;}return order;},
 cancel(phone:string,id:string){const data=this.account(phone);const order=data.orders.find(o=>o.id===id);if(!order||order.status!=='processing')throw Error('فقط سفارش در حال آماده‌سازی قابل لغو است.');localStore.write(orderKey(phone),{...data,orders:data.orders.map(o=>o.id===id?{...o,status:'cancelled'}:o)});},
 reorder(phone:string,id:string){const order=this.account(phone).orders.find(o=>o.id===id);if(!order)throw Error('سفارش پیدا نشد.');const next=this.cart();for(const item of order.items){const option=catalogOptions[item.id]?.variants.find(v=>v.id===item.variant);if(!option||!catalogService.get(item.id)?.active)throw Error('یکی از گزینه‌ها دیگر موجود نیست.');const existing=next.find(l=>l.id===item.id&&l.variant===item.variant);if((existing?.quantity||0)+item.quantity>stockFor(item.id,item.variant))throw Error('موجودی برای خرید مجدد کافی نیست؛ تعداد سبد را بررسی کنید.');if(existing)existing.quantity+=item.quantity;else next.push({id:item.id,variant:item.variant,quantity:item.quantity});}localStore.write('gilaneh-cart',next);},
 seed(phone:string,name="هم‌سفر گیلانه"){const existing=this.account(phone);if(existing.orders.some(order=>order.id.startsWith('GL-DEMO-')))return;const address:Address={recipient:name,phone:phone.replace('+98','0'),city:'رشت',address:'گلسار، خیابان نمونه، پلاک ۱۲، واحد ۳',postalCode:'4165634578'};const make=(id:string,status:Order['status'],date:string,lines:CartLine[]):Order=>{const items=lines.map(resolveLine).filter((l):l is OrderItem=>!!l);return {id,status,createdAt:date,items,...this.totals(items),address,demo:true,coupon:''};};localStore.write(orderKey(phone),{version:1,lastAddress:existing.lastAddress||address,orders:[...existing.orders,make('GL-DEMO-1003','processing','2026-11-05T09:30:00Z',[{id:'2',variant:'500g',quantity:2}]),make('GL-DEMO-1002','shipped','2026-11-02T10:00:00Z',[{id:'3',variant:'green',quantity:1},{id:'4',variant:'gift',quantity:1}]),make('GL-DEMO-1001','delivered','2026-10-20T12:00:00Z',[{id:'1',variant:'natural',quantity:1}])]});},
};
