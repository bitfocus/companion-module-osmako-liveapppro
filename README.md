# companion-module-osmako-liveapppro

Bitfocus Companion module for [OSMAKO LiveApp Pro](https://www.osmako.com/) — control video playout, overlays, and ATEM switcher integration from Companion buttons.

Requires LiveApp Pro v1.5 or later.

---

## Setup

1. In LiveApp Pro, go to **Settings → Inbox** and enable the Inbox Server. Note the IP address and port shown (default port is **80**).
2. In LiveApp Pro, go to **Settings → Inbox → Allow Remote Control** and enable it so POST commands are accepted.
3. In Companion, add a new connection and search for **OSMAKO LiveApp Pro**.
4. Enter the IP address and port from step 1.

---

## Actions

### VideoCue

| Action | Description |
|--------|-------------|
| **Play** | Start playback of the current item |
| **Pause** | Pause playback |
| **Play / Pause Toggle** | Toggle between play and pause |
| **Next Item** | Advance to the next item in the playlist |
| **Previous Item** | Go back to the previous item |
| **Load Item by Name** | Load the first item whose name matches exactly |
| **Load Item by ID** | Load an item by its numeric ID |
| **Enable Output** | Turn on the external video output |
| **Disable Output** | Turn off the external video output |
| **Toggle Output** | Toggle the external video output on or off |

### Overlay

| Action | Description |
|--------|-------------|
| **Activate** | Show an overlay by grid position (1-based) |
| **Deactivate** | Hide an overlay by grid position (1-based) |
| **Toggle** | Toggle an overlay on/off by grid position (1-based) |
| **Deactivate All** | Hide all overlays (equivalent to ALL OFF in the app) |

---

## Feedbacks

| Feedback | Description |
|----------|-------------|
| **Is Playing** | Lights up when LiveApp Pro is playing |
| **Output Enabled** | Lights up when the external video output is on |
| **Overlay Active** | Lights up when the specified overlay position is active |

---

## Variables

| Variable | Description |
|----------|-------------|
| `$(osmako-liveapppro:is_playing)` | `true` / `false` |
| `$(osmako-liveapppro:output_enabled)` | `true` / `false` |
| `$(osmako-liveapppro:current_item_name)` | Name of the currently loaded item |
| `$(osmako-liveapppro:current_item_id)` | Numeric ID of the currently loaded item |
| `$(osmako-liveapppro:item_time)` | Current playback time label (e.g. `00:13`) |
| `$(osmako-liveapppro:item_time_remaining)` | Remaining time label (e.g. `-00:05`) |
| `$(osmako-liveapppro:active_overlay_count)` | Number of currently active overlays |

---

## Presets

Ready-to-use button presets are included under the **VideoCue** and **Overlay** sections:

- Play (turns red and shows PLAYING while active)
- Pause
- Play/Pause Toggle
- Next Item / Previous Item
- Toggle Output (shows green when output is on)
- Current Item Name display (turns red while playing)
- Overlay 1–4 toggle buttons (turn orange when active)
- Deactivate All Overlays

---

## Notes

- Overlay positions are **1-based** in Companion actions/feedbacks, matching the grid position shown in the LiveApp Pro interface (left to right, top to bottom).
- The **Load Item by Name** action requires an exact name match.
- The Overlay feature requires **LiveApp Pro** (not the Play variant).

---

## License

MIT
"# companion-module-osmako-liveapppro" 
