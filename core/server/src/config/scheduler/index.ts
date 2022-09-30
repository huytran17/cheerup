import { Agenda } from "agenda/es";
import mongoose from "mongoose";
import { makeDatabaseURL } from "../../data-access/make-db";
import { logger } from "../../config/logs/logger";

export default class Scheduler {
  public static scheduler_instance: Scheduler;
  public readonly agenda_instance: Agenda;

  constructor() {
    if (Scheduler.scheduler_instance) {
      return Scheduler.scheduler_instance;
    }

    try {
      const configurations = {
        maxConcurrency: 20,
        defaultConcurrency: 5,
        lockLimit: 0,
        defaultLockLimit: 0,
        defaultLockLifetime: 10000,
      };

      const is_development = process.env.NODE_ENV === "development";
      const is_production = process.env.NODE_ENV === "production";

      if (is_development) {
        const database_url = makeDatabaseURL();
        if (!database_url) {
          logger.warn(
            `Agenda can not be initilized because the database URL is incorrect: ${database_url}.`
          );
          return;
        }

        this.agenda_instance = new Agenda(
          Object.assign({}, configurations, {
            db: { address: makeDatabaseURL() },
          })
        );

        console.log("Initialized Agenda for development.");
      } else if (is_production) {
        this.agenda_instance = new Agenda(
          Object.assign({}, configurations, {
            mongo: mongoose.connection,
          })
        );

        console.log("Initialized Agenda for production.");
      } else {
        logger.warn(
          `NODE_ENV: ${process.env.NODE_ENV} is not available for agenda initilization.`
        );
      }

      this.agenda_instance.start().then(() => {
        process.on("SIGTERM", this.graceful);
        process.on("SIGINT", this.graceful);
      });

      this.agenda_instance.on("ready", async () => {
        await Scheduler.scheduler_instance?.defineJobs();
      });

      Scheduler.scheduler_instance = this;
    } catch (err) {
      console.error(err);
    }
  }

  static getSchedulerInstance() {
    if (Scheduler.scheduler_instance) {
      return Scheduler.scheduler_instance;
    }

    new Scheduler();
    return Scheduler.scheduler_instance;
  }

  async defineJobs() {}

  async graceful(): Promise<void> {
    await this.agenda_instance.stop();
    process.exit(0);
  }
}

const scheduler = Scheduler.getSchedulerInstance();

export { scheduler };
