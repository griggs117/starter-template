## Quick Start

To see the app running, visit [`stater-template`](https://starter-template.herokuapp.com)

To run this locally:

```bash
$ git clone https://github.com/griggs117/starter-template.git starter-template
```

- Set up an [`MLab`](https://mlab.com) account
- Create new MongoDB Deployment
- Add a user
- Modify variables.env to include:

```js
SECRET=<random-secret-here>
MONGO_URI=mongodb://<YOUR-USERNAME>:<YOUR-PASSWORD>@ds251022.mlab.com:51022/newproject
```

- Install dependencies and start the server

```bash
$ npm install
$ npm run dev
```
