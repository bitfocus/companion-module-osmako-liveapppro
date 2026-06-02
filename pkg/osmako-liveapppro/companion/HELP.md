# OSMAKO LiveApp Pro

Control **LiveApp Pro** (by OSMAKO) from Bitfocus Companion. This module uses the LiveApp Pro HTTP API introduced in version 1.5 of the app.

## Requirements

- **LiveApp Pro** v1.5 or later (iOS / macOS Apple Silicon)
- The **Inbox Server** must be enabled in LiveApp Pro Settings → Inbox
- LiveApp Pro and Companion must be on the **same local network**

## Setup

1. In LiveApp Pro, open **Settings → Inbox** and enable the Inbox Server.
2. Note the IP address and port shown in the app.
3. In Companion, add a new connection for **OSMAKO LiveApp Pro**.
4. Enter the **IP address** and **port** from the app.
5. Click **Save**. The connection indicator will turn green when communication is established.

## Features

### Actions

**VideoCue**
- Play — start playback of the current section
- Stop — stop playback
- Next Section — advance to the next section
- Previous Section — go back to the previous section
- Go to Section — jump to a specific section by index (1-based)
- Toggle Output — enable or disable the external HDMI output

**Overlay**
- Show Overlay — activate an overlay slot by index (1-based)
- Hide Overlay — deactivate an overlay slot by index (1-based)
- Hide All Overlays — deactivate every active overlay

### Feedbacks

- **Is Playing** — lights up when VideoCue is actively playing
- **Output Enabled** — lights up when the external output is active
- **Overlay Active** — lights up when a specific overlay slot is active

### Variables

| Variable | Description |
|---|---|
| `$(osmako-liveapppro:is_playing)` | `true` when a video is playing |
| `$(osmako-liveapppro:section_index)` | Current section index (1-based) |
| `$(osmako-liveapppro:section_name)` | Name of the current section |
| `$(osmako-liveapppro:output_enabled)` | `true` when external output is active |
| `$(osmako-liveapppro:active_overlay_count)` | Number of currently active overlays |

## API Reference

Full API documentation: [docs.osmako.com/remote-control/api](https://docs.osmako.com/remote-control/api)
