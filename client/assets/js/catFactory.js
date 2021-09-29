
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color, code) {
    $('#body, #left_arm, #right_arm, #head').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: ' + code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function earPawFeetColor(color, code) {
    $('#paw, #left_foot, #right_foot, .ear').css('background', '#' + color)
    $('#earPawFeetcode').html('code: ' + code)
    $('#dnaears').html(code)
}

function tummyMouthAreaColor(color, code) {
    $('#mouth_area, #tummy').css('background', '#' + color)
    $('#tummyMouthAreacode').html('code: ' + code)
    $('#dnatummy').html(code)
}

function eyeColor(color, code) {
    $('.eye').css('background', '#' + color)
    $('#eyecode').html('code: ' + code)
    $('#dnaeyes').html(code)
}


//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)

    switch (num) {
        case 1:
            normalEyes()
            $('#eyeBadgeName').html('Basic')
            break
        case 2:
            normalEyes()
            $('#eyeBadgeName').html('Round')
            roundEyes()          
            break
        case 3:
            normalEyes()
            $('#eyeBadgeName').html('Right')
            rightEyes()
            break
        case 4:
            normalEyes()
            $('#eyeBadgeName').html('Left')
            leftEyes()
            break  
        case 5:
            normalEyes()
            $('#eyeBadgeName').html('Small')
            smallEyes()
            break
        case 6:
            normalEyes()
            $('#eyeBadgeName').html('Chinese')
            chineseEyes()
            break
        case 7:
            normalEyes()
            $('#eyeBadgeName').html('Stoner')
            stonerEyes()
            break
        case 8: 
            normalEyes()
            $('#eyeBadgeName').html('Wink')
            winkEyes()
            break
    }
}

function normalEyes() {
     $('.eye').css('justify-content', 'center')
     $('.eye').find('div').css('width', '20px')
     $('.eye').find('div').css('height', '50px')
     $('.left_pupil').css('transform', 'rotate(0deg)')
     $('.right_pupil').css('transform', 'rotate(0deg)')
}

function roundEyes() {
     $('.eye').find('div').css('width', '51px')
}

//css({"propertyname":"value","propertyname":"value",...});
function rightEyes() {
     $('.eye').css('justify-content', 'flex-end')
}

function leftEyes() {
     $('.eye').css('justify-content', 'flex-start')
}

function smallEyes() {
    $('.eye').find('div').css('height', '20px')
}

function chineseEyes() {
    $('.left_pupil').css('transform', 'rotate(-45deg)')
    $('.right_pupil').css('transform', 'rotate(45deg)')
}

function stonerEyes() {
    $('.left_pupil').css('transform', 'rotate(45deg)')
    $('.right_pupil').css('transform', 'rotate(-45deg)')
}

function winkEyes() {
    $('.left_pupil').css({'height':'5px', 'width':'50px'})
}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#decorationName').html('Basic')
            normaldecoration()
            break
    }
}

async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
