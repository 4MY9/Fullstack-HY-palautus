
interface BmiValues {
  value1: number;
  value2: number;
}
const parseArguments = (args: Array<string>): BmiValues => {


  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const bmiCalculator = (a: number, b: number) => {
  const result = b / (a/100*a/100);

  if (result < 16) {
    return 'Underweight (Severe Thinness)';
  }
  if (result >= 16 && result < 17){
    return 'Underweight (Moderate thinness)';
  }
  if (result >= 17 && result < 18.5){
    return 'Underweight (Mild thinness)';
  }
  if (result >= 18.5 && result < 25) {
    return 'Normal (Healty weight)';
  }
  if (result >= 25 && result < 30) {
    return 'Overweight (Pre-obese)';
  }
  if (result >= 30 && result < 35) {
    return 'Obese (Class I)';
  }
  if (result >= 35 && result < 40){
    return 'Obese (Class II)';
  }
  if (result >= 40){
    return 'Obese (Class III)';
  }
  return 'wrong arguments';
  
};


try {
  const { value1, value2 } = parseArguments(process.argv);
  bmiCalculator(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default bmiCalculator;