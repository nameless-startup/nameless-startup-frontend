import type {User} from '../types';
import {localStore,parseStored} from './local-store';
export type Account=User&{active:boolean;createdAt:string};
const key='gilaneh-accounts-v1';
export const accountService={
 list():Account[]{const data=parseStored<unknown>(localStore.read(key),[]);return Array.isArray(data)?data:[];},
 remember(user:User){if(user.role==='admin')return;const users=this.list();const existing=users.find(item=>item.phone===user.phone);if(existing&&!existing.active)throw Error('این حساب غیرفعال شده است.');const account:Account={...existing,...user,role:'user',active:existing?.active??true,createdAt:existing?.createdAt||new Date().toISOString()};localStore.write(key,[account,...users.filter(item=>item.phone!==user.phone)]);},
 assertActive(phone:string){if(this.list().some(item=>item.phone===phone&&!item.active))throw Error('این حساب غیرفعال شده است. با پشتیبانی تماس بگیرید.');},
 snapshot:()=>localStore.read(key),
};
