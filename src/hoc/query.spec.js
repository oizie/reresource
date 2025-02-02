import React from 'react';
import { shallow } from 'enzyme';
import { withQuery } from './query';
import { setupStore } from '../test-helpers';

describe('hoc', () => {
  let store;

  beforeEach(() => {
    store = setupStore();
  });

  describe('query', () => {
    it('should inject the resource to the component', () => {
      const DummyComponent = () => <p>dummy</p>;
      const DummyContainer = withQuery({
        resourceType: 'test',
        serviceFunction: () => ({}),
      })(DummyComponent);
      const container = shallow(<DummyContainer store={store} />);
      const component = container.shallow().find(DummyComponent);

      expect(component.props()).toMatchObject({
        loadResource: expect.any(Function),
        resource: {
          data: null,
          initialized: false,
        },
      });
    });

    it('should rename injected props', () => {
      const DummyComponent = () => <p>dummy</p>;
      const DummyContainer = withQuery({
        resourceType: 'test',
        serviceFunction: () => ({}),
        name: 'user',
      })(DummyComponent);
      const container = shallow(<DummyContainer store={store} />);
      const component = container.shallow().find(DummyComponent);

      expect(component.props()).toMatchObject({
        loadUser: expect.any(Function),
        user: {
          data: null,
          initialized: false,
        },
      });
    });
  });
});
