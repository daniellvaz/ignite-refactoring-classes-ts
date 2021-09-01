export function callNotification (type, message) {
    let element = document.getElementById("callNotification");
    if (element) {
        element.setAttribute("typeParam", type);
        element.setAttribute("messageParam", message);
       
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
            return ('1').padStart(2, "0");;
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

        if (w.trim().length > 0) {

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

    return words.join(" ");
}

export const sumArray = (array) => {
    return array ? array.reduce((a, b) => parseInt(a) + parseInt(b)) : [];
}