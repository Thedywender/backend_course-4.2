const express = require('express');

const app = express();

app.use(express.json());

const teams = [
    {
      id: 1,
      name: 'São Paulo Futebol Clube',
      initials: 'SPF',
    },
    {
      id: 2,
      name: 'Cuiabá Esporte Clube',
      initials: 'CEC',
    },
    {
        id: 3,
        name: 'Clube Atlético Mineiro',
        initials: 'CAM',
      },
  ];

app.get('/', (req, res) => res.status(200).json({ mesage: 'Olá mundo' }));

app.get('/teams', (req, res) => res.status(200).json({ teams }));

app.post('/teams', (req, res) => {
    const newTeam = { ...req.body };
    teams.push(newTeam);

    res.status(201).json({ team: newTeam });
});

app.put('/teams/:id', (req, res) => {
  const { id } = req.params;
  const { name, initials } = req.body;

  const updateTeam = teams.find((team) => team.id === Number(id));

  if (!updateTeam) {
    return res.status(404).json({ message: 'Team not found' });
  }

  updateTeam.name = name;
  updateTeam.initials = initials;
  res.status(200).json({ updateTeam });
});

app.get('/teams/:id', (req, res) => {
  const team = teams.find(({ id }) => id === Number(req.params.id));
  res.status(200).json(team);
});

app.delete('/teams/:id', (req, res) => {
  const arrayPosition = teams.findIndex(({ id }) => id === Number(req.params.id));
  teams.splice(arrayPosition, 1);

  res.status(200).end();
});

module.exports = app;