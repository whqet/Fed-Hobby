require('enhanced-markmap/view.mindmap.css');

var markmap = require('enhanced-markmap/view.mindmap');
var parse = require('enhanced-markmap/parse.markdown');
var transform = require('enhanced-markmap/transform.headings');

var markdown = require('raw!../README.md');

var data = parse(markdown);

var m = markmap('svg#mindmap', transform(data), {
  preset: 'colorful',
  nodeWidth: 60,
	nodeHeight: 20,
  textIndent: 40,
  autoFit: false,
  zoomTranslate: [50, 0],
  zoomScale: 1,
  depth: 3,
  scale: [1,2]
});

document.getElementById('J_expand').onclick = function() {
m.expand();
};