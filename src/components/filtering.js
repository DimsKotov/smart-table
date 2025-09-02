export function initFiltering(elements) {
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
      elements[elementName].append(
        ...Object.values(indexes[elementName]).map((name) => {
          const el = document.createElement("option");
          el.textContent = name;
          el.value = name;
          return el;
        })
      );
    });
  };

  const applyFiltering = (query, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    document
      .querySelectorAll("[type=button][value='clear']")
      .forEach((button) => {
        button.addEventListener("click", () => {
          const fieldName = button.getAttribute("data-field");

          if (!fieldName) return;

          // Найти соседнее поле ввода внутри родителя кнопки
          const parentElement = button.parentNode;
          const relatedInput = parentElement.querySelector(
            `input[data-field=${fieldName}]`
          );

          if (relatedInput) {
            relatedInput.value = ""; // Очистить поле ввода

            // Обновление состояния фильтра
            state[fieldName] = "";
          }
        });
      });

    // @todo: #4.5 — отфильтровать данные, используя компаратор
    const filter = {};
    Object.keys(elements).forEach((key) => {
      if (elements[key]) {
        if (
          ["INPUT", "SELECT"].includes(elements[key].tagName) &&
          elements[key].value
        ) {
          // ищем поля ввода в фильтре с непустыми данными
          filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
        }
      }
    });

    return Object.keys(filter).length
      ? Object.assign({}, query, filter)
      : query; // если в фильтре что-то добавилось, применим к запросу
  };

  return {
    updateIndexes,
    applyFiltering,
  };
}
