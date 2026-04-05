import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service"

export class Server {

    public static start() {
        console.log('Server started... ')

        CronService.createJob(
            '*/3 * * * * *',
            () => {
                const url = 'https://google.com';
                // new CheckService().execute('https://google.com');
                new CheckService(
                    () => console.log(`${url} is ok`),
                    (error) => console.log(`${url} is not ok`, error)
                ).execute(url);
            }
        );

    }

}