# videojs-chapters

> Video.js plugin for supporting **WebVTT** chapter thumbnails.

![Example](https://github.com/chemoish/videojs-chapters/blob/master/example/asset/img/example.png)

## Usage

### Include

```html
<!-- optional: default styles -->
<link href="/path/to/videojs.chapters.css" rel="stylesheet">

<script src="/path/to/videojs.chapters.min.js"></script>
```

### Enable

```js
vjs('player_id', {
    plugins: {
        chapters: {
            label:    'English',
            language: 'en',
            src:      '/path/to/chapters.vtt'
        }
    }
});

// or…

vjs('player_id').chapters({
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

Code licensed under [The MIT License](https://github.com/chemoish/videojs-chapters/blob/master/README.md).
