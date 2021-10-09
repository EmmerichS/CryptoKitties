
var colors = Object.values(allColors())

var defaultDNA = {
    "bodyColor" : 20,   //My own value
    "earsColor" : 31,   //My own value
    "mouthColor" : 14,  //My own value
    "eyesColor" : 66,   //My own value
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationTopBottomColor" : 16,
    "decorationMiddleColor" : 25,
    "animation" : 1,
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.bodyColor);  
  $('#dnaears').html(defaultDNA.earsColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationTopBottom').html(defaultDNA.decorationTopBottomColor)
  $('#dnadecorationMiddle').html(defaultDNA.decorationMiddleColor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
  $('#catCattributes').hide();
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationTopBottom').html()
    dna += $('#dnadecorationMiddle').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.bodyColor], dna.bodyColor)
    $('#bodycolor').val(dna.bodyColor)
    earPawFeetColor(colors[dna.earsColor], dna.earsColor)
    $('#earPawFeetcolor').val(dna.earsColor)
    tummyMouthAreaColor(colors[dna.mouthColor], dna.mouthColor)
    $('#tummyMouthAreacolor').val(dna.mouthColor)
    eyeColor(colors[dna.eyesColor], dna.eyesColor)
    $('#eyecolor').val(dna.eyesColor)
    eyeVariation(dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape)
    decorationVariation(dna.decorationPattern)
    $('#decorationshape').val(dna.decorationPattern)
    topBottomDecorationColor(colors[dna.decorationTopBottomColor], dna.decorationTopBottomColor)
    $('#topBottomDecorationcolor').val(dna.decorationTopBottomColor)
    middleDecorationColor(colors[dna.decorationMiddleColor], dna.decorationMiddleColor)
    $('#middleDecorationcolor').val(dna.decorationMiddleColor)
    animationVariation(dna.animation)
    $('#animation').val(dna.animation)
}



// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal], colorVal)
})
// Changing Ear, paw and feet colors
$('#earPawFeetcolor').change(()=>{
    var colorVal = $('#earPawFeetcolor').val()
    earPawFeetColor(colors[colorVal], colorVal)
})
//Changing Tummy and Mouth Area colors
$('#tummyMouthAreacolor').change(()=>{
    var colorVal = $('#tummyMouthAreacolor').val()
    tummyMouthAreaColor(colors[colorVal], colorVal)
})
//Changing the Eye color
$('#eyecolor').change(()=>{
    var colorVal = $('#eyecolor').val()
    eyeColor(colors[colorVal], colorVal)
})
//Changing the Eye shape
$('#eyeshape').change(()=>{
    var shape = parseInt($('#eyeshape').val())
    eyeVariation(shape)
})
//Changing the tummy decoration
$('#decorationshape').change(()=>{
    var shape = parseInt($('#decorationshape').val())
    decorationVariation(shape)
})
//Changing the Top and Bottom Decoration colour
$('#topBottomDecorationcolor').change(()=>{
    var colorVal = $('#topBottomDecorationcolor').val()
    topBottomDecorationColor(colors[colorVal], colorVal)
})
//Changing the Middle Decoration colour
$('#middleDecorationcolor').change(()=>{
    var colorVal = $('#middleDecorationcolor').val()
    middleDecorationColor(colors[colorVal], colorVal)
})
//Changing the Animation listener
$('#animation').change(()=>{
    var animation = parseInt($('#animation').val())
    animationVariation(animation)
})
//Create Default Cat
function createDefaultKitty() {
    renderCat(defaultDNA)
}
//Create Random Cat
function createRandomKitty() {
    //Create a rounded down number from 10 to 98
    var numHead = Math.floor(Math.random() * 89) + 10;
    headColor(colors[numHead], numHead)
    $('#bodycolor').val(numHead)

    var numPaw = Math.floor(Math.random() * 89) + 10;
    earPawFeetColor(colors[numPaw], numPaw)
    $('#earPawFeetcolor').val(numPaw)

    var numTummy = Math.floor(Math.random() * 89) + 10;
    tummyMouthAreaColor(colors[numTummy], numTummy)
    $('#tummyMouthAreacolor').val(numTummy)

    var numEyes = Math.floor(Math.random() * 89) + 10;
    eyeColor(colors[numEyes], numEyes)
    $('#eyecolor').val(numEyes)

    var numEyesShape = Math.floor(Math.random() * 10) + 1;
    eyeVariation(numEyesShape)
    $('#eyeshape').val(numEyesShape)

    var numDecorationPattern = Math.floor(Math.random() * 10) + 1;
    decorationVariation(numDecorationPattern)
    $('#decorationshape').val(numDecorationPattern)

    var numTopBottomDecoration = Math.floor(Math.random() * 89) + 10;
    topBottomDecorationColor(colors[numTopBottomDecoration], numTopBottomDecoration)
    $('#topBottomDecorationcolor').val(numTopBottomDecoration)

    var numMiddleDecoration = Math.floor(Math.random() * 89) + 10;
    middleDecorationColor(colors[numMiddleDecoration], numMiddleDecoration)
    $('#middleDecorationcolor').val(numMiddleDecoration)

    var numAnimation = Math.floor(Math.random() * 10) + 1;
    animationVariation(numAnimation)
    $('#animation').val(numAnimation)
}