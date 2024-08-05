type State = { [key: string]: any } | null | undefined;
type Event = { target: { type: string; checked?: boolean; value?: any } };
type SetState = (prevState: State) => State;
type Binder = { value: any; onChange: (e: any) => void };

const isEvent = (e: any): e is Event => {
  return e && typeof e === "object" && !Array.isArray(e) && e.target;
};

const determineValue = (e: any): any => {
  if (isEvent(e)) {
    if (e.target.type === "checkbox") {
      return e.target.checked;
    }

    return e.target.value;
  }

  return e;
};

const extractStateValue = (state: State, name: string | null): any => {
  if (state === null || state === undefined) {
    return "";
  }

  if (name === null || name === undefined) {
    return state;
  }

  const parts = name.split(".");
  let currentObject: any = state;

  for (let i = 0; i < parts.length; i++) {
    currentObject = currentObject[parts[i]];

    if (currentObject === null || currentObject === undefined) {
      return "";
    }
  }

  return currentObject;
};

const createUpdatedState = (
  prev: State,
  name: string | null,
  value: any
): State => {
  if (name === null || name === undefined) {
    return value;
  }

  const updated: State = { ...prev };
  const parts = name.split(".");
  let currentObject: any = updated;

  for (let i = 0; i < parts.length - 1; i++) {
    currentObject[parts[i]] = { ...currentObject[parts[i]] }; // ensure immutability

    currentObject = currentObject[parts[i]];
  }

  currentObject[parts[parts.length - 1]] = value;
  return updated;
};

const createBinder = (state: State, setState: (callback: SetState) => void) => {
  return (name: string): Binder => {
    return {
      value: extractStateValue(state, name),
      onChange: (e: any) => {
        const value = determineValue(e);
        setState((prev) => createUpdatedState(prev, name, value));
      },
    };
  };
};

export {
  isEvent,
  determineValue,
  extractStateValue,
  createUpdatedState,
  createBinder,
};
