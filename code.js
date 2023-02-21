//This bit is necessary to run the javascript from a bookmarklet or from browser address bar
javascript:(
function() 
{
  //asteroid locations can be determined by the positions of the semi-transparent images overlayed on the map
  let asteroidSensor = document.getElementsByClassName("semitrans asteroidsSemiTrans");
  //Asteroid fields are always the same size just like any other coord position, creates 2D array representing the map grid
  const asteroidPositions = Array.from(Array(21), () => new Array(21));
  //Set up the grid column and row numbers
  for(let i = 1; i < 21; i++) 
  {
    asteroidPositions[i][0] = i - 1;
    asteroidPositions[0][i] = i - 1; 
  }
  //Iterates through asteroidSensor array
  for(let i = 0; i < asteroidSensor.length; i++) 
  {
    let as = asteroidSensor.item(i);
    //position is determined by the top and left pixel coordinates on the map
    let top = parseInt(as.style.top.replace("px", ""));
    let left = parseInt(as.style.left.replace("px", ""));
    let size = parseInt(as.style.width.replace("px", ""));
    //By dividing the left and top pixel locations by the size of the sensor images we get grid positions in system coordinates instead of pixel coordinates
    let gridPos = { x: left/size, y: top/size };
    asteroidPositions[gridPos.y + 1][gridPos.x + 1] = `"${gridPos.x},${gridPos.y}"`; 
  }
  
  /*
     this next bit of code searches for the name of the asteroid field to place it at 0,0 in the array
     it's honestly kind of gross but there doesn't appear to be an easier way to find that info in the html
     but basically it gets all of the classes with the name "tableheader" since the name is stored in one of those
  */
  let infopane = document.getElementsByClassName("tableheader");
  for(let i = 0; i < infopane.length; i++) 
  {
    let info = infopane.item(i);
    //Checks if the text of this element contains the words "Asteroid Field", if it does then we know we have the correct element
    if(info.innerText.includes("Asteroid Field")) 
    { 
      /* 
         This nasty looking line should really have been broken down into multiple, but inlining it works just as well
         Since the element that contains the name contains other info like the sector name and the position the player is at in the field
         we go ahead and break it up by line breaks, this breaks the text up into 3 parts so we get the second one which is the name
         i'm not a fan of the magic number used for this and could have used another loop to get the right one but it's good enough for now 
      */
      asteroidPositions[0][0] = `"${info.innerText.toString().split(/\r\n|\r|\n/)[1]}"`; 
    } 
  }
  //combines all of the elements of the array into a single string separated by commas, this allows easy conversion to a spreadsheet csv file
  let csv = asteroidPositions.map((item)=>{ let row = item; return row.join(","); }).join("\n");
  //creates the file from the previous csv data
  let file = new Blob([csv], { type:'text/csv' });
  let url = URL.createObjectURL(file);
  //prompts user to download the file, unfortunately i don't see a way using this method to give the file a decent name so it is automatically generated
  window.open(url); 
})();
