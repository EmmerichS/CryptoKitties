
var colors = Object.values(allColors())

var defaultDNA = {
    "bodyColor" : 20,   //My own value
    "earsColor" : 31,   //My own value
    "mouthColor" : 14,  //My own value
    "eyesColor" : 66,   //My own value
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 13,
    "decorationSidescolor" : 13,
    "animation" :  1,
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
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
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
    var shape = $('#eyeshape').val()
    eyeVariation(shape)
})