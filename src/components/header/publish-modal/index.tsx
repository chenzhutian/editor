import { connect } from 'react-redux';
import { ARView } from 'vega-ar';
import { State } from '../../../constants/default-state';
import Renderer from './renderer';

export function mapStateToProps(state: State, ownProps) {
  return {
    arHints: state.arHints,
    arSpec: state.vegaARSpec,
    arView: state.view as ARView,
    mode: state.mode
  };
}

export default connect(mapStateToProps)(Renderer);
