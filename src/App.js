import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  
    setIsOpen(false);
  }
  function handleSeleced(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend(selectedFriend?.id===friend?.id?null:friend)
    setIsOpen(false)
   
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelected={handleSeleced}
          selectedFriend={selectedFriend}
        />
        {isOpen && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleToggle}>{isOpen ? "Close" : "AddFriend"}</Button>
      </div>
      {selectedFriend && <SplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}
function FriendsList({ friends, onSelected, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} onSelected={onSelected} selectedFriend={selectedFriend}/>
      ))}
    </ul>
  );
}
function Friend({ friend, onSelected, selectedFriend }) {
  const isSelected=selectedFriend?.id===friend.id
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && (
        <p className="red">you and {friend.name} are even</p>
      )}
      <Button onClick={()=>onSelected(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    const id = crypto.randomUUID;
    e.preventDefault();
    if (!name) return;
    const newFriend = {
      id,
      name:name.toLowerCase(),
      image: `${image}?=${id}`,
      balance: 0,
    };
    setName(" ");
    setImage("https://i.pravatar.cc/48");
    onAddFriend(newFriend);
  }
  return (
    <form className="form-add-friend" onSubmit={(e) => handleSubmit(e)}>
      <lable>👩🏻‍🤝‍🧑🏼Friend name</lable>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <lable>📸 Image</lable>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function SplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split bill with {selectedFriend.name}</h2>
      <lable>💰 Bill Value</lable>
      <input type="text" />
      <lable>🧍‍♂️ Your Expence</lable>
      <input type="text" />
      <lable>👩🏽‍🤝‍🧑🏼 {selectedFriend.name} Expence</lable>
      <input type="text" disabled />
      <lable>😀 Who pay's the bill</lable>
      <select>
        <option value="user">You</option>
        <option value="Friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
