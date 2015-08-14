(function (vjs, undefined) {
    function extend(obj) {
        var arg, i, k;

        for (i = 1; i < arguments.length; i++) {
            arg = arguments[i];

            for (k in arg) {
                if (arg.hasOwnProperty(k)) {
                    obj[k] = arg[k];
                }
            }
        }

        return obj;
    }

    const CONFIGURATION = {
        CHAPTER_THUMBNAILS_MENU: {
            CLASS_NAME: 'vjs-chapter-thumbnails-menu',
            ID:         'vjs_chapter_thumbnails_menu',
            NAME:       'ChapterThumbnailsMenu'
        },

        CHAPTER_THUMBNAILS_MENU_BUTTON: {
            CLASS_NAME: 'vjs-chapter-thumbnails-button vjs-chapters-button',
            NAME:       'ChapterThumbnailsMenuButton',
            TEXT:       'Chapters'
        },

        CHAPTER_THUMBNAILS_MENU_ITEM: {
            CLASS_NAME: 'vjs-chapter-thumbnails-menu-item',
            NAME:       'ChapterThumbnailsMenuItem'
        },

        CHAPTER_THUMBNAILS_TRACK: {
            ID:       'chapter_thumbnails_track',
            KIND:     'metadata',
            LABEL:    'English',
            LANGUAGE: 'en'
        },

        CONTROL_BAR: 'controlBar'
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
        constructor(player, options = {}) {
            this.options = options;
            this.player  = player;

            // remove previous track element
            this.removeTextTrackFromPlayer();

            // remove previous component that was built off old track
            this.removeComponentFromPlayer();

            // create new track element
            let text_track = this.addTextTrackToPlayer();

            // create component based off new track
            this.addComponentToPlayer(text_track);
        }

        addComponentToPlayer(text_track) {
            let control_bar = this.player.getChild(CONFIGURATION.CONTROL_BAR);

            control_bar.addChild(CONFIGURATION.CHAPTER_THUMBNAILS_MENU_BUTTON.NAME, {
                text_track: text_track
            });
        }

        addTextTrackToPlayer() {
            let remote_text_track = extend({
                label:    CONFIGURATION.CHAPTER_THUMBNAILS_TRACK.LABEL,
                language: CONFIGURATION.CHAPTER_THUMBNAILS_TRACK.LANGUAGE
            }, this.options);

            remote_text_track.id   = CONFIGURATION.CHAPTER_THUMBNAILS_TRACK.ID;
            remote_text_track.kind = CONFIGURATION.CHAPTER_THUMBNAILS_TRACK.KIND;

            return this.player.addRemoteTextTrack(remote_text_track);
        }

        removeComponentFromPlayer() {
            let control_bar = this.player.getChild(CONFIGURATION.CONTROL_BAR);

            let component = control_bar.getChild(CONFIGURATION.CHAPTER_THUMBNAILS_MENU_BUTTON.NAME);

            if (component === undefined) {
                return;
            }

            component.dispose();

            control_bar.removeChild(CONFIGURATION.CHAPTER_THUMBNAILS_MENU_BUTTON.NAME);
        }

        removeTextTrackFromPlayer() {
            let current_text_track = this.player.textTracks().getTrackById(CONFIGURATION.CHAPTER_THUMBNAILS_TRACK.ID);

            if (current_text_track === undefined) {
                return;
            }

            this.player.removeRemoteTextTrack(current_text_track);
        }

        /**
         * @name Chapter Thumbnails Menu
         * @description
         * Define the chapter thumbnails menu component.
         */

        static defineMenu() {
            vjs.ChapterThumbnailsMenu = vjs.Menu.extend({
                init: function (player, options) {
                    vjs.Menu.call(this, player, options);

                    this.el().id = CONFIGURATION.CHAPTER_THUMBNAILS_MENU.ID;

                    // NOTE: does not have a className property
                    this.addClass(CONFIGURATION.CHAPTER_THUMBNAILS_MENU.CLASS_NAME);
                }
            });
        }

        /**
         * @name Chapter Thumbnails Button
         * @description
         * Define the chapter thumbnails menu button component.
         * Create the chapter thumbnails menu and attach it to the player.
         */

        static defineMenuButton() {
            vjs.ChapterThumbnailsMenuButton = vjs.MenuButton.extend({
                init: function (player, options) {
                    vjs.MenuButton.call(this, player, options);

                    this.el().setAttribute('aria-label','Chapters Menu');
                },

                buttonText: CONFIGURATION.CHAPTER_THUMBNAILS_MENU_BUTTON.TEXT,
                className:  CONFIGURATION.CHAPTER_THUMBNAILS_MENU_BUTTON.CLASS_NAME,

                /**
                 * @name Create Menu
                 * @descriptions
                 * Defined by vjs.MenuButton
                 */

                createMenu: function () {
                    if (this.menu === undefined) {
                        this.menu = new vjs.ChapterThumbnailsMenu(this.player());
                    }

                    this.menu_items = [];

                    let text_track = this.player().textTracks().getTrackById(CONFIGURATION.CHAPTER_THUMBNAILS_TRACK.ID);

                    // wait for text track to load so cues become available
                    let text_track_element = document.getElementById(CONFIGURATION.CHAPTER_THUMBNAILS_TRACK.ID);

                    text_track_element.addEventListener('load', function (event) {
                        for (var i = 0, length = text_track.cues.length; i < length; i++) {
                            let cue = text_track.cues[i];

                            let menu_item = new vjs.ChapterThumbnailsMenuItem(this.player(), {
                                cue:        cue,
                                text_track: text_track
                            });

                            this.menu_items.push(menu_item);

                            this.menu.addChild(menu_item);
                        }

                        if (this.menu_items.length > 0) {
                            this.show();
                        }

                        this.player().addChild(this.menu);
                    }.bind(this), false);

                    text_track_element.addEventListener('error', function (event) {
                        let control_bar = this.player().getChild(CONFIGURATION.CONTROL_BAR);

                        let component = control_bar.getChild(CONFIGURATION.CHAPTER_THUMBNAILS_MENU_BUTTON.NAME);

                        if (component === undefined) {
                            return;
                        }

                        component.dispose();

                        control_bar.removeChild(CONFIGURATION.CHAPTER_THUMBNAILS_MENU_BUTTON.NAME);
                    }.bind(this), false);

                    return this.menu;
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
        }

        /**
         * @name Chapter Thumnails Menu Item
         * @description
         * Define the chapter thumbnails menu item component.
         */

        static defineMenuItem() {
            vjs.ChapterThumbnailsMenuItem = vjs.MenuItem.extend({
                init: function (player, options) {
                    let cue          = options.cue,
                        current_time = player.currentTime(),
                        text_track   = options.text_track;

                    let cue_text = JSON.parse(cue.text);

                    options.label = vjs.createEl('div', {
                        className: 'vjs-chapters-thumbnails-item',
                        innerHTML: [
                            '<img class="vjs-chapters-thumbnails-item-image" src="' + cue_text.image + '" />',
                            '<span class="vjs-chapters-thumbnails-item-title">' + cue_text.title + '</span>',
                        ].join('')
                    }).outerHTML;

                    options.select = cue.startTime <= current_time && current_time < cue.endTime;

                    vjs.MenuItem.call(this, player, options);

                    this.addClass(CONFIGURATION.CHAPTER_THUMBNAILS_MENU_ITEM.CLASS_NAME);

                    text_track.addEventListener('cuechange', vjs.bind(this, this.onCueChange));
                },

                /**
                 * @name On Click
                 * @description
                 * Defined by vjs.MenuItem
                 */

                onClick: function (event) {
                    let cue = this.options().cue;

                    this.player().currentTime(cue.startTime);

                    this.player().el().focus();
                },

                onCueChange: function (event) {
                    this.update();
                },

                update: function () {
                    let cue          = this.options().cue,
                        current_time = this.player().currentTime();

                    this.selected(cue.startTime <= current_time && current_time < cue.endTime);
                }
            });
        }
    }

    // attach components to video js
    ChapterThumbnails.defineMenu();
    ChapterThumbnails.defineMenuButton();
    ChapterThumbnails.defineMenuItem();

    vjs.plugin('chapter_thumbnails', function chapter_thumbnails(options) {
        new ChapterThumbnails(this, options);
    });
}(window.videojs, void(0)));
