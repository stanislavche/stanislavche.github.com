export function setAnimatedFavicon() {
	Element.prototype.remove = function() {
		this.parentElement.removeChild(this);
	}
	NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
		for(var i = this.length - 1; i >= 0; i--) {
			if(this[i] && this[i].parentElement) {
				this[i].parentElement.removeChild(this[i]);
			}
		}
	}
	let favicon_images = [
			'./favicon/0.gif',
			'./favicon/1.gif',
			'./favicon/2.gif',
			'./favicon/3.gif',
			'./favicon/4.gif'
		],
		image_counter = 0,
		head = document.head||document.getElementsByTagName("head")[0];

	setInterval(function() {
		document.getElementById('dynamic-favicon').remove();

		let favikonEl = document.createElement('link');
		favikonEl.setAttribute("id", "dynamic-favicon");
		favikonEl.setAttribute("rel", "icon");
		favikonEl.setAttribute("type", "image/gif");
		favikonEl.setAttribute("href", favicon_images[image_counter]);
		head.appendChild(favikonEl);
		
		if (image_counter === favicon_images.length -1) {
			image_counter = 0;
		} else {
			image_counter++;
		}
	}, 600);
}