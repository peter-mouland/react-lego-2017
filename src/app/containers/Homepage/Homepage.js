import {h, Component} from 'preact';
import {json} from '../../utils/fetch';

import './styles.scss';

export default class Homepage extends Component {

  constructor(props) {
    super(props);
    this.fetch = this.fetch.bind(this);
    this.state = {
      response: null
    };
  }

  fetch(e) {
    e.preventDefault();
    const format = this.responseType.value;
    if (this.state.response && this.state.response[format]){
      return ;
    }
    json.get(`/api/v1${this.apiInput.value}&responseType=${format}`)
      .then((data) => {
        const formatted = format === 'json'
          ? JSON.stringify(JSON.parse(data), null, 2)
          : data;

        const newState = Object.assign({}, this.state.response || {}, { [format]: formatted});

        this.setState({ response: newState });
      });
  }

  render({}, {response}) {
    return (
      <div id="homepage" className="section-container">
        <banner className="header">
          <h1>Advertiser List</h1>
        </banner>
        <form action="/" method="get" className="form" >
          <select className="form_select form_select--primary"
                  ref={(input) => {
                    this.responseType = input;
                  }}
          >
            <option className="form_option">json</option>
            <option className="form_option">xml</option>
          </select>
          <div className="form__row section">
            <label htmlFor="api"
                   className="section__label form__label">get</label>
            <input type="input"
                   ref={(input) => {
                     this.apiInput = input;
                   }}
                   name="api"
                   id="api"
                   className="form__input"
                   defaultValue="/advertisers/?format=api"/>
            <input type="submit"
                   value="fetch"
                   className="form__button"
                   onClick={this.fetch}
            />
          </div>
        </form>
        <section className="section results">
          <dl>
            <dt className="section__label">HTTP</dt>
            <dd></dd>
            <dt className="section__label">Vary:</dt>
            <dd className="section__value"></dd>
            <dt className="section__label">Allow:</dt>
            <dd className="section__value"></dd>
            <dt className="section__label">Content-type:</dt>
            <dd className="section__value"></dd>
            <dt className="section__label sr-only">Response</dt>
            {!!response ? (
              <dd className="results__value">
                {response[this.responseType.value]}
              </dd>)
              : null
            }
          </dl>
        </section>
      </div>
    );
  }
}
