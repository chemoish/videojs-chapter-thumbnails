import {MenuButton, MENU_BUTTON_NAME} from './menu-button';
import {TRACK_ID} from './track';

import {extend} from './helper';

const defaults = {
    label:    'English',
    language: 'en'
};

/**
 * @name Chapters Plugin
 * @description
 * Define chapters plugin by specifying a WebVTT spec.
 * http://dev.w3.org/html5/webvtt/
 *
 * Abide by the following:
 *
 * @example
 * WEBVTT
 *
 * 00:00:00.000 --> 00:10:00.000
 * {
 *     "title":"Introduction",
 *     "image":"http://www.example.com/example.jpg"
 * }
 *
 * @example
 * vjs('player_id', {
 *     plugins: {
 *         chapter_thumbnails: {
 *             label:    'English',
 *             language: 'en',
 *             src:      'chapters.vtt'
 *         }
 *     }
 * });
 *
 * vjs('player_id').chapter_thumbnails({
 *     label:    'English',
 *     language: 'en',
 *     src:      'chapters.vtt'
 * });
 *
 * @param {Object} options
 * @param {Object} [options.label]
 * @param {Object} [options.language]
 * @param {Object} options.src
 */

class ChapterThumbnails {
    constructor(player, options) {
        this.player = player;
        this.options = options;

        this.addComponent(player, options);
    }

    addComponent(player, options) {
        let control_bar = player.getChild('controlBar');

        let menu_button = control_bar.getChild(MENU_BUTTON_NAME);

        if (menu_button != null) {
            control_bar.removeChild(menu_button);

            menu_button.dispose();
        }

        let text_track = this.addTextTrack(player, options);

        menu_button = new MenuButton(player, {
            name: MENU_BUTTON_NAME,
            text_track
        });

        control_bar.addChild(menu_button);
    }

    addTextTrack(player, options) {
        let current_text_track = player.textTracks().getTrackById(TRACK_ID);

        if (current_text_track !== undefined) {
            player.removeRemoteTextTrack(current_text_track);
        }

        let text_track = extend(defaults, options, {
            kind: 'metadata',
            id:   TRACK_ID
        });

        return player.addRemoteTextTrack(text_track);
    }
}

videojs.plugin('chapter_thumbnails', function chapter_thumbnails(options) {
    new ChapterThumbnails(this, options);
});
