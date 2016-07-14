function parseChildren(children) {
  var results = [];

  if (children) {
    var i = 0;
    var l = children.length;

    for (; i < l; i++) {
      if (children[i].type === 'image') {
        results.push(children[i]);
      } else if (children[i].type === 'link_open') {
        results.push({
          type: 'link',
          href: children[i].href,
          content: children[i + 1].content
        });
        i++;
      } else if (children[i].type === 'text') {
        results.push(children[i]);
      }
    }
  }

  return results;
}

module.exports = function parseMarkdown(text) {

  // var marked = require('marked');
  // var _ = require('lodash');
  // var options = {};
  // var tokens = marked.lexer(text, options);
  // var headings = _.filter(tokens, 'type', 'heading');

  var Remarkable = require('remarkable');
  var md = new Remarkable();

  var tokens = md.parse(text, {})
  var headings = [];
  var hLevel = 0;
  var lLevel = [0];
  for (var i = 0; i < tokens.length; i += 1) {
    var type = tokens[i].type;

    if (type === 'heading_open') {
      hLevel = tokens[i].hLevel;
      headings.push({
        depth: hLevel,
        line: tokens[i].lines[0],
        name: tokens[i+1].content,
        rules: tokens[i+1].children ? parseChildren(tokens[i+1].children) : null
      });
      i += 1;
    }

    if (type === 'bullet_list_open') {
      if (tokens[i].level >= lLevel[0]) {
        lLevel.unshift(tokens[i].level);
        hLevel++;
      }
    }

    if (type === "list_item_open") {
      headings.push({
        depth: hLevel,
        line: tokens[i].lines[0],
        name: tokens[i+2].content,
        rules: tokens[i+2].children ? parseChildren(tokens[i+2].children) : null
      });
    }

    if (type === 'bullet_list_close') {
      lLevel.shift();
      hLevel--;
    }
  }

  return headings;
};
