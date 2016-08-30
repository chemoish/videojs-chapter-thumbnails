const defaults = {
  template: (
`
<div class="vjs-chapters-thumbnails-item">
    <img class="vjs-chapters-thumbnails-item-image" src="{{image}}" />
    <span class="vjs-chapters-thumbnails-item-title">{{title}}</span>
</div>
`
  ),
};

function chapterThumbnailTemplate(cue = {}, options = {}) {
  let template = options.template || defaults.template;

  const cueText = JSON.parse(cue.text || '{}');

  Object.keys(cueText).forEach(key => {
    template = template.replace(new RegExp(`{{${key}}}`, 'ig'), cueText[key]);
  });

  return template;
}

export default chapterThumbnailTemplate;
