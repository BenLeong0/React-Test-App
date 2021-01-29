import * as React from "react";
import CardList from "./CardList";
import Form from "./Form";

class GitApp extends React.Component {
  state = {
    profiles: []
  };
  // Could instead use constructor (props) => {super(props); self.state={profiles: []}}
  // Be sure to include super (else not a react component)!
  // Note: declaring outside constructor is not official yet (?)

  addNewProfile = profileData => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }));
  };

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

export default GitApp;
