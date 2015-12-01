/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React from 'react';
import Relay from 'react-relay';
import StarWarsShip from './StarWarsShip';

class StarWarsApp extends React.Component {
  render() {
    var {factions} = this.props;
    return (
      <div>
        <div>Foo: {this.props.relay.variables.foo}</div>
        <ol>
          {factions.map(faction => (
            <li key={faction.id}>
              <h1>{faction.name}</h1>
              <ol>
                {faction.ships.edges.map(edge => (
                  <li key={edge.node.id}><StarWarsShip ship={edge.node} /></li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
        <button onClick={this.changeShipCount.bind(this)}>Makes GQL Call</button>
        <button onClick={this.changeFoo.bind(this)}>View Change / No Call</button>
      </div>
    );
  }

  changeShipCount() {
    this.props.relay.setVariables({
      shipCount: this.props.relay.variables.shipCount + 1
    })
  }

  changeFoo () {
    this.props.relay.setVariables({
      foo: 'BAZ'
    })
  }

}

export default Relay.createContainer(StarWarsApp, {
  initialVariables: {
    shipCount: 1,
    foo: 'BAR'
  },
  fragments: {
    factions: () => Relay.QL`
      fragment on Faction @relay(plural: true) {
        id,
        name,
        ships(first: $shipCount) {
          edges {
            node {
              id,
              ${StarWarsShip.getFragment('ship')}
            }
          }
        }
      }
    `,
  },
});
