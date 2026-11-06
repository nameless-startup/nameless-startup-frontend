"use client";
import {useMemo,useSyncExternalStore} from 'react';
import {catalogService} from '@/services/catalog.service';
export function useCatalog(){const raw=useSyncExternalStore(catalogService.subscribe,catalogService.snapshot,()=>null);return useMemo(()=>catalogService.list(raw),[raw]);}
