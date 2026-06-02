import type { CompanionActionDefinition } from '@companion-module/base';
import type { LiveAppAPI } from './api.js';
export declare const ActionId: {
    readonly VIDEOCUE_PLAY: "videocue_play";
    readonly VIDEOCUE_PAUSE: "videocue_pause";
    readonly VIDEOCUE_PLAY_TOGGLE: "videocue_play_toggle";
    readonly VIDEOCUE_NEXT: "videocue_next";
    readonly VIDEOCUE_PREV: "videocue_prev";
    readonly VIDEOCUE_LOAD_BY_NAME: "videocue_load_by_name";
    readonly VIDEOCUE_LOAD_BY_ID: "videocue_load_by_id";
    readonly VIDEOCUE_OUTPUT_ON: "videocue_output_on";
    readonly VIDEOCUE_OUTPUT_OFF: "videocue_output_off";
    readonly VIDEOCUE_OUTPUT_TOGGLE: "videocue_output_toggle";
    readonly OVERLAY_ACTIVATE: "overlay_activate";
    readonly OVERLAY_DEACTIVATE: "overlay_deactivate";
    readonly OVERLAY_TOGGLE: "overlay_toggle";
    readonly OVERLAY_DEACTIVATE_ALL: "overlay_deactivate_all";
};
export declare function buildActionDefinitions(api: LiveAppAPI, logError: (msg: string) => void): Record<string, CompanionActionDefinition>;
//# sourceMappingURL=actions.d.ts.map