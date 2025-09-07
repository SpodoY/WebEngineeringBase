export const SnackbarTypes = {
    Success: 'Success',
    Error: 'Error',
    Warning: 'Warning'
}

const showSnackbar = (message, type) => {

    let snackbar = document.querySelector('#snackbar')

    switch (type) {
        case 'Success':
            snackbar.style.backgroundColor = '#43a047';
            break;
        case 'Error':
            snackbar.style.backgroundColor = '#d50000';
            break;
        case 'Warning':
            snackbar.style.backgroundColor = '#ffc107';
            break;
    }

    snackbar.className = "show"
    snackbar.textContent = message;

    setTimeout(() =>
        snackbar.className = snackbar.className.replace("show", ""), 3000);
}

export const warnSnackbar = (message) => {
    showSnackbar(message, SnackbarTypes.Warning);
}

export const errorSnackbar = (message) => {
    showSnackbar(message, SnackbarTypes.Error);
}

export const successSnackbar = (message) => {
    showSnackbar(message, SnackbarTypes.Success);
}