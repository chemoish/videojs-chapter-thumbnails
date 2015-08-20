/**
 * @name Chapter Thumnails Menu Item
 * @description
 * Define the chapter thumbnails menu item component.
 *
 * @param {Object} player VideoJS player
 * @param {Object} options={}
 * @param {Object} options.cue
 * @param {Object} options.text_track
 */

export default videojs.MenuItem.extend({
    init: function (player, options = {}) {

        let {
            cue,
            text_track
        } = options;

        let current_time = player.currentTime();

        let cue_text = JSON.parse(cue.text || '{}');

        options.label = videojs.createEl('div', {
            className: 'vjs-chapters-thumbnails-item',
            innerHTML: [
                '<img class="vjs-chapters-thumbnails-item-image" src="' + cue_text.image + '" />',
                '<span class="vjs-chapters-thumbnails-item-title">' + cue_text.title + '</span>',
            ].join('')
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

    onClick: function (event) {
        let cue = this.options().cue;

        this.player().currentTime(cue.startTime);

        this.player().el().focus();
    },

    onCueChange: function (event) {
        this.update();
    },

    update: function () {
        let cue          = this.options().cue,
            current_time = this.player().currentTime();

        this.selected(cue.startTime <= current_time && current_time < cue.endTime);
    }
});
