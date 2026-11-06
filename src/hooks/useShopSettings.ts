"use client";
import {useMemo,useSyncExternalStore} from 'react';
import {localStore,parseStored} from '@/services/local-store';
export function useShopSettings(){const raw=useSyncExternalStore(localStore.subscribe,()=>localStore.read('gilaneh-admin-settings-v1'),()=>null);return useMemo(()=>({...{name:'گیلانه',notice:'سفارش‌ها در این نسخه آزمایشی هستند.'},...parseStored<{name?:string;notice?:string}>(raw,{})}),[raw]);}
