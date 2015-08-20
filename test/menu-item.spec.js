import 'video.js/dist/video-js/video.dev.js';

import MenuItem from '../src/menu-item';

describe('menu-item.js', function () {
    describe(':: template()', function () {
        var menu_item;

        beforeEach(function () {
            // followed example — https://github.com/videojs/videojs-contrib-ads

            videojs.Html5.isSupported = function () {
                return true;
            };

            delete videojs.Html5.prototype.setSource;

            let video = document.createElement('video');

            video.load = function () {};
            video.play = function () {};

            document.getElementById('video_fixture').innerHTML = video.outerHTML;

            menu_item = new MenuItem(videojs(video), {
                cue: {
                    startTime: 0,
                    endTime: 0,
                    text: ''
                },

                text_track: {
                    addEventListener: Function.prototype
                }
            });
        });

        it('should return the unaltered default template.', function () {
            expect(menu_item.template({
                text: null
            })).toBe(
`
<div class="vjs-chapters-thumbnails-item">
    <img class="vjs-chapters-thumbnails-item-image" src="{{image}}" />
    <span class="vjs-chapters-thumbnails-item-title">{{title}}</span>
</div>
`
            );
        });

        it('should return the modified default template.', function () {
            expect(menu_item.template({
                text: JSON.stringify({
                    image: 'http://example.com',
                    title: 'example'
                })
            })).toBe(
`
<div class="vjs-chapters-thumbnails-item">
    <img class="vjs-chapters-thumbnails-item-image" src="http://example.com" />
    <span class="vjs-chapters-thumbnails-item-title">example</span>
</div>
`
            );

            expect(menu_item.template({
                text: JSON.stringify({
                    image: 'http://example.com'
                })
            })).toBe(
`
<div class="vjs-chapters-thumbnails-item">
    <img class="vjs-chapters-thumbnails-item-image" src="http://example.com" />
    <span class="vjs-chapters-thumbnails-item-title">{{title}}</span>
</div>
`
            );
        });

        it('should return the enhanced template.', function () {
            menu_item.options({
                template: (
`
<div class="vjs-chapters-thumbnails-item">
    <img class="vjs-chapters-thumbnails-item-image" src="{{image}}" />
    <span class="vjs-chapters-thumbnails-item-title">{{title}}</span>
    <p class="vjs-chapters-thumbnails-item-description">{{description}}</p>
</div>
`
                )
            });

            expect(menu_item.template({
                text: JSON.stringify({
                    description: 'example description',
                    image: 'http://example.com',
                    title: 'example title'
                })
            })).toBe(
`
<div class="vjs-chapters-thumbnails-item">
    <img class="vjs-chapters-thumbnails-item-image" src="http://example.com" />
    <span class="vjs-chapters-thumbnails-item-title">example title</span>
    <p class="vjs-chapters-thumbnails-item-description">example description</p>
</div>
`
            );

            menu_item.options({
                template: (
`
<div class="vjs-chapters-thumbnails-item">
    <img class="vjs-chapters-thumbnails-item-image" src="{{image}}" />
    <span class="vjs-chapters-thumbnails-item-title">{{title}}</span>
    <p class="vjs-chapters-thumbnails-item-description">{{title}}</p>
</div>
`
                )
            });

            expect(menu_item.template({
                text: JSON.stringify({
                    image: 'http://example.com',
                    title: 'example title'
                })
            })).toBe(
`
<div class="vjs-chapters-thumbnails-item">
    <img class="vjs-chapters-thumbnails-item-image" src="http://example.com" />
    <span class="vjs-chapters-thumbnails-item-title">example title</span>
    <p class="vjs-chapters-thumbnails-item-description">example title</p>
</div>
`
            );
        });
    });
});
