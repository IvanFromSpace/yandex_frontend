// Телефонная книга
var phoneBook = [];
var book = [];

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {

    // phonebook object

    // обработка ввода
    var comma = command.split(" ");
    var commandName = comma[0];
    var contact = comma[1];
    var number = "";
    for(var i = 2; i< comma.length; i++){
        number += comma[i];
    }
    if (commandName === "ADD") {
        if (filterName(contact, phoneBook)) {
            return addContactEqual(contact, number, phoneBook);
        } else {
            return addContact(contact, number);
        }
    }
    if (commandName === "SHOW") {
        return show(phoneBook);
    }
    if (commandName === "REMOVE_PHONE") {
        number = comma[1];
        return removePhone(number, phoneBook);
    }


    //создадим функции дйствий
    // ADD
    function addContact(contact, namber) {
        var note;
        if (namber.length > 9) { // при вводе более двух номеров
            book = namber.split(",");
            note = contact + ": ";
            for(var i = 0 ; i<book.length; i++) {
                if (i == book.length-1) note+= book[i];
                else  note += book[i] + ", "; 
                
            }
        } else {

            note = contact + ": " + namber;
        }
        phoneBook.push(note);
    }
    // 
    function addContactEqual(contact, namber, phoneBook) {
        for (var i = 0; i < phoneBook.length; i++) {

            var nameIn = phoneBook[i].split(":")
            if (contact == nameIn[0]) {
                phoneBook[i] = phoneBook[i] + ", " + namber;
            }
        }
    }

    function splitString(stringToSplit, separator) {
        var arrayOfStrings = stringToSplit.split(separator);
    }
    // REMOVE_PHONE
    function removePhone(number, phoneBook) {
        // проверка на совпадение
        if (filterNumber(number)) {
            for (var i = 0; i < phoneBook.length; i++) {
                var re = number;
                var str = phoneBook[i];
                var newstr = str.replace(re, '');
                newstr = newstr.replace(" ,", "");
                // убираем строку в массиве со старым номером
                phoneBook[i] = newstr;
                
            }
            
            return true;
        }
        return false;

    }
    // возврощает true при нахождении одинакового номера в книге
    function filterNumber(number) {
        for (var i = 0; i < phoneBook.length; i++) {
            if (number == phoneBook[i].match(number)) return true;
            
            
        }
        return false;
    }
    //возврощает true при нахождении одинакового имени в книге
    function filterName(name, phoneBook) {
        for (var i = 0; i < phoneBook.length; i++) {
            var nameIn = phoneBook[i].split(":")
            if (name == nameIn[0]) return true;
        }
    }

    // SHOW
    // Вывод: 
    // ["Alex: 555-20-01", "Ivan: 555-10-01, 555-10-02"]
    function show(phoneBook) {
        for (var i = 0 ; i < phoneBook.length; i++) { // проверка на пустой массив без номера
            var regex = /[1-9]/g;
            var found = phoneBook[i].match(regex);
            if (found === null) book = phoneBook.splice(i, 1);
        }
        return phoneBook.sort();
    }
    // 


}
