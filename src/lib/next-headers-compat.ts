export async function headers() {
  return new Headers();
}

export async function cookies() {
  return {
    get: (name: string) => undefined,
    getAll: () => [],
    has: (name: string) => false,
    set: () => {},
    delete: () => {},
  };
}
