import { info, error } from '@pnotify/core';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

function showAlert(text) {
  info({
    title: "Attention",
    text:
      `${text}`,
    modules: new Map([
      [ Confirm,         {
          confirm: true,
          buttons: [
            {
              text: "Ok",
              primary: true,
              click: notice => {
                notice.close(500);
              }
            }
          ]
        }
      ]
    ])
  });
}

function showError(text) {
     error({
    title: "Error",
    text:
      `${text}`,
    modules: new Map([ [
        Confirm,
        { confirm: true,
          buttons: [ {
              text: "Ok",
              primary: true,
              click: notice => {
                notice.close(500);
              }
            }
          ]
        }
      ]
    ])
  });
}
export { showAlert, showError };