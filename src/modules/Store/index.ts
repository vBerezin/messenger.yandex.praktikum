class Storage {
  private readonly storage: Map<string, Set<any>>;

  constructor() {
    this.storage = new Map();
  }

  set(name: string, data: any) {
    this.storage.set(name, data);
  }

  get(name: string): any | undefined {
    return this.storage.get(name);
  }
}

export const Store = new Storage();
