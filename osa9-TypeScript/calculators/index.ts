

import express from 'express';
import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
    
    const queryParam = req.query;
    const error = {error: 'malformatted parameters'};
    if (queryParam.height == undefined || queryParam.weight == undefined) {
        res.json(error);
    }
    if (isNaN(Number(queryParam.height)) || isNaN(Number(queryParam.weight))){
        res.json(error);
    }
    
    const bmi = bmiCalculator(Number(queryParam.height), Number(queryParam.weight));
    const result = {height: queryParam.height, weight: queryParam.weight, bmi};
    res.json(result);
});

app.post('/exercises', (req, res) => {
   
    const { target, daily_exercises } = req.body

    if (!target || !daily_exercises) {
        return res.json({error: "parameters missing"})
    }
    if (isNaN(Number(target)) || daily_exercises.length === 0) {
        return res.json({error: "malformatted parameters"})
    }
    if(target && daily_exercises){
        const result = exerciseCalculator(target, daily_exercises);
        return res.json(result)}
    else {
        return res.json({error: "something went wrong"})
    }
    
    
  });



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

