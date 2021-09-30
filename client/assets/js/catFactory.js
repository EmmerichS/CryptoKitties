
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
            resetEyes()
            $('#eyeBadgeName').html('Basic')
            break
        case 2:
            resetEyes()
            $('#eyeBadgeName').html('Round')
            roundEyes()          
            break
        case 3:
            resetEyes()
            $('#eyeBadgeName').html('Right')
            rightEyes()
            break
        case 4:
            resetEyes()
            $('#eyeBadgeName').html('Left')
            leftEyes()
            break  
        case 5:
            resetEyes()
            $('#eyeBadgeName').html('Small')
            smallEyes()
            break
        case 6:
            resetEyes()
            $('#eyeBadgeName').html('Chinese')
            chineseEyes()
            break
        case 7:
            resetEyes()
            $('#eyeBadgeName').html('Stoner')
            stonerEyes()
            break
        case 8: 
            resetEyes()
            $('#eyeBadgeName').html('Wink')
            winkEyes()
            break
        case 9:
            resetEyes()
            $('#eyeBadgeName').html('Dead')
            deadEyes()
            break
        case 10:
            resetEyes()
            $('#eyeBadgeName').html('Squint')
            squintEyes()
            break
    }
}

function resetEyes() {
     $('.eye').css('justify-content', 'center')
     $('.eye').find('div').css('width', '20px')
     $('.eye').find('div').css('height', '50px')
     $('.left_pupil').css('transform', 'rotate(0deg)')
     $('.right_pupil').css('transform', 'rotate(0deg)')
     $('.eye').find('div').css('border-radius', '50%')
     $('.left_pupil2').css('transform', 'rotate(0deg)')
     $('.right_pupil2').css('transform', 'rotate(0deg)')

     //TO FIX...
     $('.eye').css('display', 'flex')
     $('.left_pupil').css({'position':'none', 'top':'none', 'left':'none'})
     $('.right_pupil').css({'position':'none', 'top':'none'})
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
    $('.left_pupil2').css('height', '0px')
}

function deadEyes() {
    $('.eye').find('div').css({'border-radius': '0%', 'transform':'rotate(45deg'})
    $('.left_pupil2').css('transform', 'rotate(90deg)')
    $('.right_pupil2').css('transform', 'rotate(90deg)')

}


//TO FIX...
function squintEyes() {
    $('.eye').css('display', 'block')
    $('.left_pupil').css({'position':'relative', 'top':'3px', 'left':'36px'})
    $('.right_pupil').css({'position':'relative', 'top':'3px'})
    
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
