import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
      <div className={classes.actions}>
        <div className={classes.btn}>
          <a href='#1'>Student</a>
        </div>
        <div className={classes.btn}>
          <a href='#1'> Teacher</a>
        </div>
      </div>
    </section>
  );
};

export default StartingPageContent;
