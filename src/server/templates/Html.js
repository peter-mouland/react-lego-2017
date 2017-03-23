import { h, Component } from 'preact';

export default class Html extends Component {

  render({ scripts, stylesheets, markup }) {
    return (
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        {stylesheets.map((stylesheet, i) => <link href={stylesheet} rel="stylesheet" key={ i } />)}
      </head>
      <body>
      {/* <div id="html" dangerouslySetInnerHTML={{ __html: markup }} />*/}
      <div id="html" />
      {scripts.map((script, i) => <script src={script} key={ i } />)}
      </body>
      </html>
    );
  }
}
