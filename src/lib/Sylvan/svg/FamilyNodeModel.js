export class FamilyNodeModel {
    constructor() {
        this._data = {
            node: {
                background: 'green',
                borderColor: 'black',
                borderWidth: 1,
                padBottom: 20,
                padLeft: 40,
                padMiddle: 10,
                padRight: 40,
                padTop: 20,
            },
            tag: {
                background: 'white',
                borderColor: 'black',
                borderWidth: 1,
                fontColor: 'black',
                fontSize: 16,
                height: 20,
                padBottom: 5,
                padLeft: 10,
                width: 300,
            }
        }
    }

    node() { return this._data.node }
    nodeBackground() { return this.node().background }
    nodeBorderColor() { return this.node().borderColor }
    nodeBorderWidth() { return this.node().borderWidth }
    nodeHeight() { return this.nodePadTop() + this.nodePadBottom() + this.nodePadMiddle() + 2 * this.tagHeight() }
    nodeMidline(y0) { return y0 + this.nodeHeight()/2 }
    nodePadBottom() { return this.node().padBottom }
    nodePadLeft() { return this.node().padLeft }
    nodePadMiddle() { return this.node().padMiddle }
    nodePadRight() { return this.node().padRight }
    nodePadTop() { return this.node().padTop }
    nodeWidth() { return this.nodePadLeft() + this.tagWidth() + this.nodePadRight()}

    tag() { return this._data.tag }
    tagBackground() { return this.tag().background }
    tagBorderColor() { return this.tag().borderColor }
    tagFontColor() { return this.tag().fontColor }
    tagFontSize() { return this.tag().fontSize }
    tagHeight() { return this.tag().height }
    tagMidline(y0, tagIdx) { return y0 + this.nodePadTop() + this.tagHeight()/2 + this.tagYoffset(tagIdx ) }
    tagPadBottom() { return this.tag().padBottom }
    tagPadLeft() { return this.tag().padLeft }
    tagRectX(x0) { return x0 + this.nodePadLeft() }
    tagRectY(y0, tagIdx) { return y0 + this.nodePadTop() + this.tagYoffset(tagIdx) }
    tagRight(x) { return x + this.nodePadLeft() + this.tagWidth() }
    tagTextX(x0) { return x0 + this.nodePadLeft() + this.tagPadLeft() }
    tagTextY(y0, tagIdx) { return y0 + this.nodePadTop() + this.tagHeight() - this.tagPadBottom() + this.tagYoffset(tagIdx) }
    tagWidth() { return this.tag().width }
    tagYoffset(tagIdx) { return (tagIdx === 0) ? 0 : this.tagHeight() + this.nodePadMiddle() }
}