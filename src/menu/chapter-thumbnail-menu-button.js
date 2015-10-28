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
 * @param {Object} options.text_track
 */

const VjsMenuButton = videojs.getComponent('MenuButton');

class ChapterThumbnailMenuButton extends VjsMenuButton {
    constructor(player, options = {}) {
        super(player, options);

        let tracks = this.player().textTracks();

        if (this.items.length <= 0) {
            this.hide();
        }

        if (!tracks) {
            return;
        }

        var update = this.update.bind(this);

        tracks.addEventListener('addtrack', update);
        tracks.addEventListener('removetrack', update);

        this.player().on('dispose', function () {
            tracks.removeEventListener('addtrack', update);
            tracks.removeEventListener('removetrack', update);
        });

        this.addClass('vjs-chapter-thumbnails-button vjs-chapters-button');

        this.el_.setAttribute('aria-label', 'Chapters Menu');
    }

    /**
     * @name Create Menu
     * @description
     * Defined by videojs.MenuButton
     *
     */

    createMenu() {
        let chapter_track;
        let tracks = this.player().textTracks() || [];

        this.items = [];

        for (let i = 0, length = tracks.length; i < length; i++) {
            let track = tracks[i];

            if (track.id !== TRACK_ID) {
                continue;
            }

            if (!track.cues) {
                track.mode = 'hidden';

                // NOTE: https://github.com/videojs/video.js/blob/master/src/js/control-bar/text-track-controls/chapters-button.js#L86
                setTimeout(() => {
                    this.createMenu();
                }, 100);
            } else {
                chapter_track = track;
            }
        }

        if (!this.menu) {
            this.menu = new ChapterThumbnailMenu(this.player(), {
                name: CHAPTER_THUMBNAIL_MENU_NAME
            });
        }

        if (chapter_track) {
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
     * @name On Click
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

        /**
         * Track the state of the menu button
         *
         * @type {Boolean}
         * @private
         */
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
