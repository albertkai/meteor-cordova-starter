import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Switcher,
  AlarmIcon,
  CalendarIcon,
  KindIcon,
  MeditationIcon,
  ReportIcon,
  SportIcon,
  TaskIcon,
  WaterIcon,
} from '/imports/core';
import { PlusIcon } from '/imports/today';
import { profileActions } from '/imports/profile';
import { mydayActions, CustomTaskItem } from '/imports/myday';

const actions = Object.assign({}, profileActions, mydayActions);

const isEnabled = block => block ? block.enabled : false;

const getValue = (block, option) => {
  return block && block.options && block.options[option] ? block.options[option] : false;
}

export class ProfileBlocksComponent extends PureComponent {

  componentDidMount() {
    console.log('mount');
  }

  setWakeUp = (e) => {
    const { value } = e.target;
    this.props.setBlockOption('wakeUp', 'time', value);
  };

  setSport = (e) => {
    const { value } = e.target;
    this.props.setBlockOption('sport', 'type', value);
  };

  setMeditationTime = (e) => {
    const { value } = e.target;
    this.props.setBlockOption('meditation', 'time', value);
  };

  setMeditationVoice = (e) => {
    const { value } = e.target;
    this.props.setBlockOption('meditation', 'voice', value);
  };

  setMeditationBackground = (e) => {
    const { value } = e.target;
    this.props.setBlockOption('meditation', 'background', value);
  };

