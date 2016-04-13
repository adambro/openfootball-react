import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, Link } from 'react-router'

const Layout = (props) => (
  <div className="row container">
    <Competitions/>
    <div id="middle">{props.children}</div>
  </div>
);

    // I use this syntax when my component fits on one line
    const ListItem = (props) => (
      <tr style={{border: "1px solid black"}}>
        <td>{props.item.play_at}</td>
        <td style={{textAlign: "right"}}>{props.item.team1_title}</td>
        <td style={{textAlign: "center"}}>{props.item.score1} - {props.item.score2}</td>
        <td>{props.item.team2_title}</td>
        <td className="col-md-1 center-block">{"\u2612"}</td>
      </tr>
    );

    // I use this when my component has no logic outside JSX
    const List = ({ items }) => (
        <table className="table">
          <tbody>
            {items.map(item => <ListItem item={item} />)}
          </tbody>
        </table>
    );

    const MatchesList = (props) => (
      <div>
        <h2>{props.title}</h2>
        <List items={props.items}/>
      </div>
    );

    class MatchesBlock extends React.Component {
      constructor(props) {
        super(props);
        this.url = this.urlFromProps(props);
        this.state = {matches: [
          {"team1_key":"mex","team1_title":"Mexico","team1_code":"MEX","team2_key":"cmr","team2_title":"Cameroon","team2_code":"CMR","play_at":"2014/06/13","score1":1,"score2":0,"score1ot":null,"score2ot":null,"score1p":null,"score2p":null},
          {"team1_key":"esp","team1_title":"Spain","team1_code":"ESP","team2_key":"ned","team2_title":"Netherlands","team2_code":"NED","play_at":"2014/06/13","score1":1,"score2":5,"score1ot":null,"score2ot":null,"score1p":null,"score2p":null},
          {"team1_key":"chi","team1_title":"Chile","team1_code":"CHI","team2_key":"aus","team2_title":"Australia","team2_code":"AUS","play_at":"2014/06/13","score1":null,"score2":null,"score1ot":null,"score2ot":null,"score1p":null,"score2p":null}
        ]};
      }

      urlFromProps(props) {
        console.log(props.params, 'props.params');
        this.season = props.params.season || 'en.2012_13';
        return 'http://localhost:9292/event/' + this.season + '/round/today';
      }

      render() {
        return <MatchesList title={this.season} items={this.state.matches} />
      }

      fetchData(url) {
        console.log(url, 'Fetched URL');
        fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({matches: data.games});
        }).catch((err) => {
            throw new Error(err);
        });
      }

      componentWillReceiveProps(nextProps) {
        const url = this.urlFromProps(nextProps);
        this.fetchData(url);
      }

      componentDidMount() {
        this.fetchData(this.url);
      }
    }

    const Competitions = () => (
      <ul>
        <li><Link to="/matches/en.2013_14"> 2013/14</Link></li>
        <li><Link to="/matches/en.2012_13"> 2012/13</Link></li>
      </ul>
    );

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Layout}/>
    <Route component={Layout}>
      <Route path="/matches/:season" component={MatchesBlock}/>
    </Route>
  </Router>
), document.getElementById('root'));