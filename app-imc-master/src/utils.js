export function callNotification(type, message, title) {
    let element = document.getElementById("callNotification");

    if (element) {
        element.setAttribute("typeParam", type);
        element.setAttribute("messageParam", message);
        element.setAttribute("titleParam", title ?? null);

        element.click();
    }

}

export function reduceValue(list) {
    return list.length > 0 ? list.reduce((a, b) => a + b) : 0;
}

export const hideOpenedMenu = () => {
    let wrapper = document.getElementById("wrapper");
    let fixedMenuPlugin = document.getElementById("fixedMenuPlugin");

    if (typeof wrapper !== undefined && wrapper !== null) {
        if (wrapper.style.width == "300px") {
            if (typeof fixedMenuPlugin != undefined && fixedMenuPlugin != null) {
                fixedMenuPlugin.click();
            }
        }
    }
}

export const getMonthName = (monthNumber) => {
    switch (monthNumber) {
        case 1:
            return 'Janeiro';
        case 2:
            return 'Fevereiro';
        case 3:
            return 'Março';
        case 4:
            return 'Abril';
        case 5:
            return 'Maio';
        case 6:
            return 'Junho';
        case 7:
            return 'Julho';
        case 8:
            return 'Agosto';
        case 9:
            return 'Setembro';
        case 10:
            return 'Outubro';
        case 11:
            return 'Novembro';
        case 12:
            return 'Dezembro';
    }
}

export const getMonthNumber = (monthName) => {
    switch (monthName) {
        case 'Janeiro':
            return ('2').padStart(2, "0");;
        case 'Fevereiro':
            return ('2').padStart(2, "0");
        case 'Março' || 'Marco':
            return ('3').padStart(2, "0");;
        case 'Abril':
            return ('4').padStart(2, "0");;
        case 'Maio':
            return ('5').padStart(2, "0");;
        case 'Junho':
            return ('6').padStart(2, "0");;
        case 'Julho':
            return ('7').padStart(2, "0");;
        case 'Agosto':
            return ('8').padStart(2, "0");;
        case 'Setembro':
            return ('9').padStart(2, "0");;
        case 'Outubro':
            return ('10').padStart(2, "0");;
        case 'Novembro':
            return ('11').padStart(2, "0");;
        case 'Dezembro':
            return ('12').padStart(2, "0");;

        default:
            return;
    }
}

export const formatText = (str) => {
    if (str.length === 0)
        return "";
    let loweredText = str.toLowerCase();
    let words = loweredText.split(" ");

    for (let a = 0; a < words.length; a++) {
        let w = words[a];
        if (w == 'i' || w == 'ii') {
            words[a] = w.toUpperCase();
        }
        else if (w.trim().length > 0) {

            if (w.split('.').length > 1) {
                words[a] = w.toUpperCase();
            }
            else {
                let firstLetter = w[0];

                if (w.length > 2) {
                    w = firstLetter.toUpperCase() + w.slice(1);
                } else {
                    w = firstLetter + w.slice(1);
                }

                words[a] = w;
            }
        }

    }

    return words.join(" ");;
}
export const replaceCommonWords = (str) => {
    str = formatText(str);
    str = str.replace("-", "");
    str = str.replace("Republica", "Rep.");
    str = str.replace("Santa", "St.");

    return str;
}

export const sumArray = (array) => {
    return array ? array.reduce((a, b) => parseInt(a) + parseInt(b)) : [];
}

export function localStorageExpires() {
    var toRemove = [];
    var currentDate = new Date().getTime();

    for (var i = 0, j = localStorage.length; i < j; i++) {
        var key = localStorage.key(i),
            itemValue = localStorage.getItem(key);

        if (itemValue && /^\{(.*?)\}$/.test(itemValue)) {
            var current = JSON.parse(itemValue);

            if (current.expires && current.expires <= currentDate) {
                toRemove.push(key);
            }
        }
    }

    for (var i = toRemove.length - 1; i >= 0; i--) {
        localStorage.removeItem(toRemove[i]);
    }
}

export function setLocalStorage(chave, valor, minutos) {
    localStorageExpires();

    var expirarem = new Date().getTime() + (60000 * minutos);

    localStorage.setItem(chave, JSON.stringify({
        "value": valor,
        "expires": expirarem
    }));
}
export function getLocalStorage(chave) {
    localStorageExpires();
    var itemValue = localStorage.getItem(chave);

    if (itemValue && /^\{(.*?)\}$/.test(itemValue)) {

        //Decodifica de volta para JSON
        var current = JSON.parse(itemValue);

        return current.value;
    }
}
export const realFormat = (str) => {
    if (!str)
        return "";

    let format = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };
    return str.toLocaleString('pt-BR', format);
}
