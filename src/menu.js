export const MENU_NAME = 'ChapterThumbnailMenu';

/**
 * @name Chapter Thumbnails Menu
 * @description
 * Define the chapter thumbnails menu component.
 *
 * @param {Object} player VideoJS player
 * @param {Object} options={}
 * @param {Object} options.name Component name
 */

export let Menu = videojs.Menu.extend({
    init: function (player, options = {}) {
        videojs.Menu.call(this, player, options);

        this.el().id = 'vjs_chapter_thumbnails_menu';

        // NOTE: does not have a className property
        this.addClass('vjs-chapter-thumbnails-menu');
    }
});
