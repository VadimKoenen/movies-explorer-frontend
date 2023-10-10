import './Promo.css';
function Promo() {
  return (
    <section className="promo">
      <h2 className="promo__title"> О проекте</h2>
      <ul className="promo__container">
        <li className="promo__column">
          <h3 className="promo__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="promo__paragraph">
            Составление плана, работу над бэкендом, верстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="promo__column">
          <h3 className="promo__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="promo__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="promo__stage">
        <div className="another-stage another-stage_back">
          <p className="promo__another-stage promo__another-stage_back-week">
            1 неделя
          </p>
          <p className="promo__another-stage promo__another-stage_back_paragraph">
            Back-end
          </p>
        </div>
        <div className="promo__front">
          <p className="promo__another-front promo__another-front_week">
            4 недели
          </p>
          <p className="promo__another-front promo__another-front_paragraph">
            Front-end
          </p>
        </div>
      </div>
    </section>
  );
}

export default Promo;