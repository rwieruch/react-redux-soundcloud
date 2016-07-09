import Stream from './presenter';
import { shallow } from 'enzyme';

describe('Stream', () => {

  const props = {
    trackIds: ['x', 'y'],
    trackEntities: { x: { title: 'x' }, y: { title: 'y' } }
  };

  it('shows two elements', () => {
    const element = shallow(<Stream { ...props } />);

    expect(element.find('.track')).to.have.length(2);
  });

});