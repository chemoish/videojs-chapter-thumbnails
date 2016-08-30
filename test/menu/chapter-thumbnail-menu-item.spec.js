/* global videojs */

import ChapterThumbnailMenuItem from '../../src/menu/chapter-thumbnail-menu-item';

describe('menu-item.js', () => {
  describe(':: template()', () => {
    let player;

    beforeEach(() => {
      // followed example — https://github.com/videojs/videojs-contrib-ads

      videojs.getComponent('Html5').isSupported = () => true;

      delete videojs.getComponent('Html5').prototype.setSource;

      const video = document.createElement('video');

      video.load = () => {};
      video.play = () => {};

      document.getElementById('video_fixture').innerHTML = video.outerHTML;

      player = videojs(video);
    });

    it('should initialize an unselected menu item.', () => {
      const menuItem = new ChapterThumbnailMenuItem(player, {
        cue: {
          startTime: 0,
          endTime: 0,
          text: JSON.stringify({
            image: 'http://example.com',
            title: 'example',
          }),
        },

        textTrack: {
          addEventListener: Function.prototype,
        },
      });

      expect(menuItem.options_.label).toBe(
`
<div class="vjs-chapters-thumbnails-item">
    <img class="vjs-chapters-thumbnails-item-image" src="http://example.com" />
    <span class="vjs-chapters-thumbnails-item-title">example</span>
</div>
`
      );

      expect(menuItem.options_.selected).toBe(false);
      expect(menuItem.hasClass('vjs-chapter-thumbnails-menu-item')).toBe(true);
    });

    it('should initialize a selected menu item.', () => {
      const menuItem = new ChapterThumbnailMenuItem(player, {
        cue: {
          startTime: 0,
          endTime: 1,
          text: JSON.stringify({
            image: 'http://example.com',
            title: 'example',
          }),
        },

        textTrack: {
          addEventListener: Function.prototype,
        },
      });

      expect(menuItem.options_.label).toBe(
`
<div class="vjs-chapters-thumbnails-item">
    <img class="vjs-chapters-thumbnails-item-image" src="http://example.com" />
    <span class="vjs-chapters-thumbnails-item-title">example</span>
</div>
`
      );

      expect(menuItem.options_.selected).toBe(true);
      expect(menuItem.hasClass('vjs-chapter-thumbnails-menu-item')).toBe(true);
    });
  });
});
