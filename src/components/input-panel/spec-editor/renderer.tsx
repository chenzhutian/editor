import stringify from 'json-stringify-pretty-compact';
import LZString from 'lz-string';
import * as Monaco from 'monaco-editor';
import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { withRouter } from 'react-router-dom';
import { debounce } from 'vega';
import { deepEqual } from 'vega-lite/build/src/util';
import { mapDispatchToProps, mapStateToProps } from '.';
import { KEYCODES, Mode } from '../../../constants';
import addMarkdownProps from '../../../utils/markdownProps';
import './index.css';

const vegaLiteSchema = require('vega-lite/build/vega-lite-schema.json');
const vegaSchema = require('vega/build/vega-schema.json');
const vegaARSchema = require('vega-ar/vega-ar-schema.json');

addMarkdownProps(vegaSchema);
addMarkdownProps(vegaLiteSchema);
addMarkdownProps(vegaARSchema)

function parser(url: string) {
  const regex = /\/schema\/([\w-]+)\/([\w\.\-]+)\.json$/g;
  const [library, version] = regex.exec(url)!.slice(1, 3);
  return { library: library as 'vega' | 'vega-lite' | 'vega-ar', version };
}

const schemas = {
  [Mode.Vega]: [
    {
      schema: vegaSchema,
      uri: 'https://vega.github.io/schema/vega/v5.json',
    },
  ],
  [Mode.VegaLite]: [
    {
      schema: vegaLiteSchema,
      uri: 'https://vega.github.io/schema/vega-lite/v3.json',
    },
  ],
  [Mode.VegaAR]: [
    {
      schema: vegaARSchema,
      uri: 'http://vegaar.hkustvis.org/schema/vega-ar/v5.json',
    }
  ]
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & { history: any; match: any };

class Editor extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.editorWillMount = this.editorWillMount.bind(this);
    this.editorDidMount = this.editorDidMount.bind(this);
    this.onSelectNewVegaLite = this.onSelectNewVegaLite.bind(this);
  }
  public handleKeydown(e) {
    if (this.props.manualParse) {
      if ((e.keyCode === KEYCODES.B || e.keyCode === KEYCODES.S) && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.props.parseSpec(true);
        const parseButton = this.refs.parse as any;
        parseButton.classList.add('pressed');
        setTimeout(() => {
          parseButton.classList.remove('pressed');
        }, 250);
      }
    }
  }

  public onSelectNewVega() {
    this.props.history.push('/custom/vega');
  }

  public onSelectNewVegaLite() {
    this.props.history.push('/custom/vega-lite');
  }

  public onSelectNewVegaAR() {
    this.props.history.push('/custom/vega-AR')
  }

  public onClear() {
    switch (this.props.mode) {
      case Mode.Vega:
        this.onSelectNewVega()
        break
      case Mode.VegaLite:
        this.onSelectNewVegaLite()
        break
      case Mode.VegaAR:
        this.onSelectNewVegaAR()
        break
    }
  }

  public editorDidMount(editor) {
    editor.addAction(
      (() => {
        return {
          id: 'CLEAR_EDITOR',
          label: 'Clear Editor',
          run: () => {
            this.onClear();
          },
        };
      })()
    );
    editor.focus();
  }
  public handleEditorChange(spec) {
    this.props.manualParse
      ? this.props.updateEditorString(spec)
      : this.updateSpec(spec);

    if (this.props.history.location.pathname.indexOf('/edited') === -1) {
      this.props.history.push('/edited');
    }
  }
  public editorWillMount(monaco) {
    const compressed = this.props.match.params.compressed;
    if (compressed) {
      const spec = LZString.decompressFromEncodedURIComponent(compressed);
      if (spec) {
        this.updateSpec(spec);
      } else {
        this.props.logError(`Failed to decompress URL. Expected a specification, but received ${spec}`);
      }
    }

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      allowComments: false,
      enableSchemaRequest: true,
      schemas: schemas[this.props.mode],
      validate: true,
    });

    monaco.languages.registerDocumentFormattingEditProvider('json', {
      provideDocumentFormattingEdits(
        model: Monaco.editor.ITextModel,
        options: Monaco.languages.FormattingOptions,
        token: Monaco.CancellationToken
      ): Monaco.languages.TextEdit[] {
        return [
          {
            range: model.getFullModelRange(),
            text: stringify(JSON.parse(model.getValue())),
          },
        ];
      },
    });
  }
  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.parse) {
      this.updateSpec(nextProps.value);
      this.props.setConfig(JSON.parse(nextProps.configEditorString));
      this.props.parseSpec(false);
    }
  }
  public componentDidUpdate(prevProps: Props, prevState) {
    if (!deepEqual(prevProps.arHints, this.props.arHints)) {
      const newARHintIds = (this.refs.editor as MonacoEditor).editor
        .deltaDecorations(prevProps.arHintIds, this.props.arHints);
      this.props.updateARHintIds(newARHintIds)
    }
  }
  public componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    this.props.setEditorReference(this.refs.editor);
    // set decorations
    if (this.props.arHintIds.length && this.props.arHints.length) {
      const newARHintIds = (this.refs.editor as MonacoEditor).editor
        .deltaDecorations(this.props.arHintIds, this.props.arHints);
      this.props.updateARHintIds(newARHintIds)
    }
  }
  public componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }
  public updateSpec(spec: string) {
    let parsedMode = this.props.mode;

    try {
      const schema = JSON.parse(spec).$schema;
      if (schema) {
        switch (parser(schema).library) {
          case 'vega-lite':
            parsedMode = Mode.VegaLite;
            break;
          case 'vega':
            parsedMode = Mode.Vega;
            break;
          case 'vega-ar':
            parsedMode = Mode.VegaAR;
            break;
        }
      }
    } catch (err) {
      console.warn('Error parsing JSON string', err);
    }

    switch (parsedMode) {
      case Mode.Vega:
        this.props.updateVegaSpec(spec);
        break;
      case Mode.VegaLite:
        this.props.updateVegaLiteSpec(spec);
        break;
      case Mode.VegaAR:
        this.props.updateVegaARSpec(spec);
        break;
      default:
        console.exception(`Unknown mode:  ${parsedMode}`);
        break;
    }
  }
  public render() {
    return (
      <div className={'full-height-wrapper'}>
        <MonacoEditor
          ref="editor"
          language="json"
          options={{
            automaticLayout: true,
            cursorBlinking: 'smooth',
            folding: true,
            glyphMargin: this.props.arHintIds.length !== 0,
            lineNumbersMinChars: 4,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
          value={this.props.value}
          onChange={debounce(700, this.handleEditorChange)}
          editorWillMount={this.editorWillMount}
          editorDidMount={this.editorDidMount}
        />
      </div>
    );
  }
}

export default withRouter(Editor);
