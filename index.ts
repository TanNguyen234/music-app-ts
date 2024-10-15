import express, { Express } from 'express';
import dotenv from 'dotenv';
import * as database from './config/database'
import path from 'path'
import methodOverride from 'method-override';

import clientRoutes from './routes/client/index.route';
import adminRoutes from './routes/admin/index.route';
import { systemConfig } from './config/config';

dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`))

app.set('views', `${__dirname}/viewss`); //Sửa như vầy deloy nó mới hiểu
app.set('view engine', 'pug');

//TinyMCE
app.use(
    "/tinymce",
    express.static(path.join(__dirname, "node_modules", "tinymce"))
)
//End TinyMCE

//App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAmin

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride("_method"))

//Client routes
clientRoutes(app)
//Admin routes
adminRoutes(app)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});