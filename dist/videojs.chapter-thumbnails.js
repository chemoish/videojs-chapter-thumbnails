'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

    var CONFIGURATION = {
        CHAPTER_THUMBNAILS_MENU: {
            CLASS_NAME: 'vjs-chapter-thumbnails-menu',
            ID: 'vjs_chapter_thumbnails_menu',
            NAME: 'ChapterThumbnailsMenu'
        },

        CHAPTER_THUMBNAILS_MENU_BUTTON: {
            CLASS_NAME: 'vjs-chapter-thumbnails-button vjs-chapters-button',
            NAME: 'ChapterThumbnailsMenuButton',
            TEXT: 'Chapters'
        },

        CHAPTER_THUMBNAILS_MENU_ITEM: {
            CLASS_NAME: 'vjs-chapter-thumbnails-menu-item',
            NAME: 'ChapterThumbnailsMenuItem'
        },

        CHAPTER_THUMBNAILS_TRACK: {
            ID: 'chapter_thumbnails_track',
            KIND: 'metadata',
            LABEL: 'English',
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

    var ChapterThumbnails = (function () {
        function ChapterThumbnails(player) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            _classCallCheck(this, ChapterThumbnails);

            this.options = options;
            this.player = player;

            // remove previous track element
            this.removeTextTrackFromPlayer();

            // remove previous component that was built off old track
            this.removeComponentFromPlayer();

            // create new track element
            var text_track = this.addTextTrackToPlayer();

            // create component based off new track
            this.addComponentToPlayer(text_track);
        }

        // attach components to video js

        _createClass(ChapterThumbnails, [{
            key: 'addComponentToPlayer',
            value: function addComponentToPlayer(text_track) {
                var control_bar = this.player.getChild(CONFIGURATION.CONTROL_BAR);

                control_bar.addChild(CONFIGURATION.CHAPTER_THUMBNAILS_MENU_BUTTON.NAME, {
                    text_track: text_track
                });
            }
        }, {
            key: 'addTextTrackToPlayer',
            value: function addTextTrackToPlayer() {
                var remote_text_track = extend({
                    label: CONFIGURATION.CHAPTER_THUMBNAILS_TRACK.LABEL,
                    language: CONFIGURATION.CHAPTER_THUMBNAILS_TRACK.LANGUAGE
                }, this.options);

                remote_text_track.id = CONFIGURATION.CHAPTER_THUMBNAILS_TRACK.ID;
                remote_text_track.kind = CONFIGURATION.CHAPTER_THUMBNAILS_TRACK.KIND;

                return this.player.addRemoteTextTrack(remote_text_track);
            }
        }, {
            key: 'removeComponentFromPlayer',
            value: function removeComponentFromPlayer() {
                var control_bar = this.player.getChild(CONFIGURATION.CONTROL_BAR);

                var component = control_bar.getChild(CONFIGURATION.CHAPTER_THUMBNAILS_MENU_BUTTON.NAME);

                if (component === undefined) {
                    return;
                }

                component.dispose();

                control_bar.removeChild(CONFIGURATION.CHAPTER_THUMBNAILS_MENU_BUTTON.NAME);
            }
        }, {
            key: 'removeTextTrackFromPlayer',
            value: function removeTextTrackFromPlayer() {
                var current_text_track = this.player.textTracks().getTrackById(CONFIGURATION.CHAPTER_THUMBNAILS_TRACK.ID);

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

        }], [{
            key: 'defineMenu',
            value: function defineMenu() {
                vjs.ChapterThumbnailsMenu = vjs.Menu.extend({
                    init: function init(player, options) {
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

        }, {
            key: 'defineMenuButton',
            value: function defineMenuButton() {
                vjs.ChapterThumbnailsMenuButton = vjs.MenuButton.extend({
                    init: function init(player, options) {
                        vjs.MenuButton.call(this, player, options);

                        this.el().setAttribute('aria-label', 'Chapters Menu');
                    },

                    buttonText: CONFIGURATION.CHAPTER_THUMBNAILS_MENU_BUTTON.TEXT,
                    className: CONFIGURATION.CHAPTER_THUMBNAILS_MENU_BUTTON.CLASS_NAME,

                    /**
                     * @name Create Menu
                     * @descriptions
                     * Defined by vjs.MenuButton
                     */

                    createMenu: function createMenu() {
                        if (this.menu === undefined) {
                            this.menu = new vjs.ChapterThumbnailsMenu(this.player());
                        }

                        this.menu_items = [];

                        var text_track = this.player().textTracks().getTrackById(CONFIGURATION.CHAPTER_THUMBNAILS_TRACK.ID);

                        // wait for text track to load so cues become available
                        document.getElementById(CONFIGURATION.CHAPTER_THUMBNAILS_TRACK.ID).addEventListener('load', (function (event) {
                            for (var i = 0, length = text_track.cues.length; i < length; i++) {
                                var cue = text_track.cues[i];

                                var menu_item = new vjs.ChapterThumbnailsMenuItem(this.player(), {
                                    cue: cue,
                                    text_track: text_track
                                });

                                this.menu_items.push(menu_item);

                                this.menu.addChild(menu_item);
                            }

                            if (this.menu_items.length > 0) {
                                this.show();
                            }

                            this.player().addChild(this.menu);
                        }).bind(this), false);

                        return this.menu;
                    },

                    /**
                     * @name On Click
                     * @description
                     * Defined by vjs.MenuButton
                     */

                    onClick: function onClick(event) {
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

        }, {
            key: 'defineMenuItem',
            value: function defineMenuItem() {
                vjs.ChapterThumbnailsMenuItem = vjs.MenuItem.extend({
                    init: function init(player, options) {
                        var cue = options.cue,
                            current_time = player.currentTime(),
                            text_track = options.text_track;

                        var cue_text = JSON.parse(cue.text);

                        options.label = vjs.createEl('div', {
                            className: 'vjs-chapters-thumbnails-item',
                            innerHTML: ['<img class="vjs-chapters-thumbnails-item-image" src="' + cue_text.image + '" />', '<span class="vjs-chapters-thumbnails-item-title">' + cue_text.title + '</span>'].join('')
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

                    onClick: function onClick(event) {
                        var cue = this.options().cue;

                        this.player().currentTime(cue.startTime);

                        this.player().el().focus();
                    },

                    onCueChange: function onCueChange(event) {
                        this.update();
                    },

                    update: function update() {
                        var cue = this.options().cue,
                            current_time = this.player().currentTime();

                        this.selected(cue.startTime <= current_time && current_time < cue.endTime);
                    }
                });
            }
        }]);

        return ChapterThumbnails;
    })();

    ChapterThumbnails.defineMenu();
    ChapterThumbnails.defineMenuButton();
    ChapterThumbnails.defineMenuItem();

    vjs.plugin('chapter_thumbnails', function chapter_thumbnails(options) {
        new ChapterThumbnails(this, options);
    });
})(window.videojs, void 0);
