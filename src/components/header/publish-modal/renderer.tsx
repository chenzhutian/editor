import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { publish } from 'vega-ar';
import { mapStateToProps } from '.';
import './index.css';

type Props = ReturnType<typeof mapStateToProps>;

interface State {
  published: boolean
  pngString: string
}

class PublishModal extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      pngString: '',
      published: false,
    };
  }

  public onPublish() {
    this.setState({
      published: true,
    });
  }

  /**
   * publish
   */
  public async publishToServer() {
    const ret = await publish('#qrcode', this.props.arSpec, this.props.arView)
    if (ret) {
      this.setState({
        pngString: ret.image
      })
      this.onPublish()
    }
  }

  public async openViz() {
    const url = await this.props.arView.toImageURL('svg');
    const tab = window.open('about:blank', '_blank');
    tab.document.write(`<title>Chart</title><img src="${url}" />`);
    tab.document.close();
  }

  public async openPng() {
    const dataString = this.state.pngString;
    const tab = window.open('about:blank', '_blank');
    tab.document.write(`<title>Chart</title><img src="${dataString}" />`);
    tab.document.close();
  }

  public render() {
    return (
      <div className="share-content">
        <h2>Publish</h2>
        <p>Publish the AR Vega to server and it can be viewed by AR viewer.</p>
        <div className="share-buttons">
          <button className="share-button" onClick={() => this.publishToServer()}>
            <span>Publish</span>
          </button>
          {/* <button className="share-button" onClick={() => this.openViz()}>
            <span>Open SVG</span>
          </button> */}
          <span className={`copied + ${this.state.published ? ' visible' : ''}`}>Success!</span>
          {/* <a className={`copied + ${this.state.published ? ' visible' : ''}`} href="#">Full image</a> */}
          <button className={`share-button + copied + ${this.state.published ? ' visible' : ''}`} onClick={() => this.openPng()}>
            <span>Full image</span>
          </button>
        </div>
        <img id="qrcode" height="100px" />
      </div>
    );
  }
}

export default withRouter(PublishModal);
