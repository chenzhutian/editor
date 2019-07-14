import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as EditorActions from '../../actions/editor';
import { State } from '../../constants/default-state';
import Renderer from './renderer';

export function mapStateToProps(state: State, ownProps) {
  return {
    configEditorString: state.configEditorString,
    editorRef: state.editorRef,
    lastPosition: state.lastPosition,
    manualParse: state.manualParse,
    mode: state.mode,
    vegaARSpec: state.vegaARSpec,
    vegaLiteSpec: state.vegaLiteSpec,
    vegaSpec: state.vegaSpec,
    view: state.view,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<EditorActions.Action>) {
  return bindActionCreators(
    {
      exportVega: EditorActions.exportVega,
      parseSpec: EditorActions.parseSpec,
      setConfig: EditorActions.setConfig,
      setScrollPosition: EditorActions.setScrollPosition,
      toggleAutoParse: EditorActions.toggleAutoParse,
      updateVegaARSpec: EditorActions.updateVegaARSpec,
      updateVegaSpec: EditorActions.updateVegaSpec,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Renderer);
