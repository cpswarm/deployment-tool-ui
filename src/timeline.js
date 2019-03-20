L.Control.TimeLineSlider = L.Control.extend({
    options: {
        position: 'bottomleft',
        timelineItems: ["Today", "Tomorrow", "The Next Day"],
        timeline:[],

        changeMap: function ({ label, value, map }) {
            console.log("You are not using the value or label from the timeline to change the map.");
        },

        warningLabel: 'Timeline:',
        winWidth: window.innerWidth,
        resizeTimer : "",
        currentIndex :0,
        // Set default settings
        defaultSettings: {
            forceVerticalMode: {
                type: 'integer',
                defaultValue: 600
            },
            horizontalStartPosition: {
                type: 'string',
                acceptedValues: ['bottom', 'top'],
                defaultValue: 'top'
            },
            mode: {
                type: 'string',
                acceptedValues: ['horizontal', 'vertical'],
                defaultValue: 'vertical'
            },
            moveItems: {
                type: 'integer',
                defaultValue: 1
            },
            startIndex: {
                type: 'integer',
                defaultValue: 0
            },
            verticalStartPosition: {
                type: 'string',
                acceptedValues: ['left', 'right'],
                defaultValue: 'left'
            },
            verticalTrigger: {
                type: 'string',
                defaultValue: '15%'
            },
            visibleItems: {
                type: 'integer',
                defaultValue: 3
            }
        },
        extraChangeMapParams: {},
        initializeChange: true,

        thumbHeight: "4.5px",
        labelWidth: "80px",
        betweenLabelAndRangeSpace: "10px",

        labelFontSize: "14px",
        activeColor: "#37adbf",
        inactiveColor: "#8e8e8e",

        backgroundOpacity: 0.75,
        backgroundColor: "#ffffff",

        topBgPadding: "10px",
        bottomBgPadding: "0px",
        rightBgPadding: "30px",
        leftBgPadding: "30px",

    },
    // Helper function to test whether values are an integer
    testValues: function (value, settingName) {
        if (typeof value !== 'number' && value % 1 !== 0) {
            console.warn(`${warningLabel} The value "${value}" entered for the setting "${settingName}" is not an integer.`);
            return false;
        }
        return true;
    },

    // Helper function to wrap an element in another HTML element
    itemWrap: function (el, wrapper, classes) {
        wrapper.classList.add(classes);
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
    },

    // Helper function to wrap each element in a group with other HTML elements
    wrapElements: function (items) {
        items.forEach((item) => {
            this.itemWrap(item.querySelector('.timeline__content'), document.createElement('div'), 'timeline__content__wrap');
            this.itemWrap(item.querySelector('.timeline__content__wrap'), document.createElement('div'), 'timeline__item__inner');
        });
    },

    // Helper function to check if an element is partially in the viewport
    isElementInViewport: function (el, triggerPosition) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const defaultTrigger = defaultSettings.verticalTrigger.defaultValue.match(/(\d*\.?\d*)(.*)/);
        let triggerUnit = triggerPosition.unit;
        let triggerValue = triggerPosition.value;
        let trigger = windowHeight;
        if (triggerUnit === 'px' && triggerValue >= windowHeight) {
            console.warn('The value entered for the setting "verticalTrigger" is larger than the window height. The default value will be used instead.');
            [, triggerValue, triggerUnit] = defaultTrigger;
        }
        if (triggerUnit === 'px') {
            trigger = parseInt(trigger - triggerValue, 10);
        } else if (triggerUnit === '%') {
            trigger = parseInt(trigger * ((100 - triggerValue) / 100), 10);
        }
        return (
            rect.top <= trigger
            && rect.left <= (window.innerWidth || document.documentElement.clientWidth)
            && (rect.top + rect.height) >= 0
            && (rect.left + rect.width) >= 0
        );
    },

    // Helper function to add transform styles
    addTransforms: function (el, transform) {
        el.style.webkitTransform = transform;
        el.style.msTransform = transform;
        el.style.transform = transform;
    },

    // Create timelines
    createTimelines: function (timelineEl) {
        const timelineName = timelineEl.id ? `#${timelineEl.id}` : `.${timelineEl.className}`;
        const errorPart = 'could not be found as a direct descendant of';
        const data = timelineEl.dataset;
        let wrap;
        let scroller;
        let items;
        const settings = {};

        // Test for correct HTML structure
        try {
            wrap = timelineEl.querySelector('.timeline__wrap');
            if (!wrap) {
                throw new Error(`${warningLabel} .timeline__wrap ${errorPart} ${timelineName}`);
            } else {
                scroller = wrap.querySelector('.timeline__items');
                if (!scroller) {
                    throw new Error(`${warningLabel} .timeline__items ${errorPart} .timeline__wrap`);
                } else {
                    items = [].slice.call(scroller.children, 0);
                }
            }
        } catch (e) {
            console.warn(e.message);
            return false;
        }

        // Test setting input values
        Object.keys(defaultSettings).forEach((key) => {
            settings[key] = defaultSettings[key].defaultValue;

            if (data[key]) {
                settings[key] = data[key];
            } else if (options && options[key]) {
                settings[key] = options[key];
            }

            if (defaultSettings[key].type === 'integer') {
                if (!settings[key] || !testValues(settings[key], key)) {
                    settings[key] = defaultSettings[key].defaultValue;
                }
            } else if (defaultSettings[key].type === 'string') {
                if (defaultSettings[key].acceptedValues && defaultSettings[key].acceptedValues.indexOf(settings[key]) === -1) {
                    console.warn(`${warningLabel} The value "${settings[key]}" entered for the setting "${key}" was not recognised.`);
                    settings[key] = defaultSettings[key].defaultValue;
                }
            }
        });

        // Further specific testing of input values
        const defaultTrigger = defaultSettings.verticalTrigger.defaultValue.match(/(\d*\.?\d*)(.*)/);
        const triggerArray = settings.verticalTrigger.match(/(\d*\.?\d*)(.*)/);
        let [, triggerValue, triggerUnit] = triggerArray;
        let triggerValid = true;
        if (!triggerValue) {
            console.warn(`${warningLabel} No numercial value entered for the 'verticalTrigger' setting.`);
            triggerValid = false;
        }
        if (triggerUnit !== 'px' && triggerUnit !== '%') {
            console.warn(`${warningLabel} The setting 'verticalTrigger' must be a percentage or pixel value.`);
            triggerValid = false;
        }
        if (triggerUnit === '%' && (triggerValue > 100 || triggerValue < 0)) {
            console.warn(`${warningLabel} The 'verticalTrigger' setting value must be between 0 and 100 if using a percentage value.`);
            triggerValid = false;
        } else if (triggerUnit === 'px' && triggerValue < 0) {
            console.warn(`${warningLabel} The 'verticalTrigger' setting value must be above 0 if using a pixel value.`);
            triggerValid = false;
        }

        if (triggerValid === false) {
            [, triggerValue, triggerUnit] = defaultTrigger;
        }

        settings.verticalTrigger = {
            unit: triggerUnit,
            value: triggerValue
        };

        if (settings.moveItems > settings.visibleItems) {
            console.warn(`${warningLabel} The value of "moveItems" (${settings.moveItems}) is larger than the number of "visibleItems" (${settings.visibleItems}). The value of "visibleItems" has been used instead.`);
            settings.moveItems = settings.visibleItems;
        }

        if (settings.startIndex > (items.length - settings.visibleItems) && items.length > settings.visibleItems) {
            console.warn(`${warningLabel} The 'startIndex' setting must be between 0 and ${items.length - settings.visibleItems} for this timeline. The value of ${items.length - settings.visibleItems} has been used instead.`);
            settings.startIndex = items.length - settings.visibleItems;
        } else if (items.length <= settings.visibleItems) {
            console.warn(`${warningLabel} The number of items in the timeline must exceed the number of visible items to use the 'startIndex' option.`);
            settings.startIndex = 0;
        } else if (settings.startIndex < 0) {
            console.warn(`${warningLabel} The 'startIndex' setting must be between 0 and ${items.length - settings.visibleItems} for this timeline. The value of 0 has been used instead.`);
            settings.startIndex = 0;
        }

        timelines.push({
            timelineEl,
            wrap,
            scroller,
            items,
            settings
        });
    },

    setHeightandWidths: function (tl) {
        // Set widths of items and viewport
        function setWidths() {
            tl.itemWidth = tl.wrap.offsetWidth / tl.settings.visibleItems;
            tl.items.forEach((item) => {
                item.style.width = `${tl.itemWidth}px`;
            });
            tl.scrollerWidth = tl.itemWidth * tl.items.length;
            tl.scroller.style.width = `${tl.scrollerWidth}px`;
        }

        // Set height of items and viewport
        function setHeights() {
            let oddIndexTallest = 0;
            let evenIndexTallest = 0;
            tl.items.forEach((item, i) => {
                item.style.height = 'auto';
                const height = item.offsetHeight;
                if (i % 2 === 0) {
                    evenIndexTallest = height > evenIndexTallest ? height : evenIndexTallest;
                } else {
                    oddIndexTallest = height > oddIndexTallest ? height : oddIndexTallest;
                }
            });

            const transformString = `translateY(${evenIndexTallest}px)`;
            tl.items.forEach((item, i) => {
                if (i % 2 === 0) {
                    item.style.height = `${evenIndexTallest}px`;
                    if (tl.settings.horizontalStartPosition === 'bottom') {
                        item.classList.add('timeline__item--bottom');
                        this.addTransforms(item, transformString);
                    } else {
                        item.classList.add('timeline__item--top');
                    }
                } else {
                    item.style.height = `${oddIndexTallest}px`;
                    if (tl.settings.horizontalStartPosition !== 'bottom') {
                        item.classList.add('timeline__item--bottom');
                        this.addTransforms(item, transformString);
                    } else {
                        item.classList.add('timeline__item--top');
                    }
                }
            });
            tl.scroller.style.height = `${evenIndexTallest + oddIndexTallest}px`;
        }
        if (window.innerWidth > tl.settings.forceVerticalMode) {
            setWidths();
            setHeights();
        }
    },

    // Create and add arrow controls to horizontal timeline
    addNavigation: function (tl) {
        if (tl.items.length > tl.settings.visibleItems) {
            const prevArrow = document.createElement('button');
            const nextArrow = document.createElement('button');
            const topPosition = tl.items[0].offsetHeight;
            prevArrow.className = 'timeline-nav-button timeline-nav-button--prev';
            nextArrow.className = 'timeline-nav-button timeline-nav-button--next';
            prevArrow.textContent = 'Previous';
            nextArrow.textContent = 'Next';
            prevArrow.style.top = `${topPosition}px`;
            nextArrow.style.top = `${topPosition}px`;
            if (currentIndex === 0) {
                prevArrow.disabled = true;
            } else if (currentIndex === (tl.items.length - tl.settings.visibleItems)) {
                nextArrow.disabled = true;
            }
            tl.timelineEl.appendChild(prevArrow);
            tl.timelineEl.appendChild(nextArrow);
        }
    },

    // Add the centre line to the horizontal timeline
    addHorizontalDivider: function (tl) {
        const divider = tl.timelineEl.querySelector('.timeline-divider');
        if (divider) {
            tl.timelineEl.removeChild(divider);
        }
        const topPosition = tl.items[0].offsetHeight;
        const horizontalDivider = document.createElement('span');
        horizontalDivider.className = 'timeline-divider';
        horizontalDivider.style.top = `${topPosition}px`;
        tl.timelineEl.appendChild(horizontalDivider);
    },

    // Calculate the new position of the horizontal timeline
    timelinePosition: function (tl) {
        const position = tl.items[currentIndex].offsetLeft;
        const str = `translate3d(-${position}px, 0, 0)`;
        this.addTransforms(tl.scroller, str);
    },

    // Make the horizontal timeline slide
    slideTimeline: function (tl) {
        const navArrows = tl.timelineEl.querySelectorAll('.timeline-nav-button');
        const arrowPrev = tl.timelineEl.querySelector('.timeline-nav-button--prev');
        const arrowNext = tl.timelineEl.querySelector('.timeline-nav-button--next');
        const maxIndex = tl.items.length - tl.settings.visibleItems;
        const moveItems = parseInt(tl.settings.moveItems, 10);
        [].forEach.call(navArrows, (arrow) => {
            arrow.addEventListener('click', function (e) {
                e.preventDefault();
                currentIndex = this.classList.contains('timeline-nav-button--next') ? (currentIndex += moveItems) : (currentIndex -= moveItems);
                if (currentIndex === 0 || currentIndex < 0) {
                    currentIndex = 0;
                    arrowPrev.disabled = true;
                    arrowNext.disabled = false;
                } else if (currentIndex === maxIndex || currentIndex > maxIndex) {
                    currentIndex = maxIndex;
                    arrowPrev.disabled = false;
                    arrowNext.disabled = true;
                } else {
                    arrowPrev.disabled = false;
                    arrowNext.disabled = false;
                }
                this.timelinePosition(tl);
            });
        });
    },

    // Set up horizontal timeline
    setUpHorinzontalTimeline: function (tl) {
        currentIndex = tl.settings.startIndex;
        tl.timelineEl.classList.add('timeline--horizontal');
        this.setHeightandWidths(tl);
        this.timelinePosition(tl);
        this.addNavigation(tl);
        this.addHorizontalDivider(tl);
        this.slideTimeline(tl);
    },

    // Reset timelines
    resetTimelines: function (tl) {
        tl.timelineEl.classList.remove('timeline--horizontal', 'timeline--mobile');
        tl.scroller.removeAttribute('style');
        tl.items.forEach((item) => {
            item.removeAttribute('style');
            item.classList.remove('animated', 'fadeIn', 'timeline__item--left', 'timeline__item--right');
        });
        const navArrows = tl.timelineEl.querySelectorAll('.timeline-nav-button');
        [].forEach.call(navArrows, (arrow) => {
            arrow.parentNode.removeChild(arrow);
        });
    },

    // Set up the timelines
    setUpTimelines: function () {
        this.options.timeline.forEach((tl) => {
            tl.timelineEl.style.opacity = 0;
            if (!tl.timelineEl.classList.contains('timeline--loaded')) {
                this.wrapElements(tl.items);
            }
            this.resetTimelines(tl);
            if (window.innerWidth <= tl.settings.forceVerticalMode) {
                tl.timelineEl.classList.add('timeline--mobile');
            }
            this.setUpHorinzontalTimeline(tl);
            tl.timelineEl.classList.add('timeline--loaded');
            this.setTimeout(() => {
                tl.timelineEl.style.opacity = 1;
            }, 500);
        });
    },

    initialize: function (options) {
        if (parseFloat(options.thumbHeight) <= 2) {
            console.log("The nodes on the timeline will not appear properly if its radius is less than 2px.")
        }
        L.setOptions(this, options);
    },
    onAdd: function (map) {
        this.map = map;
        this.sheet = document.createElement('style');
        document.body.appendChild(this.sheet);


        let time_line = L.DomUtil.create('div', 'timeline');
        let time_wrap = L.DomUtil.create('div', 'timeline__wrap', time_line);
        let time_items = L.DomUtil.create('div', 'timeline__items', time_wrap)

        this.options.timelineItems.forEach(el =>{
            let time_item = L.DomUtil.create('div', 'timeline__item', time_items);
            let time_content = L.DomUtil.create('div', 'timeline__content',time_item);
            time_content.innerHTML = el
        })
        
        Array.prototype.forEach.call(time_line, this.createTimelines);
        this.setUpTimelines();

        this.container = time_line;
        /* Prevent click events propagation to map */
        L.DomEvent.disableClickPropagation(this.container);

        /* Prevent right click event propagation to map */
        L.DomEvent.on(this.container, 'timeline', function (ev) {
            L.DomEvent.stopPropagation(ev);
        });

        /* Prevent scroll events propagation to map when cursor on the div */
        L.DomEvent.disableScrollPropagation(this.container);

        /* Create html elements for input and labels */
        this.slider = L.DomUtil.create('div', 'range', this.container);
        this.slider.innerHTML = `<input id="rangeinputslide" type="range" min="1" max="${this.options.timelineItems.length}" steps="1" value="1"></input>`


        this.rangeLabels = L.DomUtil.create('ul', 'range-labels', this.container);
        this.rangeLabels.innerHTML = this.options.timelineItems.map((item) => { return "<li>" + item + "</li>" }).join('');

        this.rangeInput = L.DomUtil.get(this.slider).children[0];
        this.rangeLabelArray = Array.from(this.rangeLabels.getElementsByTagName('li'));
        this.sliderLength = this.rangeLabelArray.length;

        this.thumbSize = parseFloat(this.options.thumbHeight) * 2;
        // double the thumb size when its active
        this.activeThumbSize = this.thumbSize * 2;

        // make the width of the range div holding the input the number of intervals * the label width and add the thumb size on either end of the range
        this.rangeWidthCSS = parseFloat(this.options.labelWidth) * (this.options.timelineItems.length - 1) + (this.thumbSize * 2);

        // move labels over to the left so they line up; move half the width of the label and adjust for thumb radius
        this.rlLabelMargin = parseFloat(this.options.labelWidth) / 2 - (parseFloat(this.options.thumbHeight) / 2);

        // 2.5 because that is half the height of the range input
        this.topLabelMargin = parseFloat(this.options.betweenLabelAndRangeSpace) - parseFloat(this.options.thumbHeight) - 2.5;

        this.backgroundRGBA = this.hexToRGBA(this.options.backgroundColor, this.options.backgroundOpacity);
        this.coverBackgroundRGBA = this.hexToRGBA(this.options.backgroundColor, 0); 

        that = this;

        this.sheet.textContent = this.setupStartStyles();

        /* When input gets changed change styles on slider and trigger user's changeMap function */
        L.DomEvent.on(this.rangeInput, "input", function () {


            curValue = this.value;

            //that.sheet.textContent += that.getTrackStyle(this, that.sliderLength);
            var curLabel = that.rangeLabelArray[curValue - 1].innerHTML;

            // Change map according to either current label or value chosen
            mapParams = { value: curValue, label: curLabel, map: map }
            allChangeMapParameters = { ...mapParams, ...that.options.extraChangeMapParams };
            that.options.changeMap(allChangeMapParameters);
        });

        // Add click event to each label so it triggers input change for corresponding value
        for (li of this.rangeLabelArray) {
            L.DomEvent.on(li, "click", function (e) {
                var targetli = e.target;
                var index = that.rangeLabelArray.indexOf(targetli);
                that.rangeInput.value = index + 1;

                var inputEvent = new Event('input');
                that.rangeInput.dispatchEvent(inputEvent);

            });
        };

        // Initialize input change at start
        if (this.options.initializeChange) {
            var inputEvent = new Event('input');
            this.rangeInput.dispatchEvent(inputEvent);
        }

        return this.container;

    },

    onRemove: function () {
        // remove control html element
        L.DomUtil.remove(this.container);
    },

    hexToRGBA: function (hex, opacity) {
        // from https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity + ')';
        }
        throw new Error('Bad Hex');
    },

    setupStartStyles: function () {
        style = `
            .control_container { 
                background-color: ${that.backgroundRGBA};
                padding: ${that.options.topBgPadding} ${that.options.rightBgPadding} ${that.options.bottomBgPadding} ${that.options.leftBgPadding};
            }
            .range {
                position: relative;
                left: -${that.thumbSize}px;
                height: 5px;
                width: ${that.rangeWidthCSS}px;
            }
            .range input {
                width: 100%;
                position: relative;
                top:-10px;
                height: 0;
                -webkit-appearance: none;
            }
            /* -1 because the height is 2 (half the height) */
            .range input::-webkit-slider-thumb {
                background: ${that.options.activeColor};
                margin: -${that.thumbSize - 1}px 0 0;
                width: ${that.activeThumbSize}px;
                height: ${that.activeThumbSize}px;    
                -webkit-appearance: none;
                border-radius: 50%;
                cursor: pointer;
                border: 0 !important;
            }
            .range input::-moz-range-thumb {
                background: ${that.options.activeColor};
                margin: -${that.thumbSize - 1}px 0 0;
                width: ${that.activeThumbSize}px;
                height: ${that.activeThumbSize}px;
                border-radius: 50%;
                cursor: pointer;
                border: 0 !important;
            }
            .range input::-ms-thumb {
                background: ${that.options.activeColor};
                margin: -${that.thumbSize - 1}px 0 0;
                width: ${that.activeThumbSize}px;
                height: ${that.activeThumbSize}px;
                border-radius: 50%;
                cursor: pointer;
                border: 0 !important;
            }
            .range input::-webkit-slider-runnable-track {
                background-color: #8e8e8e;
                width: 100%;
                height: 2px;
                cursor: pointer;
            }
            .range input::-moz-range-track {
                background: ${that.options.backgroundColor};
                width: 100%;
                height: 2px;
                cursor: pointer;
            }
            .range input::-ms-track {
                background: ${that.options.backgroundColor};
                width: 100%;
                height: 2px;
                cursor: pointer;
                background: transparent;
                border-color: transparent;
                color: transparent;
            }
            .range input:focus {
                background: none;
                outline: none;
            }
            . range input[type=range]::-moz-focus-outer {
                border: 0;
            }
            .range-labels {
                margin: ${that.topLabelMargin}px -${that.rlLabelMargin}px 0;
                padding: 0;
                list-style: none;
            }
            .range-labels li {
                color: ${that.options.inactiveColor};
                width: ${that.options.labelWidth};
                font-size: ${that.options.labelFontSize};
                position: relative;
                float: left;
                text-align: center;
                cursor: pointer;
            }
            .range-labels li::before {
                background: ${that.options.inactiveColor};
                width: ${that.thumbSize}px;
                height: ${that.thumbSize}px;
                position: absolute;
                top: -${that.options.betweenLabelAndRangeSpace};
                right: 0;
                left: 0;
                content: "";
                margin: 0 auto;
                border-radius: 50%;
            }
            .range-labels .active {
                color: ${that.options.activeColor};
            }
            .range-labels .selected::before {
                background: ${that.options.activeColor};
            }
            .range-labels .active.selected::before {
                display: none;
            }
            `;


        return style;

    },

    getTrackStyle: function (el, sliderLength) {
        prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

        var curVal = el.value,
            labelIndex = curVal - 1,
            val = (labelIndex) * (100 / (sliderLength - 1)),
            coverVal = (parseFloat(that.thumbSize) / that.rangeWidthCSS) * 100;
        style = '';

        // Remove active and selected classes from all labels
        for (li of that.rangeLabelArray) {
            L.DomUtil.removeClass(li, 'active');
            L.DomUtil.removeClass(li, 'selected');
        }

        // Find label that should be active and give it appropriate classes
        var curLabel = that.rangeLabelArray[labelIndex];
        L.DomUtil.addClass(curLabel, 'active');
        L.DomUtil.addClass(curLabel, 'selected');

        // For labels before active label, add selected class
        for (i = 0; i < curVal; i++) {
            L.DomUtil.addClass(that.rangeLabelArray[i], 'selected');
        }

        // Change background gradient
        for (var i = 0; i < prefs.length; i++) {
            style += `.range {background: linear-gradient(to right, ${that.coverBackgroundRGBA} 0%, ${that.coverBackgroundRGBA} ${coverVal}%, ${that.options.activeColor} ${coverVal}%, ${that.options.activeColor} ${val}%,  ${that.coverBackgroundRGBA} 0%, ${that.coverBackgroundRGBA} 100%)}`;
            style += '.range input::-' + prefs[i] + `{background: linear-gradient(to right, ${that.coverBackgroundRGBA} 0%, ${that.coverBackgroundRGBA} ${coverVal}%, ${that.options.activeColor} 0%, ${that.options.activeColor} ${val}%, ${that.options.inactiveColor} ${val}%, ${that.options.inactiveColor} ${100 - coverVal}%, ${that.coverBackgroundRGBA} ${100 - coverVal}%, ${that.coverBackgroundRGBA} 100%)}`;
        }

        return style;
    }

})

L.control.timelineSlider = function (options) {
    return new L.Control.TimeLineSlider(options);
}
