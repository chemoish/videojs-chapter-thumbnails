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

class MenuItem extends VjsMenuItem {
    constructor(player, options = {}) {
        let {
            cue,
            text_track
        } = options;

        let current_time = player.currentTime();

        options.label    = template(cue);
        options.selected = (cue.startTime <= current_time && current_time < cue.endTime);

        super(player, options);

        this.addClass('vjs-chapter-thumbnails-menu-item');

        text_track.addEventListener('cuechange', videojs.bind(this, this.onCueChange));
    }

    /**
     * @name On Click
     * @description
     * Defined by videojs.MenuItem
     */

    handleClick(event) {
        let cue = this.options_.cue;

        this.player().currentTime(cue.startTime);

        this.player().el().focus();
    }

    onCueChange(event) {
        this.update();
    }

    update() {
        let cue          = this.options_.cue,
            current_time = this.player().currentTime();

        this.selected(cue.startTime <= current_time && current_time < cue.endTime);
    }
}

export {MenuItem};
