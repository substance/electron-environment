'use strict';

import Component from 'substance/ui/Component'
import MainPage from './main-page/MainPage'
import sendRequest from '../../../lib/sendRequest'

export default
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
    let el = $$('div').addClass('sc-app')
    el.append($$(MainPage, { items: this.state.items }))
    return el
  }

}

window.onload = function() {
  new App().mount(document.body)
}
