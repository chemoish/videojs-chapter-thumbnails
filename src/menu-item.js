const defaults = {
    template: (
`
<div class="vjs-chapters-thumbnails-item">
    <img class="vjs-chapters-thumbnails-item-image" src="{{image}}" />
    <span class="vjs-chapters-thumbnails-item-title">{{title}}</span>
</div>
`
    )
};

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

export default videojs.MenuItem.extend({
    init: function (player, options = {}) {
        this.options(options);

        this.defaults = defaults;

        let {
            cue,
            text_track
        } = options;

        let current_time = player.currentTime();

        options.label = this.template(cue);

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

    template: function (cue) {
        let template = this.options().template || this.defaults.template;

        let cue_text = JSON.parse(cue.text || '{}');

        for (let key in cue_text) {
            if (cue_text.hasOwnProperty(key)) {
                template = template.replace(new RegExp(`{{${key}}}`, 'ig'), cue_text[key]);
            }
        }

        return template;
    },

    update: function () {
        let cue          = this.options().cue,
            current_time = this.player().currentTime();

        this.selected(cue.startTime <= current_time && current_time < cue.endTime);
    }
});
