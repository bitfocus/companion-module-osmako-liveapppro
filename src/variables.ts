import type { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import type { LiveAppState } from './api.js'

export const VariableId = {
	IS_PLAYING:                'is_playing',
	OUTPUT_ENABLED:            'output_enabled',
	CURRENT_ITEM_NAME:         'current_item_name',
	CURRENT_ITEM_ID:           'current_item_id',
	ITEM_TIME:                 'item_time',
	ITEM_TIME_REMAINING:       'item_time_remaining',
	ACTIVE_OVERLAY_COUNT:      'active_overlay_count',
} as const

export function buildVariableDefinitions(): Record<string, CompanionVariableDefinition> {
	return {
		[VariableId.IS_PLAYING]:           { name: 'Is Playing' },
		[VariableId.OUTPUT_ENABLED]:       { name: 'Output Enabled' },
		[VariableId.CURRENT_ITEM_NAME]:    { name: 'Current Item Name' },
		[VariableId.CURRENT_ITEM_ID]:      { name: 'Current Item ID' },
		[VariableId.ITEM_TIME]:            { name: 'Item Time (label)' },
		[VariableId.ITEM_TIME_REMAINING]:  { name: 'Item Time Remaining (label)' },
		[VariableId.ACTIVE_OVERLAY_COUNT]: { name: 'Active Overlay Count' },
	}
}

export function buildVariableValues(state: LiveAppState): CompanionVariableValues {
	return {
		[VariableId.IS_PLAYING]:           state.videocue.isPlaying ? 'true' : 'false',
		[VariableId.OUTPUT_ENABLED]:       state.videocue.outputEnabled ? 'true' : 'false',
		[VariableId.CURRENT_ITEM_NAME]:    state.videocue.itemName,
		[VariableId.CURRENT_ITEM_ID]:      state.videocue.itemId ?? '',
		[VariableId.ITEM_TIME]:            state.videocue.itemTimeLabel,
		[VariableId.ITEM_TIME_REMAINING]:  state.videocue.itemDurationRemainingLabel,
		[VariableId.ACTIVE_OVERLAY_COUNT]: state.overlays.filter((o) => o.isActive).length,
	}
}
