import React from 'react';
import { Header } from 'semantic-ui-react';

export default class Page404 extends React.Component {
  render() {
    return (
      <div className="Page404">
        <Header
          as="h1"
          textAlign="center"
          color="white"
          content="Page Not Found"
          subheader="You can put your sample message here"
        />
      </div>
    );
  }
}
