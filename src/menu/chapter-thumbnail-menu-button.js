import {ChapterThumbnailMenu, CHAPTER_THUMBNAIL_MENU_NAME} from './chapter-thumbnail-menu';
import {ChapterThumbnailMenuItem} from './chapter-thumbnail-menu-item';
import {TRACK_ID} from '../track/text-track';

const CHAPTER_THUMBNAIL_MENU_BUTTON_NAME = 'ChapterThumbnailMenuButton';

/**
 * @name Chapter Thumbnails Button
 * @description
 * Define the chapter thumbnails menu button component.
 * Create the chapter thumbnails menu and attach it to the player.
 *
 * @param {Object} player VideoJS player
 * @param {Object} options={}
 * @param {Object} options.name Component name
 * @param {Object} [options.template]
 */

const VjsMenuButton = videojs.getComponent('MenuButton');

class ChapterThumbnailMenuButton extends VjsMenuButton {
    constructor(player, options = {}) {
        super(player, options);

        let tracks = this.player().remoteTextTracks();

        // hide the button if there are no items
        if (this.items.length <= 0) {
            this.hide();
        }

        // do not set any events unless tracks are available
        if (!tracks) {
            return;
        }

        // NOTE: https://github.com/videojs/video.js/blob/master/src/js/control-bar/text-track-controls/text-track-button.js
        // Events follow videojs.TextTrackButton

        var update = this.update.bind(this);

        tracks.addEventListener('addtrack', update);
        tracks.addEventListener('removetrack', update);

        this.player().on('dispose', function () {
            tracks.removeEventListener('addtrack', update);
            tracks.removeEventListener('removetrack', update);
        });

        this.addClass('vjs-chapter-thumbnails-button');
        this.addClass('vjs-chapters-button');

        this.el_.setAttribute('aria-label', 'Chapters Menu');
    }

    /**
     * @name Create Menu
     * @description
     * Defined by videojs.MenuButton
     *
     * This method gets hit multiple times from multiple areas.
     * - constructor
     * - addtrack event
     * - removetrack event
     * - timeout hack
     */

    createMenu() {
        let chapter_track,
            track;

        let tracks = this.player().remoteTextTracks() || [];

        this.items = [];

        // cache menu during create menu dance
        if (!this.menu) {
            this.menu = new ChapterThumbnailMenu(this.player(), {
                name: CHAPTER_THUMBNAIL_MENU_NAME
            });
        }

        for (let i = 0, length = tracks.length; i < length; i++) {
            track = tracks[i];

            if (track.id === TRACK_ID) {
                chapter_track = track;

                break;
            }
        }

        if (!chapter_track) {
            return this.menu;
        }

        if (chapter_track && chapter_track.cues == null) {
            track.mode = 'hidden';

            let remote_text_track_el = this.player().remoteTextTrackEls().getTrackElementByTrack_(track);

            if (remote_text_track_el) {
                remote_text_track_el.addEventListener('load', (event) => this.createMenu());
            }
        }

        // create menu if track cues are available
        if (chapter_track && chapter_track.cues && chapter_track.cues.length > 0) {
            this.items = this.createItems(chapter_track);

            for (let i = 0, length = this.items.length; i < length; i++) {
                // TODO: enables - onClick close menu
                // menu.addItem(this.items[i]);

                this.menu.addChild(this.items[i]);
            }

            this.player().addChild(this.menu);

            if (this.items.length > 0) {
                this.show();
            }
        }

        return this.menu;
    }

    /**
     * @name Create Items
     * @description
     * Defined by videojs.MenuButton
     *
     */

    createItems(text_track) {
        let items = [];

        if (!text_track || text_track.cues.length <= 0) {
            return items;
        }

        let {template} = this.options_;

        for (let i = 0, length = text_track.cues.length; i < length; i++) {
            let cue = text_track.cues[i];

            items.push(new ChapterThumbnailMenuItem(this.player(), {
                cue,
                template,
                text_track
            }));
        }

        return items;
    }

    /**
     * @name Handle Click
     * @description
     * Defined by videojs.MenuButton
     */

    handleClick(event) {
        // TODO: not sure if there is a better way to determine visibility
        if (this.menu.hasClass('vjs-lock-showing')) {
            this.menu.unlockShowing();
        } else {
            this.menu.lockShowing();
        }

        this.player().el().focus();
    }

    /**
     * @name Update
     * @description
     * Defined by videojs.MenuButton
     *
     * Must override so that the menu isn't attached to the videojs.MenuButton.
     * Instead we will manage it ourselves by adding it to the player directly.
     */

    update() {
        let menu = this.createMenu();

        this.menu = menu;

        this.buttonPressed_ = false;

        if (this.items && this.items.length === 0) {
            this.hide();
        } else if (this.items && this.items.length > 1) {
            this.show();
        }
    }
}

ChapterThumbnailMenuButton.prototype.controlText_ = 'Chapters';

export {CHAPTER_THUMBNAIL_MENU_BUTTON_NAME};
export {ChapterThumbnailMenuButton};
