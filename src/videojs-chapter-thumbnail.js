import './videojs-chapter-thumbnail.scss';

import {ChapterThumbnailMenuButton, CHAPTER_THUMBNAIL_MENU_BUTTON_NAME} from './menu/chapter-thumbnail-menu-button';
import {TRACK_ID} from './track/text-track';

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
 * videojs('player_id', {
 *     plugins: {
 *         chapter_thumbnails: {
 *             label:    'English',
 *             language: 'en',
 *             src:      'chapters.vtt'
 *         }
 *     }
 * });
 *
 * videojs('player_id').chapter_thumbnails({
 *     label:    'English',
 *     language: 'en',
 *     src:      'chapters.vtt'
 * });
 *
 * @param {Object} player VideoJS player
 * @param {Object} options={}
 * @param {Object} [options.label=English]
 * @param {Object} [options.language=en]
 * @param {Object} options.src
 * @param {Object} [options.template]
 */

export default class ChapterThumbnails {
    constructor(player, options = {}) {
        const defaults = {
            label:    'English',
            language: 'en'
        };

        this.player = player;

        this.text_track = videojs.mergeOptions(defaults, options, {
            default: true,
            kind:    'metadata',
            id:      TRACK_ID
        });

        this.template = this.text_track.template;
    }

    addComponent() {
        let control_bar = this.player.getChild('controlBar');

        let chapter_button = control_bar.getChild('chaptersButton');

        let chapter_thumbnail_menu_button = control_bar.getChild(CHAPTER_THUMBNAIL_MENU_BUTTON_NAME);

        // remove existing menu—menu button will be hidden if there are no items found
        if (chapter_thumbnail_menu_button && chapter_thumbnail_menu_button.menu) {
            chapter_thumbnail_menu_button.menu.dispose();

            delete chapter_thumbnail_menu_button.menu;
        } else {
            chapter_thumbnail_menu_button = new ChapterThumbnailMenuButton(this.player, {
                name: CHAPTER_THUMBNAIL_MENU_BUTTON_NAME,
                template: this.template
            });

            // add component to end of control bar
            control_bar.addChild(chapter_thumbnail_menu_button);

            // move component—there is no component index placement
            control_bar.el().insertBefore(chapter_thumbnail_menu_button.el(), chapter_button.el());
        }

        this.addTextTrack();
    }

    addTextTrack() {
        let current_text_track = this.player.remoteTextTracks().getTrackById(TRACK_ID);

        // remove existing track
        if (current_text_track) {
            this.player.removeRemoteTextTrack(current_text_track);
        }

        // add new track
        this.player.addRemoteTextTrack(this.text_track);
    }
}

videojs.plugin('chapter_thumbnails', function chapter_thumbnails(options) {
    let chapter_thumbnail = new ChapterThumbnails(this, options);

    chapter_thumbnail.addComponent();
});
