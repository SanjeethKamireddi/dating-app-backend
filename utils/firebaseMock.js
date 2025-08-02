const EventEmitter = require('events');
const mockFirebase = new EventEmitter();

const sendMockNotification = (userId, message) => {
    mockFirebase.emit('push', { userId, message });
};

mockFirebase.on('push', ({ userId, message }) => {
    console.log(`Push notification to ${userId}: ${message}`);
});

module.exports = { sendMockNotification };