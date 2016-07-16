import Component from 'substance/ui/Component'
import Icon from 'substance/ui/FontAwesomeIcon'

export default
class MainPage extends Component {

  render($$) {
    let el = $$('div').addClass('sc-main-page')

    let header = $$('div').addClass('se-header')
      .append($$('div').addClass('se-title')
        .text('Substance Example: Components'))
      .append($$('a').addClass('se-home-button').attr('href', '/')
        .append($$(Icon, { icon: 'fa-home' })))

    let body = $$('div').addClass('se-body').text('BODY')
    var items = this.props.items;
    if (items && items.length > 0) {
      this.props.items.forEach(function(item) {
        body.append($$('p').text(String(item)))
      })
    } else {
      body.append("No Content");
    }

    let footer = $$('div').addClass('se-footer').text('FOOTER')

    el.append(header, body, footer)

    return el;
  }

}
