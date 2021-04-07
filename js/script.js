let formValidator = {
    handleSubmit: e => {
        e.preventDefault();

        let send = true;

        let inputs = form.querySelectorAll('input');

        formValidator.clearError()

        for (let input of inputs) {
            let check = formValidator.checkInput(input);


            if (check !== true) {
                send = false;
                formValidator.showErro(input, check)
            }
        }
        
        if (send) {
            form.submit();
        }
    },

    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');

        if (rules !== null) {
            rules = rules.split('|');

            for (let k of rules) {
                let rDatalis = k.split('=')
                console.log(rDatalis)
                switch (rDatalis[0]) {
                    case 'required':
                        if (input.value === '') {
                            return '*Campo Vazio'
                        }
                        break;

                    case 'min':
                        if (input.value.length < rDatalis[1]) {
                            return `Não tem pelo menos ${rDatalis[1]} caracteres`
                        }
                        break;

                    case 'email':
                        if (input.value !== '') {
                            let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'E-mail Inválido';
                            }
                        }
                        break;
                }
            }
        }
        return true;
    },

    showErro: (input, error) => {
        input.style.borderColor = '#ff0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling)
    },

    clearError: () => {
        let inputs = form.querySelectorAll('input');

        for (let input of inputs) {
            input.style = ''
        }

        let errorElement = document.querySelectorAll('.error')

        for (error of errorElement) {
            error.remove()
        }
    }
}
const form = document.querySelector('.form');

form.addEventListener('submit', formValidator.handleSubmit)