import strftime from 'strftime';
import color from 'colors';

export const Logger = (message) => {
  var dateTime = strftime('%Y-%m-%d %H:%M:%S:%L') + ' -';
  var stacklist = (new Error()).stack.split('\n');
  var parseError = stacklist[2].split('/');
  var fileNameLineNumber = parseError[parseError.length - 1] + ' -';
   
  if(typeof message === 'string'){
      console.log(color.yellow(dateTime), color.red(fileNameLineNumber),color.green(message));
  } else {
      console.log(color.yellow(dateTime), color.red(fileNameLineNumber));
      console.log(message)
   	}
}
