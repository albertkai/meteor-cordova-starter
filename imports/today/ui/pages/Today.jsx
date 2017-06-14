import React, { PureComponent } from 'react';

import { SimpleBlock, TextBlock, TasksBlock, WaterBlock } from '/imports/today';

export class Today extends PureComponent {
  render() {
    return (
      <div id="today">
        <div className="container paper">
          <header>
            <h2>Выполнено: 3 из 8</h2>
          </header>
          <TextBlock
            name="День 1. Задание"
            task="Вы часто задумываетесь оглавном? Что в вашей жизни произошло интересного за последние годы? Возможно есть смысл рассказать об этом? Запишите себе главные мысли на сегодня, и вы посмотрите, как все изменилось"
          />
          <SimpleBlock
            type="simple"
            name="Ранний подъем"
            desc="Вам необходимо поставить отметку здесь не позже 7:05"
          />
          <SimpleBlock
            type="video"
            name="Зарядка"
            desc="Выполните комплекс упражнений в видео. После того, как вы просмотрите все видео без переключений - задание будет отмечено как выполненное."
          />
          <SimpleBlock
            type="audio"
            name="Медитация"
            desc="10 минутная медитация. Рекомендуем выполняь как можно раньше. После того, как аудио будет полностью прослушано, задание будет отмечено как выполненное."
          />
          <WaterBlock />
          <TasksBlock
            name="3 задачи на день"
            desc="Спланируйте 3 задачи, приближающие вас к вашим целям!"
          />
          <TextBlock
            name="Отчет за день"
            task="Опишите, как ваши действия за сегодня продвинули вас к цели"
          />
        </div>
      </div>
    );
  }
}
  
export default Today;
  