/* global videojs */

const CHAPTER_THUMBNAIL_MENU_NAME = 'ChapterThumbnailMenu';

/**
 * @name Chapter Thumbnails Menu
 * @description
 * Define the chapter thumbnails menu component.
 *
 * @param {Object} player VideoJS player
 * @param {Object} options={}
 * @param {string} options.name Component name
 */

const VjsMenu = videojs.getComponent('Menu');

class ChapterThumbnailMenu extends VjsMenu {
  constructor(player, options = {}) {
    super(player, options);

    this.el_.id = 'vjs_chapter_thumbnails_menu';

    // NOTE: does not have a className property
    this.addClass('vjs-chapter-thumbnails-menu');
  }
}

videojs.registerComponent('ChapterThumbnailMenu', ChapterThumbnailMenu);

export {
  CHAPTER_THUMBNAIL_MENU_NAME,
  ChapterThumbnailMenu,
};
