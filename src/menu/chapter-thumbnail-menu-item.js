/* global videojs */

import chapterThumbnailTemplate from '../videojs-chapter-thumbnail-template';

/**
 * @name Chapter Thumnails Menu Item
 * @description
 * Define the chapter thumbnails menu item component.
 *
 * @param {Object} player VideoJS player
 * @param {Object} options={}
 * @param {TextTrackCue} options.cue
 * @param {Function} [options.template] Generates template for chapter thumbnail menu item
 * @param {TextTrack} options.textTrack
 */

const VjsMenuItem = videojs.getComponent('MenuItem');

class ChapterThumbnailMenuItem extends VjsMenuItem {
  constructor(player, options = {}) {
    const {
      cue,
      textTrack,
    } = options;

    const currentTime = player.currentTime();

    super(player, {
      ...options,

      selected: (cue.startTime <= currentTime && currentTime < cue.endTime),
      template: chapterThumbnailTemplate(cue, options),
    });

    textTrack.addEventListener('cuechange', videojs.bind(this, this.onCueChange));
  }

  createEl(type, props, attrs) {
    const { template } = this.options_;

    const el = super.createEl('li', Object.assign({
      className: 'vjs-menu-item vjs-chapter-thumbnails-menu-item',
      innerHTML: '', // does this need to be localized?
      tabIndex: -1,
    }, props), attrs);

    // allow HTMLElement and string #iguess?
    if (template instanceof HTMLElement) {
      el.insertBefore(template, el.firstChild);
    } else if (typeof template === 'string') {
      el.innerHTML = template;
    }

    return el;
  }

  /**
   * @name Handle Click
   * @description
   * Defined by videojs.MenuItem
   */

  handleClick() {
    const cue = this.options_.cue;
    const isPaused = this.player().paused();


    if (!isPaused) {
      this.player().pause();
    }

    this.player().currentTime(cue.startTime);

    if (!isPaused) {
      this.player().play();
    }

    this.player().el().focus();
  }

  onCueChange() {
    this.update();
  }

  update() {
    const cue = this.options_.cue;
    const currentTime = this.player().currentTime();

    this.selected(cue.startTime <= currentTime && currentTime < cue.endTime);
  }
}

export default ChapterThumbnailMenuItem;
