import loadingImage from "../img/loader_black.gif";

class Loader {
    constructor(options) {
        this.elements = [];
        this.loaders = [];
        this.transitionEndEventName = getTransitionEndEventName();
        this.afterShowFired = false;
        this.afterHideFired = false;
        
        this.defaultOptions = {
            image: loadingImage,
            backgroundClass: "loader_background",
            loaderClass: "loader_inner"
        };
        this.options = { ...this.defaultOptions, ...options };
    }

    create_loader() {
        let container = document.createElement("div");
        container.classList.add(this.options.backgroundClass);
        container.style.transition = 'all 200ms';

        let inner = document.createElement("div");
        inner.classList.add(this.options.loaderClass);

        let image = document.createElement("img");
        image.setAttribute("src", this.options.image);

        inner.appendChild(image);
        container.appendChild(inner);

        container.style.opacity = "0";

        container.addEventListener(this.transitionEndEventName, (e) => {
            if (e.target.style.opacity === "1") {
                // show animation finished
                if (this.loaders.length >= this.elements.length && this.options.afterShow && !this.afterShowFired) {
                    this.options.afterShow();
                    this.afterShowFired = true;
                }
            } else if (e.target.style.opacity === "0") {
                // hide animation finished
                this.loaders.shift();
                this.elements.shift();
                if (this.options.afterHide && this.loaders.length < 1 && !this.afterHideFired) {
                    this.options.afterHide();
                    this.afterHideFired = true;
                }
                e.target.remove();
            }
        });

        return container;
    }

    show(options) {
        this.afterShowFired = false;
        if (options && options.after && typeof options.after == "function") {
            this.options.afterShow = options.after;
        } else {
            this.options.afterShow = null;
        }
        if (options && options.elements) {
            if (options.elements.length > 1) {
                Array.from(options.elements).map((elem) => {
                    return this.elements.push(elem);
                });
            } else if (options.elements instanceof HTMLElement) {
                this.elements.push(options.elements);
            }
        } else {
            this.elements.push(document.querySelector('body'));
        }

        this.elements.map((element) => {
            var loader = this.create_loader();

            if (!element.style.position) {
                element.style.position = 'relative';
            }

            loader.style.top = '0';
            loader.style.left = '0';
            loader.style.width = '100%';
            loader.style.height = '100%';

            if (element.tagName.toLowerCase() === 'body') {
                loader.style.position = "fixed";
            } else {
                loader.style.position = "absolute";
            }

            this.loaders.push(loader);
            element.append(loader);
            
            setTimeout(() => {
                loader.style.opacity = "1";
            }, 50);

            return true;
        });
    };

    hide(options) {
        this.afterHideFired = false;
        if (options && options.after && typeof options.after == "function") {
            this.options.afterHide = options.after;
        } else {
            this.options.afterHide = null;
        }
        if (this.loaders) {
            this.loaders.map((element) => {
                return (setTimeout(() => {
                    element.style.opacity = "0";
                }, 50));
			});
		}
	}
}

function getTransitionEndEventName() {
    var transitions = {
        "transition"      : "transitionend",
        "OTransition"     : "oTransitionEnd",
        "MozTransition"   : "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    }
    let bodyStyle = document.body.style;
    for(let transition in transitions) {
        if(bodyStyle[transition] !== undefined) {
            return transitions[transition];
        } 
    }
}

export default Loader;