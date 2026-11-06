"use client";
import { useMemo, useSyncExternalStore } from 'react';
import { commerceService, normalizeCart, type OrderItem, resolveLine } from '@/services/commerce.service';
import {catalogService} from '@/services/catalog.service';
import { parseStored } from '@/services/local-store';
export function useCart(){useSyncExternalStore(catalogService.subscribe,catalogService.snapshot,()=>null);const raw=useSyncExternalStore(commerceService.subscribe,commerceService.cartSnapshot,()=>undefined);const lines=normalizeCart(parseStored<unknown>(raw,[]));const items=lines.map(resolveLine).filter((item):item is OrderItem=>!!item);return {items,count:items.reduce((sum,item)=>sum+item.quantity,0),ready:raw!==undefined};}
export function useOrders(phone:string){const raw=useSyncExternalStore(commerceService.subscribe,()=>phone?commerceService.ordersSnapshot(phone):null,()=>undefined);return useMemo(()=>({...commerceService.parseAccount(raw),ready:raw!==undefined}),[raw]);}

export function useSavedProducts(){const raw=useSyncExternalStore(commerceService.subscribe,commerceService.savedProductsSnapshot,()=>'');return raw?raw.split(','):[];}

export function useCoupon(){const raw=useSyncExternalStore(commerceService.subscribe,commerceService.couponSnapshot,()=>null);return parseStored<string>(raw,'')==='GILAN10'?'GILAN10':'';}
