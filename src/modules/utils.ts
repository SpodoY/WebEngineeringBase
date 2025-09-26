import type {EventType} from "../types/EventType.js";

const showSnackbar = (message: string, type: EventType) => {

    let snackbar = document.querySelector('#snackbar') as HTMLDivElement | null;
    if (!snackbar) {
        console.error('Snackbar HTML element not found');
        return;
    }

    switch (type) {
        case 'success':
            snackbar.style.backgroundColor = '#43a047';
            break;
        case 'error':
            snackbar.style.backgroundColor = '#d50000';
            break;
        case 'warning':
            snackbar.style.backgroundColor = '#ffc107';
            break;
        case 'info':
            snackbar.style.backgroundColor = '#078bff';
            break;
        default:
            snackbar.style.backgroundColor = '#000000';
            break;
    }

    snackbar.className = "show"
    snackbar.textContent = message;

    setTimeout(() =>
        snackbar.className = snackbar.className.replace("show", ""), 3000);
}

export const warnSnackbar = (message: string) => {
    showSnackbar(message, "warning");
}

export const errorSnackbar = (message: string) => {
    showSnackbar(message, "error");
}

export const successSnackbar = (message: string) => {
    showSnackbar(message, "success");
}