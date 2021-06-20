import { App } from '~common/scripts/App';

type Fields = {
  [key: string]: FormDataEntryValue,
}

export function formSubmitHandler(event: Event) {
  const { target } = event;
  const form = target instanceof HTMLFormElement ? target : undefined;
  const fields: Fields = {};
  const data = new FormData(form);
  data.forEach((value, key) => {
    fields[key] = value;
  });
  if (event) {
    event.preventDefault();
  }
  App.debug(fields);
}
