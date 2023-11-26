import './Techs.css';

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__paragraph">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__container">
        <li className="techs__block">HTML</li>
        <li className="techs__block">CSS</li>
        <li className="techs__block">JS</li>
        <li className="techs__block">React</li>
        <li className="techs__block">Git</li>
        <li className="techs__block">Express.js</li>
        <li className="techs__block">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;