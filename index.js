const body = document.querySelector('body')
const textarea = document.createElement("textarea");
textarea.autofocus;
textarea.className = 'textArea';
textarea.name = 'textArea';
const keyboard = document.createElement("div");
keyboard.id = 'keyboard';
keyboard.className = 'keyboard';

const rules = document.createElement("div");
rules.className = 'rules';
rules.innerHTML = 'Keyboard for windows. <br> Press "Shift + Alt" for change language.';

body.appendChild(textarea);
body.appendChild(keyboard);
body.appendChild(rules);

let lang = localStorage.getItem('keyboardVirtualLang') == undefined?'ru':localStorage.getItem('keyboardVirtualLang');
let shift = false;
let ctrl = false;
let caps = false;
let startSelection = '';
let shiftPress = false;
let altPress = false;
let controlPress = false;
let capsLockPress = false;
let charInString = 87;



function Key(code, isWrite, ru, ruShift, en, enShift ,className) {
    this.code = code;
    this.isWrite = isWrite;
    this.ru = ru;
    this.ruShift = ruShift;
    this.en = en;
    this.enShift = enShift;
    this.className = className;
}

let keysArray = [
    new Key('Backquote' , true, 'ё', 'Ё', '`', '~'),
    new Key('Digit1' , true, '1', '!', '1', '!'),
    new Key('Digit2' , true, '2', '"', '2', '@'),
    new Key('Digit3' , true, '3', '№', '3', '#'),
    new Key('Digit4' , true, '4', ';', '4', '$'),
    new Key('Digit5' , true, '5', '%', '5', '%'),
    new Key('Digit6' , true, '6', ':', '6', '^'),
    new Key('Digit7' , true, '7', '?', '7', '&'),
    new Key('Digit8' , true, '8', '*', '8', '*'),
    new Key('Digit9' , true, '9', '(', '9', '('),
    new Key('Digit0' , true, '0', ')', '0', ')'),
    new Key('Minus' , true, '-', '_', '-', '_'),
    new Key('Equal' , true, '=', '+', '=', '+'),
    new Key('Backspace' , false, 'Backspace', '', '', '' , 'backspace'),

    new Key('Tab' , false, 'Tab', '', '', '', 'tab'),
    new Key('KeyQ' , true, 'й', 'Й', 'q', 'Q'),
    new Key('KeyW' , true, 'ц', 'Ц', 'w', 'W'),
    new Key('KeyE' , true, 'у', 'У', 'e', 'E'),
    new Key('KeyR' , true, 'к', 'К', 'r', 'R'),
    new Key('KeyT' , true, 'е', 'Е', 't', 'T'),
    new Key('KeyY' , true, 'н', 'Н', 'y', 'Y'),
    new Key('KeyU' , true, 'г', 'Г', 'u', 'U'),
    new Key('KeyI' , true, 'ш', 'Ш', 'i', 'I'),
    new Key('KeyO' , true, 'щ', 'Щ', 'o', 'O'),
    new Key('KeyP' , true, 'з', 'З', 'p', 'P'),
    new Key('BracketLeft' , true, 'х', 'Х', '[', '{'),
    new Key('BracketRight' , true, 'ъ', 'Ъ', ']', '}'),
    new Key('Enter' , false, 'Enter', '', '', '', 'enter'),

    new Key('CapsLock' , false, 'Caps Lock', '', '', '', 'capsLock'),
    new Key('KeyA' , true, 'ф', 'Ф', 'a', 'A'),
    new Key('KeyS' , true, 'ы', 'Ы', 's', 'S'),
    new Key('KeyD' , true, 'в', 'В', 'd', 'D'),
    new Key('KeyF' , true, 'а', 'А', 'f', 'F'),
    new Key('KeyG' , true, 'п', 'П', 'g', 'G'),
    new Key('KeyH' , true, 'р', 'Р', 'h', 'H'),
    new Key('KeyJ' , true, 'о', 'О', 'j', 'J'),
    new Key('KeyK' , true, 'л', 'Л', 'k', 'K'),
    new Key('KeyL' , true, 'д', 'Д', 'l', 'L'),
    new Key('Semicolon' , true, 'ж', 'Ж', ';', ':'),
    new Key('Quote' , true, 'э', 'Э', '\'', '"'),
    new Key('Backslash' , true, '\\', '/', '\\', '|'),
    new Key('Delete' , false, 'DEL', '', '', '' , 'delete'),

    new Key('ShiftLeft' , false, 'Shift', '', '', '', 'shift'),
    new Key('KeyZ' , true, 'я', 'Я', 'z', 'Z'),
    new Key('KeyX' , true, 'ч', 'Ч', 'x', 'X'),
    new Key('KeyC' , true, 'с', 'С', 'c', 'C'),
    new Key('KeyV' , true, 'м', 'М', 'v', 'V'),
    new Key('KeyB' , true, 'и', 'И', 'b', 'B'),
    new Key('KeyN' , true, 'т', 'Т', 'n', 'N'),
    new Key('KeyM' , true, 'ь', 'Ь', 'm', 'M'),
    new Key('Comma' , true, 'б', 'Б', ',', '<'),
    new Key('Period' , true, 'ю', 'Ю', '.', '>'),
    new Key('Slash' , true, '.', ',', '/', '?'),
    new Key('ArrowUp' , false, '<img class="image" src="src/arrowUp.png">', '', '', ''),
    new Key('ShiftRight' , false, 'Shift', '', '', '', 'shift'),

    new Key('ControlLeft' , false, 'Ctrl', '', '', '', 'alt'),
    new Key('AltLeft' , false, 'Alt', '', '', '', 'alt'),
    new Key('Space' , true, `ru`, 'RU ', `en`, 'EN ', 'space'),
    new Key('AltRight' , false, 'Alt', '', '', '', 'alt'),
    new Key('ArrowLeft' , false, '<img class="image" src="src/arrowLeft.png">', '', '', ''),
    new Key('ArrowDown' , false, '<img class="image" src="src/arrowDown.png">', '', '', ''),
    new Key('ArrowRight' , false, '<img class="image" src="src/arrowRight.png">', '', '', ''),
    new Key('ControlRight' , false, 'Ctrl', '', '', '', 'ctrlRight')
];

