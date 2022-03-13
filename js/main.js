/**
 * Modify Date: 10-03-2022
 * Author: MD JIHAD HOSSAIN
 * Description: Color genaretor application with huge DOM methods 
 */

// onload handelers 
window.onload = function() {
    main()
}

function main() {
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

    // Copy code by click event 
    const tostMsg = document.getElementById("tost-msg");
    const tostCode = document.getElementById("tost-code");
    const rmTost = document.getElementById("rm-tost");
    const progress = document.getElementById("progress");
    copyBtn.addEventListener("click", (color) => {        
        if(isValidHex(`#${hexOutput.value}`)) {
            tostMsg.classList.add("active");
            setTimeout(() => {
                tostMsg.classList.remove("active");
            }, 5000);
            if(hexMode.checked) {
                navigator.clipboard.writeText(hexOutput.value);
                tostCode.innerText = `#${hexOutput.value}`;
            }else {
                navigator.clipboard.writeText(rgbOutput.value);
                tostCode.innerText = rgbOutput.value
            }
        }else {
            alert("Invalid Color! ")
        }
    })
    rmTost.addEventListener("click", () => {
        tostMsg.classList.remove("active");
    })
};


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