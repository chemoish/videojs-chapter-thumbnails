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

function chapterThumbnailTemplate(cue = {}, options = {}) {
    let template = options.template || defaults.template;

    let cue_text = JSON.parse(cue.text || '{}');

    for (let key in cue_text) {
        if (cue_text.hasOwnProperty(key)) {
            template = template.replace(new RegExp(`{{${key}}}`, 'ig'), cue_text[key]);
        }
    }

    return template;
}

export default chapterThumbnailTemplate;
