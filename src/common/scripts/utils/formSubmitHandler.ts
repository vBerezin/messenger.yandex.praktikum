import { App } from '~common/scripts/App';

type Fields = {
  [key: string]: FormDataEntryValue,
}

export function formSubmitHandler(event: Event) {
  const { target } = event;
  const form = target instanceof HTMLFormElement ? target : undefined;
  const data = new FormData(form);
  const fields: Fields = Object.fromEntries(data);
  if (event) {
    event.preventDefault();
  }
  App.debug(fields);
}
