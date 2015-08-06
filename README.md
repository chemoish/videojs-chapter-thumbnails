# videojs-chapter-thumbnails

> Video.js plugin for supporting **WebVTT** chapter thumbnails.

![Example](https://github.com/chemoish/videojs-chapter-thumbnails/blob/master/example/asset/img/example.png)

## Usage

### Include

```html
<!-- optional: default styles -->
<link href="/path/to/videojs.chapter-thumbnails.css" rel="stylesheet">

<script src="/path/to/videojs.chapter-thumbnails.min.js"></script>
```

### Enable

```js
vjs('player_id', {
    plugins: {
        chapter_thumbnails: {
            label:    'English',
            language: 'en',
            src:      '/path/to/chapters.vtt'
        }
    }
});

// or…

vjs('player_id').chapter_thumbnails({
    label:    'English',
    language: 'en',
    src:      '/path/to/chapters.vtt'
});
```

## Options

- `label` (string): Label for the track element (default: English).
- `language` (string): Language for the track element (default: en).
- `src` (string): Src for the track element.

## Example

```bash
npm install -g grunt-cli
npm install -g bower

npm install

bower install

grunt
```

## License

Code licensed under [The MIT License](https://github.com/chemoish/videojs-chapter-thumbnails/blob/master/README.md).
