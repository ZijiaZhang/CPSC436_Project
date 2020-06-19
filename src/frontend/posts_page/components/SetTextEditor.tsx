import React from 'react';

interface ITextEditorProps {
}

interface ITextEditorState {
  rich: boolean,
  plain: boolean,
}

class SetTextEditor extends React.Component<ITextEditorProps, ITextEditorState> {
  constructor(props: ITextEditorProps) {
    super(props);
    this.state = {
      rich: false,
      plain: true,
    };
  }

   setRich = () => {
     this.setState({rich: true, plain: false});
   };

  setPlain = () => {
    this.setState({rich: false, plain: true});
  };

  render() {
    return (
      <div id="text-editor-selection">
        <div className="selector-title">Details:</div>
        <div className="selector-buttons">
          <label className="selector-button">
            <input type="radio" checked={this.state.rich} onClick={this.setRich}/>
            Rich Text Editor
          </label>
          <label className="selector-button">
            <input type="radio" checked={this.state.plain} onClick={this.setPlain}/>
            Plain Text Editor
          </label>
        </div>
      </div>
    );
  }

}

export default SetTextEditor;
