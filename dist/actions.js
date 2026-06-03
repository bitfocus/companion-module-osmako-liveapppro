var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const ActionId = {
    // VideoCue
    VIDEOCUE_PLAY: 'videocue_play',
    VIDEOCUE_PAUSE: 'videocue_pause',
    VIDEOCUE_PLAY_TOGGLE: 'videocue_play_toggle',
    VIDEOCUE_NEXT: 'videocue_next',
    VIDEOCUE_PREV: 'videocue_prev',
    VIDEOCUE_LOAD_BY_NAME: 'videocue_load_by_name',
    VIDEOCUE_LOAD_BY_ID: 'videocue_load_by_id',
    VIDEOCUE_OUTPUT_ON: 'videocue_output_on',
    VIDEOCUE_OUTPUT_OFF: 'videocue_output_off',
    VIDEOCUE_OUTPUT_TOGGLE: 'videocue_output_toggle',
    // Overlay
    OVERLAY_ACTIVATE: 'overlay_activate',
    OVERLAY_DEACTIVATE: 'overlay_deactivate',
    OVERLAY_TOGGLE: 'overlay_toggle',
    OVERLAY_DEACTIVATE_ALL: 'overlay_deactivate_all',
};
export function buildActionDefinitions(api, logError) {
    const err = (label) => (e) => logError(`${label}: ${e.message}`);
    return {
        [ActionId.VIDEOCUE_PLAY]: {
            name: 'VideoCue: Play',
            description: 'Start playback of the current item.',
            options: [],
            callback: () => __awaiter(this, void 0, void 0, function* () { yield api.videocuePlay().catch(err('Play')); }),
        },
        [ActionId.VIDEOCUE_PAUSE]: {
            name: 'VideoCue: Pause',
            description: 'Pause playback of the current item.',
            options: [],
            callback: () => __awaiter(this, void 0, void 0, function* () { yield api.videocuePause().catch(err('Pause')); }),
        },
        [ActionId.VIDEOCUE_PLAY_TOGGLE]: {
            name: 'VideoCue: Play / Pause Toggle',
            description: 'Toggle between play and pause.',
            options: [],
            callback: () => __awaiter(this, void 0, void 0, function* () { yield api.videocuePlayToggle().catch(err('Play toggle')); }),
        },
        [ActionId.VIDEOCUE_NEXT]: {
            name: 'VideoCue: Next Item',
            description: 'Advance to the next item in the playlist.',
            options: [],
            callback: () => __awaiter(this, void 0, void 0, function* () { yield api.videocueNext().catch(err('Next')); }),
        },
        [ActionId.VIDEOCUE_PREV]: {
            name: 'VideoCue: Previous Item',
            description: 'Go back to the previous item in the playlist.',
            options: [],
            callback: () => __awaiter(this, void 0, void 0, function* () { yield api.videocuePrev().catch(err('Previous')); }),
        },
        [ActionId.VIDEOCUE_LOAD_BY_NAME]: {
            name: 'VideoCue: Load Item by Name',
            description: 'Load the first item whose name matches exactly.',
            options: [
                {
                    type: 'textinput',
                    id: 'name',
                    label: 'Item Name (exact match)',
                    default: '',
                    useVariables: true,
                },
            ],
            callback: (action) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const name = String((_a = action.options.name) !== null && _a !== void 0 ? _a : '').trim();
                if (!name)
                    return;
                yield api.videocueLoadByName(name).catch(err('Load by name'));
            }),
        },
        [ActionId.VIDEOCUE_LOAD_BY_ID]: {
            name: 'VideoCue: Load Item by ID',
            description: 'Load an item by its numeric ID.',
            options: [
                {
                    type: 'number',
                    id: 'itemId',
                    label: 'Item ID',
                    default: 1,
                    min: 1,
                    max: 99999,
                },
            ],
            callback: (action) => __awaiter(this, void 0, void 0, function* () {
                yield api.videocueLoadById(Number(action.options.itemId)).catch(err('Load by ID'));
            }),
        },
        [ActionId.VIDEOCUE_OUTPUT_ON]: {
            name: 'VideoCue: Enable Output',
            description: 'Turn on the external video output.',
            options: [],
            callback: () => __awaiter(this, void 0, void 0, function* () { yield api.videocueOutputOn().catch(err('Output on')); }),
        },
        [ActionId.VIDEOCUE_OUTPUT_OFF]: {
            name: 'VideoCue: Disable Output',
            description: 'Turn off the external video output.',
            options: [],
            callback: () => __awaiter(this, void 0, void 0, function* () { yield api.videocueOutputOff().catch(err('Output off')); }),
        },
        [ActionId.VIDEOCUE_OUTPUT_TOGGLE]: {
            name: 'VideoCue: Toggle Output',
            description: 'Toggle the external video output on or off.',
            options: [],
            callback: () => __awaiter(this, void 0, void 0, function* () { yield api.videocueOutputToggle().catch(err('Output toggle')); }),
        },
        [ActionId.OVERLAY_ACTIVATE]: {
            name: 'Overlay: Activate',
            description: 'Activate (show) an overlay by its grid position.',
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
            callback: (action) => __awaiter(this, void 0, void 0, function* () {
                yield api.overlayActivate(Number(action.options.overlayIndex) - 1).catch(err('Overlay activate'));
            }),
        },
        [ActionId.OVERLAY_DEACTIVATE]: {
            name: 'Overlay: Deactivate',
            description: 'Deactivate (hide) an overlay by its grid position.',
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
            callback: (action) => __awaiter(this, void 0, void 0, function* () {
                yield api.overlayDeactivate(Number(action.options.overlayIndex) - 1).catch(err('Overlay deactivate'));
            }),
        },
        [ActionId.OVERLAY_TOGGLE]: {
            name: 'Overlay: Toggle',
            description: 'Toggle an overlay active/inactive by its grid position.',
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
            callback: (action) => __awaiter(this, void 0, void 0, function* () {
                yield api.overlayToggle(Number(action.options.overlayIndex) - 1).catch(err('Overlay toggle'));
            }),
        },
        [ActionId.OVERLAY_DEACTIVATE_ALL]: {
            name: 'Overlay: Deactivate All',
            description: 'Deactivate every active overlay (equivalent to ALL OFF in the app).',
            options: [],
            callback: () => __awaiter(this, void 0, void 0, function* () { yield api.overlayDeactivateAll().catch(err('Overlay deactivate all')); }),
        },
    };
}
//# sourceMappingURL=actions.js.map