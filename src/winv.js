const winv = {
  parser: function() {

  },
  components: [{
    'win-base': {}
  }],
  Page () {

  },
  App () {

  },
  stringToDomJSON(string){
    return this.nodeToJSON(this.domParser(string));
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
      obj.tagName = node.tagName.toLowerCase();
    } else if (node.nodeName) {
      obj.nodeName = node.nodeName;
    }
    if (node.nodeValue) {
      obj.nodeValue = node.nodeValue;
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
        node = document.implementation.createDocument();
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
