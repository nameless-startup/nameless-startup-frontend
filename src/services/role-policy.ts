import type { User } from '../types';
import { getAuthToken } from '../lib/api';
// Public demo credentials. Production roles and credentials must be validated by the API.
export const DEMO_ADMIN = { phone: '+989017867178', password: 'Gilaneh!2026Admin' };
export const ADMIN_TOKEN = 'gilaneh-demo-admin-session';
export const ADMIN_USER:User = {id:'demo-admin',name:'مدیر گیلانه',phone:DEMO_ADMIN.phone,role:'admin'};
export function normalizePhone(value:string):string {
 let digits=value.replace(/[۰-۹]/g,d=>String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/[٠-٩]/g,d=>String('٠١٢٣٤٥٦٧٨٩'.indexOf(d))).replace(/\D/g,'');
 if(digits.startsWith('0098'))digits=digits.slice(4);else if(digits.startsWith('98')&&digits.length===12)digits=digits.slice(2);
 if(digits.startsWith('0'))digits=digits.slice(1);
 if(!/^9\d{9}$/.test(digits))throw Error('شماره موبایل معتبر وارد کنید.');
 return '+98'+digits;
}
export function sessionUser():User|null {
 if(typeof window==='undefined'||!getAuthToken())return null;
 try {const user=JSON.parse(sessionStorage.getItem('gilaneh-mock-user')||'null') as User|null;
 if(!user||typeof user.phone!=='string')return null;
 if(user.id===ADMIN_USER.id)return getAuthToken()===ADMIN_TOKEN?{...ADMIN_USER}:null;
 return {...user,role:'user'};
 }catch{return null;}
}
export function requireAdmin(){const user=sessionUser();if(user?.role!=='admin')throw Error('این عملیات فقط برای مدیر مجاز است.');return user;}
export function verifyAdminCredentials(phone:string,password:string){return normalizePhone(phone)===DEMO_ADMIN.phone&&password===DEMO_ADMIN.password;}
