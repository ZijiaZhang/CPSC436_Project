import React from 'react';

interface IVisibilitySettingState {
  public: boolean,
  friendsOnly: boolean,
  private: boolean
}

class VisibilitySetting extends React.Component<{}, IVisibilitySettingState> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <div id="visibility-selection">
        <div className="selector-title">Visibility:</div>
        <div className="selector-buttons">
          <label className="selector-button">
            <input type="radio" checked={this.props.visibility === 'public'} onClick={this.props.setPublic}/>
            Public
          </label>
          <label className="selector-button">
            <input type="radio" checked={this.props.visibility === 'friendsOnly'} onClick={this.props.setFriendsOnly}/>
            Friends Only
          </label>
          <label className="selector-button">
            <input type="radio" checked={this.props.visibility === 'private'} onClick={this.props.setPrivate}/>
            Private
          </label>
        </div>
      </div>
    );
  }

}

export default VisibilitySetting;
