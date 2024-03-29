<script>
    export let model
    export let x
    export let y
</script>

<!-- Containing box -->
<rect x={x} y={y} width={model.nodeWidth()} height={model.nodeHeight()}
    fill={model.nodeBackground()}
    stroke={model.nodeBorderColor()} stroke-width={model.nodeBorderWidth()}/>

<!-- Top tag -->
<rect x={model.tagRectX(x)} y={model.tagRectY(y, 0)}
    width={model.tagWidth()} height={model.tagHeight()} fill={model.tagBackground()}/>

<text x={model.tagTextX(x)} y={model.tagTextY(y, 0)}
    font-size={model.tagFontSize()} fill={model.tagFontColor()}>
    Collin Douglas Bevins</text>

<circle r="5" cx={model.tagRight(x)} cy={model.tagMidline(y, 0)} fill="red" />

<!-- Bottom tag -->
<rect x={model.tagRectX(x)} y={model.tagRectY(y, 1)}
    width={model.tagWidth()} height={model.tagHeight()} fill={model.tagBackground()}/>

<text x={model.tagTextX(x)} y={model.tagTextY(y, 1)}
    font-size={model.tagFontSize()} fill={model.tagFontColor()}>
    Barbara Jeanne Riley</text>

<circle r="5" cx={model.tagRight(x)} cy={model.tagMidline(y, 1)} fill="red" />

<!-- Incoming connection  -->
<line x1={model.tagRectX(x)} y1={model.tagMidline(y,0)}
    x2={model.tagRectX(x)-model.nodePadLeft()/2} y2={model.tagMidline(y,0)}
    stroke={model.tagBorderColor()} />

<line x1={model.tagRectX(x)} y1={model.tagMidline(y,1)}
    x2={model.tagRectX(x)-model.nodePadLeft()/2} y2={model.tagMidline(y,1)}
    stroke={model.tagBorderColor()} />
    
<line x1={x} y1={model.nodeMidline(y)}
    x2={x + model.nodePadLeft()/2} y2={model.nodeMidline(y)}
    stroke={model.tagBorderColor()} />
    
<line x1={x + model.nodePadLeft()/2} y1={model.tagMidline(y, 0)}
    x2={x + model.nodePadLeft()/2} y2={model.tagMidline(y, 1)}
    stroke={model.tagBorderColor()} />

<circle r="5" cx={x} cy={model.nodeMidline(y)} fill="red" />
