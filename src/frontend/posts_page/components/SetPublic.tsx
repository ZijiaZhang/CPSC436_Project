import React from 'react';

interface PublicProps {
}
interface PublicState {
  public: boolean,
  friendsOnly: boolean,
  private: boolean
}
class SetPublic extends React.Component<PublicProps, PublicState> {
  constructor(props: PublicProps) {
    super(props);
    this.state = {
      public: true,
      friendsOnly: false,
      private: false
    };
  }

  setPublic = () => {
    this.setState({public: true, friendsOnly: false, private: false});
  };

  setFriendsOnly = () => {
    this.setState({public: false, friendsOnly: true, private: false});
  };

  setPrivate = () => {
    this.setState({public: false, friendsOnly: false, private: true});
  };

  render() {
    return (
      <div id="visibility-selection">
        <div className="selector-title">Visibility:</div>
        <div className="selector-buttons">
          <label className="selector-button">
            <input type="radio" checked={this.state.public} onClick={this.setPublic}/>
            Public
          </label>
          <label className="selector-button">
            <input type="radio" checked={this.state.friendsOnly} onClick={this.setFriendsOnly}/>
            Friends Only
          </label>
          <label className="selector-button">
            <input type="radio" checked={this.state.private} onClick={this.setPrivate}/>
            Private
          </label>
        </div>
      </div>
    );
  }

}

export default SetPublic;
