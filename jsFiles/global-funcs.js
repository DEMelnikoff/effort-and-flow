const completionCode = "CB1K8YPV";

const jsPsych = initJsPsych({
    on_finish: () => {
        const totalWins = jsPsych.data.get().filter({outcome: 1}).count();
        const bonus = jsPsych.data.get().select('bonus').values[0]
        const basePay = jsPsych.data.get().select('basePay').values[0]
        const bonusEarnings = (totalWins * bonus) / 100
        document.body.innerHTML = 
        `<div align='center' style="margin: 10%">
            <p>Thank you for participating!
            <br>You earned a total of <strong>$${bonusEarnings}</strong> in bonus money.
            <br>You will receive your bonus, in addition to <strong>$${basePay}</strong> for your participation, within 48 hours.<p>
            <b>You will be automatically re-directed to Prolific in a few moments.</b>
        </div>`;
        setTimeout(() => { 
            location.href = `https://app.prolific.co/submissions/complete?cc=${completionCode}`
        }, 5000)
    }
});

let subject_id = jsPsych.data.getURLVariable("PROLIFIC_PID");
if (!subject_id) { subject_id = jsPsych.randomization.randomID(10) };

jsPsych.data.addProperties({
    subject_id: subject_id,
});

const filename = `${subject_id}.csv`;

const save_data = {
  type: jsPsychPipe,
  action: "save",
  experiment_id: "J9IpOdnhr2za",
  filename: filename,
  data_string: ()=>jsPsych.data.get().csv()
};

const logit = (rate, scale, k, shift, x0) => {
    let x = rate / scale
    let denom = 1 + Math.exp(-k * (x - x0));
    let logit = 1 / denom;
    let pPop = logit - shift
    return pPop;
};

