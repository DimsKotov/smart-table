import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
 const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].innerHTML = ''; // Очистка существующих опций перед добавлением новых
        elements[elementName].append(
            ...Object.values(indexes[elementName])
                .map(name => `<option value="${name}">${name}</option>`).join('')
        );
    });
    

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action.type === 'clear') {
            const buttonElement = document.querySelector(`button[name='${action.name}']`);
            
            if (!buttonElement) return data;
        
            const parentElement = buttonElement.parentNode;
            const fieldName = buttonElement.getAttribute('data-field');
        
            const inputField = parentElement.querySelector(`input[data-field='${fieldName}']`);
        
            if (inputField) {
                inputField.value = '';
                state[fieldName] = '';
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}