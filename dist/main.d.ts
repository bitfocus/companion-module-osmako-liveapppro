/**
 * OSMAKO LiveApp Pro -- Bitfocus Companion Module
 * Targets Companion API 2.0 (Companion 4.3+)
 *
 * API docs: https://docs.osmako.com/remote-control/api
 */
import { InstanceBase } from '@companion-module/base';
import type { SomeCompanionConfigField, InstanceTypes } from '@companion-module/base';
export default class LiveAppProInstance extends InstanceBase {
    private api;
    private state;
    private pollTimer;
    private config;
    init(config: InstanceTypes['config'], isFirstInit: boolean, _secrets: InstanceTypes['secrets']): Promise<void>;
    destroy(): Promise<void>;
    configUpdated(config: InstanceTypes['config'], _secrets: InstanceTypes['secrets']): Promise<void>;
    getConfigFields(): SomeCompanionConfigField[];
    private startPolling;
    private stopPolling;
    private poll;
}
export declare const UpgradeScripts: unknown[];
//# sourceMappingURL=main.d.ts.map