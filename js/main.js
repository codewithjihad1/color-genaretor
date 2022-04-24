/**
 * Modify Date: 10-03-2022
 * Author: MD JIHAD HOSSAIN
 * Description: Color genaretor application with huge DOM methods 
 */

// Gobal Variables 
const defaultPresetColors = [
	'#ffcdd2',
	'#f8bbd0',
	'#e1bee7',
	'#ff8a80',
	'#ff80ab',
	'#ea80fc',
	'#b39ddb',
	'#9fa8da',
	'#90caf9',
	'#b388ff',
	'#8c9eff',
	'#82b1ff',
	'#03a9f4',
	'#00bcd4',
	'#009688',
	'#80d8ff',
	'#84ffff',
	'#a7ffeb',
	'#c8e6c9',
	'#dcedc8',
	'#f0f4c3',
	'#b9f6ca',
	'#ccff90',
	'#ffcc80',
    '#00ff00',
];
const copySound = new Audio('../audio/copy-sound.wav');
let tostContainer = null;

// onload handelers 
window.onload = function() {
    main()
    // Display color boxes
    displayColorBox(defaultPresetColors);
}

// DOM references 
const randomColor = document.getElementById("random-color");
const displayColor = document.getElementById("display-color");
const hexOutput = document.getElementById("hex-output");
const rgbOutput = document.getElementById("rgb-output");
const colorLabelRed = document.getElementById("color-slider-red-label");
const colorLabelGreen = document.getElementById("color-slider-green-label");
const colorLabelBlue = document.getElementById("color-slider-blue-label");
const colorSliderRed = document.getElementById("color-slider-red");
const colorSliderGreen = document.getElementById("color-slider-green");
const colorSliderBlue = document.getElementById("color-slider-blue");
const hexMode = document.getElementById("hex-color-mode");
const rgbMode = document.getElementById("rgb-color-mode");
const copyBtn = document.getElementById("copy-color-code");
const presetColorParent = document.getElementById("preset-color");
const tostMsg = document.getElementById("tost-msg");
const tostCode = document.getElementById("tost-code");


function main() {    
    randomColor.addEventListener('click', () => {
        const color = genaretColor();
        const hexColor = genaretHexColor(color);
        const rgbColor = genaretRGBColor(color);

        displayColor.style.backgroundColor = hexColor;
        hexOutput.value = hexColor.substring(1);
        rgbOutput.value = rgbColor;
        colorLabel(color)
    })
    // color label output
    function colorLabel(color) {
        colorLabelRed.innerText = color.red;
        colorLabelGreen.innerText = color.green;
        colorLabelBlue.innerText = color.blue;
        colorSliderRed.value = color.red;
        colorSliderGreen.value = color.green;
        colorSliderBlue.value = color.blue;
    }
    // Input color code to change the color 
    hexOutput.addEventListener('keyup', (e) => {
        let hex = e.target.value
        let color = hexToRGBcolor(hex);
        if(hex.length >= 6) {
            hexOutput.value = hex.toUpperCase()
            displayColor.style.backgroundColor = `#${hex}`
            rgbOutput.value = genaretRGBColor(color);
            colorLabel(color)
        }
    });

    // Range to RGB color slider
    function getSliderValues() {
        const color = genaretSliderToRGBValue();
        const rgbColor = genaretRGBColor(color);
        const hexColor = rangeToHex(color);
        displayColor.style.backgroundColor = rgbColor;
        rgbOutput.value = rgbColor;
        hexOutput.value = hexColor.substring(1);
    }
    colorSliderRed.addEventListener('input', () => {
        getSliderValues()
        const color = genaretSliderToRGBValue();
        colorLabelRed.innerText = color.red;
    });
    colorSliderGreen.addEventListener('input', () => {
        getSliderValues()
        const color = genaretSliderToRGBValue();
        colorLabelGreen.innerText = color.green;
    });
    colorSliderBlue.addEventListener('input', () => {
        getSliderValues()
        const color = genaretSliderToRGBValue();
        colorLabelBlue.innerText = color.blue;
    });

    // preset Color copy handalers
    presetColorParent.addEventListener('click', (e) => {
        let presetColorCode;
        if(e.target.className === "color-box") {
            presetColorCode = e.target.getAttribute('data-color')
            navigator.clipboard.writeText(presetColorCode);
            copySound.volume = .2
            copySound.play()
            setTimeout(() => {}, 5000);
        }
        // remove tost container
        if(tostContainer !== null) {
            tostContainer.remove()
            tostContainer = null
        }
        // check color code
        if(isValidHex(presetColorCode)) {
            navigator.clipboard.writeText(presetColorCode);
            genaretTostMsg(presetColorCode.toUpperCase())
        }else {
            alert("Invalid Color! ")
        }

        const progressBar = document.getElementById("progress");
        progressBar.addEventListener('animationend', () => {
            tostContainer.remove()
        })
        const rmTost = document.getElementById("rm-tost")
        rmTost.addEventListener("click", () => {
            tostContainer.remove()
        })
    })

    // Copy code by click event     
    copyBtn.addEventListener("click", () => {
        if(tostContainer !== null) {
            tostContainer.remove()
            tostContainer = null
        }

        if(isValidHex(`#${hexOutput.value}`)) {
            if(hexMode.checked) {
                navigator.clipboard.writeText(hexOutput.value);
                genaretTostMsg(`#${hexOutput.value}`)
            }else {
                navigator.clipboard.writeText(rgbOutput.value);
                genaretTostMsg(rgbOutput.value)
            }
        }else {
            alert("Invalid Color! ")
        }
        // Remove tost massage
        const progressBar = document.getElementById("progress");
        progressBar.addEventListener('animationend', () => {
            tostContainer.remove()
        })
        const rmTost = document.getElementById("rm-tost")
        rmTost.addEventListener("click", () => {
            tostContainer.remove()
        })
    })
    
};