function createKeyboard() {
    let keyboardContent = '';
    for(let i = 0; i < keysArray.length; i++){
        let key = keysArray[i];
        let className = key.className == undefined?'key':key.className;
        let keyText = '';
        if(key.isWrite){
            keyText = shift == true ? lang == 'ru'? key.ruShift :key.enShift:lang == 'ru'?key.ru:key.en;
        }
        else {
            keyText = key.ru;
        }
        keyboardContent += `<div class ="${className}" id = ${key.code}> ${keyText}</div>`
    }
    keyboard.innerHTML = keyboardContent;
}

function refreshKeyBoard() {
    for(let i = 0; i < keysArray.length; i++){
        let key = keysArray[i];
        let keyText = '';
        if(key.isWrite){
            keyText = shift == true ? lang == 'ru'? key.ruShift :key.enShift:lang == 'ru'?key.ru:key.en;
            keyText = caps == true ? keyText.toUpperCase() : keyText;
        }
        else {
            keyText = key.ru;
        }
        document.getElementById(key.code).innerHTML = keyText;
    }
}

function write(code) {
    let key = null;
    for(let i = 0; i < keysArray.length; i++){
        if(keysArray[i].code == code){
            key = keysArray[i];
        }
    }
    if(key != null){
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd - textarea.selectionStart;
        let text = textarea.value.split('');
        let char = shift == true ? lang == 'ru'? key.ruShift :key.enShift:lang == 'ru'?key.ru:key.en;
        char = caps?char.toUpperCase():char;
        text.splice( start, end, char );

        let value = '';
        for(let i = 0; i<text.length; i++){
            value += text[i];
        }
        textarea.value = value;
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = textarea.selectionStart;
    }
}



createKeyboard();

document.getElementById('keyboard').addEventListener('mousedown', function(event){
    let target = event.target;
    if(target.id != 'keyboard'){
        if(target.id == ''){
            target = target.parentElement;
        }
        choiceEvent(target.id);
        target.classList.add('pressMouse');

        document.onmouseup = function() {
            textarea.focus();
            target.classList.remove('pressMouse');
        }
    }
});


document.addEventListener('keydown' , function (event){
    event.preventDefault();
    textarea.focus();
    let key = document.getElementById(event.code);
    if (key != null) {

        if (event.code == 'ShiftLeft' || event.code == 'ShiftRight'){
            if (!shiftPress) {
                key.classList.add('press');
                shiftPress = true;
                shiftChange(true);
            }
        }
        else if (event.code == 'AltLeft' || event.code == 'AltRight'){
            if (!altPress) {
                key.classList.add('press');
                altPress = true;
                choiceEvent(event.code);
            }
        }
        else if (event.code == 'ControlLeft' || event.code == 'ControlRight'){
            if (!controlPress) {
                key.classList.add('press');
                controlPress = true;
                controlChange(true);
            }
        }
        else if (event.code == 'CapsLock' ){
            if (!capsLockPress) {
                key.classList.add('press');
                capsLockPress = true;
                choiceEvent(event.code);
            }
        }
        else{
            key.classList.add('press');
            choiceEvent(event.code);
        }

        document.addEventListener('keyup', function (event) {
            let key = document.getElementById(event.code);
            if (key != null) {
                if (event.code == 'ShiftLeft' || event.code == 'ShiftRight'){
                    shiftPress = false;
                    shiftChange(false);
                }
                else if (event.code == 'AltLeft' || event.code == 'AltRight'){
                    altPress = false;
                }
                else if (event.code == 'ControlLeft' || event.code == 'ControlRight'){
                    controlPress = false;
                    controlChange(false);
                }
                else if (event.code == 'CapsLock' ){
                    capsLockPress = false;
                }

                key.classList.remove('press');
            }
        });

    }
});

