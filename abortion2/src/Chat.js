import React from 'react';


function MessageRow(props) {
  return (
    <>
    {props.input.includes(props.message.message)?
      <p>You: {props.message.message} </p>:
      <p> Them: {props.message.message}</p>
    }
      </>
  )
}


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.input=([])
    this.state = {
      messages: [],
      clientId: Number.parseInt(Math.random() * 10000000),
      connected: false,
      message: '',
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  connect() {

    if (this.loading && !this.state.connected) {
      return;
    }
    this.loading = true;
    // Should be an environment variable in the future
    const url = `ws://localhost:8000/ws/`;
    this.socket = new WebSocket(url);
    this.socket.addEventListener('open', () => {
      this.setState({ connected: true });
      this.loading = false;
    });
    this.socket.addEventListener('close', () => {
      this.setState({ connected: false });
      this.loading = false;
      setTimeout(() => {
        this.connect();
      }, 1000);
    });
    this.socket.addEventListener('error', () => {
      this.setState({ connected: false });
      this.loading = false;
      setTimeout(() => {
        this.connect();
      }, 1000);
    });
    this.socket.addEventListener('message', message => {
      this.setState({
        messages: [
          JSON.parse(message.data),
          ...this.state.messages,
        ],
      });
    });
  }

  componentDidMount() {
    this.connect();
  }

  sendMessage(e) {
    e.preventDefault();
    this.socket.send(this.state.message);
    this.setState({ message: '' });
    this.input.push(this.state.message)
  }

  updateMessage(e) {
    this.setState({ message: e.target.value });
  }

  render() {
    return (
      <>
       <div className="darkCont">
       <h1>Chat</h1>
       
        {/* <h2>Your ID: {this.state.clientId}</h2> */}
       
        <form onSubmit={this.sendMessage}>

        <div className="input-group mb-3">
          <div  className="input-group-prepend">
            <input value={this.state.message}
                   className="form-control"
                   type="text"
                   id="messageText"
                   autoComplete="off"
                   onChange={this.updateMessage}/>
     </div>
            <button disabled={!this.state.connected}
                    className="btn btn-outline-secondary">
              Send
            </button>
      </div>

        </form>
       
        <h2>Messages:</h2>
            {this.state.messages.map(message => (
                 <MessageRow key={this.state.clientId + message}
                 messages={this.state.messages}
                       message={message}
                       input={this.input}
                       clientId={this.state.clientId} />
   
            ))}

 
        </div>
      </>
    
    )
  }
}

export default Chat;