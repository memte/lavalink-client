import { Track } from "./Track";
export interface StoredQueue {
    currentTrack: Track | null;
    previousTracks: Track[];
    nextTracks: Track[];
}
export interface StoreManager extends Record<any, any> {
    /** @async get a Value (MUST RETURN UNPARSED!) */
    get: (guildId: unknown) => Promise<any>;
    /** @async Set a value inside a guildId (MUST BE UNPARSED) */
    set: (guildId: unknown, value: unknown) => Promise<any>;
    /** @async Delete a Database Value based of it's guildId */
    delete: (guildId: unknown) => Promise<any>;
    /** @async Transform the value(s) inside of the StoreManager (IF YOU DON'T NEED PARSING/STRINGIFY, then just return the value) */
    stringify: (value: unknown) => Promise<any>;
    /** @async Parse the saved value back to the Queue (IF YOU DON'T NEED PARSING/STRINGIFY, then just return the value) */
    parse: (value: unknown) => Promise<Partial<StoredQueue>>;
}
export interface QueueSaverOptions {
    maxPreviousTracks: number;
}
export interface QueueSaver {
    /** @private */
    _: StoreManager;
    /** @private */
    options: QueueSaverOptions;
}
export declare class QueueSaver {
    constructor(storeManager: StoreManager, options: QueueSaverOptions);
    get(guildId: string): Promise<Partial<StoredQueue>>;
    delete(guildId: string): Promise<any>;
    set(guildId: string, value: any): Promise<any>;
    sync(guildId: string): Promise<Partial<StoredQueue>>;
}
export declare class DefaultQueueStore {
    private data;
    constructor();
    get(guildId: any): Promise<any>;
    set(guildId: any, stringifiedValue: any): Promise<Map<any, any>>;
    delete(guildId: any): Promise<boolean>;
    stringify(value: any): Promise<any>;
    parse(value: any): Promise<Partial<StoredQueue>>;
}
export declare class Queue {
    readonly tracks: Track[];
    readonly previous: Track[];
    current: Track | null;
    options: {
        maxPreviousTracks: number;
    };
    private readonly guildId;
    protected readonly QueueSaver: QueueSaver | null;
    static readonly StaticSymbol: Symbol;
    private managerUtils;
    constructor(guildId: string, data?: Partial<StoredQueue>, QueueSaver?: QueueSaver);
    /**
     * Utils for a Queue
     */
    utils: {
        /**
         * Save the current cached Queue on the database/server (overides the server)
         */
        save: () => Promise<any>;
        /**
         * Sync the current queue database/server with the cached one
         * @returns {void}
         */
        sync: (override?: boolean, dontSyncCurrent?: boolean) => Promise<void>;
        destroy: () => Promise<any>;
        /**
         * @returns {{currentTrack:Track|null, previousTracks:Track[], nextTracks:Track[]}}The Queue, but in a raw State, which allows easier handling for the storeManager
         */
        getRaw: () => StoredQueue;
        /**
         * Get the Total Duration of the Queue-Songs summed up
         * @returns {number}
         */
        totalDuration: () => number;
        /**
         * Shuffles the current Queue, then saves it
         * @returns Amount of Tracks in the Queue
         */
        shuffle: () => Promise<number>;
    };
    /**
     * Add a Track to the Queue, and after saved in the "db" it returns the amount of the Tracks
     * @param {Track | Track[]} TrackOrTracks
     * @param {number} index At what position to add the Track
     * @returns {number} Queue-Size (for the next Tracks)
     */
    add(TrackOrTracks: Track | Track[], index?: number): any;
    /**
     * Splice the nextTracks in the Queue
     * @param {number} index Where to remove the Track
     * @param {number} amount How many Tracks to remove?
     * @param {Track | Track[]} TrackOrTracks Want to Add more Tracks?
     * @returns {Track} Spliced Track
     */
    splice(index: number, amount: number, TrackOrTracks?: Track | Track[]): any;
}
