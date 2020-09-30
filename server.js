// 278
import express from 'express';

const app = express();
app.use(express.json());
//"Database" for now
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send('this is working');
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json('succsess');
    }   else {
            res.status(400).json('Error logging in');
        }
    
})


app.listen(3001, ()=> {
    console.log('App is running on port 3001');
})


/* TODO:
/ res = this is working
/singin --> POST  = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
