import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/GlobalErrorHandler'
import routes from './app/Routes'
// import { UserRoutes } from './app/modules/user/user.routes'
// import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route'

const app: Application = express()

app.use(cors())



// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Apllication Route

app.use('/api/v1', routes);


// Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction)=>{
//     console.log(x);
    
// })

app.use(globalErrorHandler)


export default app
