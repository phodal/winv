window.eventPool = [];
window.globalData = {};
const winv = {
  parser() {

  },
  components: [{
    'win-base': {}
  }],
  run() {
    for (var event in window.eventPool) {
      window.eventPool[event]();
    }
  },
  Page (options) {
    for (var option in options) {
      if ('on' === option.slice(0, 2)) {
        window.eventPool.push(options[option]);
      }
      if ('data' === option) {
        window.globalData = options[option];
      }
    }
  },
  App (options) {
    for (var option in options) {
      if ('on' === option.slice(0, 2)) {
        window.eventPool.push(options[option]);
      }
    }
  },
  getData: function updateData(key) {
    return window.globalData[key];
  },
  utils: {
    removeTemplateTag(str){
      return str.substr(2, str.length - 4);
    },
    isTemplateTag(string){
      return /{{[a-zA-Z1-9]+}}/.test(string);
    }
  },
  stringToDomJSON(string){
    var json = this.nodeToJSON(this.domParser(string));
    if (json.nodeType === 9) {
      json = json.childNodes;
    }
    return json;
  },
  domParser(string){
    var parser = new DOMParser();
    return parser.parseFromString(string, 'text/xml');
  },
  nodeToJSON(node){
    // Code base on https://gist.github.com/sstur/7379870
    node = node || this;
    var obj = {
      nodeType: node.nodeType
    };
    if (node.tagName) {
      obj.tagName = 'winv-' + node.tagName.toLowerCase();
    } else if (node.nodeName) {
      obj.nodeName = node.nodeName;
    }
    if (node.nodeValue) {
      obj.nodeValue = node.nodeValue;
      if(this.utils.isTemplateTag(node.nodeValue)){
        obj.nodeValue = this.getData(this.utils.removeTemplateTag(node.nodeValue));
      }
    }
    var attrs = node.attributes;
    if (attrs) {
      var length = attrs.length;
      var arr = obj.attributes = new Array(length);
      for (var i = 0; i < length; i++) {
        var attr = attrs[i];
        arr[i] = [attr.nodeName, attr.nodeValue];
      }
    }
    var childNodes = node.childNodes;
    if (childNodes) {
      length = childNodes.length;
      arr = obj.childNodes = new Array(length);
      for (i = 0; i < length; i++) {
        arr[i] = this.nodeToJSON(childNodes[i]);
      }
    }
    return obj;
  },
  jsonToDom(obj)
  {
    // Code base on https://gist.github.com/sstur/7379870
    if (typeof obj == 'string') {
      obj = JSON.parse(obj);
    }
    var node, nodeType = obj.nodeType;
    switch (nodeType) {
      case 1: //ELEMENT_NODE
        node = document.createElement(obj.tagName);
        var attributes = obj.attributes || [];
        for (var i = 0, len = attributes.length; i < len; i++) {
          var attr = attributes[i];
          node.setAttribute(attr[0], attr[1]);
        }
        break;
      case 3: //TEXT_NODE
        node = document.createTextNode(obj.nodeValue);
        break;
      case 8: //COMMENT_NODE
        node = document.createComment(obj.nodeValue);
        break;
      case 9: //DOCUMENT_NODE
        node = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
        break;
      case 10: //DOCUMENT_TYPE_NODE
        node = document.implementation.createDocumentType(obj.nodeName);
        break;
      case 11: //DOCUMENT_FRAGMENT_NODE
        node = document.createDocumentFragment();
        break;
      default:
        return node;
    }
    if (nodeType == 1 || nodeType == 11) {
      var childNodes = obj.childNodes || [];
      for (i = 0, len = childNodes.length; i < len; i++) {
        node.appendChild(this.jsonToDom(childNodes[i]));
      }
    }
    return node;
  }
};

export default winv;
