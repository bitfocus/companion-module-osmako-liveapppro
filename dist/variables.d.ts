import type { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base';
import type { LiveAppState } from './api.js';
export declare const VariableId: {
    readonly IS_PLAYING: "is_playing";
    readonly OUTPUT_ENABLED: "output_enabled";
    readonly CURRENT_ITEM_NAME: "current_item_name";
    readonly CURRENT_ITEM_ID: "current_item_id";
    readonly ITEM_TIME: "item_time";
    readonly ITEM_TIME_REMAINING: "item_time_remaining";
    readonly ACTIVE_OVERLAY_COUNT: "active_overlay_count";
};
export declare function buildVariableDefinitions(): Record<string, CompanionVariableDefinition>;
export declare function buildVariableValues(state: LiveAppState): CompanionVariableValues;
//# sourceMappingURL=variables.d.ts.map