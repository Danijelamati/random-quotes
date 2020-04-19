console.clear();

// React
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      author: "",
      quote: "",
      allQuotes: [],
      index: "" };

    this.handleClick = this.handleClick.bind(this);
    this.randomQuote = this.randomQuote.bind(this);
  }

  componentDidMount() {
    fetch("https://type.fit/api/quotes", { method: 'GET' }).
    then(res => res.json()).
    then(res => {this.setState({
        allQuotes: res });
      this.randomQuote();
    });
  }

  handleClick() {
    this.randomQuote();
  }

  randomQuote() {
    let random = Math.floor(Math.random() * this.state.allQuotes.length);

    while (random === this.state.index) {
      random = Math.floor(Math.random() * this.state.allQuotes.length);
    }

    this.setState({
      author: this.state.allQuotes[random].author,
      quote: this.state.allQuotes[random].text.
      replace(/<[^>]*>/g, "").
      replace(/[0-9$#&;]/g, ""),
      index: random });

  }


  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { id: "text" },
      React.createElement("h2", null, this.state.quote)),

      React.createElement("div", { id: "author" },
      React.createElement("h4", null, this.state.author)),

      React.createElement("div", { class: "row d-flex justify-content-between" },
      React.createElement("div", null,
      React.createElement("button", { class: "btn btn-light" },
      React.createElement("a", {
        id: "tweet-quote",
        target: "_blank",
        href: "https://twitter.com/intent/tweet?text=" + this.state.quote + "-" + this.state.author
        //href='https://twitter.com/intent/tweet?text='
      },
      React.createElement("i", { class: "fab fa-twitter" }), "Tweet"))),



      React.createElement("div", { id: "quote" },
      React.createElement("button", {
        id: "new-quote",
        class: "btn btn-light",
        onClick: this.handleClick },
      React.createElement("i", { class: "fas fa-quote-right" }), "New Quote")))));





  }}
;

ReactDOM.render(React.createElement(App, null), document.getElementById("quote-box"));