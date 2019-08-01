import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { publish } from 'vega-ar';
import { mapStateToProps } from '.';
import './index.css';

type Props = ReturnType<typeof mapStateToProps>;

interface State {
  published: boolean
}

class PublishModal extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      published: false
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
    const ret = await publish('#qrcode', this.props.arSpec)
    if (ret) {
      this.onPublish()
    }
  }

  public async openViz() {
    const url = await this.props.arView.toImageURL('svg');
    const tab = window.open('about:blank', '_blank');
    tab.document.write(`<title>Chart</title><img src="${url}" />`);
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
          <button className="share-button" onClick={() => this.openViz()}>
            <span>Open SVG</span>
          </button>
          <span className={`copied + ${this.state.published ? ' visible' : ''}`}>Success!</span>
          <a className={`copied + ${this.state.published ? ' visible' : ''}`} href="#">Full image</a>
        </div>
        <img id="qrcode" height="100px" />
      </div>
    );
  }
}

export default withRouter(PublishModal);
