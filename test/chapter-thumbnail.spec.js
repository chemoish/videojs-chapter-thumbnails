import 'video.js/dist/video-js/video.dev.js';

import ChapterThumbnails from '../src/chapter-thumbnail';

import {TRACK_ID} from '../src/track';

describe('chapter-thumbnail.js', function () {
    var player;

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

        player = videojs(video);
    });

    it('should initialize with defaults.', function () {
        let chapter_thumbnail = new ChapterThumbnails(player);

        chapter_thumbnail.addTextTrack();

        let track = player.textTracks().getTrackById(TRACK_ID);

        expect(track.id).toBe(TRACK_ID);
        expect(track.kind).toBe('metadata');
        expect(track.label).toBe('English');
        expect(track.language).toBe('en');
        expect(track.mode).toBe('hidden');
    });

    it('should initialize with options.', function () {
        let chapter_thumbnail = new ChapterThumbnails(player, {
            label: 'French',
            language: 'fr'
        });

        chapter_thumbnail.addTextTrack();

        let track = player.textTracks().getTrackById(TRACK_ID);

        expect(track.label).toBe('French');
        expect(track.language).toBe('fr');
    });

    it('should contain one textTrack', function () {
        expect(player.textTracks().length).toBe(0);

        let chapter_thumbnail = new ChapterThumbnails(player);

        chapter_thumbnail.addTextTrack();

        expect(player.textTracks().length).toBe(1);
    });

    // TODO: no idea how to do other tests…
});
