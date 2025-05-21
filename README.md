# Asteroid Field Mapper

### How to Install
##### Bookmarklet
1. Copy code from [code.js](code.js)
2. Create new bookmark in your browser window. [basic how to](https://mycomputerworks.com/how-to-bookmark-webpages-browser/)
3. Edit bookmark if the edit window did not automatically open (typically right click will give the option to edit)
4. paste the code from [code.js](code.js) into the URL section and save
##### Tampermonkey
1. Install [Tampermonkey](https://www.tampermonkey.net/index.php)
2. Navigate to the tampermonkey Dasboard and select Utilities
3. Paste the following link into the Import from URL box then select the Install button: `https://raw.githubusercontent.com/boxfriend/AFMapper/refs/heads/main/TamperMonkeyScript.js`

### How to use
##### Bookmarklet
While in the ship controls of an undocked ship in an Asteroid Field click the bookmark you created. This will automatically prompt you to download the generated csv file.
##### Tampermonkey
While in the ship controls of an undocked ship in an Asteroid Field you will see a new icon in the Ship Stats section, you can click this icon to generate a csv file to download.

#### Supported Platforms
This will likely only work in a desktop environment, does not appear to work on mobile (though you are welcome to try)

#### Other Info
I don't typically use Javascript so the code is probably not ideal, but it does exactly what I needed it to. The code has been made readable and commented in [PrettyCode](PrettyCode.js)
