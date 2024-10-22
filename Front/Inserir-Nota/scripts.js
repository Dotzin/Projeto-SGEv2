document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        const student = document.getElementById("student").value;
        const classGroup = document.getElementById("class").value;
        const year = document.getElementById("year").value;
        const subject = document.getElementById("subject").value;
        const grade = document.getElementById("grade").value;

        if (!student || !classGroup || !year || !subject || grade === "") {
            alert("Por favor, preencha todos os campos.");
            event.preventDefault(); // Impede o envio do formulário
        } else if (grade < 0 || grade > 10) {
            alert("A nota deve estar entre 0 e 10.");
            event.preventDefault();
        }
    });
    
});
