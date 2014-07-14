#Use canvas to decorate the backgound.

1. star

![star](https://dl.dropboxusercontent.com/u/47510080/gif/star.gif)

2. littleStar

![image](https://dl.dropboxusercontent.com/u/47510080/gif/littleStar.gif)

3. firefly

![image](https://dl.dropboxusercontent.com/u/47510080/gif/firefly.gif)

4. iceCrystal

![image](https://dl.dropboxusercontent.com/u/47510080/gif/iceCrystal.gif)


#How to use 

Include decorate.js plugin in your html

`<script src="scripts/decorate.js"></script>`

Create `<div id="starShine"><canvas></canvas></div>`


###Use the default theme : star 

`$('#starShine').decorate();`



###Use other theme 

`$('#starShine').decorate({ type: 'iceCrystal'});`

###Other attribute

	$('#starShine').decorate({
		decorationColor: 'red',
		direction: 'down',
		size: 20,
		points: 6
	});

decorationColor => change the color of decoration.

direction => change the flow direction .

size => change the size of decoration.

points => change the shape of decoration.




#Reference

[winterland.me](http://www.winterland.me/)

[Drawing starts with HTML5 Canvas](http://programmingthomas.wordpress.com/2012/05/16/drawing-stars-with-html5-canvas/)


[HTML5 Canvas Custom Shape Tutorial](http://www.html5canvastutorials.com/tutorials/html5-canvas-custom-shapes/)

[jquery plugin](http://learn.jquery.com/plugins/)

#Thanks a lot to all of them













