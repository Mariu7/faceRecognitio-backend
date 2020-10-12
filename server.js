// 281-283
import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

const db =knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'marokas',
      database : 'smartBrain'
    }
  });

  db.select('*').from('users').then(data => {
      console.log(data)
  });


const app = express();
app.use(express.json());
app.use(cors());
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
    ],
    login: [
        {
            id:'456',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
      if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json(database.users[0]);
    }   else {
            res.status(400).json('Error logging in');
        }
    
})

app.post('/register', (req,res) => {
    const {email, name, password} = req.body; 
    db('users')
    .returning('*')
    .insert({
        name: name,
        email: email,
        joined: new Date()
        }).then(user => {
            res.json(user[0]);
        })    
        .catch(err => res.status(400).json('unable to register'))
});

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;
    db.select('*').from('users').where({id})
    .then(user => res.json(user[0]))
    // if(!found) {
    //     res.status(400).json('not found');
    // }
})

app.put('/image', (req,res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        } 
    })
    if(!found) {
        res.status(400).json('not found');
    }

})
/*
bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", '$2a$10$AvH5Wq72tQRdKfvxSVVRD.rHMNeUq8y5fx9KZ28L3YitnZhJi1SRu', function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/

app.listen(3001, ()=> {
    console.log('App is running on port 3001');
})