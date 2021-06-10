import { App } from '~common/scripts/App';

export function formSubmitHandler(event) {
  const form = event.target;
  const data = new FormData(form);
  const fields = {};
  data.forEach((value, key) => {
    fields[key] = value;
  });
  App.debug(fields);
  event.preventDefault();
}
