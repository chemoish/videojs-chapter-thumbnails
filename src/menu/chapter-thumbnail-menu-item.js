/* global videojs */

import template from '../videojs-chapter-thumbnail-template';

/**
 * @name Chapter Thumnails Menu Item
 * @description
 * Define the chapter thumbnails menu item component.
 *
 * @param {Object} player VideoJS player
 * @param {Object} options={}
 * @param {Object} options.cue
 * @param {Object} [options.template]
 * @param {Object} options.text_track
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

      label: template(cue),
      selected: (cue.startTime <= currentTime && currentTime < cue.endTime),
    });

    this.addClass('vjs-chapter-thumbnails-menu-item');

    textTrack.addEventListener('cuechange', videojs.bind(this, this.onCueChange));
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
