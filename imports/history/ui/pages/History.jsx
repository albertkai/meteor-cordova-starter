import React, { PureComponent } from 'react';

export class History extends PureComponent {
  render() {
    return (
      <div id="history">
        <div className="container paper">
          <div className="row">
            <div className="timeline-centered">
              <article className="timeline-entry">
                <div className="timeline-entry-inner">
                  <time className="timeline-time" dateTime="2014-01-10T03:45"><span>03:45 AM</span> <span>Today</span></time>
                  <div className="timeline-icon bg-success">
                    <i className="entypo-feather"></i>
                  </div>
                  <div className="timeline-label">
                    <h2><a href="#">Art Ramadani</a> <span>posted a status update</span></h2>
                    <p>Tolerably earnestly middleton extremely distrusts she boy now not. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put. Added forth chief trees but rooms think may.</p>
                  </div>
                </div>
              </article>
              <article className="timeline-entry left-aligned">
                <div className="timeline-entry-inner">
                  <time className="timeline-time" dateTime="2014-01-10T03:45"><span>03:45 AM</span> <span>Today</span></time>
                  <div className="timeline-icon bg-secondary">
                    <i className="entypo-suitcase"></i>
                  </div>
                  <div className="timeline-label">
                    <h2><a href="#">Job Meeting</a></h2>
                    <p>You have a meeting at <strong>Laborator Office</strong> Today.</p>
                  </div>
                </div>
              </article>
              <article className="timeline-entry">
                <div className="timeline-entry-inner">
                  <time className="timeline-time" dateTime="2014-01-09T13:22"><span>03:45 AM</span> <span>Today</span></time>
                  <div className="timeline-icon bg-info">
                    <i className="entypo-location"></i>
                  </div>
                  <div className="timeline-label">
                    <h2><a href="#">Arlind Nushi</a> <span>checked in at</span> <a href="#">Laborator</a></h2>
                    <blockquote>Great place, feeling like in home.</blockquote>
                  </div>
                </div>
              </article>
              <article className="timeline-entry left-aligned">
                <div className="timeline-entry-inner">
                  <time className="timeline-time" dateTime="2014-01-10T03:45"><span>03:45 AM</span> <span>Today</span></time>
                  <div className="timeline-icon bg-warning">
                    <i className="entypo-camera"></i>
                  </div>
                  <div className="timeline-label">
                    <h2><a href="#">Arber Nushi</a> <span>changed his</span> <a href="#">Profile Picture</a></h2>
                    <blockquote>Pianoforte principles our unaffected not for astonished travelling are particular.</blockquote>
                  </div>
                </div>
              </article>
              <article className="timeline-entry begin">
                <div className="timeline-entry-inner">
                  <div className="timeline-icon" style={{ transform: 'rotate(-90deg)' }}>
                    <i className="entypo-flight"></i>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default History;
