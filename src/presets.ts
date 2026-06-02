import { combineRgb } from '@companion-module/base'
import type { CompanionPresetDefinitions, CompanionPresetSection } from '@companion-module/base'
import { ActionId } from './actions.js'
import { FeedbackId } from './feedbacks.js'
import { VariableId } from './variables.js'

export function buildPresetDefinitions(): CompanionPresetDefinitions {
	const presets: CompanionPresetDefinitions = {}

	// -- Play ------------------------------------------------------------------
	presets['videocue_play'] = {
		type: 'simple',
		name: 'Play',
		style: { text: 'PLAY', size: '18', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 150, 0) },
		feedbacks: [
			{
				feedbackId: FeedbackId.IS_PLAYING,
				options: {},
				style: { bgcolor: combineRgb(255, 0, 0), color: combineRgb(255, 255, 255), text: 'PLAYING' },
			},
		],
		steps: [{ down: [{ actionId: ActionId.VIDEOCUE_PLAY, options: {} }], up: [] }],
	}

	// -- Pause -----------------------------------------------------------------
	presets['videocue_pause'] = {
		type: 'simple',
		name: 'Pause',
		style: { text: 'PAUSE', size: '18', color: combineRgb(255, 255, 255), bgcolor: combineRgb(180, 100, 0) },
		feedbacks: [],
		steps: [{ down: [{ actionId: ActionId.VIDEOCUE_PAUSE, options: {} }], up: [] }],
	}

	// -- Play/Pause Toggle -----------------------------------------------------
	presets['videocue_play_toggle'] = {
		type: 'simple',
		name: 'Play / Pause Toggle',
		style: { text: 'PLAY\nTOGGLE', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 100, 160) },
		feedbacks: [
			{
				feedbackId: FeedbackId.IS_PLAYING,
				options: {},
				style: { bgcolor: combineRgb(255, 0, 0), text: 'PAUSE' },
			},
		],
		steps: [{ down: [{ actionId: ActionId.VIDEOCUE_PLAY_TOGGLE, options: {} }], up: [] }],
	}

	// -- Next ------------------------------------------------------------------
	presets['videocue_next'] = {
		type: 'simple',
		name: 'Next Item',
		style: { text: 'NEXT\n>>', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 100, 180) },
		feedbacks: [],
		steps: [{ down: [{ actionId: ActionId.VIDEOCUE_NEXT, options: {} }], up: [] }],
	}

	// -- Prev ------------------------------------------------------------------
	presets['videocue_prev'] = {
		type: 'simple',
		name: 'Previous Item',
		style: { text: '<<\nPREV', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 100, 180) },
		feedbacks: [],
		steps: [{ down: [{ actionId: ActionId.VIDEOCUE_PREV, options: {} }], up: [] }],
	}

	// -- Output Toggle ---------------------------------------------------------
	presets['videocue_output_toggle'] = {
		type: 'simple',
		name: 'Toggle Output',
		style: { text: 'OUTPUT\nOFF', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(60, 60, 60) },
		feedbacks: [
			{
				feedbackId: FeedbackId.OUTPUT_ENABLED,
				options: {},
				style: { bgcolor: combineRgb(0, 180, 0), text: 'OUTPUT\nON' },
			},
		],
		steps: [{ down: [{ actionId: ActionId.VIDEOCUE_OUTPUT_TOGGLE, options: {} }], up: [] }],
	}

	// -- Current Item Name display --------------------------------------------
	presets['videocue_item_name'] = {
		type: 'simple',
		name: 'Current Item Name',
		style: {
			text: '$(osmako-liveapppro:' + VariableId.CURRENT_ITEM_NAME + ')',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(40, 40, 40),
		},
		feedbacks: [
			{
				feedbackId: FeedbackId.IS_PLAYING,
				options: {},
				style: { bgcolor: combineRgb(180, 0, 0) },
			},
		],
		steps: [{ down: [], up: [] }],
	}

	// -- Overlays 1-4 ---------------------------------------------------------
	for (let i = 1; i <= 4; i++) {
		presets['overlay_' + String(i)] = {
			type: 'simple',
			name: 'Overlay ' + String(i),
			style: { text: 'OVL ' + String(i), size: '18', color: combineRgb(0, 0, 0), bgcolor: combineRgb(200, 200, 60) },
			feedbacks: [
				{
					feedbackId: FeedbackId.OVERLAY_ACTIVE,
					options: { overlayIndex: i },
					style: { bgcolor: combineRgb(255, 140, 0), color: combineRgb(0, 0, 0) },
				},
			],
			steps: [{ down: [{ actionId: ActionId.OVERLAY_TOGGLE, options: { overlayIndex: i } }], up: [] }],
		}
	}

	// -- Deactivate All -------------------------------------------------------
	presets['overlay_deactivate_all'] = {
		type: 'simple',
		name: 'Deactivate All Overlays',
		style: { text: 'ALL\nOFF', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(100, 0, 100) },
		feedbacks: [],
		steps: [{ down: [{ actionId: ActionId.OVERLAY_DEACTIVATE_ALL, options: {} }], up: [] }],
	}

	return presets
}

export function buildPresetSections(): CompanionPresetSection[] {
	return [
		{
			id: 'videocue',
			name: 'VideoCue',
			definitions: [
				'videocue_play', 'videocue_pause', 'videocue_play_toggle',
				'videocue_next', 'videocue_prev', 'videocue_output_toggle', 'videocue_item_name',
			],
		},
		{
			id: 'overlay',
			name: 'Overlay',
			definitions: ['overlay_1', 'overlay_2', 'overlay_3', 'overlay_4', 'overlay_deactivate_all'],
		},
	]
}
