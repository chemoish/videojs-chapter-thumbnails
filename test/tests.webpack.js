// NOTE: expose video.js globally to tests (not sure if better way)
import 'expose?videojs!video.js'; // eslint-disable-line

const context = require.context('.', true, /\.spec\.js$/);

context.keys().forEach(context);

/* fixtures */

window.fixture = document.createElement('div');
window.fixture.id = 'video_fixture';

document.body.appendChild(window.fixture);
