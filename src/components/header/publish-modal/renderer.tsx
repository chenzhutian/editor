import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '.';
import { publish } from 'vega-ar';
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

  public onPublish(){
    this.setState({
      published: true,
    });
  }

  /**
   * publish
   */
  public async publishToServer() {
    var ret = await publish('#qrcode', this.props.arSpec)
    console.log(ret)
    if (ret) {
      this.onPublish()
    }
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
          <span className={`copied + ${this.state.published ? ' visible' : ''}`}>Success!</span>
          <a className={`copied + ${this.state.published ? ' visible' : ''}`} href='#'>Full image</a>
        </div>
        <img id='qrcode' height='100px'/>
      </div>
    );
  }
}

export default withRouter(PublishModal);
