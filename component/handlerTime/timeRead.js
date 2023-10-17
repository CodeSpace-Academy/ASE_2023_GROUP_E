
// the function changes number to a time format 

export default function NumToTime(num) {
    let hours = Math.floor(num / 60);  
    let minutes = num % 60;
    if (minutes + ''.length < 2) {
      minutes = '0' + minutes;
    }
    // enable the return to display h for hours and min for minuetes
    return hours + "h" +":" + minutes +"min";
  }
