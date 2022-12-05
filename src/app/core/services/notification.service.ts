import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}
  error(errorType: string, message: string) {
    const divError = document.createElement('div');
    const errorHeader = document.createElement('h2');
    const errorTypeText = document.createElement('p');
    const errorText = document.createElement('p');
    divError.classList.add('error');
    errorHeader.innerHTML = 'Ошибка!';
    divError.appendChild(errorHeader);
    errorTypeText.classList.add('error_type_text');
    errorTypeText.innerHTML = errorType;
    divError.appendChild(errorTypeText);
    errorText.classList.add('error_text');
    errorText.innerHTML = message;
    divError.appendChild(errorText);
    document.body.appendChild(divError);
    setTimeout(() => {
      divError.style.opacity = '0';
      divError.style.transition = '500ms';
      this.removeElement(divError);
    }, 2000);
  }
  removeElement(htmlElement: HTMLElement) {
    setTimeout(() => {
      document.body.removeChild(htmlElement);
    }, 500);
  }
}
