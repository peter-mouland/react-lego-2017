import { h, Component } from 'preact';
import { json } from '../../utils/fetch';

import './styles.scss';

export default class Homepage extends Component {

  constructor(props) {
    super(props);
    this.fetch = this.fetch.bind(this);
    this.state = {
      response: false
    };
  }

  fetch(e) {
    e.preventDefault();
    json.get(`/api/v1${this.apiInput.value}&responseType=${this.responseType.value}`)
      .then((response) => {
        const formatted = this.responseType.value === 'json'
          ? JSON.stringify(JSON.parse(response), null, 2)
          : response;
        this.setState({ response: formatted });
      });
  }

  render({}, { response }) {
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
                   defaultValue="/advertisers/?format=api" />
            <input type="submit"
                   value="fetch"
                   className="form__button"
                   onClick={this.fetch}
            />
          </div>
        </form>
        <section className="section results">
          <dl>
            <dt className="section__label">HTTP</dt><dd></dd>
            <dt className="section__label">Vary:</dt><dd className="section__value"></dd>
            <dt className="section__label">Allow:</dt><dd className="section__value"></dd>
            <dt className="section__label">Content-type:</dt><dd className="section__value"></dd>
            <dt className="section__label sr-only">Response</dt>
            {response ? (
              <dd className="results__value">
                {response}
              </dd>)
              : null
            }
          </dl>
        </section>
      </div>
    );
  }
}
