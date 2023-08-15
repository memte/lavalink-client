/// <reference types="node" />
import { EventEmitter } from "stream";
import { LavalinkNode, LavalinkNodeOptions } from "./Node";
import { LavalinkManager } from "./LavalinkManager";
import { MiniMap } from "./Utils";
import { DestroyReasonsType } from "./Player";
type LavalinkNodeIdentifier = string;
interface NodeManagerEvents {
    /**
     * Emitted when a Node is created.
     * @event Manager.nodeManager#create
     */
    "create": (node: LavalinkNode) => void;
    /**
     * Emitted when a Node is destroyed.
     * @event Manager.nodeManager#destroy
     */
    "destroy": (node: LavalinkNode, destroyReason?: DestroyReasonsType) => void;
    /**
     * Emitted when a Node is connected.
     * @event Manager.nodeManager#connect
     */
    "connect": (node: LavalinkNode) => void;
    /**
     * Emitted when a Node is reconnecting.
     * @event Manager.nodeManager#reconnecting
    */
    "reconnecting": (node: LavalinkNode) => void;
    /**
     * Emitted when a Node is disconnects.
     * @event Manager.nodeManager#disconnect
    */
    "disconnect": (node: LavalinkNode, reason: {
        code?: number;
        reason?: string;
    }) => void;
    /**
     * Emitted when a Node is error.
     * @event Manager.nodeManager#error
    */
    "error": (node: LavalinkNode, error: Error, payload?: unknown) => void;
    /**
     * Emits every single Node event.
     * @event Manager.nodeManager#raw
    */
    "raw": (node: LavalinkNode, payload: unknown) => void;
}
export declare interface NodeManager {
    on<U extends keyof NodeManagerEvents>(event: U, listener: NodeManagerEvents[U]): this;
    emit<U extends keyof NodeManagerEvents>(event: U, ...args: Parameters<NodeManagerEvents[U]>): boolean;
    /** @private */
    LavalinkManager: LavalinkManager;
}
export declare class NodeManager extends EventEmitter {
    nodes: MiniMap<string, LavalinkNode>;
    constructor(LavalinkManager: LavalinkManager);
    createNode(options: LavalinkNodeOptions): LavalinkNode;
    get leastUsedNodes(): LavalinkNode[];
    /** Returns the least used Nodes sorted by amount of calls. */
    private get leastUsedNodesCalls();
    /** Returns the least used Nodes sorted by amount of players. */
    private get leastUsedNodesPlayers();
    /** Returns the least used Nodes sorted by amount of memory usage. */
    private get leastUsedNodesMemory();
    /** Returns the least system load Nodes. */
    get leastLoadNodes(): LavalinkNode[];
    get leastLoadNodesMemory(): LavalinkNode[];
    /** Returns the least system load Nodes. */
    get leastLoadNodesCpu(): LavalinkNode[];
    deleteNode(node: LavalinkNodeIdentifier | LavalinkNode): void;
}
export {};
