const completionCode = "12345";

const jsPsych = initJsPsych({
    on_finish: () => {
        document.body.innerHTML = 
        `<div align='center' style="margin: 10%">
            <p>Thank you for participating!<p>
            <b>You will be automatically re-directed to Prolific in a few moments.</b>
        </div>`;
        setTimeout(() => { 
            location.href = `https://app.prolific.co/submissions/complete?cc=${completionCode}`
        }, 2000)
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

