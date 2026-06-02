/**
 * LiveApp Pro HTTP API Client
 * API base: http://<host>:<port>/api/
 * Docs:     https://docs.osmako.com/remote-control/api
 */

export interface VideoCueStatus {
	isPlaying: boolean
	itemId: number | null
	itemName: string
	outputEnabled: boolean
	itemTimeLabel: string
	itemDurationRemainingLabel: string
}

export interface OverlayItem {
	id: number
	index: number   // 0-based grid position in the app
	name: string
	isActive: boolean
}

export interface LiveAppState {
	videocue: VideoCueStatus
	overlays: OverlayItem[]
	connected: boolean
}

export function makeEmptyState(): LiveAppState {
	return {
		connected: false,
		videocue: {
			isPlaying: false,
			itemId: null,
			itemName: '',
			outputEnabled: false,
			itemTimeLabel: '',
			itemDurationRemainingLabel: '',
		},
		overlays: [],
	}
}

export class LiveAppAPI {
	private host: string
	private port: number

	constructor(host: string, port: number) {
		this.host = host
		this.port = port
	}

	updateTarget(host: string, port: number): void {
		this.host = host
		this.port = port
	}

	private get baseUrl(): string {
		return `http://${this.host}:${this.port}/api`
	}

	// -------------------------------------------------------------------------
	// State polling  (two parallel requests; overlay list is optional)
	// -------------------------------------------------------------------------

	async getStatus(): Promise<LiveAppState> {
		const _results = await Promise.all([
			this.get('/videocue/status'),
			this.get('/overlay/list').catch(() => []),
		])
		const vcRaw = _results[0]; const overlaysRaw = _results[1]
		return this.parseState(vcRaw, overlaysRaw)
	}

	// -------------------------------------------------------------------------
	// VideoCue commands
	// -------------------------------------------------------------------------

	async videocuePlay(): Promise<void> {
		await this.post('/videocue/play')
	}

	async videocuePause(): Promise<void> {
		await this.post('/videocue/pause')
	}

	async videocuePlayToggle(): Promise<void> {
		await this.post('/videocue/play/toggle')
	}

	async videocueNext(): Promise<void> {
		await this.post('/videocue/next')
	}

	async videocuePrev(): Promise<void> {
		await this.post('/videocue/previous')
	}

	/** Load an item by its numeric ID */
	async videocueLoadById(id: number): Promise<void> {
		await this.post('/videocue/item', { id })
	}

	/** Load the first item whose name matches exactly */
	async videocueLoadByName(name: string): Promise<void> {
		await this.post('/videocue/item', { name })
	}

	async videocueOutputOn(): Promise<void> {
		await this.post('/videocue/output/on')
	}

	async videocueOutputOff(): Promise<void> {
		await this.post('/videocue/output/off')
	}

	async videocueOutputToggle(): Promise<void> {
		await this.post('/videocue/output/toggle')
	}

	// -------------------------------------------------------------------------
	// Overlay commands  (index is 0-based grid position)
	// -------------------------------------------------------------------------

	async overlayActivate(index: number): Promise<void> {
		await this.post('/overlay/activate', { index })
	}

	async overlayDeactivate(index: number): Promise<void> {
		await this.post('/overlay/deactivate', { index })
	}

	async overlayToggle(index: number): Promise<void> {
		await this.post('/overlay/toggle', { index })
	}

	async overlayDeactivateAll(): Promise<void> {
		await this.post('/overlay/deactivate/all')
	}

	// -------------------------------------------------------------------------
	// HTTP helpers
	// -------------------------------------------------------------------------

	private async get(path: string): Promise<unknown> {
		const res = await fetch(`${this.baseUrl}${path}`, {
			method: 'GET',
			headers: { Accept: 'application/json' },
			signal: AbortSignal.timeout(3000),
		})
		if (!res.ok) throw new Error(`GET ${path} → HTTP ${res.status}`)
		return res.json()
	}

	private async post(path: string, body?: unknown): Promise<void> {
		const res = await fetch(`${this.baseUrl}${path}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: body !== undefined ? JSON.stringify(body) : undefined,
			signal: AbortSignal.timeout(3000),
		})
		if (!res.ok) throw new Error(`POST ${path} → HTTP ${res.status}`)
	}

	// -------------------------------------------------------------------------
	// State parsing
	// -------------------------------------------------------------------------

	private parseState(vcRaw: unknown, overlaysRaw: unknown): LiveAppState {
		const vc = (vcRaw ?? {}) as Record<string, unknown>
		const item = (vc.item ?? {}) as Record<string, unknown>
		const overlays = Array.isArray(overlaysRaw) ? overlaysRaw as Record<string, unknown>[] : []

		return {
			connected: true,
			videocue: {
				isPlaying: Boolean(vc.playing),
				itemId: item.id != null ? Number(item.id) : null,
				itemName: String(item.name ?? ''),
				outputEnabled: Boolean(vc.outputEnabled),
				itemTimeLabel: String(vc.itemTimeLabel ?? ''),
				itemDurationRemainingLabel: String(vc.itemDurationRemainingLabel ?? ''),
			},
			overlays: overlays.map((o) => ({
				id: Number(o.id ?? 0),
				index: Number(o.index ?? 0),
				name: String(o.name ?? ''),
				isActive: Boolean(o.active),
			})),
		}
	}
}
