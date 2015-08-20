# videojs-chapter-thumbnails

[![Build Status](https://travis-ci.org/chemoish/videojs-chapter-thumbnails.svg)](https://travis-ci.org/chemoish/videojs-chapter-thumbnails)

> Video.js plugin for supporting **WebVTT** chapter thumbnails.

![Example](https://github.com/chemoish/videojs-chapter-thumbnails/blob/master/example/asset/img/example.png?raw=true)

## Getting Started

#### Include

```html
<!-- optional: default styles -->
<link href="/path/to/videojs.chapter-thumbnails.css" rel="stylesheet">

<script src="/path/to/videojs.chapter-thumbnails.min.js"></script>
```

#### Enable

```js
videojs('player_id').chapter_thumbnails({
    src: '/path/to/chapters.vtt'
});
```

> Note: There are multiple ways to enable plugins. For more information, please visit [Video.js](https://github.com/videojs/video.js).

## Options

#### label

Type: `String`  
Default: `English`

#### language

Type: `String`  
Default: `en`

#### src

Type: `String`

```

## Example WebVTT file

> Define chapters plugin by specifying a [WebVTT](http://dev.w3.org/html5/webvtt/) spec.

```
WEBVTT

Chapter 1
00:00:00.000 --> 00:00:10.000
{
    "title":"Chapter 1",
    "image":"asset/img/chapter_1.png"
}
```

## Contributing + Example

```bash
npm install -g grunt-cli

npm install

grunt
```

## License

Code licensed under [The MIT License](https://github.com/chemoish/videojs-chapter-thumbnails/blob/master/README.md).
