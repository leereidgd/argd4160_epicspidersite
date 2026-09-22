// the parts we change 
let face = document.getElementById("face")
let faceColorOutput = document.querySelector("output[for=face-color]")
let leftEye = document.getElementById("leftEye")
let rightEye = document.getElementById("rightEye")
let mouth = document.getElementById("mouth")
let partyHat2 = document.getElementById("partyHat2")
let mouthScaleOutput = document.querySelector("output[for=mouth-scale]")
let leftEyeScaleOutput = document.querySelector("output[for=left-eye-scale]")
let rightEyeScaleOutput = document.querySelector("output[for=right-eye-scale]")
let word = document.getElementById("word")


// inputs 
let wordInput = document.getElementById("word-input")
let faceColor = document.getElementById("face-color")
let leftEyeX = document.getElementById("left-eye-x")
let leftEyeY = document.getElementById("left-eye-y")
let rightEyeX = document.getElementById("right-eye-x")
let rightEyeY = document.getElementById("right-eye-y")
let mouthScale = document.getElementById("mouth-scale")
let leftEyeScale = document.getElementById("left-eye-scale")
let rightEyeScale = document.getElementById("right-eye-scale")
let partyHatX = document.getElementById("party-hat-x")
let partyHatY = document.getElementById("party-hat-y")
let partyHat2X = document.getElementById("party-hat-2-x")
let partyHat2Y = document.getElementById("party-hat-2-y")
let partyHat2Scale = document.getElementById("party-hat-2-scale")
let partyHat2ScaleOutput = document.querySelector("output[for=party-hat-2-scale]")

function updateOutput(element, input) {
  element.textContent = input.value
}

function changeText(element, textInput) {
  element.textContent = textInput.value
}

function changeColor(element, colorInput) {
  element.style.backgroundColor = colorInput.value
}

function changePosition(element, xInput, yInput) {
  // element.style.translate = xInput.value + "px " + yInput.value + "px";
  element.style.transform = `translate(${xInput.value}px, ${yInput.value}px)`
}

function changeScale(element, scaleInput) {
  element.style.scale = scaleInput.value
}

function changeImageTransform(element, xInput, yInput, scaleInput) {
  element.style.transform = `translate(${xInput.value}px, ${yInput.value}px) scale(${scaleInput.value})`
}

function updateSliderTrack(slider) {
  let percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100
  slider.style.setProperty("--slider-fill", `${percentage}%`)
}

// listen for changes
wordInput.addEventListener("input", function () {
  changeText(word, wordInput);
})

faceColor.addEventListener("input", function () {
  changeColor(face, faceColor)
  updateOutput(faceColorOutput, faceColor)
})

leftEyeX.addEventListener("input", function (event) {
  changeImageTransform(leftEye, leftEyeX, leftEyeY, leftEyeScale)
})
leftEyeY.addEventListener("input", function (event) {
  changeImageTransform(leftEye, leftEyeX, leftEyeY, leftEyeScale)
})

rightEyeX.addEventListener("input", function (event) {
  changeImageTransform(rightEye, rightEyeX, rightEyeY, rightEyeScale)
})
rightEyeY.addEventListener("input", function (event) {
  changeImageTransform(rightEye, rightEyeX, rightEyeY, rightEyeScale)
})

partyHatX.addEventListener("input", function (event) {
  changeImageTransform(mouth, partyHatX, partyHatY, mouthScale)
})

partyHatY.addEventListener("input", function (event) {
  changeImageTransform(mouth, partyHatX, partyHatY, mouthScale)
})

partyHat2X.addEventListener("input", function (event) {
  changeImageTransform(partyHat2, partyHat2X, partyHat2Y, partyHat2Scale)
})

partyHat2Y.addEventListener("input", function (event) {
  changeImageTransform(partyHat2, partyHat2X, partyHat2Y, partyHat2Scale)
})

partyHat2Scale.addEventListener("input", function (event) {
  changeImageTransform(partyHat2, partyHat2X, partyHat2Y, partyHat2Scale)
  updateOutput(partyHat2ScaleOutput, partyHat2Scale)
})

mouthScale.addEventListener("input", function (event) {
  changeImageTransform(mouth, partyHatX, partyHatY, mouthScale)
  updateOutput(mouthScaleOutput, mouthScale)
})

leftEyeScale.addEventListener("input", function (event) {
  changeImageTransform(leftEye, leftEyeX, leftEyeY, leftEyeScale)
  updateOutput(leftEyeScaleOutput, leftEyeScale)
})

rightEyeScale.addEventListener("input", function (event) {
  changeImageTransform(rightEye, rightEyeX, rightEyeY, rightEyeScale)
  updateOutput(rightEyeScaleOutput, rightEyeScale)
})

document.querySelectorAll('input[type="range"]').forEach(function (slider) {
  slider.addEventListener("input", function () {
    updateSliderTrack(slider)
  })
  updateSliderTrack(slider)
})

// change and update value when first loads
changeImageTransform(leftEye, leftEyeX, leftEyeY, leftEyeScale)
changeImageTransform(rightEye, rightEyeX, rightEyeY, rightEyeScale)
changeImageTransform(mouth, partyHatX, partyHatY, mouthScale)
changeImageTransform(partyHat2, partyHat2X, partyHat2Y, partyHat2Scale)
updateOutput(faceColorOutput, faceColor)
updateOutput(mouthScaleOutput, mouthScale)
updateOutput(leftEyeScaleOutput, leftEyeScale)
updateOutput(rightEyeScaleOutput, rightEyeScale)
updateOutput(partyHat2ScaleOutput, partyHat2Scale)
