import {Menu, MENU_NAME} from './menu';
import MenuItem from './menu-item';
import {TRACK_ID} from './track';

export const MENU_BUTTON_NAME = 'ChapterThumbnailMenuButton';

/**
 * @name Chapter Thumbnails Button
 * @description
 * Define the chapter thumbnails menu button component.
 * Create the chapter thumbnails menu and attach it to the player.
 *
 * @param {Object} player VideoJS player
 * @param {Object} options={}
 * @param {Object} options.name Component name
 * @param {Object} options.text_track
 */

export let MenuButton = videojs.MenuButton.extend({
    init: function (player, options = {}) {
        this.buttonText = 'Chapters';
        this.className  = 'vjs-chapter-thumbnails-button vjs-chapters-button';

        videojs.MenuButton.call(this, player, options);

        this.el().setAttribute('aria-label','Chapters Menu');
    },

    createMenu() {
        let menu = this.player().getChild(MENU_NAME);

        if (menu != null) {
            this.player().removeChild(menu);
        }

        menu = new Menu(this.player(), {
            name: MENU_NAME
        });

        let text_track_element = this.options().text_track;

        text_track_element.addEventListener('load', (event) => {
            let text_track = this.player().textTracks().getTrackById(TRACK_ID);

            this.items = this.createItems(text_track);

            if (this.items.length > 0) {
                for (let i = 0, length = this.items.length; i < length; i++) {
                    // TODO: enables - onClick close menu
                    // menu.addItem(this.items[i]);

                    menu.addChild(this.items[i]);
                }

                this.player().addChild(menu);
            } else {
                this.player().getChild('controlBar').removeChild(MENU_BUTTON_NAME);

                this.dispose();
            }
        }, false);

        text_track_element.addEventListener('error', () => {
            this.player().getChild('controlBar').removeChild(MENU_BUTTON_NAME);

            this.dispose();
        }, false);

        return menu;
    },

    createItems(text_track) {
        let items = [];

        if (!text_track || text_track.constructor.name !== 'TextTrack') {
            return items;
        }

        for (let i = 0, length = text_track.cues.length; i < length; i++) {
            let cue = text_track.cues[i];

            items.push(new MenuItem(this.player(), {
                cue,
                text_track
            }));
        }

        return items;
    },

    /**
     * @name On Click
     * @description
     * Defined by vjs.MenuButton
     */

    onClick: function (event) {
        // TODO: not sure if there is a better way to determine visibility
        if (this.menu.hasClass('vjs-lock-showing')) {
            this.menu.unlockShowing();
        } else {
            this.menu.lockShowing();
        }

        this.player().el().focus();
    }
});