// Genaret Tost massage 
function genaretTostMsg(msg) {
    tostContainer = document.createElement('div');
    tostContainer.classList = "tost-msg active";
    tostContainer.innerHTML = `
        <div class="tost-content">
            <i class='bx bx-check'></i>
            <div class="massage">
                <h3>Copied Success </h3>
                <span class="color-code" id="tost-code">${msg}</span>
            </div>
            <i class='bx bx-x cross' id="rm-tost"></i>
        </div>
        <div class="progress" id="progress"></div>`;
    document.body.appendChild(tostContainer);
}

/**
 * Genaret color code 
 * @returns {object}
 */
function genaretColor() {
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    return {red, green, blue};
}

/**
 * Hex Color Generator
 * @return {string}
 */
function genaretHexColor({red, green, blue}) {
    const getTwoCode = (val) => {
        let hex = val.toString(16);
        return hex.length < 2 ? `0${hex}` : hex.toString(16);
    }
    return (`#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`).toUpperCase();
}

/**
 * Genaret RGB color 
 * @return {string}
 */
function genaretRGBColor({red, green, blue}) {
    return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * Genaret Slider to RGB values
 * @returns {object} color
 */
function genaretSliderToRGBValue() {
    let red = document.getElementById("color-slider-red").value;
    let green = document.getElementById("color-slider-green").value;
    let blue = document.getElementById("color-slider-blue").value;
    return {red, green, blue}
}

// Range slider To Hex Converter
function rangeToHex({red, green, blue}) {
    const getTwoCode = (val) => {
        let hex = Number(val).toString(16);
        return hex.length < 2 ? `0${hex}` : hex.toString(16);
    }
    return (`#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`).toUpperCase();
}

/**
 * Hex to rgb color genaretors 
 * @return{string} 
 */
function hexToRGBcolor(hex) {
    let red = parseInt(hex.slice(0, 2), 16);
    let green = parseInt(hex.slice(2, 4), 16);
    let blue = parseInt(hex.slice(4, 6), 16);
    return {red, green, blue};
}

// Hex code validation functions
function isValidHex(color) {
	if (color.length !== 7) return false;
	if (color[0] !== '#') return false;
	color = color.substring(1);
	return /^[0-9A-Fa-f]{6}$/i.test(color);
}

/**
 * @param {*} color 
 * @returns {object}
 */
function presetColor(color) {
    const div = document.createElement('div');
    div.className = 'color-box';
    div.style.backgroundColor = color
    div.setAttribute('data-color', color)
    return div;
}

/**
 * @param {*} parent 
 * @return {string}
 */
function displayColorBox(colors) {
    colors.forEach((val) => {
        const colorBox = presetColor(val)
        presetColorParent.appendChild(colorBox)
    })
}

