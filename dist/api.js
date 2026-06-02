/**
 * LiveApp Pro HTTP API Client
 * API base: http://<host>:<port>/api/
 * Docs:     https://docs.osmako.com/remote-control/api
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
export function makeEmptyState() {
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
    };
}
export class LiveAppAPI {
    constructor(host, port) {
        this.host = host;
        this.port = port;
    }
    updateTarget(host, port) {
        this.host = host;
        this.port = port;
    }
    get baseUrl() {
        return `http://${this.host}:${this.port}/api`;
    }
    // -------------------------------------------------------------------------
    // State polling  (two parallel requests; overlay list is optional)
    // -------------------------------------------------------------------------
    getStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const _results = yield Promise.all([
                this.get('/videocue/status'),
                this.get('/overlay/list').catch(() => []),
            ]);
            const vcRaw = _results[0];
            const overlaysRaw = _results[1];
            return this.parseState(vcRaw, overlaysRaw);
        });
    }
    // -------------------------------------------------------------------------
    // VideoCue commands
    // -------------------------------------------------------------------------
    videocuePlay() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('/videocue/play');
        });
    }
    videocuePause() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('/videocue/pause');
        });
    }
    videocuePlayToggle() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('/videocue/play/toggle');
        });
    }
    videocueNext() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('/videocue/next');
        });
    }
    videocuePrev() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('/videocue/previous');
        });
    }
    /** Load an item by its numeric ID */
    videocueLoadById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('/videocue/item', { id });
        });
    }
    /** Load the first item whose name matches exactly */
    videocueLoadByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('/videocue/item', { name });
        });
    }
    videocueOutputOn() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('/videocue/output/on');
        });
    }
    videocueOutputOff() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('/videocue/output/off');
        });
    }
    videocueOutputToggle() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('/videocue/output/toggle');
        });
    }
    // -------------------------------------------------------------------------
    // Overlay commands  (index is 0-based grid position)
    // -------------------------------------------------------------------------
    overlayActivate(index) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('/overlay/activate', { index });
        });
    }
    overlayDeactivate(index) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('/overlay/deactivate', { index });
        });
    }
    overlayToggle(index) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('/overlay/toggle', { index });
        });
    }
    overlayDeactivateAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('/overlay/deactivate/all');
        });
    }
    // -------------------------------------------------------------------------
    // HTTP helpers
    // -------------------------------------------------------------------------
    get(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}${path}`, {
                method: 'GET',
                headers: { Accept: 'application/json' },
                signal: AbortSignal.timeout(3000),
            });
            if (!res.ok)
                throw new Error(`GET ${path} → HTTP ${res.status}`);
            return res.json();
        });
    }
    post(path, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}${path}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: body !== undefined ? JSON.stringify(body) : undefined,
                signal: AbortSignal.timeout(3000),
            });
            if (!res.ok)
                throw new Error(`POST ${path} → HTTP ${res.status}`);
        });
    }
    // -------------------------------------------------------------------------
    // State parsing
    // -------------------------------------------------------------------------
    parseState(vcRaw, overlaysRaw) {
        var _a, _b, _c, _d;
        const vc = (vcRaw !== null && vcRaw !== void 0 ? vcRaw : {});
        const item = ((_a = vc.item) !== null && _a !== void 0 ? _a : {});
        const overlays = Array.isArray(overlaysRaw) ? overlaysRaw : [];
        return {
            connected: true,
            videocue: {
                isPlaying: Boolean(vc.playing),
                itemId: item.id != null ? Number(item.id) : null,
                itemName: String((_b = item.name) !== null && _b !== void 0 ? _b : ''),
                outputEnabled: Boolean(vc.outputEnabled),
                itemTimeLabel: String((_c = vc.itemTimeLabel) !== null && _c !== void 0 ? _c : ''),
                itemDurationRemainingLabel: String((_d = vc.itemDurationRemainingLabel) !== null && _d !== void 0 ? _d : ''),
            },
            overlays: overlays.map((o) => {
                var _a, _b, _c;
                return ({
                    id: Number((_a = o.id) !== null && _a !== void 0 ? _a : 0),
                    index: Number((_b = o.index) !== null && _b !== void 0 ? _b : 0),
                    name: String((_c = o.name) !== null && _c !== void 0 ? _c : ''),
                    isActive: Boolean(o.active),
                });
            }),
        };
    }
}
//# sourceMappingURL=api.js.map