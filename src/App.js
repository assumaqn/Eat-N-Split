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

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
        <Button>Add Friend</Button>
      </div>
     < SplitBill/>
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}
function Friend({ friend }) {
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
      <Button>Select</Button>
    </li>
  );
}
function Button({children}) {
  return <button className="button">{ children}</button>;

}
function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <lable>👩🏻‍🤝‍🧑🏼Friend name</lable>
      <input type="text" />
      <lable>📸 Image</lable>
      <input type="text" />
      <Button>Add</Button>
    </form>
  );
}

function SplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split bill with X</h2>
      <lable>💰 Bill Value</lable>
      <input type="text" />
      <lable>🧍‍♂️ Your Expence</lable>
      <input type="text" />
      <lable>👩🏽‍🤝‍🧑🏼 X Expence</lable>
      <input type="text" disabled />
      <lable>😀 Who pay's the bill</lable>
      <select>
        <option value="user">You</option>
        <option value="Friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}