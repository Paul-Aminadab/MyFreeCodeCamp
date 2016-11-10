/*Bonfire: Truncate a string
Truncate a string (first argument) if it is longer than the given maximum string length (second argument). Return the truncated string with a "..." ending.

Note that the three dots at the end add to the string length.

If the length of the string is less than or equal to 3 characters, then the length of the three dots is not added to the string length.

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

String.slice()*/



function truncate(str, num) {
  // Clear out that junk in your trunk
  if(num >= str.length) {
    return str;
  }
  else if(num <= 3) {
    return str.slice(0, num).concat("...");
  }
   else if(num > 3) {
    return str.slice(0, num-3).concat("...");
  }

}

truncate("A-tisket a-tasket A green and yellow basket", 11);
