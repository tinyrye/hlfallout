
function TextNodeAbbreviation(element, maxLength) {
    this.element = element;
    this.maxLength = maxLength;
    this.fullText = this.sourceTextNode().data;
    this.cappedText = this.capText();
};

TextNodeAbbreviation.prototype.capText = function() {
    var sourceText = this.sourceText();
    return (sourceText.length > this.maxLength ? sourceText.substring(0, this.maxLength - 3) + "..." : null);
};

TextNodeAbbreviation.prototype.abbreviatorTextNode = function() {
    return (this.cappedText != null ? document.createTextNode(this.cappedText) : null);
};

TextNodeAbbreviation.prototype.sourceTextNode = function() {
    return this.element.childNodes[0];
};

TextNodeAbbreviation.prototype.sourceText = function() {
    return this.sourceTextNode().data;
};

TextNodeAbbreviation.prototype.handle = function(callbackIfAbbreviate) {
    if (this.cappedText != null) callbackIfAbbreviate(this);
};

TextNodeAbbreviation.prototype.swapForHoverTitle = function() {
    var sourceTextNode = this.sourceTextNode();
    var abbreviatorTextNode = this.abbreviatorTextNode();
    this.element.replaceChild(abbreviatorTextNode, sourceTextNode);
    this.element.setAttribute("title", sourceTextNode.data);
};

function abbreviateToMaxLength(elements, maxLength, callbackIfAbbreviate) {
    for (var i = 0; i < elements.length; i++) {
        new TextNodeAbbreviation(elements[i], maxLength).handle(callbackIfAbbreviate);
    }
};

function abbreviateAll() {
    abbreviateToMaxLength(document.getElementsByClassName("nick"), 10, function(a) { a.swapForHoverTitle(); });
    abbreviateToMaxLength(document.getElementsByClassName("msg"), 60, function(a) { a.swapForHoverTitle(); });
};