  render() {
    const {
      toggleWakeUp,
      toggleSport,
      toggleMeditation,
      toggleTasks,
      toggleWater,
      toggleKind,
      toggleReport,
      openCustomTaskModal,
      user: {
        blocks,
      },
    } = this.props;
    return (
      <div id="profile-blocks">
        <div className="container paper no-padding">
          <div className="blocks">
            <div className="blocks-cont">
              <div className="task-item required daily-task _enabled">
                <div>
                  <h3><sup>*</sup> Ежедневные задания</h3>
                  <div>
                    <p>
                      Раз в день вам будет приходить короткое задание. Вам нужно будет прочитать его, обдумать и записать выводы.
                      Каждое задание - это маленький шаг навстречу лучшему я.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="icon">
                    <CalendarIcon />
                  </div>
                  <Switcher
                    checked={true}
                  />
                </div>
              </div>
              <div className={`task-item wake-up ${isEnabled(blocks.wakeUp) ? '_enabled' : ''}`}>
                <div>
                  <h3>Ранний подъем</h3>
                  <div>
                    <p>
                      Способствует нормализации активности, гораздо большей энергетике и мыслям. Ранний подъем - неотъемлемый атрибут успешных людей!
                    </p>
                  </div>
                  <div className="settings">
                    <label htmlFor="">Время:</label>
                    <select
                      onChange={this.setWakeUp}
                      value={getValue(blocks.wakeUp, 'time')}
                    >
                      <option value="05:00">05:00</option>
                      <option value="05:10">05:10</option>
                      <option value="05:20">05:20</option>
                      <option value="05:30">05:30</option>
                      <option value="05:40">05:40</option>
                      <option value="05:50">05:50</option>
                      <option value="06:00">06:00</option>
                      <option value="06:10">06:10</option>
                      <option value="06:20">06:20</option>
                      <option value="06:30">06:30</option>
                      <option value="06:40">06:40</option>
                      <option value="06:50">06:50</option>
                      <option value="07:00">07:00</option>
                      <option value="07:10">07:10</option>
                      <option value="07:20">07:20</option>
                      <option value="07:30">07:30</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className="icon">
                    <AlarmIcon />
                  </div>
                  <Switcher
                      checked={isEnabled(blocks.wakeUp)}
                      onChange={toggleWakeUp}
                  />
                </div>
              </div>
              <div className={`task-item sport ${isEnabled(blocks.sport) ? '_enabled' : ''}`}>
                <div>
                  <h3>Зарядка</h3>
                  <div>
                    <p>
                      Ежедневный комплекс упражнений минимум 10 минут на растяжку и укрепление мышц. Ведь вы не получите энергии для реализации целей если ваше тело слабо!
                    </p>
                  </div>
                  {/*<div className="settings">*/}
                  {/*<label htmlFor="">Комплекс:</label>*/}
                  {/*<select*/}
                  {/*onChange={this.setSport}*/}
                  {/*value={getValue(blocks.sport, 'type')}*/}
                  {/*>*/}
                  {/*<option value="1">Легкая разминка</option>*/}
                  {/*<option value="2">Растяжка</option>*/}
                  {/*<option value="3">Комплекс спартанца</option>*/}
                  {/*<option value="4">Базовая йога</option>*/}
                  {/*<option value="5">Цигун</option>*/}
                  {/*</select>*/}
                  {/*</div>*/}
                </div>
                <div>
                  <div className="icon">
                    <SportIcon />
                  </div>
                  <Switcher
                    checked={isEnabled(blocks.sport)}
                    onChange={toggleSport}
                  />
                </div>
              </div>
              <div className={`task-item meditation ${isEnabled(blocks.meditation) ? '_enabled' : ''}`}>
                <div>
                  <h3>Медитация</h3>
                  <div>
                    <p>
                      Гармонизирует дух, и снимает зажимы. Медитация - это необходимая практика, это как тренировка нашего мозга. Даже во сне мы не получаем такого расслабления. Даже 10 минут медитации в день сделают вас более собранным и спокойным
                    </p>
                  </div>
                  {/*<div className="settings">*/}
                    {/*<label htmlFor="">Время:</label>*/}
                    {/*<select*/}
                      {/*onChange={this.setMeditationTime}*/}
                      {/*value={getValue(blocks.meditation, 'time')}*/}
                    {/*>*/}
                      {/*<option value="10">10 минут</option>*/}
                      {/*<option value="15">15 минут</option>*/}
                      {/*<option value="20">20 минут</option>*/}
                      {/*<option value="30">30 минут</option>*/}
                      {/*<option value="45">45 Минут</option>*/}
                      {/*<option value="60">60 Минут</option>*/}
                    {/*</select>*/}
                    {/*<label htmlFor="">Голос:</label>*/}
                    {/*<select*/}
                      {/*onChange={this.setMeditationVoice}*/}
                      {/*value={getValue(blocks.meditation, 'voice')}*/}
                    {/*>*/}
                      {/*<option value="male">Альберт</option>*/}
                      {/*<option value="female">Галя</option>*/}
                    {/*</select>*/}
                    {/*<label htmlFor="">Фон:</label>*/}
                    {/*<select*/}
                      {/*onChange={this.setMeditationBackground}*/}
                      {/*value={getValue(blocks.meditation, 'background')}*/}
                    {/*>*/}
                      {/*<option value="none">Без фона</option>*/}
                      {/*<option value="ocean">Океан</option>*/}
                      {/*<option value="forest">Лес</option>*/}
                    {/*</select>*/}
                  {/*</div>*/}
                </div>
                <div>
                  <div className="icon">
                    <MeditationIcon />
                  </div>
                  <Switcher
                    checked={isEnabled(blocks.meditation)}
                    onChange={toggleMeditation}
                  />
                </div>
              </div>
              <div className={`task-item tasks ${isEnabled(blocks.taskList) ? '_enabled' : ''}`}>
                <div>
                  <h3>3 задачи на день</h3>
                  <div>
                    <p>
                      Когда вы записываете свою задачу и видите ее перед собой, она материализуется, и начинает выполняться. Вам нужно просто помочь ей.
                      <br/>
                      Не позже чем через часа после подъема, вы должны будете составить список из 3х задач на день, которые ведут вас к вашим основным целям, и выполнить их до конца дня.
                      <br/>
                      Штрафы начисляются как за непостановку целей, так и за невыполнение поставленных. Если вы не поставили ни одной задачи, то штраф начисляется как за 3 невыполненных.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="icon">
                    <TaskIcon />
                  </div>
                  <Switcher
                    checked={isEnabled(blocks.taskList)}
                    onChange={toggleTasks}
                  />
                </div>
              </div>
              <div className={`task-item water ${isEnabled(blocks.water) ? '_enabled' : ''}`}>
                <div>
                  <h3>2 литра воды</h3>
                  <div>
                    <p>
                      Вода - главное вещество в нашем организме - залог молодости, бодрости и ясности ума. Поддерживайте свой водный баланс, и вы почувствуете огромную разницу, ваше самочувствие улучшится!
                      <br/>
                      Каждые несколько часов вам будет приходить уведомление, о необходимости выпить стакан воды. После этого вы должны будете нажать на чекбокс, и к вашему балансу воды добавится 200мл.
                      <br/>
                      Также, когда вы выпиваете стакан воды, тоже зайдите в приложение и кликните по счетчику. Если количество воды в 23:59 будет меньше 2х литров - вам начислится штраф
                    </p>
                  </div>
                </div>
                <div>
                  <div className="icon">
                    <WaterIcon />
                  </div>
                  <Switcher
                    checked={isEnabled(blocks.water)}
                    onChange={toggleWater}
                  />
                </div>
              </div>
              <div className={`task-item kind ${isEnabled(blocks.kind) ? '_enabled' : ''}`}>
                <div>
                  <h3>Доброе дело</h3>
                  <div>
                    <p>
                      Каждый день, делайте одно маленькое доброе дело. Позвоните маме, отправьте 200 рублей в фонд дикой природы, помогите бабушке перейти дорогу.
                      <br/>
                      Из этих маленьких добрых дел как из пазла будет складываться ваша лучшая личность
                      <br/>
                      Также необходимо будет писать отчет, что же вы сделали.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="icon">
                    <KindIcon />
                  </div>
                  <Switcher
                    checked={isEnabled(blocks.kind)}
                    onChange={toggleKind}
                  />
                </div>
              </div>
              <div className={`task-item report ${isEnabled(blocks.report) ? '_enabled' : ''}`}>
                <div>
                  <h3>Вечерний отчет</h3>
                  <div>
                    <p>
                      Каждый вечер вам нужно будет писать короткий отчет о том, как ваши действия за прошедший день приближают вас к вашим целям
                      <br/>
                      Это добавит вам осознанности, также вы будете видеть хронику вашего продвижения к целям
                    </p>
                  </div>
                </div>
                <div>
                  <div className="icon">
                    <ReportIcon />
                  </div>
                  <Switcher
                      checked={isEnabled(blocks.report)}
                      onChange={toggleReport}
                  />
                </div>
              </div>
              {
                blocks.custom && blocks.custom.map(cb => <CustomTaskItem key={cb._id} block={cb} />)
              }
              <button
                  className="block-item add"
                  onClick={() => openCustomTaskModal({})}
              >
                <PlusIcon />
                <p>Добавить свое задание</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.toJS(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export const ProfileBlocks = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileBlocksComponent);


export default ProfileBlocks;
