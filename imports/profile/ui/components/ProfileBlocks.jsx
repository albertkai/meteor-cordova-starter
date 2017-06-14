import React, { PureComponent } from 'react';

import { Checkbox } from '/imports/core';

export class ProfileBlocks extends PureComponent {
  render() {
    return (
      <div id="profile-blocks">
        <div className="container paper">
          <div className="main-info">
            <div className="item">
              <div>
                <h5>Город:</h5>
              </div>
              <div>
                <p>Волгоград</p>
              </div>
            </div>
            <div className="item">
              <div>
                <h5>Временная зона:</h5>
              </div>
              <div>
                <p>Moscow/Russia <span>00:20:32</span></p>
              </div>
            </div>
            <div className="item">
              <div>
                <h5>Сумма штрафа:</h5>
              </div>
              <div>
                <input type="number" value="500" />
              </div>
            </div>
          </div>
          <h3>Блоки:</h3>
          <div className="blocks">
            <div className="block-item required">
              <div>
                <Checkbox status="checked" />
              </div>
              <div>
                <h3><sup>*</sup> Ежедневные задания</h3>
                <div>
                  <p>
                    Раз в день вам будет приходить короткое задание. Вам нужно будет прочитать его, обдумать и записать выводы.
                    <br/>
                    Среднее время выполнения - 5 минут. Каждое задание - это маленький шаг навстречу лучшему я. Шаг за шагом, вы будете понимать что-то новое, и становиться лучше.
                  </p>
                </div>
              </div>
            </div>
            <div className="block-item">
              <div>
                <Checkbox />
              </div>
              <div>
                <h3>Ранний подъем</h3>
                <div>
                  <p>Способствует нормализации активности, гораздо большей энергетике и мыслям. Ранний подъем - неотъемлемый атрибут успешных людей!</p>
                  <div className="settings">
                    <label htmlFor="">Время:</label>
                    <select name="" id="">
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
              </div>
            </div>
            <div className="block-item">
              <div>
                <Checkbox />
              </div>
              <div>
                <h3>Зарядка</h3>
                <div>
                  <p>Ежедневный комплекс упражнений минимум 10 минут на растяжку и укрепление мышц. Поддерживает вас в форме, и дает энергии. Ведь вы не получите энергии для реализации целей если ваше тело слабо</p>
                  <div className="settings">
                    <label htmlFor="">Комплекс:</label>
                    <select name="" id="">
                      <option value="05:00">Легкая разминка</option>
                      <option value="05:10">Растяжка</option>
                      <option value="05:20">Комплекс спартанца</option>
                      <option value="05:30">Базовая йога</option>
                      <option value="05:40">Цигун</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="block-item">
              <div>
                <Checkbox />
              </div>
              <div>
                <h3>Медитация</h3>
                <div>
                  <p>Гармонизирует дух, и снимает зажимы. Медитация - это необходимая практика, это как тренировка нашего мозга. Даже во сне мы не получаем такого расслабления. Даже 10 минут медитации в день сделают вас более собранным и спокойным</p>
                  <label htmlFor="">Время:</label>
                  <select name="" id="">
                    <option value="10">10 минут</option>
                    <option value="15">15 минут</option>
                    <option value="20">20 минут</option>
                    <option value="30">30 минут</option>
                    <option value="45">45 Минут</option>
                    <option value="60">60 Минут</option>
                  </select>
                  <label htmlFor="">Голос:</label>
                  <select name="" id="">
                    <option value="albert">Альберт</option>
                    <option value="gala">Галя</option>
                  </select>
                  <label htmlFor="">Фон:</label>
                  <select name="" id="">
                    <option value="none">Без фона</option>
                    <option value="ocean">Океан</option>
                    <option value="forest">Лес</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="block-item">
              <div>
                <Checkbox />
              </div>
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
            </div>
            <div className="block-item">
              <div>
                <Checkbox />
              </div>
              <div>
                <h3>2 литра воды</h3>
                <div>
                  <p>
                    Вода - главное вещество в нашем организме - залог молодости, бодрости и ясности ума. Поддерживайте свой водный баланс, и вы почувствуете огромную разницу, ваше самочувствие улучшится!
                    <br/>
                    Каждые несколько часов вам будет приходить уведомление, о необходимости выпить стакан воды. После этого вы должны будете нажать на чекбокс, и к вашему балансу воды добавится 200мл.
                    <br/>
                    Также, когда вы выпиваете стакан воды (или чая), тоже зайдите в приложение и кликните по счетчику. Если количество воды в 23:59 будет меньше 2х литров - вам начислится штраф
                  </p>
                </div>
              </div>
            </div>
            <div className="block-item">
              <div>
                <Checkbox />
              </div>
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
            </div>
            <div className="block-item">
              <div>
                <button className="checkbox add">
                  <i className="fa fa-plus" />
                </button>
              </div>
              <div>
                <h3>Добавить свое задание</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileBlocks;
