# rainbowCreate
A jquery component that allows you to create rainbows textures in to divs.

## Use
1.- install rainbowCreate dependency with bower:
```
bower install rainbowCreate
```

2.- put dependencies call on html head tag:

```html
<head>
<!-- rainbowCreate dependencies -->
<script src="./bower_components/jquery/dist/jquery.min.js" type="text/javascript"></script>
<script src="./bower_components/underscore/underscore-min.js" type="text/javascript"></script>
<script src="./component/rainbowCreate.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="./component/rainbowCreate.css">
</head>
```

3.- instance the component into a div:

```javascript
$('#example').rainbowCreate({
  direction: "vertical",
  reverse: false,
  linesWidth: 45,
  colorRank: [15,90], // 0=red, 60=yellow, 120=green, 180=light blue, 240=blue, 300=pink
  saturation: 80,
  light: 50,
  alpha: 1
});
```
