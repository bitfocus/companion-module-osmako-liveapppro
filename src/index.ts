/**
 * OSMAKO LiveApp Pro -- Bitfocus Companion Module
 * Targets Companion API 2.0 (Companion 4.3+)
 * Docs: https://docs.osmako.com/remote-control/api
 */

import { InstanceBase, InstanceStatus } from '@companion-module/base'
import type { SomeCompanionConfigField, InstanceTypes } from '@companion-module/base'
import { getConfigFields, type ModuleConfig } from './config.js'
import { LiveAppAPI, makeEmptyState, type LiveAppState } from './api.js'
import { buildActionDefinitions } from './actions.js'
import { buildFeedbackDefinitions } from './feedbacks.js'
import { buildVariableDefinitions, buildVariableValues } from './variables.js'
import { buildPresetDefinitions, buildPresetSections } from './presets.js'

export default class LiveAppProInstance extends InstanceBase {
	private api!: LiveAppAPI
	private state: LiveAppState = makeEmptyState()
	private pollTimer: ReturnType<typeof setInterval> | undefined
	private config!: ModuleConfig

	async init(config: InstanceTypes['config'], isFirstInit: boolean, _secrets: InstanceTypes['secrets']): Promise<void> {
		this.config = config as unknown as ModuleConfig
		this.api = new LiveAppAPI(this.config.host, this.config.port)
		this.log('debug', 'Initialising LiveApp Pro module (firstInit=' + String(isFirstInit) + ')')

		this.setActionDefinitions(
			buildActionDefinitions(this.api, (msg) => this.log('error', msg)),
		)
		this.setFeedbackDefinitions(buildFeedbackDefinitions(() => this.state))
		this.setVariableDefinitions(buildVariableDefinitions())
		this.setPresetDefinitions(buildPresetSections(), buildPresetDefinitions())
		this.setVariableValues(buildVariableValues(this.state))

		this.updateStatus(InstanceStatus.Connecting)
		this.startPolling()
	}

	async destroy(): Promise<void> {
		this.log('debug', 'Destroying LiveApp Pro module')
		this.stopPolling()
	}

	async configUpdated(config: InstanceTypes['config'], _secrets: InstanceTypes['secrets']): Promise<void> {
		this.config = config as unknown as ModuleConfig
		this.api.updateTarget(this.config.host, this.config.port)
		this.stopPolling()
		this.state = makeEmptyState()
		this.updateStatus(InstanceStatus.Connecting)
		this.startPolling()
	}

	getConfigFields(): SomeCompanionConfigField[] {
		return getConfigFields()
	}

	private startPolling(): void {
		const interval = Math.max(500, this.config.pollInterval ?? 1000)
		void this.poll()
		this.pollTimer = setInterval(() => { void this.poll() }, interval)
	}

	private stopPolling(): void {
		if (this.pollTimer !== undefined) {
			clearInterval(this.pollTimer)
			this.pollTimer = undefined
		}
	}

	private async poll(): Promise<void> {
		try {
			const newState = await this.api.getStatus()
			const wasConnected = this.state.connected
			this.state = newState
			if (!wasConnected) {
				this.updateStatus(InstanceStatus.Ok)
				this.log('info', 'Connected to LiveApp Pro at ' + this.config.host + ':' + String(this.config.port))
			}
			this.setVariableValues(buildVariableValues(this.state))
			this.checkAllFeedbacks()
		} catch (err: unknown) {
			const wasConnected = this.state.connected
			this.state = { ...makeEmptyState(), connected: false }
			if (wasConnected) {
				this.updateStatus(
					InstanceStatus.ConnectionFailure,
					'Cannot reach LiveApp Pro at ' + this.config.host + ':' + String(this.config.port) +
					'. Ensure the Inbox Server is enabled in Settings -> Inbox.',
				)
				this.log('warn', 'Lost connection: ' + (err instanceof Error ? err.message : String(err)))
			}
			this.setVariableValues(buildVariableValues(this.state))
			this.checkAllFeedbacks()
		}
	}
}

export const UpgradeScripts: unknown[] = []
