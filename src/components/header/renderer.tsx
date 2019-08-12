import stringify from 'json-stringify-pretty-compact';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { ExternalLink, GitHub, Grid, HelpCircle, Play, Share2, Terminal, X, Key } from 'react-feather';
import { PortalWithState } from 'react-portal';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { mapDispatchToProps, mapStateToProps } from '.';
import { KEYCODES, Mode } from '../../constants';
import { NAMES } from '../../constants/consts';
import { VEGA_AR_SPECS, VEGA_LITE_SPECS, VEGA_SPECS } from '../../constants/specs';
import ExportModal from './export-modal/index';
import GistModal from './gist-modal/index';
import HelpModal from './help-modal/index';
import './index.css';
import PublishModal from './publish-modal/index';
import ShareModal from './share-modal/index';

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & { history: any; showExample: boolean };

interface State {
  // showVega: boolean;
  mode: Mode;
  scrollPosition: number;
  constraintTop: boolean;
  constraintDown: boolean
  constraintLeft: boolean
  constraintRight: boolean
}

const formatExampleName = (name: string) => {
  return name
    .split(/[_-]/)
    .map(i => i[0].toUpperCase() + i.substring(1))
    .join(' ');
};

function getKey(key: string) {
  return `constraint${key}` as 'constraintTop' | 'constraintDown' | 'constraintLeft' | 'constraintRight'
}

class Header extends React.PureComponent<Props, State> {
  private refGistForm: HTMLFormElement;
  private examplePortal = React.createRef<HTMLDivElement>();
  private listnerAttached: boolean = false;
  constructor(props) {
    super(props);
    this.state = {
      constraintDown: true,
      constraintLeft: true,
      constraintRight: true,
      constraintTop: true,

      mode: props.mode,
      scrollPosition: 0,
      // showVega: props.mode === Mode.Vega,
    };
  }

  public onSelectVega(name) {
    this.props.history.push(`/examples/vega/${name}`);
  }

  public onSelectVegaAR(name) {
    this.props.history.push(`/examples/vega-ar/${name}`);
  }

  public onSelectVegaLite(name) {
    this.props.history.push(`/examples/vega-lite/${name}`);
  }

  public onSelectNewVegaLite() {
    this.props.history.push('/custom/vega-lite');
  }

  public onSwitchMode(option) {
    switch (option.value) {
      case Mode.Vega:
        this.props.updateVegaSpec(stringify(this.props.vegaSpec))
        break;
      case Mode.VegaLite:
        this.onSelectNewVegaLite();
        break;
      case Mode.VegaAR:
        this.props.updateVegaARSpec(stringify(this.props.vegaARSpec))
        break
    }
  }

  public checkDirectionNotAllow(howTo: string): boolean | undefined {

    if (howTo === undefined) {
      return
    }

    let notAllow = false
    if (!this.state.constraintDown) {
      notAllow = notAllow || howTo.includes('jup2')
    }

    if (!this.state.constraintTop) {
      notAllow = notAllow || howTo.includes('jup8')
    }

    if (!this.state.constraintLeft) {
      notAllow = notAllow || howTo.includes('jup4')
    }
    if (!this.state.constraintRight) {
      notAllow = notAllow || howTo.includes('jup6')
    }

    return notAllow
  }


  public componentWillReceiveProps(nextProps) {
    this.setState({
      mode: nextProps.mode,
      // showVega: nextProps.mode === Mode.Vega,
    });
  }

  public handleHelpModalToggle(Toggleevent, openPortal, closePortal, isOpen) {
    window.addEventListener('keydown', event => {
      if (
        (event.keyCode === KEYCODES.SINGLE_QUOTE && event.metaKey && !event.shiftKey) || // Handle key press in Mac
        (event.keyCode === KEYCODES.SLASH && event.ctrlKey && event.shiftKey) // Handle Key press in PC
      ) {
        if (!isOpen) {
          openPortal();
        } else {
          closePortal();
        }
      }
      this.listnerAttached = true;
    });
  }

