import React, { PureComponent } from 'react';

export class Landing extends PureComponent {
  render() {
    return (
      <div id="landing">
        <div className="top">
          <div className="container">
            <div className="logo">BETTER:ME</div>
            <h1>
              ИГРЫ КОНЧИЛИСЬ! <br/>
              Развивайся или плати
            </h1>
          </div>
        </div>
        <div className="marketing">
          <div className="container">
            <div>
              <h3>Use that</h3>
              <p>Hello</p>
            </div>
            <div>
              <h3>More data</h3>
              <p>Yo</p>
            </div>
            <div>
              <h3>hey-hey</h3>
              <p>Yo</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
