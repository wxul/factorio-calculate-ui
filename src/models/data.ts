export default {
  namespace: 'data',
  state: {
    resource: [],
    formula: [],
    factory: [],
  },
  reducers: {
    save(state: any, { payload: { resource, formula, factory } }: any) {
      return { ...state, resource, formula, factory };
    },
  },
  effects: {
    *fetch({ payload: { version } }: any, { call, put }: any) {
      // TODO
    },
  },
};
