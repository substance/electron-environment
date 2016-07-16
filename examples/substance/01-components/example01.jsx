import Component from 'substance/ui/Component'
import sendRequest from 'substance/util/sendRequest'

import MainPage from './MainPage'

class App extends Component {

  getInitialState() {
    return { items: [] }
  }

  didMount() {
    sendRequest({
      method: "GET",
      url: "http://localhost:4444/api/someparagraphs"
    }).then(function(data) {
      var paragraphs = JSON.parse(data)
      this.setState({
        items: paragraphs
      })
    }.bind(this))
    .catch(function(err) {
      console.error('Could not load data from server', err)
    })
  }

  render($$) {
    return (
      <div class="sc-app">
        <MainPage items={this.state.items} />
      </div>
    )
  }

}

window.onload = function() {
  new App().mount(document.body)
}
