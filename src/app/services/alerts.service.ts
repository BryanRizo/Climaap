import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private loading: boolean = false;
  private message: string | null = null;

  get loadingStatus(): boolean {
    return this.loading;
  }
  get getMessage(): string | null {
    return this.message;
  }

  showLoading(message?: string) {
    this.loading = true;
    document.body.style.overflow = "hidden";
    if (message)
      this.message = message;
    else
      this.message = null;
  }

  hideLoading() {
    this.loading = false;
    document.body.style.overflow = "visible";
  }

  showCustomWarning(titleBtn: string, titleCalnc: string, bodyMessag: string): Observable<boolean> {


    const template: string = `
        <div>
          ${bodyMessag}
          <div class="d-flex mt-5 mb-3 px-1 justify-content-between">
            <div style="width: 47%;">
                <button type="button" id="confirmar-sweetalert"
                  class="btn Pani-btn-primary text-center col-lg-12">${titleBtn}</button>
            </div>
            <div style="width: 47%;">
                <button type="button" id="cancelar-sweetalert"
                    class="btn Pani-btn-outline-primary text-center col-lg-12">${titleCalnc}</button>
            </div>
        </div>
      `;

    return this._showWarningCustom(template);
  }


  showWarning(title: string, text: string): Observable<boolean> {
    return this._showAlertConfirmacionCancel(title, text, this._warningTemplate);
  }

  showWarningObservable(title: string, text: string): Observable<boolean> {
    return this._showAlertConfirmacionCancelWithObservable(title, text, this._warningTemplate);
  }

  showForgotPassword(): Observable<boolean> {
    return this._showAlertConfirmacionCancel('', '', this._forgotPasswordTemplate);
  }

  showErrorLogin() {
    this._showAlertConfirmacion('', '', this._errorLoginTemplate);
  }

  showErrorGeneral() {
    this._showAlertConfirmacion("Error", "Inténtelo más tarde", this._errorTemplate);
  }

  showError(title: string, text: string) {
    this._showAlertConfirmacion(title, text, this._errorTemplate);
  }

  showInformation(title: string, text: string) {
    this._showAlertConfirmacion(title, text, this._informationTemplate);
  }

  showErrorObservable(title: string, text: string): Observable<boolean> {
    return this._showAlertConfirmacionWithObservable(title, text, this._errorTemplate);
  }

  showSuccessful(title: string, text: string) {
    this._showAlertConfirmacion(title, text, this._successfulTemplate);
  }

  showSuccessfulWithObservable(title: string, text: string): Observable<boolean> {
    return this._showAlertConfirmacionWithObservable(title, text, this._successfulTemplate);
  }

  private _showAlertConfirmacionCancel(title: string, text: string, template: string): Observable<boolean> {
    return from(new Promise((resolve) => {
      const options: SweetAlertOptions = {
        html: template.replace('{{title}}', title).replace('{{text}}', text),
        showConfirmButton: false,
        focusCancel: false,
        focusConfirm: false,
        didOpen: () => {
          const buttonCancelar = document.getElementById('cancelar-sweetalert');
          buttonCancelar!.addEventListener('click', () => {
            Swal.clickCancel();
            resolve(false);
          });

          const buttonConfirmar = document.getElementById('confirmar-sweetalert');
          buttonConfirmar!.addEventListener('click', () => {
            Swal.clickConfirm();
            resolve(true);
          });

          const xConfirmar = document.getElementById('x-sweetalert');
          xConfirmar!.addEventListener('click', () => {
            Swal.close();
            resolve(false);
          });
        }
      };
      Swal.fire(options);
    })).pipe(switchMap(response => {
      return of(response as boolean);
    }));
  }

  private _showWarningCustom(template: string) {
    return from(new Promise((resolve) => {
      const options: SweetAlertOptions = {
        html: template,
        //Agregando no permitir click fuera, ni opción escape.
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        focusCancel: false,
        focusConfirm: false,
        didOpen: () => {
          const buttonCancelar = document.getElementById('cancelar-sweetalert');
          buttonCancelar!.addEventListener('click', () => {
            Swal.clickCancel();
            resolve(false);
          });

          const buttonConfirmar = document.getElementById('confirmar-sweetalert');
          buttonConfirmar!.addEventListener('click', () => {
            Swal.clickConfirm();
            resolve(true);
          });

          const xConfirmar = document.getElementById('x-sweetalert');
          xConfirmar!.addEventListener('click', () => {
            Swal.close();
            resolve(false);
          });
        }
      };
      Swal.fire(options);
    })).pipe(switchMap(response => {
      return of(response as boolean);
    }));
  }

  private _showAlertConfirmacionCancelWithObservable(title: string, text: string, template: string): Observable<boolean> {
    return from(new Promise((resolve) => {
      const options: SweetAlertOptions = {
        html: template.replace('{{title}}', title).replace('{{text}}', text),
        //Agregando no permitir click fuera, ni opción escape.
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        focusCancel: false,
        focusConfirm: false,
        didOpen: () => {
          const buttonCancelar = document.getElementById('cancelar-sweetalert');
          buttonCancelar!.addEventListener('click', () => {
            Swal.clickCancel();
            resolve(false);
          });

          const buttonConfirmar = document.getElementById('confirmar-sweetalert');
          buttonConfirmar!.addEventListener('click', () => {
            Swal.clickConfirm();
            resolve(true);
          });

          const xConfirmar = document.getElementById('x-sweetalert');
          xConfirmar!.addEventListener('click', () => {
            Swal.close();
            resolve(false);
          });
        }
      };
      Swal.fire(options);
    })).pipe(switchMap(response => {
      return of(response as boolean);
    }));
  }

  private _showAlertConfirmacion(title: string, text: string, template: string) {
    const options: SweetAlertOptions = {
      html: template.replace('{{title}}', title).replace('{{text}}', text),
      showConfirmButton: false,
      focusCancel: false,
      focusConfirm: false,
      didOpen: () => {
        const buttonConfirmar = document.getElementById('confirmar-sweetalert');
        buttonConfirmar!.addEventListener('click', () => {
          Swal.clickConfirm();
        });
        const xConfirmar = document.getElementById('x-sweetalert');
        xConfirmar!.addEventListener('click', () => {
          Swal.close();
        });
      }
    };
    Swal.fire(options).then(() => {
      Swal.close();
    });;
  }

  private _showAlertConfirmacionWithObservable(title: string, text: string, template: string): Observable<boolean> {
    return from(new Promise((resolve) => {
      const options: SweetAlertOptions = {
        html: template.replace('{{title}}', title).replace('{{text}}', text),
        //Agregando no permitir click fuera, ni opción escape.
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        focusCancel: false,
        focusConfirm: true,
        didOpen: () => {
          const buttonConfirmar = document.getElementById('confirmar-sweetalert');
          buttonConfirmar!.addEventListener('click', () => {
            Swal.clickConfirm();
            resolve(true);
          })
          const xConfirmar = document.getElementById('x-sweetalert');
          xConfirmar!.addEventListener('click', () => {
            Swal.close();
            resolve(false);
          })
        }
      };
      Swal.fire(options);
    })).pipe(switchMap(response => {
      return of(response as boolean);
    }));
  }

  private successfulIcon: string = `
    <svg width="60" height="61" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="0.5" width="60" height="60" rx="30" fill="#2FA904"/>
    <path d="M50.0716 22.1909L28.4724 43.8572C27.8244 44.5072 26.9738 44.8344 26.1232 44.8344C25.2726 44.8344 24.422 44.5072 23.774 43.8572L12.9747 33.024C11.6751 31.7209 11.6751 29.614 12.9747 28.3109C14.2738 27.0072 16.3735 27.0072 17.6731 28.3109C22.3357 32.9881 29.9108 32.9882 34.5734 28.311L45.3732 17.4778C46.6722 16.1741 48.7719 16.1741 50.0716 17.4778C51.3706 18.7809 51.3706 20.8872 50.0716 22.1909Z" fill="white"/>
    </svg>
  `;

  private warningIcon: string = `
    <svg width="60" height="61" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 60.5C37.9565 60.5 45.5871 57.3393 51.2132 51.7132C56.8393 46.0871 60 38.4565 60 30.5C60 22.5435 56.8393 14.9129 51.2132 9.2868C45.5871 3.66071 37.9565 0.5 30 0.5C22.0435 0.5 14.4129 3.66071 8.7868 9.2868C3.16071 14.9129 0 22.5435 0 30.5C0 38.4565 3.16071 46.0871 8.7868 51.7132C14.4129 57.3393 22.0435 60.5 30 60.5ZM19.8984 19.8711C20.8242 17.2578 23.3086 15.5 26.0859 15.5H32.918C37.0078 15.5 40.3125 18.8164 40.3125 22.8945C40.3125 25.543 38.8945 27.9922 36.5977 29.3164L32.8125 31.4844C32.7891 33.0078 31.5352 34.25 30 34.25C28.4414 34.25 27.1875 32.9961 27.1875 31.4375V29.8555C27.1875 28.8477 27.7266 27.9219 28.6055 27.418L33.7969 24.4414C34.3477 24.125 34.6875 23.5391 34.6875 22.9062C34.6875 21.9219 33.8906 21.1367 32.918 21.1367H26.0859C25.6875 21.1367 25.3359 21.3828 25.207 21.7578L25.1602 21.8984C24.6445 23.3633 23.0273 24.125 21.5742 23.6094C20.1211 23.0938 19.3477 21.4766 19.8633 20.0234L19.9102 19.8828L19.8984 19.8711ZM26.25 41.75C26.25 40.7554 26.6451 39.8016 27.3484 39.0984C28.0516 38.3951 29.0054 38 30 38C30.9946 38 31.9484 38.3951 32.6516 39.0984C33.3549 39.8016 33.75 40.7554 33.75 41.75C33.75 42.7446 33.3549 43.6984 32.6516 44.4016C31.9484 45.1049 30.9946 45.5 30 45.5C29.0054 45.5 28.0516 45.1049 27.3484 44.4016C26.6451 43.6984 26.25 42.7446 26.25 41.75Z" fill="#D9D9D9"/>
    </svg>
  `;

  private errorIcon: string = `
    <svg width="60" height="61" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 0.5C13.4274 0.5 0 13.9274 0 30.5C0 47.0726 13.4274 60.5 30 60.5C46.5726 60.5 60 47.0726 60 30.5C60 13.9274 46.5726 0.5 30 0.5ZM44.7097 38.375C45.2782 38.9435 45.2782 39.8629 44.7097 40.4314L39.9194 45.2097C39.3508 45.7782 38.4314 45.7782 37.8629 45.2097L30 37.2742L22.125 45.2097C21.5564 45.7782 20.6371 45.7782 20.0685 45.2097L15.2903 40.4194C14.7218 39.8508 14.7218 38.9314 15.2903 38.3629L23.2258 30.5L15.2903 22.625C14.7218 22.0564 14.7218 21.1371 15.2903 20.5685L20.0806 15.7782C20.6492 15.2097 21.5685 15.2097 22.1371 15.7782L30 23.7258L37.875 15.7903C38.4435 15.2218 39.3629 15.2218 39.9314 15.7903L44.7218 20.5806C45.2903 21.1492 45.2903 22.0685 44.7218 22.6371L36.7742 30.5L44.7097 38.375Z" fill="#424242"/>
    </svg>
  `;

  private information: string = `
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_9929_43447)">
        <path d="M30 60C37.9565 60 45.5871 56.8393 51.2132 51.2132C56.8393 45.5871 60 37.9565 60 30C60 22.0435 56.8393 14.4129 51.2132 8.7868C45.5871 3.16071 37.9565 0 30 0C22.0435 0 14.4129 3.16071 8.7868 8.7868C3.16071 14.4129 0 22.0435 0 30C0 37.9565 3.16071 45.5871 8.7868 51.2132C14.4129 56.8393 22.0435 60 30 60ZM30 15C31.5586 15 32.8125 16.2539 32.8125 17.8125V30.9375C32.8125 32.4961 31.5586 33.75 30 33.75C28.4414 33.75 27.1875 32.4961 27.1875 30.9375V17.8125C27.1875 16.2539 28.4414 15 30 15ZM26.25 41.25C26.25 40.2554 26.6451 39.3016 27.3484 38.5984C28.0516 37.8951 29.0054 37.5 30 37.5C30.9946 37.5 31.9484 37.8951 32.6516 38.5984C33.3549 39.3016 33.75 40.2554 33.75 41.25C33.75 42.2446 33.3549 43.1984 32.6516 43.9016C31.9484 44.6049 30.9946 45 30 45C29.0054 45 28.0516 44.6049 27.3484 43.9016C26.6451 43.1984 26.25 42.2446 26.25 41.25Z" fill="#424242"/>
      </g>
      <defs>
        <clipPath id="clip0_9929_43447">
          <rect width="60" height="60" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  `;

  private _forgotPasswordTemplate: string = `
      <div class="col-12 overflow-hidden">
        <div class="row justify-content-end">
            <div class="col-auto">
                <button id="x-sweetalert" type="button" class="outline-celeste pull-right" aria-label="Close" tabindex="0" style="border:none; background-color: transparent; z-index: 1;">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
      </div>
      <div class="d-flex flex-column gap-4 py-4 px-3 overflow-hidden">
          <i class="fa-solid fa-lock fa-4x"></i>
          <h3 class="text-negro m-0">Recuperar mi contraseña</h3>
          <p class="m-0" style="font-size: 16px;">¿Su contraseña se enviará a su correo electrónico, desea continuar?</p>
          <div class="col-12">
            <div class="row justify-content-center g-4 mt-0 mt-sm-3">
              <div class="col-12 col-sm-6">
                <button type="button" id="confirmar-sweetalert"
                  class="btn btn-primary text-center col-lg-12">Aceptar</button>
              </div>
              <div class="col-12 col-sm-6">
                <button type="button" id="cancelar-sweetalert"
                    class="btn btn-secondary text-center col-lg-12">Cancelar</button>
              </div>
            </div>
          </div>
      </div>
    `;

  private _errorLoginTemplate: string = `
      <div class="col-12 overflow-hidden">
        <div class="row justify-content-end">
            <div class="col-auto">
                <button id="x-sweetalert" type="button" class="outline-celeste pull-right" aria-label="Close" tabindex="0" style="border:none; background-color: transparent; z-index: 1;">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
      </div>
      <div class="d-flex flex-column align-items-center gap-4 py-4 px-3 overflow-hidden">
        ${this.errorIcon}
        <h4 class="text-negro m-0">{{title}}</h4>
        <p style="font-size: 16px;" class="m-0">{{text}}</p>
        <div class="col-12">
          <div class="row justify-content-center mt-4">
            <div class="col-12 col-sm-6">
              <button type="button" id="confirmar-sweetalert"
                class="btn btn-primary text-center col-lg-12">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    `;

  private _successfulTemplate: string = `
      <div class="col-12 overflow-hidden">
        <div class="row justify-content-end">
            <div class="col-auto">
                <button id="x-sweetalert" type="button" class="outline-celeste pull-right" aria-label="Close" tabindex="0" style="border:none; background-color: transparent; z-index: 1;">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
      </div>
      <div class="d-flex flex-column align-items-center gap-4 py-4 px-3 overflow-hidden">
        ${this.successfulIcon}
        <h4 class="text-negro m-0">{{title}}</h4>
        <p style="font-size: 16px;" class="m-0">{{text}}</p>
        <div class="col-12">
          <div class="row justify-content-center mt-4">
            <div class="col-12 col-sm-6">
              <button type="button" id="confirmar-sweetalert"
                class="btn btn-primary text-center col-lg-12">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    `;

  private _errorTemplate: string = `
      <div class="col-12 overflow-hidden">
        <div class="row justify-content-end">
            <div class="col-auto">
                <button id="x-sweetalert" type="button" class="outline-celeste pull-right" aria-label="Close" tabindex="0" style="border:none; background-color: transparent; z-index: 1;">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
      </div>
      <div class="d-flex flex-column align-items-center gap-4 py-4 px-3 overflow-hidden">
        ${this.errorIcon}
        <h4 class="text-negro m-0">{{title}}</h4>
        <p style="font-size: 16px;" class="m-0">{{text}}</p>
        <div class="col-12">
          <div class="row justify-content-center mt-4">
            <div class="col-12 col-sm-6">
              <button type="button" id="confirmar-sweetalert"
                class="btn btn-primary text-center col-lg-12">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    `;

  private _informationTemplate: string = `
      <div class="col-12 overflow-hidden">
        <div class="row justify-content-end">
            <div class="col-auto">
                <button id="x-sweetalert" type="button" class="outline-celeste pull-right" aria-label="Close" tabindex="0" style="border:none; background-color: transparent; z-index: 1;">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
      </div>
      <div class="d-flex flex-column align-items-center gap-4 py-4 px-3 overflow-hidden">
        ${this.information}
        <h4 class="text-negro m-0">{{title}}</h4>
        <p style="font-size: 16px;" class="m-0">{{text}}</p>
        <div class="col-12">
          <div class="row justify-content-center mt-4">
            <div class="col-12 col-sm-6">
              <button type="button" id="confirmar-sweetalert"
                class="btn btn-primary text-center col-lg-12">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    `;

  private _warningTemplate: string = `
      <div class="col-12 overflow-hidden">
        <div class="row justify-content-end">
            <div class="col-auto">
                <button id="x-sweetalert" type="button" class="outline-celeste pull-right" aria-label="Close" tabindex="0" style="border:none; background-color: transparent; z-index: 1;">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
      </div>
      <div class="d-flex flex-column align-items-center gap-4 py-4 px-3 overflow-hidden">
        ${this.warningIcon}
        <h4 class="text-negro m-0">{{title}}</h4>
        <p style="font-size: 16px;" class="m-0">{{text}}</p>
        <div class="col-12">
          <div class="row justify-content-center mt-4">
            <div class="col-12 col-sm-6">
              <button type="button" id="confirmar-sweetalert"
                class="btn btn-primary text-center col-lg-12">Aceptar</button>
            </div>
            <div class="col-12 col-sm-6">
                <button type="button" id="cancelar-sweetalert"
                    class="btn btn-secondary text-center col-lg-12">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    `;
}