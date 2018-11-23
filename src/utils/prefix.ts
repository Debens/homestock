// partially apply a prefix for action namespacing
export default (prefix: string, seperator = '/') => (...names: string[]) =>
    [prefix].concat(names).join(seperator);
