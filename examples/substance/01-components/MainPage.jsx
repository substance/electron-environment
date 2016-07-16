import Component from 'substance/ui/Component'
import Icon from 'substance/ui/FontAwesomeIcon'

class MainPage extends Component {

  render($$) {
    return (
      <div class="sc-main-page">
        <div class="se-header">
          <div class="se-title">Substance Example: Components</div>
          <a class="se-home-button" href="/">
            <Icon icon="fa-home" />
          </a>
        </div>
        <div class="se-body" ref="body">
          { this._renderBodyContent($$) }
        </div>
        <div class="se-footer" />
      </div>
    )
  }

  _renderBodyContent($$) {
    const items = this.props.items
    if (items && items.length > 0) {
      let itemEls = items.map(function(item) {
        return <p>{String(item)}</p>
      })
      return itemEls
    } else {
      return "No Content"
    }
  }
}

export default MainPage
