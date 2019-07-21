import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as EditorActions from '../../actions/editor';
import { State } from '../../constants/default-state';
import Renderer from './renderer';

export function mapStateToProps(state: State, ownProps) {
  return {
    ar: state.ar,
    arDebug: state.arDebug,
    error: state.error,
    mode: state.mode,
    renderer: state.renderer,
    warningsLogger: state.warningsLogger,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<EditorActions.Action>) {
  return bindActionCreators(
    {
      setRenderer: EditorActions.setRenderer,
      toggleARDebug: EditorActions.toggleARDebug,
      toggleARMode: EditorActions.toggleARMode,
      toggleDebugPane: EditorActions.toggleDebugPane,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Renderer);