  public openCommandPalette() {
    this.props.editorRef.trigger('', 'editor.action.quickCommand');
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', () => {
      return;
    });
    this.listnerAttached = false;
  }
  public render() {
    let modeOptions
    switch (this.props.mode) {
      case Mode.VegaLite:
        modeOptions = [
          { value: Mode.Vega, label: NAMES[Mode.Vega] },
          { value: Mode.VegaAR, label: NAMES[Mode.VegaAR] },
        ];
        break
      case Mode.VegaAR:
        modeOptions = [
          { value: Mode.Vega, label: NAMES[Mode.Vega] },
          // { value: Mode.VegaLite, label: NAMES[Mode.VegaLite] },
        ];
        break;
      default:
        modeOptions = [
          // { value: Mode.VegaLite, label: NAMES[Mode.VegaLite] },
          { value: Mode.VegaAR, label: NAMES[Mode.VegaAR] },
        ];
        break;
    }

    const modeSwitcher = (
      <Select
        className="mode-switcher-wrapper"
        classNamePrefix="mode-switcher"
        value={{ label: `${NAMES[this.props.mode]}` }}
        options={modeOptions}
        isClearable={false}
        isSearchable={false}
        onChange={this.onSwitchMode.bind(this)}
      />
    );

    const examplesButton = (
      <div className="header-button">
        <Grid className="header-icon" />
        {'Examples'}
      </div>
    );

    const gistButton = (
      <div className="header-button">
        <GitHub className="header-icon" />
        {'Gist'}
      </div>
    );

    const exportButton = (
      <div className="header-button">
        <ExternalLink className="header-icon" />
        {'Export'}
      </div>
    );

    const shareButton = (
      <div className="header-button">
        <Share2 className="header-icon" />
        {'Share'}
      </div>
    );

    const publishButton = (
      <div className="header-button">
        <ExternalLink className="header-icon" />
        {'Publish'}
      </div>
    );

    const HelpButton = (
      <div className="header-button help" onClick={() => this.setState(current => ({ ...current }))}>
        <HelpCircle className="header-icon" />
        {'Help'}
      </div>
    );

    const optionsButton = (
      <div className="header-button" onClick={this.openCommandPalette.bind(this)}>
        <Terminal className="header-icon" />
        {'Commands'}
      </div>
    );

    const runOptions = this.props.manualParse ? [{ label: 'Auto' }] : [{ label: 'Manual' }];

    const autoRunToggle = (
      <Select
        className="auto-run-wrapper"
        classNamePrefix="auto-run"
        value={{ label: '' }}
        options={runOptions}
        isClearable={false}
        isSearchable={false}
        onChange={this.props.toggleAutoParse}
      />
    );

    const runButton = (
      <div
        className="header-button"
        id="run-button"
        onClick={() => {
          this.props.parseSpec(true);
        }}
      >
        <Play className="header-icon" />
        <div className="run-button">
          <span className="parse-label">Run</span>
          <span className="parse-mode">{this.props.manualParse ? 'Manual' : 'Auto'}</span>
        </div>
      </div>
    );
    const splitClass = 'split-button' + (this.props.manualParse ? '' : ' auto-run');

    const vega = closePortal => (
      <div className="vega">
        {Object.keys(VEGA_SPECS).map((specType, i) => {
          const specs = VEGA_SPECS[specType];
          return (
            <div className="itemGroup" key={i}>
              <div className="specType">{specType}</div>
              <div className="items" onClick={closePortal}>
                {specs.map((spec, j) => {
                  return (
                    <div
                      key={j}
                      onClick={() => {
                        this.onSelectVega(spec.name);
                        closePortal();
                      }}
                      className="item"
                    >
                      <div style={{ backgroundImage: `url(images/examples/va/${spec.name}.va.png)` }} className="img" />
                      <div className="name">{formatExampleName(spec.name)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );

    const vegaAR = closePortal => (
      <div className="vega">
        {Object.keys(VEGA_AR_SPECS).map((specType, i) => {
          const specs = VEGA_AR_SPECS[specType];
          return (
            <div className="itemGroup" key={i}>
              <div className="specType">{specType}</div>
              <div className="items" onClick={closePortal}>
                {specs.map((spec, j) => {
                  const notAllow = this.checkDirectionNotAllow(spec.howTo)
                  return (
                    <div
                      key={j}
                      onClick={() => {
                        this.onSelectVegaAR(spec.name);
                        closePortal();
                      }}
                      className={`item ${(notAllow || notAllow === undefined) ? 'item-downlight' : ''}`}
                      title={notAllow === undefined
                        ? 'This visualization cannot be extended'
                        : notAllow
                          ? 'This visualization will extent to the constrained direction(s)'
                          : ''}
                    >
                      <div style={{ backgroundImage: `url(images/examples/va/${spec.name}.va.png)` }} className="img" />
                      <div className="name">{formatExampleName(spec.name)}</div>
                      {spec.howTo && <img src={`images/howTo/${spec.howTo}.png`} />}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );

    const vegalite = closePortal => (
      <div className="vega-Lite">
        {Object.keys(VEGA_LITE_SPECS).map((specGroup, i) => {
          return (
            <div key={i}>
              <h3>{specGroup}</h3>
              {Object.keys(VEGA_LITE_SPECS[specGroup]).map((specType, j) => {
                const specs = VEGA_LITE_SPECS[specGroup][specType];
                return (
                  <div className="itemGroup" key={j}>
                    <div className="specType">{specType}</div>
                    <div className="items">
                      {specs.map((spec, k) => {
                        return (
                          <div
                            key={k}
                            onClick={() => {
                              this.onSelectVegaLite(spec.name);
                              closePortal();
                            }}
                            className="item"
                          >
                            <div
                              style={{ backgroundImage: `url(images/examples/vl/${spec.name}.vl.png)` }}
                              className="img"
                            />
                            <div className="name">{spec.title}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );

    const chooseExamples = (closePortal: any) => {
      switch (this.state.mode) {
        case Mode.Vega:
          return vega(closePortal)
        case Mode.VegaLite:
          return vegalite(closePortal)
        case Mode.VegaAR:
          return vegaAR(closePortal)
      }
    }

    const gist = closePortal => <GistModal closePortal={() => closePortal()} />;
    const exportContent = <ExportModal />;
    const shareContent = <ShareModal />;
    const helpModal = <HelpModal />;
    const publicModal = <PublishModal />;

    const publishHeaderItem = <PortalWithState closeOnEsc>
      {({ openPortal, closePortal, onOpen, portal }) => [
        <span key="0" onClick={openPortal}>
          {publishButton}
        </span>,
        portal(
          <div className="modal-background" onClick={closePortal}>
            <div className="modal modal-top" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <button className="close-button" onClick={closePortal}>
                  <X />
                </button>
              </div>
              <div className="modal-body modal-hidden">{publicModal}</div>
              <div className="modal-footer" />
            </div>
          </div>
        ),
      ]}
    </PortalWithState>

    return (
      <div className="header">
        <section className="left-section">
          {/* {modeSwitcher} */}
          {optionsButton}

          <PortalWithState
            closeOnEsc
            defaultOpen={this.props.showExample}
            onOpen={() => {
              const node = ReactDOM.findDOMNode(this.examplePortal.current);
              node.scrollTop = this.props.lastPosition;
              node.addEventListener('scroll', () => {
                this.setState({
                  scrollPosition: node.scrollTop,
                });
              });
            }}
            onClose={() => {
              this.props.setScrollPosition(this.state.scrollPosition);
            }}
          >
            {({ openPortal, closePortal, isOpen, portal }) => [
              <span key="0" onClick={openPortal}>
                {examplesButton}
              </span>,
              portal(
                <div className="modal-background" onClick={closePortal}>
                  <div className="modal" onClick={e => e.stopPropagation()}>
                    <div className="modal-header no-margin" style={{ margin: 'unset', height: '30px' }}>
                      <div className="button-groups">
                        <button
                          className={this.state.mode === Mode.Vega ? 'selected' : ''}
                          onClick={() => {
                            this.setState({ mode: Mode.Vega });
                            const node = ReactDOM.findDOMNode(this.examplePortal.current);
                            node.scrollTop = 0;
                          }}
                        >
                          Vega
                        </button>
                        <button
                          className={this.state.mode === Mode.VegaAR ? 'selected' : ''}
                          onClick={() => {
                            this.setState({ mode: Mode.VegaAR });
                            const node = ReactDOM.findDOMNode(this.examplePortal.current);
                            node.scrollTop = 0;
                          }}
                        >
                          Vega-AR
                        </button>
                        {/* <button
                          className={this.state.mode === Mode.VegaLite ? 'selected' : ''}
                          onClick={() => {
                            this.setState({ mode: Mode.VegaLite });
                            const node = ReactDOM.findDOMNode(this.examplePortal.current);
                            node.scrollTop = 0;
                          }}
                        >
                          Vega-Lite
                        </button> */}
                      </div>
                      <button className="close-button" onClick={closePortal}>
                        <X />
                      </button>
                      {
                        this.state.mode === Mode.VegaAR &&
                        <div className="constraint-container">
                          <label style={{
                            height: '25px',
                            lineHeight: '25px'
                          }}>
                            Allowed extended directions:
                          </label>
                          {['Left', 'Right', 'Top', 'Down'].map(key =>
                            <label key={key}>
                              <input type="checkbox"
                                name={key.toLowerCase()}
                                value={key.toLowerCase()}
                                checked={this.state[getKey(key)]}
                                onChange={e => this.setState({ [getKey(key)]: !this.state[getKey(key)] } as any)}
                              />
                              <span>{key}</span>
                            </label>
                          )}
                        </div>
                      }

                    </div>
                    <div className="modal-body" ref={this.examplePortal}>
                      {/* {this.state.showVega ? vega(closePortal) : vegalite(closePortal)} */}
                      {chooseExamples(closePortal)}
                    </div>
                    <div className="modal-footer" />
                  </div>
                </div>
              ),
            ]}
          </PortalWithState>

          {publishHeaderItem}
        </section>

        {/* <section className="right-section">
          <PortalWithState closeOnEsc>
            {({ openPortal, closePortal, isOpen, portal }) => {
              if (!this.listnerAttached) {
                this.handleHelpModalToggle(event, openPortal, closePortal, isOpen);
              }
              return [
                <span key="0" onClick={openPortal}>
                  {HelpButton}
                </span>,
                portal(
                  <div className="modal-background" onClick={closePortal}>
                    <div className="modal modal-top" onClick={e => e.stopPropagation()}>
                      <div className="modal-header">
                        <button className="close-button" onClick={closePortal}>
                          <X />
                        </button>
                      </div>
                      <div className="modal-body">
                        <HelpModal />
                      </div>
                      <div className="modal-footer" />
                    </div>
                  </div>
                ),
              ];
            }}
          </PortalWithState> 
        </section>*/}
      </div >
    );
  }
}

export default withRouter(Header);
