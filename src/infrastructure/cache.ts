import { LRUCache } from "lru-cache";

class Cache {
    private cache: LRUCache<string, any>;

    constructor() {
        this.cache = new LRUCache<string, any>({
            max: 1000,
            ttl: 1000 * 60 * 60 * 24, // 1 day
        });
    }

    set(key: string, value: any) {
        this.cache.set(key, value);
    }

    get(key: string) {
        console.log("retrieved key", key);
        return this.cache.get(key);
    }

    has(key: string) {
        return this.cache.has(key);
    }

    delete(key: string) {
        this.cache.delete(key);
    }

    clear() {
        console.log("cleared cache");
        this.cache.clear();
    }
}

export const cache = new Cache();