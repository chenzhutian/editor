import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as EditorActions from '../../actions/editor';
import { State } from '../../constants/default-state';
import Renderer from './renderer';

export function mapStateToProps(state: State, ownProps) {
  return {
    ar: state.ar,
    baseURL: state.baseURL,
    config: state.config,
    editorString: state.editorString,
    mode: state.mode,
    renderer: state.renderer,
    vegaARSpec: state.vegaARSpec,
    vegaLiteSpec: state.vegaLiteSpec,
    vegaSpec: state.vegaSpec,
    view: state.view,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<EditorActions.Action>) {
  return bindActionCreators(
    {
      setView: EditorActions.setView,
      updateARHints: EditorActions.updateARHint,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Renderer);
