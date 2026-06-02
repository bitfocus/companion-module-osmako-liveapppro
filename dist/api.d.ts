/**
 * LiveApp Pro HTTP API Client
 * API base: http://<host>:<port>/api/
 * Docs:     https://docs.osmako.com/remote-control/api
 */
export interface VideoCueStatus {
    isPlaying: boolean;
    itemId: number | null;
    itemName: string;
    outputEnabled: boolean;
    itemTimeLabel: string;
    itemDurationRemainingLabel: string;
}
export interface OverlayItem {
    id: number;
    index: number;
    name: string;
    isActive: boolean;
}
export interface LiveAppState {
    videocue: VideoCueStatus;
    overlays: OverlayItem[];
    connected: boolean;
}
export declare function makeEmptyState(): LiveAppState;
export declare class LiveAppAPI {
    private host;
    private port;
    constructor(host: string, port: number);
    updateTarget(host: string, port: number): void;
    private get baseUrl();
    getStatus(): Promise<LiveAppState>;
    videocuePlay(): Promise<void>;
    videocuePause(): Promise<void>;
    videocuePlayToggle(): Promise<void>;
    videocueNext(): Promise<void>;
    videocuePrev(): Promise<void>;
    /** Load an item by its numeric ID */
    videocueLoadById(id: number): Promise<void>;
    /** Load the first item whose name matches exactly */
    videocueLoadByName(name: string): Promise<void>;
    videocueOutputOn(): Promise<void>;
    videocueOutputOff(): Promise<void>;
    videocueOutputToggle(): Promise<void>;
    overlayActivate(index: number): Promise<void>;
    overlayDeactivate(index: number): Promise<void>;
    overlayToggle(index: number): Promise<void>;
    overlayDeactivateAll(): Promise<void>;
    private get;
    private post;
    private parseState;
}
//# sourceMappingURL=api.d.ts.map