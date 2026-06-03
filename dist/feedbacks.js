import { combineRgb } from '@companion-module/base';
export const FeedbackId = {
    IS_PLAYING: 'is_playing',
    OUTPUT_ENABLED: 'output_enabled',
    OVERLAY_ACTIVE: 'overlay_active',
};
export function buildFeedbackDefinitions(getState) {
    return {
        [FeedbackId.IS_PLAYING]: {
            type: 'boolean',
            name: 'VideoCue: Is Playing',
            description: 'Active when LiveApp Pro is currently playing.',
            defaultStyle: {
                bgcolor: combineRgb(255, 0, 0),
                color: combineRgb(255, 255, 255),
            },
            options: [],
            callback: () => getState().videocue.isPlaying,
        },
        [FeedbackId.OUTPUT_ENABLED]: {
            type: 'boolean',
            name: 'VideoCue: Output Enabled',
            description: 'Active when the external video output is enabled.',
            defaultStyle: {
                bgcolor: combineRgb(0, 180, 0),
                color: combineRgb(255, 255, 255),
            },
            options: [],
            callback: () => getState().videocue.outputEnabled,
        },
        [FeedbackId.OVERLAY_ACTIVE]: {
            type: 'boolean',
            name: 'Overlay: Is Active',
            description: 'Active when the specified overlay grid position is currently showing.',
            defaultStyle: {
                bgcolor: combineRgb(255, 140, 0),
                color: combineRgb(0, 0, 0),
            },
            options: [
                {
                    type: 'number',
                    id: 'overlayIndex',
                    label: 'Overlay Position (1-based)',
                    default: 1,
                    min: 1,
                    max: 64,
                },
            ],
            callback: (feedback) => {
                var _a;
                const idx = Number(feedback.options.overlayIndex) - 1;
                const overlay = getState().overlays.find((o) => o.index === idx);
                return (_a = overlay === null || overlay === void 0 ? void 0 : overlay.isActive) !== null && _a !== void 0 ? _a : false;
            },
        },
    };
}
//# sourceMappingURL=feedbacks.js.map