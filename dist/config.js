export function getConfigFields() {
    return [
        {
            type: 'static-text',
            id: 'info',
            label: '',
            value: 'Enable the Inbox Server in LiveApp Pro under <strong>Settings &rarr; Inbox</strong>, then enter the IP address and port shown in the app below.',
            width: 12,
        },
        {
            type: 'textinput',
            id: 'host',
            label: 'LiveApp Pro Host / IP Address',
            width: 8,
            default: '192.168.1.100',
        },
        {
            type: 'number',
            id: 'port',
            label: 'Port',
            width: 4,
            default: 80,
            min: 1,
            max: 65535,
        },
        {
            type: 'number',
            id: 'pollInterval',
            label: 'Status Poll Interval (ms)',
            width: 6,
            default: 1000,
            min: 500,
            max: 10000,
        },
    ];
}
//# sourceMappingURL=config.js.map