/**
 * OSMAKO LiveApp Pro -- Bitfocus Companion Module
 * Targets Companion API 2.0 (Companion 4.3+)
 *
 * API docs: https://docs.osmako.com/remote-control/api
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { InstanceBase, InstanceStatus } from '@companion-module/base';
import { getConfigFields } from './config.js';
import { LiveAppAPI, makeEmptyState } from './api.js';
import { buildActionDefinitions } from './actions.js';
import { buildFeedbackDefinitions } from './feedbacks.js';
import { buildVariableDefinitions, buildVariableValues } from './variables.js';
import { buildPresetDefinitions, buildPresetSections } from './presets.js';
export default class LiveAppProInstance extends InstanceBase {
    constructor() {
        super(...arguments);
        this.state = makeEmptyState();
    }
    init(config, isFirstInit, _secrets) {
        return __awaiter(this, void 0, void 0, function* () {
            this.config = config;
            this.api = new LiveAppAPI(this.config.host, this.config.port);
            this.log('debug', 'Initialising LiveApp Pro module (firstInit=' + String(isFirstInit) + ')');
            this.setActionDefinitions(buildActionDefinitions(this.api, () => this.state.videocue.outputEnabled, (msg) => this.log('error', msg)));
            this.setFeedbackDefinitions(buildFeedbackDefinitions(() => this.state));
            this.setVariableDefinitions(buildVariableDefinitions());
            this.setPresetDefinitions(buildPresetSections(), buildPresetDefinitions());
            this.setVariableValues(buildVariableValues(this.state));
            this.updateStatus(InstanceStatus.Connecting);
            this.startPolling();
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.log('debug', 'Destroying LiveApp Pro module');
            this.stopPolling();
        });
    }
    configUpdated(config, _secrets) {
        return __awaiter(this, void 0, void 0, function* () {
            this.config = config;
            this.api.updateTarget(this.config.host, this.config.port);
            this.stopPolling();
            this.state = makeEmptyState();
            this.updateStatus(InstanceStatus.Connecting);
            this.startPolling();
        });
    }
    getConfigFields() {
        return getConfigFields();
    }
    startPolling() {
        var _a;
        const interval = Math.max(500, (_a = this.config.pollInterval) !== null && _a !== void 0 ? _a : 1000);
        void this.poll();
        this.pollTimer = setInterval(() => { void this.poll(); }, interval);
    }
    stopPolling() {
        if (this.pollTimer !== undefined) {
            clearInterval(this.pollTimer);
            this.pollTimer = undefined;
        }
    }
    poll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newState = yield this.api.getStatus();
                const wasConnected = this.state.connected;
                this.state = newState;
                if (!wasConnected) {
                    this.updateStatus(InstanceStatus.Ok);
                    this.log('info', 'Connected to LiveApp Pro at ' + this.config.host + ':' + String(this.config.port));
                }
                this.setVariableValues(buildVariableValues(this.state));
                this.checkAllFeedbacks();
            }
            catch (err) {
                const wasConnected = this.state.connected;
                this.state = Object.assign(Object.assign({}, makeEmptyState()), { connected: false });
                if (wasConnected) {
                    this.updateStatus(InstanceStatus.ConnectionFailure, 'Cannot reach LiveApp Pro at ' + this.config.host + ':' + String(this.config.port) +
                        '. Ensure the Inbox Server is enabled in LiveApp Pro Settings -> Inbox.');
                    this.log('warn', 'Lost connection: ' + (err instanceof Error ? err.message : String(err)));
                }
                this.setVariableValues(buildVariableValues(this.state));
                this.checkAllFeedbacks();
            }
        });
    }
}
// Upgrade scripts -- add entries here when the config schema changes between versions
export const UpgradeScripts = [];
//# sourceMappingURL=main.js.map