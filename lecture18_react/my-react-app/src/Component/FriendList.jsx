import React, { Component } from "react";
import Friend from "./Friend"; 

export class FriendList extends Component {
  constructor() {
    super();
    this.state = {
      friends: [
        { id: 1, name: "Emaan", email: "emaan@gmail.com" },
        { id: 2, name: "Ayesha", email: "ayesha@gmail.com" }
      ]
    };
  }

  changeBookState = () => {   
    this.setState({
      friends: [
        { name: "Emaan Updated", email: "emaan@gmail.com", id: 1 },
        { name: "Ayesha Updated", email: "ayesha@gmail.com", id: 2 }
      ]
    });
  };

  changeInput = (e) => {
    this.setState((prevState) => ({
      friends: [
        { name: e.target.value, email: prevState.friends[0].email, id: prevState.friends[0].id },
        { ...prevState.friends[1] }
      ]
    }));
  };

  deleteFriend = (index) => {
    const currentFriends = [...this.state.friends];
    currentFriends.splice(index, 1);
    this.setState({ friends: currentFriends });
  };

  changeName = (event, index) => {
    const currentFriends = [...this.state.friends]; // Clone the array
    const currentFriend = { ...currentFriends[index] }; // Clone the object
    currentFriend.name = event.target.value; // Update the name
    currentFriends[index] = currentFriend; // Replace the friend in the array
    this.setState({ friends: currentFriends }); // Update state
  };

  render() {
    return (
      <div>
        {this.state.friends.map((friend, index) => (
          <Friend 
            key={friend.id}  
            name={friend.name} 
            email={friend.email} 
            onChange={this.changeBookState}
            delete={() => this.deleteFriend(index)} 
            inputName={(event) => this.changeName(event, index)}
          />
        ))}
        <button onClick={this.changeBookState}>Change Book</button>
        <input type="text" onChange={this.changeInput} placeholder="Change first friend's name" />
      </div>
    );
  }
}

export default FriendList;
