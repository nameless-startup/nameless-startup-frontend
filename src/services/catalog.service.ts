import {products} from '../data/products';
import type {Product} from '../data/gilan';
import {localStore,parseStored} from './local-store';
export type CatalogProduct=Product&{active:boolean;stock:Record<string,number>};
export type CatalogOverride=Partial<Pick<Product,'name'|'description'|'category'|'price'>>&{active?:boolean;stock?:Record<string,number>};
export const CATALOG_KEY='gilaneh-catalog-v1';
export const catalogService={
 subscribe:localStore.subscribe,
 snapshot:()=>localStore.read(CATALOG_KEY),
 list(raw:string|null|undefined=localStore.read(CATALOG_KEY)):CatalogProduct[]{const overrides=parseStored<Record<string,CatalogOverride>>(raw,{});return products.map(product=>({...product,active:true,stock:{},...overrides[product.id],id:product.id,image:product.image}));},
 get(id:string){return this.list().find(product=>product.id===id);},
};
