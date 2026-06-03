import { type CompanionFeedbackDefinition } from '@companion-module/base';
import type { LiveAppState } from './api.js';
export declare const FeedbackId: {
    readonly IS_PLAYING: "is_playing";
    readonly OUTPUT_ENABLED: "output_enabled";
    readonly OVERLAY_ACTIVE: "overlay_active";
};
export declare function buildFeedbackDefinitions(getState: () => LiveAppState): Record<string, CompanionFeedbackDefinition>;
//# sourceMappingURL=feedbacks.d.ts.map