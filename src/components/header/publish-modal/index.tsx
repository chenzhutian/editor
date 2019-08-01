import { connect } from 'react-redux';
import { State } from '../../../constants/default-state';
import Renderer from './renderer';
import { ARView } from 'vega-ar';

export function mapStateToProps(state: State, ownProps) {
  return {
    arSpec: state.vegaARSpec,
    arView: state.view as ARView
  };
}

export default connect(mapStateToProps)(Renderer);
