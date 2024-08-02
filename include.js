// include.js
function includeHTML() {
    let elements = document.querySelectorAll('[data-include]');

    elements.forEach(element => {
        let file = element.getAttribute('data-include');
        if (file) {
            fetch(file)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    element.innerHTML = data;
                    element.removeAttribute('data-include');
                    includeHTML(); // ネストされたインクルードをサポートするために再帰的に呼び出し
                })
                .catch(error => {
                    console.error('Error loading include file:', error);
                });
        }
    });

    console.log("includeHTML done");
}

// ページが読み込まれたら関数を実行
document.addEventListener('DOMContentLoaded', includeHTML);