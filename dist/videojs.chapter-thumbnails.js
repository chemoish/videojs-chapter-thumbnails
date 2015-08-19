/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _menuButton = __webpack_require__(1);

	var _track = __webpack_require__(4);

	var _helper = __webpack_require__(5);

	var defaults = {
	    label: 'English',
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

	var ChapterThumbnails = (function () {
	    function ChapterThumbnails(player, options) {
	        _classCallCheck(this, ChapterThumbnails);

	        this.player = player;
	        this.options = options;

	        this.addComponent(player, options);
	    }

	    _createClass(ChapterThumbnails, [{
	        key: 'addComponent',
	        value: function addComponent(player, options) {
	            var control_bar = player.getChild('controlBar');

	            var menu_button = control_bar.getChild(_menuButton.MENU_BUTTON_NAME);

	            if (menu_button != null) {
	                control_bar.removeChild(menu_button);

	                menu_button.dispose();
	            }

	            var text_track = this.addTextTrack(player, options);

	            menu_button = new _menuButton.MenuButton(player, {
	                name: _menuButton.MENU_BUTTON_NAME,
	                text_track: text_track
	            });

	            control_bar.addChild(menu_button);
	        }
	    }, {
	        key: 'addTextTrack',
	        value: function addTextTrack(player, options) {
	            var current_text_track = player.textTracks().getTrackById(_track.TRACK_ID);

	            if (current_text_track !== undefined) {
	                player.removeRemoteTextTrack(current_text_track);
	            }

	            var text_track = (0, _helper.extend)(defaults, options, {
	                kind: 'metadata',
	                id: _track.TRACK_ID
	            });

	            return player.addRemoteTextTrack(text_track);
	        }
	    }]);

	    return ChapterThumbnails;
	})();

	videojs.plugin('chapter_thumbnails', function chapter_thumbnails(options) {
	    new ChapterThumbnails(this, options);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _menu = __webpack_require__(2);

	var _menuItem = __webpack_require__(3);

	var _menuItem2 = _interopRequireDefault(_menuItem);

	var _track = __webpack_require__(4);

	var MENU_BUTTON_NAME = 'ChapterThumbnailMenuButton';

	exports.MENU_BUTTON_NAME = MENU_BUTTON_NAME;
	/**
	 * @name Chapter Thumbnails Button
	 * @description
	 * Define the chapter thumbnails menu button component.
	 * Create the chapter thumbnails menu and attach it to the player.
	 */

	var MenuButton = videojs.MenuButton.extend({
	    init: function init(player, options) {
	        this.buttonText = 'Chapters';
	        this.className = 'vjs-chapter-thumbnails-button vjs-chapters-button';

	        vjs.MenuButton.call(this, player, options);

	        this.el().setAttribute('aria-label', 'Chapters Menu');
	    },

	    createMenu: function createMenu() {
	        var _this = this;

	        var menu = this.player().getChild(_menu.MENU_NAME);

	        if (menu != null) {
	            this.player().removeChild(menu);
	        }

	        menu = new _menu.Menu(this.player(), {
	            name: _menu.MENU_NAME
	        });

	        var text_track_element = document.getElementById(_track.TRACK_ID);

	        text_track_element.addEventListener('load', function (event) {
	            var text_track = _this.player().textTracks().getTrackById(_track.TRACK_ID);

	            _this.items = _this.createItems(text_track);

	            if (_this.items.length > 0) {
	                for (var i = 0, _length = _this.items.length; i < _length; i++) {
	                    // TODO: enables - onClick close menu
	                    // menu.addItem(this.items[i]);

	                    menu.addChild(_this.items[i]);
	                }

	                _this.player().addChild(menu);
	            } else {
	                _this.player().getChild('controlBar').removeChild(MENU_BUTTON_NAME);

	                _this.dispose();
	            }
	        }, false);

	        text_track_element.addEventListener('error', function () {
	            _this.player().getChild('controlBar').removeChild(MENU_BUTTON_NAME);

	            _this.dispose();
	        }, false);

	        return menu;
	    },

	    createItems: function createItems(text_track) {
	        var items = [];

	        for (var i = 0, _length2 = text_track.cues.length; i < _length2; i++) {
	            var cue = text_track.cues[i];

	            items.push(new _menuItem2['default'](this.player(), {
	                cue: cue,
	                text_track: text_track
	            }));
	        }

	        return items;
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
	exports.MenuButton = MenuButton;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var MENU_NAME = 'ChapterThumbnailMenu';

	exports.MENU_NAME = MENU_NAME;
	/**
	 * @name Chapter Thumbnails Menu
	 * @description
	 * Define the chapter thumbnails menu component.
	 */

	var Menu = videojs.Menu.extend({
	    init: function init(player, options) {
	        vjs.Menu.call(this, player, options);

	        this.el().id = 'vjs_chapter_thumbnails_menu';

	        // NOTE: does not have a className property
	        this.addClass('vjs-chapter-thumbnails-menu');
	    }
	});
	exports.Menu = Menu;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * @name Chapter Thumnails Menu Item
	 * @description
	 * Define the chapter thumbnails menu item component.
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = videojs.MenuItem.extend({
	    init: function init(player, options) {
	        var cue = options.cue;
	        var text_track = options.text_track;

	        var current_time = player.currentTime();

	        var cue_text = JSON.parse(cue.text || '{}');

	        options.label = videojs.createEl('div', {
	            className: 'vjs-chapters-thumbnails-item',
	            innerHTML: ['<img class="vjs-chapters-thumbnails-item-image" src="' + cue_text.image + '" />', '<span class="vjs-chapters-thumbnails-item-title">' + cue_text.title + '</span>'].join('')
	        }).outerHTML;

	        options.select = cue.startTime <= current_time && current_time < cue.endTime;

	        videojs.MenuItem.call(this, player, options);

	        this.addClass('vjs-chapter-thumbnails-menu-item');

	        text_track.addEventListener('cuechange', videojs.bind(this, this.onCueChange));
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
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var TRACK_ID = 'chapter_thumbnails_track';
	exports.TRACK_ID = TRACK_ID;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.extend = extend;

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

	;

/***/ }
/******/ ]);