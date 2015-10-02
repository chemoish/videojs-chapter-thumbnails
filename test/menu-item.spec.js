import 'expose?videojs!video.js';

import {MenuItem} from '../src/menu-item';

describe('menu-item.js', function () {
    describe(':: template()', function () {
        var player;

        beforeEach(function () {
            // followed example — https://github.com/videojs/videojs-contrib-ads

            videojs.getComponent('Html5').isSupported = function () {
                return true;
            };

            delete videojs.getComponent('Html5').prototype.setSource;

            let video = document.createElement('video');

            video.load = function () {};
            video.play = function () {};

            document.getElementById('video_fixture').innerHTML = video.outerHTML;

            player = videojs(video);
        });

        it('should initialize an unselected menu item.', function () {
            var menu_item = new MenuItem(player, {
                cue: {
                    startTime: 0,
                    endTime: 0,
                    text: JSON.stringify({
                        image: 'http://example.com',
                        title: 'example'
                    })
                },

                text_track: {
                    addEventListener: Function.prototype
                }
            });

            expect(menu_item.options_.label).toBe(
`
<div class="vjs-chapters-thumbnails-item">
    <img class="vjs-chapters-thumbnails-item-image" src="http://example.com" />
    <span class="vjs-chapters-thumbnails-item-title">example</span>
</div>
`
            );

            expect(menu_item.options_.selected).toBe(false);
            expect(menu_item.hasClass('vjs-chapter-thumbnails-menu-item')).toBe(true);
        });

        it('should initialize a selected menu item.', function () {
            var menu_item = new MenuItem(player, {
                cue: {
                    startTime: 0,
                    endTime: 1,
                    text: JSON.stringify({
                        image: 'http://example.com',
                        title: 'example'
                    })
                },

                text_track: {
                    addEventListener: Function.prototype
                }
            });

            expect(menu_item.options_.label).toBe(
`
<div class="vjs-chapters-thumbnails-item">
    <img class="vjs-chapters-thumbnails-item-image" src="http://example.com" />
    <span class="vjs-chapters-thumbnails-item-title">example</span>
</div>
`
            );

            expect(menu_item.options_.selected).toBe(true);
            expect(menu_item.hasClass('vjs-chapter-thumbnails-menu-item')).toBe(true);
        });
    });
});
