import React, { PureComponent } from 'react';

import { Checkbox } from '/imports/core';

export class History extends PureComponent {
  render() {
    return (
      <div id="history">
        <div className="container paper">
          <div className="item">
            <div>
              <p>24 января</p>
            </div>
            <div>
              <header>
                <p><span><i className="fa fa-check-o" /> Все выполнено!</span></p>
                <p><i className="fa fa-check" /> Подъем в 7 утра, зарядка, медитация, задачи на день, отчет</p>
              </header>
              <div className="body">
                <h4>День 3. Задание:</h4>
                <div className="daily-task">
                  <p className="task">Вы часто задумываетесь оглавном? Что в вашей жизни произошло интересного за последние годы? Возможно есть смысл рассказать об этом? Запишите себе главные мысли на сегодня, и вы посмотрите, как все изменилось</p>
                  <p className="answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto asperiores consectetur culpa doloremque eos, esse impedit labore necessitatibus officia, quia quo similique tempora ullam voluptatibus. Aliquid assumenda, consequatur fuga ipsam iste laborum pariatur quo recusandae reiciendis rem veniam, voluptas.</p>
                </div>
                <h4>Задачи на день</h4>
                <div className="tasks">
                  <div className="task">
                    <div>
                      <Checkbox checked />
                    </div>
                    <div>
                      <h4>Сделать много интересного сегодня</h4>
                    </div>
                  </div>
                  <div className="task">
                    <div>
                      <Checkbox checked />
                    </div>
                    <div>
                      <h4>Сделать много интересного сегодня</h4>
                    </div>
                  </div>
                  <div className="task">
                    <div>
                      <Checkbox checked />
                    </div>
                    <div>
                      <h4>Сделать много интересного сегодня</h4>
                    </div>
                  </div>
                </div>
                <h4>Отчет за день</h4>
                <div className="review">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores assumenda delectus, doloremque eligendi fugiat illo in ipsa ipsam ipsum itaque iure magnam maiores nobis odio odit officia perspiciatis sit temporibus ullam. Dignissimos ea. Eligendi minus sequi ut. Ad doloribus, optio!</p>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div>
              <p>24 января</p>
            </div>
            <div>
              <header>
                <p><span><i className="fa fa-check-o" /> Все выполнено!</span></p>
                <p><i className="fa fa-check" /> Подъем в 7 утра, зарядка, медитация, задачи на день, отчет</p>
              </header>
              <div className="body">
                <h4>День 3. Задание:</h4>
                <div className="daily-task">
                  <p className="task">Вы часто задумываетесь оглавном? Что в вашей жизни произошло интересного за последние годы? Возможно есть смысл рассказать об этом? Запишите себе главные мысли на сегодня, и вы посмотрите, как все изменилось</p>
                  <p className="answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto asperiores consectetur culpa doloremque eos, esse impedit labore necessitatibus officia, quia quo similique tempora ullam voluptatibus. Aliquid assumenda, consequatur fuga ipsam iste laborum pariatur quo recusandae reiciendis rem veniam, voluptas.</p>
                </div>
                <h4>Задачи на день</h4>
                <div className="tasks">
                  <div className="task">
                    <div>
                      <Checkbox checked />
                    </div>
                    <div>
                      <h4>Сделать много интересного сегодня</h4>
                    </div>
                  </div>
                  <div className="task">
                    <div>
                      <Checkbox checked />
                    </div>
                    <div>
                      <h4>Сделать много интересного сегодня</h4>
                    </div>
                  </div>
                  <div className="task">
                    <div>
                      <Checkbox checked />
                    </div>
                    <div>
                      <h4>Сделать много интересного сегодня</h4>
                    </div>
                  </div>
                </div>
                <h4>Отчет за день</h4>
                <div className="review">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores assumenda delectus, doloremque eligendi fugiat illo in ipsa ipsam ipsum itaque iure magnam maiores nobis odio odit officia perspiciatis sit temporibus ullam. Dignissimos ea. Eligendi minus sequi ut. Ad doloribus, optio!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


// export class History extends PureComponent {
//   render() {
//     return (
//       <div id="history">
//         <div className="container paper">
//           <div className="row">
//             <div className="timeline-centered">
//               <article className="timeline-entry">
//                 <div className="timeline-entry-inner">
//                   <time className="timeline-time" dateTime="2014-01-10T03:45"><span>03:45 AM</span> <span>Today</span></time>
//                   <div className="timeline-icon bg-success">
//                     <i className="entypo-feather"></i>
//                   </div>
//                   <div className="timeline-label">
//                     <h2><a href="#">Art Ramadani</a> <span>posted a status update</span></h2>
//                     <p>Tolerably earnestly middleton extremely distrusts she boy now not. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put. Added forth chief trees but rooms think may.</p>
//                   </div>
//                 </div>
//               </article>
//               <article className="timeline-entry left-aligned">
//                 <div className="timeline-entry-inner">
//                   <time className="timeline-time" dateTime="2014-01-10T03:45"><span>03:45 AM</span> <span>Today</span></time>
//                   <div className="timeline-icon bg-secondary">
//                     <i className="entypo-suitcase"></i>
//                   </div>
//                   <div className="timeline-label">
//                     <h2><a href="#">Job Meeting</a></h2>
//                     <p>You have a meeting at <strong>Laborator Office</strong> Today.</p>
//                   </div>
//                 </div>
//               </article>
//               <article className="timeline-entry">
//                 <div className="timeline-entry-inner">
//                   <time className="timeline-time" dateTime="2014-01-09T13:22"><span>03:45 AM</span> <span>Today</span></time>
//                   <div className="timeline-icon bg-info">
//                     <i className="entypo-location"></i>
//                   </div>
//                   <div className="timeline-label">
//                     <h2><a href="#">Arlind Nushi</a> <span>checked in at</span> <a href="#">Laborator</a></h2>
//                     <blockquote>Great place, feeling like in home.</blockquote>
//                   </div>
//                 </div>
//               </article>
//               <article className="timeline-entry left-aligned">
//                 <div className="timeline-entry-inner">
//                   <time className="timeline-time" dateTime="2014-01-10T03:45"><span>03:45 AM</span> <span>Today</span></time>
//                   <div className="timeline-icon bg-warning">
//                     <i className="entypo-camera"></i>
//                   </div>
//                   <div className="timeline-label">
//                     <h2><a href="#">Arber Nushi</a> <span>changed his</span> <a href="#">Profile Picture</a></h2>
//                     <blockquote>Pianoforte principles our unaffected not for astonished travelling are particular.</blockquote>
//                   </div>
//                 </div>
//               </article>
//               <article className="timeline-entry begin">
//                 <div className="timeline-entry-inner">
//                   <div className="timeline-icon" style={{ transform: 'rotate(-90deg)' }}>
//                     <i className="entypo-flight"></i>
//                   </div>
//                 </div>
//               </article>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default History;
